"use client";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { blockDatesAction } from "./block-dates-action";

export default function HostCalendar({
  blockedDates, // now string[]
  listingIds,
}: {
  blockedDates: string[];
  listingIds: number[];
}) {
  const blockedDateObjects = blockedDates.map((d) => new Date(d));

  const handleDateToggle = async (selected: Date[] | undefined) => {
    const dates = selected?.map((d) => d.toISOString().split("T")[0]) || [];

    const formData = new FormData();
    dates.forEach((date) => formData.append("dates", date));
    listingIds.forEach((id) => formData.append("listingIds", id.toString()));

    await blockDatesAction(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability Calendar</CardTitle>
        <p className="text-sm text-muted-foreground">
          Click dates to block or unblock availability
        </p>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="multiple"
          selected={blockedDateObjects}
          onSelect={handleDateToggle}
          className="rounded-md border"
          disabled={(date) => date < new Date()}
        />
        <div className="mt-6 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary" />
            <span className="text-sm">Blocked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-muted" />
            <span className="text-sm">Available</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
