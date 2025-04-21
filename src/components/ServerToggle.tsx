"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface ServerToggleProps {
  isEnabled: boolean;
  onToggle: () => void;
}

export default function ServerToggle({
  isEnabled,
  onToggle,
}: ServerToggleProps) {
  return (
    <div className="flex items-center justify-between">
      <Label htmlFor="server-mode" className="font-medium">
        Server Heart Rate
      </Label>
      <Switch id="server-mode" checked={isEnabled} onCheckedChange={onToggle} />
    </div>
  );
}
