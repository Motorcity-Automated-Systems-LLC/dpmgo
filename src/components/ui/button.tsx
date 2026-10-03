import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hudOutline: "border border-border bg-panel/80 text-foreground hover:border-primary/60 hover:bg-panel",
        hudActive: "border border-primary/70 bg-primary/15 text-primary hover:bg-primary/25",
        hudWarm: "border border-warm/70 bg-warm/15 text-warm hover:bg-warm/25",
        hudInactive: "border border-border bg-panel/80 text-muted-foreground hover:border-foreground/30",
        station: "rounded-none border-b border-border/60 bg-transparent text-foreground hover:bg-primary/10",
        directory: "rounded-none border-b border-border bg-transparent text-foreground hover:bg-primary/10",
        mapControl: "border border-border bg-panel/85 text-foreground hover:border-primary hover:text-primary",
        mobileStations: "border border-primary/60 bg-panel/95 text-primary hover:bg-primary/15",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        hud: "h-10 px-4 text-[11px] font-semibold",
        route: "h-11 px-4 text-[11px] font-bold",
        station: "h-11 w-full px-3 text-left text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
