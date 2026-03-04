import React from 'react';

const PostDetailPage: React.FC<{ postId?: string }> = ({ postId }) => {
  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-4">Blog Post: {postId}</h1>
      <p>Placeholder for Blog Post Detail Page</p>
    </div>
  );
};

export default PostDetailPage;
