// app/listings/[id]/BookingWidget.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageCircle } from "lucide-react";

import { useEffect, useState } from "react";

import { useCurrency } from "../CurrencyProvider";


export default function BookingWidget({ listing }: { listing: any }) {
  const { currency, symbol } = useCurrency();
  const [displayPrice, setDisplayPrice] = useState(listing.price_npr);



  // Replace with real host phone when available
  const phoneNumber = "+977 9709072760"; // Central booking line
  const whatsappNumber = "+977 9709072760";
  const email = "book@nepalihomestaysbooking.com";

  return (
    <div className="bg-card border rounded-2xl p-8 shadow-xl sticky top-24">
      <div className="text-center mb-8">
        <p className="text-3xl font-bold mb-2">
          {symbol}
          {displayPrice}
        </p>
        <p className="text-lg text-muted-foreground">per night</p>

        {listing.instant_book && (
          <span className="inline-block mt-4 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            Instant Book Available
          </span>
        )}
      </div>

      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-4">
            Ready to book your stay?
          </h3>
          <p className="text-muted-foreground mb-6">
            Call or message us to confirm your dates and complete your booking
          </p>
        </div>

        <div className="space-y-4">
          <a href={`tel:${phoneNumber.replace(/[^0-9+]/g, "")}`}>
            <Button className="w-full" size="lg">
              <Phone className="w-5 h-5 mr-3" />
              Call to Book
              <span className="ml-2 text-sm font-normal opacity-80">
                {phoneNumber}
              </span>
            </Button>
          </a>

          <a
            href={`https://wa.me/${whatsappNumber.replace(
              /[^0-9+]/g,
              ""
            )}?text=Hi! I'm interested in booking ${encodeURIComponent(
              listing.title
            )}`}
          >
            <Button variant="outline" className="w-full" size="lg">
              <MessageCircle className="w-5 h-5 mr-3" />
              Message on WhatsApp
            </Button>
          </a>

          <a
            href={`mailto:${email}?subject=Booking Inquiry - ${encodeURIComponent(
              listing.title
            )}`}
          >
            <Button variant="outline" className="w-full" size="lg">
              <Mail className="w-5 h-5 mr-3" />
              Email Us
            </Button>
          </a>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Our team will help you confirm availability and complete your
          reservation
        </p>
      </div>
    </div>
  );
}
function convertPrice(price_npr: any, currency: string) {
  throw new Error("Function not implemented.");
}

