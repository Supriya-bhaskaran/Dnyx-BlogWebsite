import { useEffect, useState } from "react";
import API from "../services/api";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [editForm, setEditForm] = useState({
    title: "",
    author: "",
    content: "",
  });

  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    content: "",
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blogs");
      setBlogs(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createBlog = async () => {
    try {
      await API.post("/blogs", newBlog);

      alert("Blog Created!");

      setNewBlog({
        title: "",
        author: "",
        content: "",
      });

      fetchBlogs();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await API.delete(`/blogs/${id}`);
      fetchBlogs();
    } catch (error) {
      console.error(error);
    }
  };

  const editBlog = (blog) => {
    setEditingId(blog._id);

    setEditForm({
      title: blog.title,
      author: blog.author,
      content: blog.content,
    });
  };

  const updateBlog = async () => {
    try {
      await API.put(`/blogs/${editingId}`, editForm);

      alert("Blog Updated!");

      setEditingId(null);
      fetchBlogs();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-purple-700 p-8">
      <div className="bg-purple-900 text-white rounded-xl shadow-lg p-6 mb-8">
        <h1 className="text-4xl font-bold text-center">
          BlogSphere
        </h1>

        <p className="text-center mt-2 text-purple-200">
          Share your thoughts with the world
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Create Blog
        </h2>

        <input
          type="text"
          placeholder="Blog Title"
          value={newBlog.title}
          onChange={(e) =>
            setNewBlog({
              ...newBlog,
              title: e.target.value,
            })
          }
          className="border p-3 w-full mb-3 rounded"
        />

        <input
          type="text"
          placeholder="Author Name"
          value={newBlog.author}
          onChange={(e) =>
            setNewBlog({
              ...newBlog,
              author: e.target.value,
            })
          }
          className="border p-3 w-full mb-3 rounded"
        />

        <textarea
          placeholder="Write your blog..."
          value={newBlog.content}
          onChange={(e) =>
            setNewBlog({
              ...newBlog,
              content: e.target.value,
            })
          }
          className="border p-3 w-full mb-3 rounded"
          rows="5"
        />

        <button
          onClick={createBlog}
          className="bg-purple-700 text-white px-5 py-2 rounded hover:bg-purple-800"
        >
          Create Blog
        </button>
      </div>

      {editingId && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Edit Blog
          </h2>

          <input
            type="text"
            value={editForm.title}
            onChange={(e) =>
              setEditForm({
                ...editForm,
                title: e.target.value,
              })
            }
            className="border p-3 w-full mb-3 rounded"
          />

          <input
            type="text"
            value={editForm.author}
            onChange={(e) =>
              setEditForm({
                ...editForm,
                author: e.target.value,
              })
            }
            className="border p-3 w-full mb-3 rounded"
          />

          <textarea
            value={editForm.content}
            onChange={(e) =>
              setEditForm({
                ...editForm,
                content: e.target.value,
              })
            }
            className="border p-3 w-full mb-3 rounded"
            rows="5"
          />

          <button
            onClick={updateBlog}
            className="bg-green-600 text-white px-5 py-2 rounded"
          >
            Save Changes
          </button>
        </div>
      )}

      <h2 className="text-3xl font-bold text-white mb-4">
        Latest Blogs
      </h2>

      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="bg-white rounded-xl shadow-lg p-6 mb-5"
        >
          <div className="mb-4">
            <button
              onClick={() => editBlog(blog)}
              className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
            >
              Edit
            </button>

            <button
              onClick={() => deleteBlog(blog._id)}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>

          <h3 className="text-2xl font-bold">
            {blog.title}
          </h3>

          <p className="text-gray-500">
            By {blog.author}
          </p>

          <p className="mt-3">
            {blog.content}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Home;