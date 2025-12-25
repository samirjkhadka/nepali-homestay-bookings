// app/admin/listings/new/page.tsx
import ListingForm from "../components/ListingForm";

export default function NewListingPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold mb-8">Add New Homestay</h1>
      <ListingForm />
    </div>
  );
}