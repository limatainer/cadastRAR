import { Link, useNavigate } from 'react-router-dom';

import { useAuthValue } from '../contexts/AuthContext';

import { useFetchDocuments } from '../hooks/useFetchDocuments';
import { useDeleteDocument } from '../hooks/useDeleteDocument';
import { useState } from 'react';

export default function Submissions() {
  const { user } = useAuthValue();
  const uid = user.uid;
  const {
    documents: posts,
    error,
    loading,
  } = useFetchDocuments('posts', null, uid);
  const { deleteDocument } = useDeleteDocument('posts');

  const buttonStyle =
    'inline-flex justify-center items-center py-2 px-4 m-2 text-base font-medium text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800';
  const textStyle =
    'mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400';

  const navigate = useNavigate();

  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center text-center bg-gray-100 dark:bg-gray-900 p-4">
      <h2 className="mb-6 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
        Dashboard
      </h2>
      {/* SEARCH */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search by tag..."
          className="m-4 p-2 rounded-lg "
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={buttonStyle}>Pesquisar</button>
      </form>

      <p className={textStyle}>All users submitted by you:</p>
      {/* Handle loading and error states */}
      {loading && <p className={textStyle}>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display a message if no posts are found */}
      {posts && posts.length === 0 && (
        <div className="flex flex-col items-center">
          <p className={textStyle}>No users found</p>
          <Link to="/posts/create" className={buttonStyle}>
            Register new user
          </Link>
        </div>
      )}

      {/* Display the posts */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts &&
          posts.map((post) => (
            <div
              className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
              key={post.id}
            >
              <p className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {post.title}
              </p>
              <div className="flex space-x-2">
                <Link to={`/posts/${post.id}`} className={buttonStyle}>
                  View
                </Link>
                <Link to={`/posts/edit/${post.id}`} className={buttonStyle}>
                  Edit
                </Link>
                <button
                  onClick={() => deleteDocument(post.id)}
                  className={buttonStyle}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
