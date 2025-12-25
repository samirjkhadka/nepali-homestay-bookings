// app/admin/listings/components/StatusToggle.tsx
"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { toggleListingStatus } from "@/server/actions/listings";

export default function StatusToggle({
  listingId,
  initialStatus,
}: {
  listingId: number;
  initialStatus: string;
}) {
  const [isEnabled, setIsEnabled] = useState(initialStatus === "approved");
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    await toggleListingStatus(listingId, initialStatus);
    setIsEnabled(!isEnabled);
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-4">
      <Switch
        checked={isEnabled}
        onCheckedChange={handleToggle}
        disabled={loading}
      />
      <span className="text-muted-foreground">
        {isEnabled ? "Enabled" : "Disabled"}
      </span>
    </div>
  );
}
