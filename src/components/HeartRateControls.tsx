import type React from "react";

import { useState } from "react";
import { Button, Label, Input } from "@/components/ui";
import { defaultHeartRate } from "@/lib/globals";

interface HeartRateControlsProps {
  heartRate: number;
  setHeartRate: (rate: number) => void;
  disabled: boolean;
}

export default function HeartRateControls({
  heartRate,
  setHeartRate,
  disabled,
}: HeartRateControlsProps) {
  const [inputValue, setInputValue] = useState(heartRate.toString());

  const updateHeartRate = (newRate: number) => {
    const clampedRate = Math.min(Math.max(newRate, 26), 250);

    setHeartRate(clampedRate);
    setInputValue(clampedRate.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const newRate = Number.parseInt(inputValue, 10);

    if (!isNaN(newRate)) {
      updateHeartRate(newRate);
    } else {
      setInputValue(heartRate.toString());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleInputBlur();
    }
  };

  const incrementButtons = [1, 10, 50];
  const decrementButtons = [-1, -10, -50];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="heart-rate">Heart Rate (BPM)</Label>
        <Input
          id="heart-rate"
          type="number"
          min={26}
          max={250}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="text-center"
        />
      </div>

      <div className="space-y-2">
        <Label>Increment / Decrement</Label>

        <div className="flex flex-col sm:flex-row justify-center flex-wrap gap-2">
          <div className="flex flex-col sm:flex-row gap-2 order-1 sm:order-3">
            {incrementButtons.map((value) => (
              <Button
                key={`inc-${value}`}
                variant="outline"
                size="sm"
                onClick={() => updateHeartRate(heartRate + value)}
                disabled={disabled}
              >
                +{value}
              </Button>
            ))}
          </div>

          <Button
            disabled={disabled}
            onClick={() => updateHeartRate(defaultHeartRate)}
            className="order-2"
          >
            Reset
          </Button>

          <div className="flex flex-col sm:flex-row gap-2 order-3 sm:order-1">
            {decrementButtons.map((value) => (
              <Button
                key={`dec-${value}`}
                variant="outline"
                size="sm"
                onClick={() => updateHeartRate(heartRate + value)}
                disabled={disabled}
              >
                {value}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
