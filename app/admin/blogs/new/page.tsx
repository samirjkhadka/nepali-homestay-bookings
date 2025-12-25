// app/admin/blogs/new/page.tsx
import BlogForm from "../components/BlogForm";

export default function NewBlogPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold mb-8">Add New Blog Post</h1>
      <BlogForm />
    </div>
  );
}
