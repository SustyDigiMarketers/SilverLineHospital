import React, { useContext, useRef, useState, useEffect } from 'react';
import { MasterSetupContext } from '../MasterSetupProvider';
import { compressAndConvertToBase64 } from '../../../lib/imageService';
import { listStorageImages } from '../../../lib/supabaseClient';

const resolveImageSrc = (config: any, item: string): string => {
    if (typeof item === 'string' && item.startsWith('imagePaths.')) {
        const keys = item.replace(/\[(\d+)\]/g, '.$1').split('.');
        let result = config;
        for (const key of keys) {
            if (result === null || result === undefined) return '';
            result = result[key];
        }
        return result || '';
    }
    return item;
};

const GalleryManager: React.FC = () => {
    const { config, updateConfig } = useContext(MasterSetupContext);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [imageIndexToDelete, setImageIndexToDelete] = useState<number | null>(null);
    const [uploading, setUploading] = useState(false);
    const [storageImages, setStorageImages] = useState<{ name: string; url: string }[]>([]);
    const [loadingStorage, setLoadingStorage] = useState(false);

    const images = config.galleryImages || [];

    // Fetch storage images on mount
    useEffect(() => {
        const fetchStorage = async () => {
            setLoadingStorage(true);
            const files = await listStorageImages();
            setStorageImages(files);
            setLoadingStorage(false);
        };
        fetchStorage();
    }, []);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const base64Url = await compressAndConvertToBase64(file);
            if (base64Url) {
                const updatedImages = [...images, base64Url];
                updateConfig('galleryImages', updatedImages, 'Image Upload');
                
                // Refresh storage list if we used Supabase
                const files = await listStorageImages();
                setStorageImages(files);
            }
        } catch (error) {
            console.error("Image upload failed:", error);
            alert("There was an error processing the image.");
        } finally {
            setUploading(false);
            event.target.value = '';
        }
    };

    const handleDelete = (indexToDelete: number) => {
        setImageIndexToDelete(indexToDelete);
        setIsDeleteModalOpen(true);
    };
    
    const confirmDelete = () => {
        if (imageIndexToDelete === null) return;

        const updatedImages = images.filter((_: any, index: number) => index !== imageIndexToDelete);
        updateConfig('galleryImages', updatedImages, 'Image Deletion');
        closeDeleteModal();
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setImageIndexToDelete(null);
    };

    const handleAddToGallery = (url: string) => {
        // Avoid duplicates if possible (simple check)
        if (images.includes(url)) {
            alert('This image is already in the gallery.');
            return;
        }
        const updatedImages = [...images, url];
        updateConfig('galleryImages', updatedImages, 'Added from Library');
    };
    
    return (
        <div className="space-y-8">
            {/* Active Gallery Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h3 className="text-xl font-semibold text-gray-800">Active Gallery Images</h3>
                    <button
                        onClick={handleUploadClick}
                        disabled={uploading}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#00B5A5] rounded-md hover:bg-[#0E2A47] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5] disabled:bg-gray-400"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                        {uploading ? 'Processing...' : 'Upload New'}
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />
                </div>
                {images.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {images.map((imageRef: string, index: number) => {
                            const imageUrl = resolveImageSrc(config, imageRef);
                            return (
                                <div key={`${imageRef}-${index}`} className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden shadow">
                                    <img src={imageUrl} alt={`Gallery item ${index + 1}`} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-red-500"
                                            aria-label="Delete image"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 py-8">The gallery is empty. Upload an image or select from the library below.</p>
                )}
            </div>

            {/* Media Library Section */}
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#0E2A47]">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Media Library (Database)</h3>
                <p className="text-sm text-gray-500 mb-6">All images uploaded to Supabase storage. Click 'Add' to display them in the public gallery.</p>
                
                {loadingStorage ? (
                    <div className="text-center py-8 text-gray-500">Loading library...</div>
                ) : storageImages.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                        {storageImages.map((file) => {
                            const isAdded = images.includes(file.url);
                            return (
                                <div key={file.name} className="relative group aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                                    <img src={file.url} alt={file.name} className="w-full h-full object-cover" loading="lazy" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                                        {isAdded ? (
                                            <span className="text-white text-xs font-bold bg-green-600 px-2 py-1 rounded-full flex items-center">
                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                                Added
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() => handleAddToGallery(file.url)}
                                                className="px-3 py-1 bg-[#00B5A5] text-white text-xs font-bold rounded-full hover:bg-[#0E2A47] transition-colors"
                                            >
                                                + Add
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 py-8">No images found in Supabase storage.</p>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && imageIndexToDelete !== null && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm animate-fade-in"
                    onClick={closeDeleteModal}
                >
                    <div
                        className="bg-white rounded-lg shadow-xl w-full max-w-md m-4 p-6 transform animate-scale-up"
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="delete-confirmation-title"
                    >
                        <h2 id="delete-confirmation-title" className="text-lg font-bold text-gray-900">Remove from Gallery</h2>
                        <div className="mt-4 flex items-start gap-4">
                            <img 
                                src={resolveImageSrc(config, images[imageIndexToDelete])} 
                                alt="Image to be deleted" 
                                className="w-20 h-20 object-cover rounded-md flex-shrink-0" 
                            />
                            <p className="text-sm text-gray-600 pt-1">
                                Are you sure you want to remove this image from the gallery view? 
                                <br/><span className="text-xs text-gray-400">(Note: The file will remain in the Media Library database).</span>
                            </p>
                        </div>
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={closeDeleteModal}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GalleryManager;
