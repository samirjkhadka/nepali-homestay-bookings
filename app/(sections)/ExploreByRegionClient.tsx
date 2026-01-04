"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, ArrowRight, Home, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  groupedData: Record<string, Record<string, any[]>>;
  availableProvinces: string[];
};

const PROVINCE_IMAGES: Record<string, string> = {
  "Koshi":
    "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800",
  "Madhesh":
    "https://images.pexels.com/photos/2104118/pexels-photo-2104118.jpeg?auto=compress&cs=tinysrgb&w=800",
  "Bagmati":
    "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800",
  "Gandaki":
    "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800",
  "Lumbini":
    "https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=800",
  "Karnali":
    "https://images.pexels.com/photos/3011630/pexels-photo-3011630.jpeg?auto=compress&cs=tinysrgb&w=800",
  "Sudurpashchim":
    "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=800",
};

export default function ExploreByRegionClient({
  groupedData,
  availableProvinces,
}: Props) {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (selectedProvince) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [selectedProvince]);

  const provinces = availableProvinces.map((name) => ({
    name,
    image: PROVINCE_IMAGES[name] || "/placeholder-region.jpg",
    count: Object.values(groupedData[name] || {}).reduce(
      (acc, l) => acc + l.length,
      0
    ),
  }));

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
            Explore by Region
          </h2>
          <p className="text-lg text-gray-600">
            Click a province to discover local districts and stays.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {provinces.map((province, i) => (
            <motion.div
              key={province.name}
              onClick={() => setSelectedProvince(province.name)}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative h-105 rounded-[2rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <Image
                src={province.image}
                alt={province.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-transparent" />

              <div className="absolute top-6 right-6 backdrop-blur-md bg-white/20 border border-white/20 text-white rounded-2xl px-4 py-2 text-sm font-bold">
                {province.count} Stays
              </div>

              <div className="absolute bottom-10 left-8 right-8 text-white">
                <h3 className="text-3xl font-bold tracking-tight mb-2">
                  {province.name}
                </h3>
                <span className="inline-flex items-center gap-2 text-sm font-medium bg-primary px-4 py-2 rounded-xl text-white">
                  Explore Districts <ChevronRight className="h-4 w-4" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Responsive Drawer/Bottom-Sheet */}
        <AnimatePresence>
          {selectedProvince && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProvince(null)}
                className="fixed inset-0 bg-black/40 backdrop-blur-md z-100"
              />

              {/* Responsive Container */}
              <motion.div
                initial={{ y: "100%", x: 0 }} // Mobile default
                animate={{
                  y: 0,
                  x: 0,
                  transition: { type: "spring", damping: 30, stiffness: 300 },
                }}
                exit={{ y: "100%" }}
                className="fixed bottom-0 left-0 right-0 h-[85vh] lg:h-full lg:left-auto lg:right-0 lg:top-0 lg:w-112.5 bg-white z-101 shadow-2xl rounded-t-[2.5rem] lg:rounded-l-[2.5rem] lg:rounded-t-none flex flex-col"
              >
                {/* Drawer Header */}
                <div className="p-8 pb-4 border-b border-gray-50 flex items-center justify-between">
                  <div>
                    <h3 className="text-3xl font-extrabold text-gray-900">
                      {selectedProvince}
                    </h3>
                    <p className="text-gray-500 font-medium">
                      Available Districts
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedProvince(null)}
                    className="h-12 w-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* District List */}
                <div className="flex-1 overflow-y-auto p-8 pt-6 space-y-4 no-scrollbar">
                  {Object.entries(groupedData[selectedProvince] || {}).map(
                    ([district, listings], idx) => (
                      <motion.div
                        key={district}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + idx * 0.05 }}
                      >
                        <Link
                          href={`/search?province=${encodeURIComponent(
                            selectedProvince
                          )}&district=${encodeURIComponent(district)}`}
                          className="group flex items-center justify-between p-5 rounded-[1.5rem] bg-gray-50 hover:bg-primary transition-all duration-300"
                        >
                          <div className="flex items-center gap-5">
                            <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center group-hover:scale-90 transition-transform">
                              <Home className="h-6 w-6 text-primary group-hover:text-primary-dark" />
                            </div>
                            <div>
                              <span className="font-bold text-gray-900 group-hover:text-white text-lg block">
                                {district}
                              </span>
                              <span className="text-sm text-gray-500 group-hover:text-white/80">
                                {listings.length} Homestays
                              </span>
                            </div>
                          </div>
                          <ArrowRight className="h-6 w-6 text-gray-300 group-hover:text-white group-hover:translate-x-2 transition-all" />
                        </Link>
                      </motion.div>
                    )
                  )}
                </div>

                {/* Footer Action */}
                <div className="p-8 border-t border-gray-50 bg-gray-50/50">
                  <Link
                    href={`/search?province=${encodeURIComponent(
                      selectedProvince
                    )}`}
                    className="flex items-center justify-center gap-3 w-full py-5 bg-primary text-white rounded-2xl font-bold hover:bg-primary transition-colors text-lg"
                  >
                    Browse All {selectedProvince} Stays
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
