// app/listings/[id]/BookingWidget.tsx
"use client";

import { useState, useEffect } from "react";

import { convertPrice } from "@/server/actions/currency";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { useCurrency } from "../../CurrencyProvider";

export default function BookingWidget({ listing }: { listing: any }) {
  const { currency, symbol } = useCurrency();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (checkIn && checkOut && checkIn < checkOut) {
      const nights = Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24));
      if (nights > 0) {
        convertPrice(listing.priceNPR * nights, currency).then((converted) => {
          setTotal(Math.round(converted));
        });
      }
    } else {
      setTotal(0);
    }
  }, [checkIn, checkOut, currency, listing.priceNPR]);

  const nightPrice = Math.round(listing.priceNPR * (currency === "NPR" ? 1 : 0.0075)); // rough conversion until action

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-xl">
      <div className="flex justify-between items-baseline mb-6">
        <div>
          <span className="text-3xl font-bold">{symbol}{nightPrice}</span>
          <span className="text-lg text-muted-foreground"> / night</span>
        </div>
        {listing.instantBook && (
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
            className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Guests</label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {Array.from({ length: listing.maxGuests }, (_, i) => (
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
            <span>Total</span>
            <span>{symbol}{total}</span>
          </div>
        </div>
      )}

      <Link href="/book/success">
        <Button className="w-full py-6 text-lg font-semibold" size="lg">
          {listing.instantBook ? "Book Instantly" : "Request to Book"}
        </Button>
      </Link>

      <p className="text-center text-sm text-muted-foreground mt-4">
        You won&apos;t be charged yet
      </p>
    </div>
  );
}