import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: "draft" | "sent" | "paid" | "overdue"
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    draft: {
      label: "Draft",
      className: "bg-muted text-muted-foreground hover:bg-muted",
    },
    sent: {
      label: "Sent",
      className: "bg-accent text-accent-foreground hover:bg-accent",
    },
    paid: {
      label: "Paid",
      className: "bg-success text-success-foreground hover:bg-success",
    },
    overdue: {
      label: "Overdue",
      className: "bg-destructive text-destructive-foreground hover:bg-destructive",
    },
  }

  const config = statusConfig[status]

  return (
    <Badge className={cn(config.className, "capitalize", className)}>
      {config.label}
    </Badge>
  )
}