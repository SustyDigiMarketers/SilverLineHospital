import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const galleryDir = path.join(__dirname, '../public/Gallery');
const eventsDir = path.join(galleryDir, 'Events');
const pressDir = path.join(galleryDir, 'Press');
const metaFile = path.join(eventsDir, 'events.json');
const outputFile = path.join(__dirname, '../lib/galleryEventsData.ts');

const supportedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg'];

function normalizeString(str) {
    if (!str) return '';
    return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function scanImagesInDirectory(dirPath, urlPrefix) {
    if (!fs.existsSync(dirPath)) return [];
    const files = fs.readdirSync(dirPath);
    const validImages = [];
    
    files.forEach(file => {
        const ext = path.extname(file).toLowerCase();
        if (supportedExtensions.includes(ext)) {
            validImages.push(file);
        }
    });

    // Natural numeric sorting (01, 02, ... 09, 10, 11)
    validImages.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

    return validImages.map(file => `${urlPrefix}/${encodeURIComponent(file)}`);
}

function loadEventsMetadata() {
    if (!fs.existsSync(metaFile)) return [];
    try {
        const raw = fs.readFileSync(metaFile, 'utf-8');
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        console.warn('Warning: Could not parse events.json:', e.message);
        return [];
    }
}

export function generateManifest() {
    console.log('--- Generating SilverLine Gallery & Events Manifest ---');

    // 1. Collect Press Release images
    let pressImages = [];
    if (fs.existsSync(pressDir)) {
        pressImages = scanImagesInDirectory(pressDir, '/Gallery/Press');
    }

    // 2. Load optional event metadata overrides (title, category, date, description)
    const metaList = loadEventsMetadata();
    const metaMap = new Map();
    metaList.forEach(m => {
        if (m.folder) {
            metaMap.set(normalizeString(m.folder), m);
        }
    });

    // 3. Scan public/Gallery/Events subdirectories
    const galleryEvents = [];
    const seenFolders = new Set();

    if (fs.existsSync(eventsDir)) {
        const entries = fs.readdirSync(eventsDir, { withFileTypes: true });

        // Filter directories only, ignore hidden files
        const eventFolders = entries.filter(e => e.isDirectory() && !e.name.startsWith('.'));

        eventFolders.forEach((folder, idx) => {
            const folderName = folder.name;
            const folderKey = normalizeString(folderName);

            // Guarantee one entry per distinct event folder
            if (seenFolders.has(folderKey)) {
                console.warn(`[WARNING] Duplicate folder detected and skipped: "${folderName}"`);
                return;
            }
            seenFolders.add(folderKey);

            const folderPath = path.join(eventsDir, folderName);
            const images = scanImagesInDirectory(folderPath, `/Gallery/Events/${encodeURIComponent(folderName)}`);

            // Safe skip for empty or image-less folders
            if (images.length === 0) {
                console.warn(`[WARNING] Skipping empty event folder: "${folderName}" (0 supported images found).`);
                return;
            }

            // Check metadata override
            const meta = metaMap.get(folderKey) || {};
            
            // The folder name is the primary source of truth, overridable via metadata title
            const displayName = meta.title || folderName;
            const category = meta.category || 'Hospital Events';
            const date = meta.date || '';
            const description = meta.description || '';
            const location = meta.location || 'SilverLine Hospital Trichy';
            const slug = meta.id || folderName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            const eventId = meta.id || slug || `event-${idx + 1}`;
            
            // Explicit rule: strictly select the first naturally-sorted image as the folder thumbnail
            const thumbnail = images[0];

            console.log(`Discovered event folder: "${folderName}" -> Thumbnail: "${thumbnail}" (${images.length} images)`);

            galleryEvents.push({
                id: eventId,
                slug,
                name: displayName,
                title: displayName,
                folder: `/Gallery/Events/${folderName}`,
                category,
                date,
                description,
                location,
                thumbnail,
                images
            });
        });
    }

    // Sort events by date descending or natural order
    galleryEvents.sort((a, b) => {
        if (a.date && b.date) {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        if (a.date) return -1;
        if (b.date) return 1;
        return a.name.localeCompare(b.name, undefined, { numeric: true });
    });

    const fileContent = `/**
 * Generated Gallery Events Manifest
 * ---------------------------------
 * This file is automatically generated by scripts/generate-gallery-manifest.js
 * Scans public/Gallery/Events/<Event Folder>/ and public/Gallery/Press/.
 * 
 * To add an event: Simply create a folder in public/Gallery/Events/<Your Event Name>/
 * with images (01.jpg, 02.jpg, ...).
 * To customize metadata: Edit public/Gallery/Events/events.json.
 */

export interface GalleryEvent {
    id: string;
    slug?: string;
    name: string;
    title?: string;
    folder: string;
    category?: string;
    date?: string;
    description?: string;
    location?: string;
    thumbnail?: string;
    images: string[];
}

export const pressImages: string[] = ${JSON.stringify(pressImages, null, 4)};

export const galleryEvents: GalleryEvent[] = ${JSON.stringify(galleryEvents, null, 4)};
`;

    fs.writeFileSync(outputFile, fileContent, 'utf-8');
    console.log(`Successfully generated manifest: ${galleryEvents.length} events, ${pressImages.length} press images.`);
}

generateManifest();
