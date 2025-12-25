import VideoForm from "../components/VideoForm";


export default function NewVideoPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold mb-8">Add New YouTube Video</h1>
      <VideoForm />
    </div>
  );
}