import React, { useState, useEffect, useContext } from 'react';
import * as blogService from '../../../lib/blogService';
import BlogFormModal from '../../BlogFormModal';
import { MasterSetupContext } from '../MasterSetupProvider';

const BlogManager: React.FC = () => {
  const { config } = useContext(MasterSetupContext);
  const [posts, setPosts] = useState<blogService.Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<blogService.Post | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const fetched = await blogService.fetchPosts();
    setPosts(fetched);
  };

  const openAddModal = () => {
    setEditingPost(null);
    setIsModalOpen(true);
  };

  const openEditModal = (post: blogService.Post) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await blogService.deletePost(id);
      loadPosts();
    }
  };

  const handleSave = async (postData: Omit<blogService.Post, 'id'> | blogService.Post) => {
    if ('id' in postData) {
      await blogService.updatePost(postData);
    } else {
      await blogService.addPost(postData);
    }
    loadPosts();
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Blog Posts Management</h3>
          <button
            onClick={openAddModal}
            className="px-4 py-2 text-sm font-medium text-white bg-[#00B5A5] rounded-md hover:bg-[#0E2A47] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B5A5]"
          >
            Add New Post
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Publish Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published By</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* Use direct URL if available, else fallback to config path */}
                    <img 
                        src={typeof post.image === 'string' && post.image.startsWith('http') ? post.image : (config.imagePaths?.blog?.[Number(post.image)] || '')} 
                        alt={post.title} 
                        className="w-16 h-10 object-cover rounded" 
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{post.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(post.publishDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button onClick={() => openEditModal(post)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                    <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <BlogFormModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          post={editingPost}
        />
      )}
    </>
  );
};

export default BlogManager;
