// app/admin/listings/components/ListingForm.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import Link from "next/link";

import {
  PROVINCES,
  AMENITIES,
  BADGES,
  DISTRICTS,
  MUNICIPALITIES,
} from "@/lib/constants";
import { Host, ListingFormProps } from "@/types/listing";
import { Users } from "lucide-react";

export default function ListingForm({ initialData }: ListingFormProps) {
  const isEdit = !!initialData?.id;

  // Basic fields
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [homestayType, setHomestayType] = useState<"individual" | "community">(
    (initialData?.homestay_type as "individual" | "community") || "individual"
  );
  const [numberOfHouses, setNumberOfHouses] = useState(
    initialData?.number_of_houses?.toString() || ""
  );

  // Location cascade
  const [province, setProvince] = useState(initialData?.province || "");
  const [district, setDistrict] = useState(initialData?.district || "");
  const [municipality, setMunicipality] = useState(
    initialData?.municipality || ""
  );

  const [wardNo, setWardNo] = useState(initialData?.ward_no || "");
  const [street, setStreet] = useState(initialData?.street || "");
  const [wayToGetThere, setWayToGetThere] = useState(
    (initialData?.way_to_get_there || []).join("\n")
  );

  // Capacity & price
  const [priceNPR, setPriceNPR] = useState(
    initialData?.price_npr?.toString() || ""
  );
  const [maxGuests, setMaxGuests] = useState(
    initialData?.max_guests?.toString() || ""
  );
  const [bedrooms, setBedrooms] = useState(
    initialData?.bedrooms?.toString() || ""
  );
  const [bathrooms, setBathrooms] = useState(
    initialData?.bathrooms?.toString() || ""
  );

  // Amenities & images
  const [amenities, setAmenities] = useState<string[]>(
    initialData?.amenities || []
  );
  const [images, setImages] = useState<string[]>(
    Array.isArray(initialData?.images) ? initialData?.images : []
  );

  // Hosts
  const [primaryHostIndex, setPrimaryHostIndex] = useState(0);
  const [hosts, setHosts] = useState<Host[]>(
    initialData?.hosts || [
      {
        name: "",
        avatar: "",
        role: "Owner",
        bio: "",
        languages: [],
        badges: [],
        email: "",
        phone: "",
        password: "",
      },
    ]
  );

  const [loading, setLoading] = useState(false);

  // IMPORTANT: sync initialData to state when it changes (edit mode)
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setHomestayType(initialData.homestay_type as "individual" | "community");
      setNumberOfHouses(initialData.number_of_houses?.toString() || "");
      setProvince(initialData.province || "");
      setDistrict(initialData.district || "");
      setMunicipality(initialData.municipality || "");
      setWardNo(initialData.ward_no || "");
      setStreet(initialData.street || "");
      setWayToGetThere((initialData.way_to_get_there || []).join("\n"));
      setPriceNPR(initialData.price_npr?.toString() || "");
      setMaxGuests(initialData.max_guests?.toString() || "");
      setBedrooms(initialData.bedrooms?.toString() || "");
      setBathrooms(initialData.bathrooms?.toString() || "");
      setAmenities(initialData.amenities || []);
      setImages(initialData.images || []);
      setHosts(
        initialData.hosts?.length > 0
          ? initialData.hosts
          : [
              {
                name: "",
                avatar: "",
                role: "Owner",
                bio: "",
                languages: [],
                badges: [],
                email: "",
                phone: "",
                password: "",
              },
            ]
      );
    }
  }, [initialData]);

  const toggleAmenity = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const updateHost = (index: number, field: keyof Host, value: any) => {
    setHosts((prev) => {
      const newHosts = [...prev];
      if (field === "languages" || field === "badges") {
        newHosts[index][field] =
          typeof value === "string"
            ? value.split(",").map((v: string) => v.trim())
            : value;
      } else {
        (newHosts[index] as any)[field] = value;
      }
      return newHosts;
    });
  };

  const addHost = () => {
    setHosts((prev) => [
      ...prev,
      {
        name: "",
        avatar: "",
        role: "Co-Host",
        bio: "",
        languages: [],
        badges: [],
        email: "",
        phone: "",
        password: "",
      },
    ]);
  };

  const removeHost = (index: number) => {
    if (hosts.length > 1) {
      setHosts((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      alert("Please upload at least one image");
      return;
    }
    if (
      homestayType === "community" &&
      (!numberOfHouses || Number(numberOfHouses) < 2)
    ) {
      alert("For community homestay, number of houses must be 2 or more");
      return;
    }

    setLoading(true);

    const formData = {
      title,
      description,
      homestay_type: homestayType,
      number_of_houses:
        homestayType === "community" ? Number(numberOfHouses) : null,
      location: municipality
        ? `${municipality}, ${district}`
        : district || province,
      province,
      price_npr: Number(priceNPR),
      max_guests: Number(maxGuests),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      amenities,
      images,
      hosts,
      ward_no: wardNo,
      street,
      way_to_get_there: wayToGetThere.split("\n").filter((line) => line.trim()),
      is_verified: true,
      instant_book: false,
      status: "approved",
      primary_host_index: primaryHostIndex
    };

    const method = initialData?.id ? "PUT" : "POST";
    const url = initialData?.id
      ? `/api/listings/${initialData.id}`
      : "/api/listings";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert(
          isEdit
            ? "Listing updated successfully!"
            : "Listing created successfully!"
        );
        window.location.href = "/admin/listings";
      } else {
        const error = await res.json();
        alert("Failed to save listing: " + (error.error || "Unknown error"));
      }
    } catch (error) {
      console.error(error);
      alert("Network error — please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl space-y-12">
      {/* Homestay Type */}
      <section>
        <h2 className="text-2xl font-semibold mb-8">Homestay Type</h2>
        <div className="space-y-2">
          <Label>Homestay Type</Label>
          <Select
            value={homestayType}
            onValueChange={(value) => {
              if (value === "individual" || value === "community") {
                setHomestayType(value);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="individual">Individual Homestay</SelectItem>
              <SelectItem value="community">Community Homestay</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {homestayType === "community" && (
          <div className="space-y-2 mt-6">
            <Label htmlFor="numberOfHouses">
              Number of Houses in Community
            </Label>
            <Input
              id="numberOfHouses"
              type="number"
              min="2"
              value={numberOfHouses}
              onChange={(e) => setNumberOfHouses(e.target.value)}
              required
            />
          </div>
        )}
      </section>

      {/* Basic Info */}
      <section>
        <h2 className="text-2xl font-semibold mb-8">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price per night (NPR)</Label>
            <Input
              id="price"
              type="number"
              value={priceNPR}
              onChange={(e) => setPriceNPR(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="province">Province</Label>
            <Select
              value={province}
              onValueChange={(value) => {
                setProvince(value);
                setDistrict("");
                setMunicipality("");
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select province" />
              </SelectTrigger>
              <SelectContent>
                {PROVINCES.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="district">District</Label>
            <Select
              value={district}
              onValueChange={(value) => {
                setDistrict(value);
                setMunicipality("");
              }}
              disabled={!province}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select district" />
              </SelectTrigger>
              <SelectContent>
                {(DISTRICTS[province] || []).map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="municipality">Municipality</Label>
            <Select
              value={municipality}
              onValueChange={setMunicipality}
              disabled={!district}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select municipality" />
              </SelectTrigger>
              <SelectContent>
                {(MUNICIPALITIES[district] || []).map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ward">Ward No</Label>
            <Input
              id="ward"
              value={wardNo}
              onChange={(e) => setWardNo(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="street">Street / Tole</Label>
            <Input
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxGuests">Max Guests</Label>
            <Input
              id="maxGuests"
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input
              id="bedrooms"
              type="number"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input
              id="bathrooms"
              type="number"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              required
            />
          </div>
        </div>
      </section>

      {/* Description */}
      <section>
        <h2 className="text-2xl font-semibold mb-8">Description</h2>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            rows={8}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell guests about your homestay..."
            required
          />
        </div>
      </section>

      {/* Way to Get There */}
      <section>
        <h2 className="text-2xl font-semibold mb-8">Way to Get There</h2>
        <div className="space-y-2">
          <Label htmlFor="way">Directions (one bullet per line)</Label>
          <Textarea
            id="way"
            rows={6}
            value={wayToGetThere}
            onChange={(e) => setWayToGetThere(e.target.value)}
            placeholder="From Tribhuvan Airport:\n- Take a taxi (30 min)\n- Ask for Bhaktapur Durbar Square..."
          />
        </div>
      </section>

      {/* Amenities */}
      <section>
        <h2 className="text-2xl font-semibold mb-8">Amenities</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {AMENITIES.map((amenity) => (
            <label
              key={amenity}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={amenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span>{amenity}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Images */}
      <section>
        <h2 className="text-2xl font-semibold mb-8">
          Images (at least 1 required)
        </h2>
        <CldUploadButton
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          onSuccess={(result: any) => {
            setImages((prev) => [...prev, result.info.secure_url]);
          }}
        >
          <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-6 py-2 cursor-pointer">
            Upload Images
          </div>
        </CldUploadButton>

        {images && images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {images.map((url, i) => (
              <div key={i} className="relative h-64 rounded-xl overflow-hidden">
                <Image
                  src={url}
                  alt={`Image ${i + 1}`}
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() =>
                    setImages((prev) => prev.filter((_, index) => index !== i))
                  }
                  className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Hosts */}
      <section>
        <h2 className="text-2xl font-semibold mb-8">Hosts</h2>

        {/* Primary Host Selection (only if multiple hosts) */}
        {hosts.length > 1 && (
          <div className="mb-8 p-6 bg-primary/5 border border-primary/20 rounded-xl">
            <Label className="text-lg font-medium mb-4 block">
              Primary Host <span className="text-destructive">*</span>
            </Label>
            <Select
              value={primaryHostIndex.toString()}
              onValueChange={(v) => setPrimaryHostIndex(Number(v))}
            >
              <SelectTrigger className="w-full max-w-md">
                <SelectValue placeholder="Select the primary contact host" />
              </SelectTrigger>
              <SelectContent>
                {hosts.map((host, i) => (
                  <SelectItem key={i} value={i.toString()}>
                    {host.name || `Host ${i + 1}`}{" "}
                    {i === primaryHostIndex && "(Current Primary)"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground mt-2">
              The primary host will receive notifications and login access
            </p>
          </div>
        )}

        {hosts.map((host, index) => (
          <div key={index} className="bg-card border rounded-xl p-8 mb-8">
            {hosts.length === 1 && (
              <div className="mb-4 inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                <Users className="w-4 h-4" />
                Primary Host (only one)
              </div>
            )}
            {hosts.length > 1 && index === primaryHostIndex && (
              <div className="mb-4 inline-flex items-center gap-2 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                Primary Host
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label>Name *</Label>
                <Input
                  value={host.name}
                  onChange={(e) => updateHost(index, "name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Email (for login) *</Label>
                <Input
                  type="email"
                  value={host.email || ""}
                  onChange={(e) => updateHost(index, "email", e.target.value)}
                  placeholder="host@example.com"
                  required={index === primaryHostIndex || hosts.length === 1}
                />
              </div>

              <div className="space-y-2">
                <Label>Phone (optional)</Label>
                <Input
                  type="tel"
                  value={host.phone || ""}
                  onChange={(e) => updateHost(index, "phone", e.target.value)}
                  placeholder="+977 98xxxxxxxx"
                />
              </div>

              <div className="space-y-2">
                <Label>Role</Label>
                <Input
                  value={host.role}
                  onChange={(e) => updateHost(index, "role", e.target.value)}
                  placeholder="Owner, Manager, etc."
                />
              </div>

              <div className="space-y-2">
                <Label>Host Photo</Label>
                <CldUploadButton
                  uploadPreset={
                    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                  }
                  onSuccess={(result: any) => {
                    updateHost(index, "avatar", result.info.secure_url);
                  }}
                >
                  <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 cursor-pointer">
                    Upload Host Photo
                  </div>
                </CldUploadButton>

                {host.avatar && (
                  <div className="mt-4 relative h-48 w-48 rounded-xl overflow-hidden">
                    <Image
                      src={host.avatar}
                      alt={host.name || "Host"}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => updateHost(index, "avatar", "")}
                      className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Languages (comma separated)</Label>
                <Input
                  value={host.languages.join(", ")}
                  onChange={(e) =>
                    updateHost(
                      index,
                      "languages",
                      e.target.value.split(",").map((l) => l.trim())
                    )
                  }
                  placeholder="English, Nepali, Hindi"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Bio</Label>
                <Textarea
                  rows={4}
                  value={host.bio}
                  onChange={(e) => updateHost(index, "bio", e.target.value)}
                  placeholder="Tell guests about this host..."
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Badges</Label>
                <div className="flex flex-wrap gap-2">
                  {BADGES.map((badge) => (
                    <Button
                      key={badge}
                      type="button"
                      variant={
                        host.badges.includes(badge) ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => {
                        const newBadges = host.badges.includes(badge)
                          ? host.badges.filter((b) => b !== badge)
                          : [...host.badges, badge];
                        updateHost(index, "badges", newBadges);
                      }}
                    >
                      {badge}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {hosts.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeHost(index)}
                className="mt-6"
              >
                Remove Host
              </Button>
            )}
          </div>
        ))}

        <Button type="button" onClick={addHost} variant="outline">
          Add Another Host
        </Button>
      </section>

      {/* Submit */}
      <div className="flex gap-6 pt-12 border-t">
        <Button
          type="submit"
          size="lg"
          disabled={loading || images.length === 0}
        >
          {loading ? "Creating..." : "Create Listing"}
        </Button>
        <Button type="button" variant="outline" asChild>
          <Link href="/admin/listings">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
