import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface QualityBadgeProps {
  score: number;
  className?: string;
}

export function QualityBadge({ score, className }: QualityBadgeProps) {
  const getQualityVariant = (score: number) => {
    if (score >= 90) return "excellent";
    if (score >= 75) return "good";
    if (score >= 60) return "warning";
    return "poor";
  };

  const getQualityLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 60) return "Warning";
    return "Poor";
  };

  const variant = getQualityVariant(score);
  const label = getQualityLabel(score);

  return (
    <Badge
      className={cn(
        "text-xs font-medium",
        variant === "excellent" && "bg-quality-excellent text-white",
        variant === "good" && "bg-quality-good text-white",
        variant === "warning" && "bg-quality-warning text-white",
        variant === "poor" && "bg-quality-poor text-white",
        className
      )}
    >
      {score}% {label}
    </Badge>
  );
}