import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NonEmptyNumberArray } from "@/types";

interface ButtonsRowProps {
  controlButtons: NonEmptyNumberArray;
  onButtonClick: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

const isSameSign = (arr: number[]): boolean =>
  arr.every((num) => Math.sign(num) === Math.sign(arr[0]));

export const ButtonsRow = ({
  controlButtons,
  onButtonClick,
  disabled,
  className,
}: ButtonsRowProps) => {
  if (!isSameSign(controlButtons)) {
    throw new Error("All values in controlButtons must have the same sign.");
  }

  const sign = Math.sign(controlButtons[0]) >= 0 ? "+" : "";

  return (
    <div className={cn(`flex gap-2`, className)}>
      {controlButtons.map((value) => (
        <Button
          key={value}
          variant="outline"
          size="sm"
          onClick={() => onButtonClick(value)}
          disabled={disabled}
        >
          {sign}
          {value}
        </Button>
      ))}
    </div>
  );
};
