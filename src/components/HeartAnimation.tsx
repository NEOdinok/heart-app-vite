import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { IconHeart } from "@/assets";
import { lowHeartRateThreshold, highHeartRateThreshold } from "@/lib/globals";

interface HeartAnimationProps {
  heartRate: number;
}

export default function HeartAnimation({ heartRate }: HeartAnimationProps) {
  const getHeartColor = () => {
    if (heartRate < lowHeartRateThreshold) return "text-green-500 ";
    if (heartRate <= highHeartRateThreshold) return "text-yellow-500 ";
    return "text-red-500";
  };

  const animationDuration = useMemo(() => 60 / heartRate, [heartRate]);

  return (
    <div className="relative flex items-center justify-center text-9xl transition-colors duration-300">
      <div
        style={{
          animation: `pulse ${animationDuration}s ease-in-out infinite`,
        }}
      >
        <IconHeart
          className={cn("w-32 h-32", getHeartColor())}
          style={{
            animation: `pulse ${animationDuration}s ease-in-out infinite`,
          }}
        />
      </div>

      <div className={cn("absolute text-center text-2xl font-bold text-white")}>
        {heartRate} BPM
      </div>
    </div>
  );
}
