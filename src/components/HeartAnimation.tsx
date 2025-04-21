import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { IconHeart } from "@/assets";

interface HeartAnimationProps {
  heartRate: number;
}

export default function HeartAnimation({ heartRate }: HeartAnimationProps) {
  // Determine heart color based on heart rate
  const getHeartColor = () => {
    if (heartRate < 111) return "text-green-500 ";
    if (heartRate <= 180) return "text-yellow-500 ";
    return "text-red-500";
  };

  const animationDuration = useMemo(() => 60 / heartRate, [heartRate]);

  return (
    <div className="relative flex items-center justify-center text-9xl transition-colors duration-300">
      {/* Heart itself */}
      <div
        // className={cn(getHeartColor())}
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

      {/* Centered text over heart */}
      <div
        className={cn(
          "absolute text-center text-2xl font-bold text-white"
          // getHeartColor()
        )}
      >
        {heartRate} BPM
      </div>
    </div>
  );
}

{
  /* <div
    className={cn("w-32 h-32", getHeartColor())}
    style={{
      animation: `pulse ${animationDuration}s ease-in-out infinite`,
    }}
  ></div> */
}
