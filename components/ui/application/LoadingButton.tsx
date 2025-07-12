import { Loader2 } from "lucide-react";
import { Button } from "../button";

type LoadingButtonProps = {
  isLoading: boolean;
  type: "button" | "submit" | "reset";
  text: string;
  onClick: () => void;
  className?: string;
};

export const LoadingButton = ({
  isLoading,
  type,
  text,
  onClick,
  className,
  ...ButtonProps
}: LoadingButtonProps) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      {...ButtonProps}
      className={className}
    >
      {isLoading ? <Loader2 className="animate-spin mr-2" /> : <p>{text}</p>}
    </Button>
  );
};
