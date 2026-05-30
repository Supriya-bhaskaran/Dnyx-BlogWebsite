import { useState } from "react";
import API from "../services/api";

function CreateBlog() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    content: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/blogs", form);

    alert("Blog Created!");

    setForm({
      title: "",
      author: "",
      content: "",
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        Create Blog
      </h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />

        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
          rows="5"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Publish Blog
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;