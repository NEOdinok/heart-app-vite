"use client";
import { cn } from "@/lib/utils";

interface HeartAnimationProps {
  heartRate: number;
}

export default function HeartAnimation({ heartRate }: HeartAnimationProps) {
  // Determine heart color based on heart rate
  const getHeartColor = () => {
    if (heartRate < 111) return "text-green-500";
    if (heartRate <= 180) return "text-yellow-500";
    return "text-red-500";
  };

  // Calculate animation duration based on heart rate
  const animationDuration = 60 / heartRate;

  return (
    <div className="relative flex items-center justify-center text-9xl transition-colors duration-300">
      {/* Heart itself */}
      <div
        // className={cn(getHeartColor())}
        style={{
          animation: `pulse ${animationDuration}s ease-in-out infinite`,
        }}
      >
        ❤️
      </div>

      {/* Centered text over heart */}
      <div
        className={cn(
          "absolute text-center text-2xl font-bold text-black",
          getHeartColor()
        )}
      >
        {heartRate} BPM
      </div>
    </div>
  );
}
