import React, { useState } from 'react';
import { Search, Send, Loader2, ThumbsUp } from 'lucide-react';

const CommentSection = () => {
  const [newComment, setNewComment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [likedComments, setLikedComments] = useState(new Set());
  
  const handlePost = async () => {
    if (!newComment.trim()) return;
    setIsPosting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setNewComment('');
    setIsPosting(false);
  };

  const handleLike = (commentId) => {
    setLikedComments(prev => {
      const newLikes = new Set(prev);
      if (newLikes.has(commentId)) {
        newLikes.delete(commentId);
      } else {
        newLikes.add(commentId);
      }
      return newLikes;
    });
  };

  const comments = [
    {
      id: 1,
      author: 'Ralph Edwards',
      date: 'Aug 19, 2021',
      text: 'In mauris porttitor tincidunt mauris massa sit lorem sed scelerisque. Fringilla pharetra vel massa enim sollicitudin cras. At pulvinar eget sociis adipiscing eget donec ultricies nibh tristique.',
      likes: 5,
      userAvatar: '/api/placeholder/40/40'
    },
    {
      id: 2,
      author: 'Ralph Edwards',
      date: 'Aug 19, 2021',
      text: 'In mauris porttitor tincidunt mauris massa sit lorem sed scelerisque. Fringilla pharetra vel massa enim sollicitudin cras. At pulvinar eget sociis adipiscing eget donec ultricies nibh tristique.',
      likes: 3,
      userAvatar: '/api/placeholder/40/40'
    },
    {
      id: 3,
      author: 'Ralph Edwards',
      date: 'Aug 19, 2021',
      text: 'In mauris porttitor tincidunt mauris massa sit lorem sed scelerisque. Fringilla pharetra vel massa enim sollicitudin cras. At pulvinar eget sociis adipiscing eget donec ultricies nibh tristique.',
      likes: 7,
      userAvatar: '/api/placeholder/40/40'
    }
  ];

  const primaryColor = '#F86D62';

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold" style={{ color: primaryColor }}>
          Comments
        </h2>
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search comments..."
            className="pl-10 pr-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:border-transparent"
            style={{ '--tw-ring-color': primaryColor }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-3 mb-8">
        <div className="w-10 h-10 rounded-full overflow-hidden shadow-md">
          <img src="/api/placeholder/40/40" alt="User avatar" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 flex bg-gray-50 rounded-full px-4 py-2 shadow-inner">
          <input 
            type="text" 
            placeholder="Add a comment"
            className="flex-1 bg-transparent border-none outline-none"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handlePost();
              }
            }}
          />
        </div>
        <button 
          onClick={handlePost}
          disabled={isPosting || !newComment.trim()}
          className={`px-6 py-2 rounded-full font-medium flex items-center gap-2 transition-all duration-200 transform hover:scale-105 active:scale-95 ${
            newComment.trim() 
              ? 'text-white shadow-lg hover:opacity-90'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          style={{ 
            backgroundColor: newComment.trim() ? primaryColor : undefined,
            boxShadow: newComment.trim() ? `0 4px 14px ${primaryColor}50` : undefined
          }}
        >
          {isPosting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <span>Post</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      <div className="space-y-6">
        {comments
          .filter(comment => 
            comment.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
            comment.author.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden shadow-md">
              <img src={comment.userAvatar} alt={`${comment.author} avatar`} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="bg-gray-50 rounded-2xl p-5 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-gray-900">{comment.author}</span>
                    <span className="text-sm text-gray-500">{comment.date}</span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {comment.text}
                </p>
                <div className="flex gap-6">
                  <button 
                    onClick={() => handleLike(comment.id)}
                    className="flex items-center gap-2 group transition-all duration-200"
                  >
                    <ThumbsUp
                      className={`w-5 h-5 transition-all duration-300 ${
                        likedComments.has(comment.id)
                          ? 'scale-110'
                          : 'group-hover:scale-110'
                      }`}
                      style={{ 
                        color: likedComments.has(comment.id) ? primaryColor : '#9CA3AF',
                        fill: likedComments.has(comment.id) ? primaryColor : 'none'
                      }}
                    />
                    <span 
                      className={`text-sm transition-colors ${
                        likedComments.has(comment.id) ? 'font-medium' : ''
                      }`}
                      style={{ 
                        color: likedComments.has(comment.id) ? primaryColor : '#9CA3AF'
                      }}
                    >
                      {comment.likes + (likedComments.has(comment.id) ? 1 : 0)}
                    </span>
                  </button>
                  <button 
                    onClick={() => handleLike(comment.id)}
                    className="flex items-center gap-2 group transition-all duration-200"
                  >
                    <ThumbsUp
                      className={`w-5 h-5 transition-all duration-300 ${
                        likedComments.has(comment.id)
                          ? 'scale-110'
                          : 'group-hover:scale-110'
                      }`}
                      style={{ 
                        color: likedComments.has(comment.id) ? primaryColor : '#9CA3AF',
                        fill: likedComments.has(comment.id) ? primaryColor : 'none'
                      }}
                    />
                    <span 
                      className={`text-sm transition-colors ${
                        likedComments.has(comment.id) ? 'font-medium' : ''
                      }`}
                      style={{ 
                        color: likedComments.has(comment.id) ? primaryColor : '#9CA3AF'
                      }}
                    >
                      {comment.likes + (likedComments.has(comment.id) ? 1 : 0)}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button 
          className="font-medium transition-colors hover:opacity-80"
          style={{ color: primaryColor }}
        >
          See 10 more comments
        </button>
      </div>
    </div>
  );
};

export default CommentSection;