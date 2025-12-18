import React, { useState, useEffect, useRef, useContext } from 'react';
import * as blogService from '../lib/blogService';
import { MasterSetupContext } from './MasterSetup/MasterSetupProvider';
import type { Doctor } from '../lib/doctorsData';

interface BlogFormModalProps {
  onClose: () => void;
  onSave: (postData: Omit<blogService.Post, 'id'> | blogService.Post) => void;
  post: blogService.Post | null;
}

const BlogFormModal: React.FC<BlogFormModalProps> = ({ onClose, onSave, post }) => {
  const { config } = useContext(MasterSetupContext);
  const doctors: Doctor[] = config.doctors?.list || [];
  const [formData, setFormData] = useState<{
    title: string;
    category: string;
    image: number | string;
    excerpt: string;
    content: string;
    publishDate: string;
    author: string;
  }>({
    title: '',
    category: '',
    image: 0,
    excerpt: '',
    content: '',
    publishDate: new Date().toISOString().split('T')[0],
    author: doctors[0]?.name || '',
  });

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        category: post.category,
        image: post.image,
        excerpt: post.excerpt,
        content: post.content || '',
        publishDate: new Date(post.publishDate).toISOString().split('T')[0],
        author: post.author,
      });
    }
  }, [post]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === 'image' ? parseInt(value, 10) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSave = {
        ...formData,
        publishDate: new Date(formData.publishDate).toISOString(),
    };
    if (post) {
      onSave({ ...post, ...dataToSave });
    } else {
      onSave(dataToSave);
    }
  };
  
  // Safe access for image preview. If image is a number, look it up. If it's a string URL, display directly if possible? 
  // The original code assumed index. Let's keep it safe. 
  // If formData.image is string, accessing array by string key returns undefined usually.
  // config.imagePaths?.blog is string[].
  const currentImageUrl = typeof formData.image === 'number' 
    ? (config.imagePaths?.blog?.[formData.image] || '') 
    : (typeof formData.image === 'string' && formData.image.startsWith('http') ? formData.image : '');

  const inputStyles = "block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00B5A5] focus:border-[#00B5A5] sm:text-sm";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col transform animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">{post ? 'Edit Post' : 'Add New Post'}</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className={inputStyles} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <input type="text" name="category" id="category" value={formData.category} onChange={handleChange} required className={inputStyles} />
            </div>
            <div>
              <label htmlFor="publishDate" className="block text-sm font-medium text-gray-700">Publish Date</label>
              <input type="date" name="publishDate" id="publishDate" value={formData.publishDate} onChange={handleChange} required className={inputStyles} />
            </div>
          </div>
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
            <select name="author" id="author" value={formData.author} onChange={handleChange} required className={inputStyles}>
              {doctors.map(doctor => (
                <option key={doctor.name} value={doctor.name}>{doctor.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image Index</label>
            <input type="number" name="image" id="image" value={formData.image} onChange={handleChange} required className={inputStyles} placeholder="e.g., 0" min="0" />
            {currentImageUrl && <img src={currentImageUrl} alt="Preview" className="mt-2 h-24 w-auto rounded" />}
          </div>
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">Excerpt</label>
            <textarea name="excerpt" id="excerpt" rows={3} value={formData.excerpt} onChange={handleChange} required className={inputStyles}></textarea>
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Full Content (HTML allowed)</label>
            <textarea name="content" id="content" rows={6} value={formData.content} onChange={handleChange} required className={inputStyles} placeholder="<p>Start your post here...</p>"></textarea>
          </div>
        </form>
        <div className="p-6 bg-gray-50 border-t flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-[#00B5A5] border border-transparent rounded-md shadow-sm hover:bg-[#0E2A47] focus:outline-none"
          >
            Save Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogFormModal;