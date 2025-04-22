import type React from "react";
import { Button, Label, Input } from "@/components/ui";
import { ButtonsRow } from "./ButtonsRow";
import { defaultHeartRate } from "@/lib/globals";
import { NonEmptyNumberArray } from "@/types";

interface HeartRateControlsProps {
  heartRate: number;
  onHeartRateChange: (rate: number) => void;
  disabled: boolean;
}

export default function HeartRateControls({
  heartRate,
  onHeartRateChange,
  disabled,
}: HeartRateControlsProps) {
  const incrementButtons = [1, 10, 50] as NonEmptyNumberArray;
  const decrementButtons = [-1, -10, -50] as NonEmptyNumberArray;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);

    if (!isNaN(newValue)) {
      onHeartRateChange(newValue);
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);

    if (isNaN(newValue)) {
      onHeartRateChange(defaultHeartRate);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="heart-rate">Heart Rate (BPM)</Label>
        <Input
          id="heart-rate"
          type="number"
          min={26}
          max={250}
          value={heartRate}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="text-center"
        />
      </div>

      <div className="space-y-2">
        <Label>Increment / Decrement</Label>

        <div className="flex flex-col sm:flex-row justify-center gap-2 flex-nowrap">
          <ButtonsRow
            controlButtons={incrementButtons}
            onButtonClick={(value) => onHeartRateChange(heartRate + value)}
            disabled={disabled}
            className="flex-col sm:flex-row sm:items-center order-1 sm:order-3"
          />

          <Button
            disabled={disabled}
            onClick={() => onHeartRateChange(defaultHeartRate)}
            className="order-2"
          >
            Reset
          </Button>

          <ButtonsRow
            controlButtons={decrementButtons}
            onButtonClick={(value) => onHeartRateChange(heartRate + value)}
            disabled={disabled}
            className="flex-col sm:flex-row sm:items-center gap-2 order-3 sm:order-1"
          />
        </div>
      </div>
    </div>
  );
}
