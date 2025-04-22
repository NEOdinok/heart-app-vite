import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { IconHeart } from "@/assets";
import { lowHeartRateThreshold, highHeartRateThreshold } from "@/lib/globals";
import { getValidHeartRate } from "@/lib/utils";

interface HeartAnimationProps {
  heartRate: number;
}

const getHeartColor = (heartRate: number) => {
  if (!getValidHeartRate(heartRate)) return "text-grey-500";
  if (heartRate < lowHeartRateThreshold) return "text-green-500 ";
  if (heartRate <= highHeartRateThreshold) return "text-yellow-500 ";
  return "text-red-500";
};

export default function HeartAnimation({ heartRate }: HeartAnimationProps) {
  const animationDuration = useMemo(() => 60 / heartRate, [heartRate]);

  return (
    <div className="relative flex items-center justify-center text-9xl transition-colors duration-300">
      <IconHeart
        className={cn("w-32 h-32", getHeartColor(heartRate))}
        style={{
          animation: getValidHeartRate(heartRate)
            ? `pulse ${animationDuration}s ease-in-out infinite`
            : "",
        }}
      />

      <div className={cn("absolute text-center text-2xl font-bold text-white")}>
        {heartRate} BPM
      </div>
    </div>
  );
}
