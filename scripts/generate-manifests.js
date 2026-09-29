import { generateManifest as generateGalleryManifest } from './generate-gallery-manifest.js';
import { generateInsuranceManifest } from './generate-insurance-manifest.js';

console.log('=== Running Build Manifest Generators ===');
try {
    generateGalleryManifest();
} catch (err) {
    console.error('Error generating gallery manifest:', err);
}

try {
    generateInsuranceManifest();
} catch (err) {
    console.error('Error generating insurance manifest:', err);
}
console.log('=== Manifest Generation Complete ===');
