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

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-6">
        MERN Blog Website
      </h1>

      <div className="border p-4 rounded mb-6">
        <h2 className="text-2xl font-bold mb-3">
          Create Blog
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={newBlog.title}
          onChange={(e) =>
            setNewBlog({ ...newBlog, title: e.target.value })
          }
          className="border p-2 w-full mb-2"
        />

        <input
          type="text"
          placeholder="Author"
          value={newBlog.author}
          onChange={(e) =>
            setNewBlog({ ...newBlog, author: e.target.value })
          }
          className="border p-2 w-full mb-2"
        />

        <textarea
          placeholder="Content"
          value={newBlog.content}
          onChange={(e) =>
            setNewBlog({ ...newBlog, content: e.target.value })
          }
          className="border p-2 w-full mb-2"
          rows="4"
        />

        <button
          onClick={createBlog}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Blog
        </button>
      </div>

      {editingId && (
        <div className="border p-4 rounded mb-6">
          <h2 className="text-2xl font-bold mb-3">
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
            className="border p-2 w-full mb-2"
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
            className="border p-2 w-full mb-2"
          />

          <textarea
            value={editForm.content}
            onChange={(e) =>
              setEditForm({
                ...editForm,
                content: e.target.value,
              })
            }
            className="border p-2 w-full mb-2"
            rows="4"
          />

          <button
            onClick={updateBlog}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </div>
      )}

      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="border rounded-lg p-4 mb-4 shadow"
        >

          <button
            onClick={() => deleteBlog(blog._id)}
            className="bg-red-600 text-white px-4 py-2 rounded mb-2"
          >
            DELETE BLOG
          </button>

          <button
            onClick={() => editBlog(blog)}
            className="bg-yellow-500 text-white px-4 py-2 rounded mb-2 ml-2"
          >
            EDIT BLOG
          </button>

          <h2 className="text-2xl font-semibold">
            {blog.title}
          </h2>

          <p className="text-gray-600">
            By {blog.author}
          </p>

          <p className="mt-2">
            {blog.content}
          </p>

        </div>
      ))}

    </div>
  );
}

export default Home;