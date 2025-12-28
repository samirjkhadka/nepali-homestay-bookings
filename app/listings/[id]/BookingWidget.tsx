// app/listings/[id]/BookingWidget.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { convertPrice } from "@/server/actions/currency";
import { useCurrency } from "../../CurrencyProvider";

export default function BookingWidget({ listing }: { listing: any }) {
  const { currency, symbol } = useCurrency();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [total, setTotal] = useState(0);
  const [nightPrice, setNightPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  // Convert night price whenever currency or listing changes
  useEffect(() => {
    convertPrice(listing.price_npr, currency).then((converted) => {
      setNightPrice(Math.round(converted));
    });
  }, [currency, listing.price_npr]);

  // Calculate total when dates change
  useEffect(() => {
    if (checkIn && checkOut && checkIn < checkOut) {
      const nights = Math.ceil(
        (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      if (nights > 0) {
        convertPrice(listing.price_npr * nights, currency).then((converted) => {
          setTotal(Math.round(converted));
        });
      } else {
        setTotal(0);
      }
    } else {
      setTotal(0);
    }
  }, [checkIn, checkOut, currency, listing.price_npr]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (total === 0 || loading) return;

    setLoading(true);

    try {
      const res = await fetch("/api/bookings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId: listing.id,
          checkIn,
          checkOut,
          guests,
          totalPriceNPR: total,
        }),
      });

      const data = await res.json();

      if (data.onepgUrl) {
        window.location.href = data.onepgUrl;
      } else {
        alert("Payment initiation failed");
      }
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment initiation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border rounded-2xl p-6 shadow-xl sticky top-24"
    >
      <div className="flex justify-between items-baseline mb-6">
        <div>
          <span className="text-3xl font-bold">
            {symbol}
            {nightPrice}
          </span>
          <span className="text-lg text-muted-foreground"> / night</span>
        </div>
        {listing.instant_book && (
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Instant Book
          </span>
        )}
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Check-in</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            required
            className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Check-out</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            min={checkIn || new Date().toISOString().split("T")[0]}
            required
            className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Guests</label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            required
            className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {Array.from({ length: listing.max_guests }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} guest{i > 0 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>
      </div>

      {total > 0 && (
        <div className="border-t pt-4 mb-6">
          <div className="flex justify-between text-lg font-semibold">
            <span>
              Total (
              {Math.ceil(
                (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
                  (1000 * 60 * 60 * 24)
              )}{" "}
              nights)
            </span>
            <span>
              {symbol}
              {total}
            </span>
          </div>
        </div>
      )}

      <Button
        type="submit"
        className="w-full py-6 text-lg font-semibold"
        size="lg"
        disabled={total === 0 || loading}
      >
        {loading
          ? "Processing..."
          : listing.instant_book
          ? "Book Instantly"
          : "Request to Book"}
      </Button>

      <p className="text-center text-sm text-muted-foreground mt-4">
        You won&apos;t be charged yet
      </p>
    </form>
  );
}
