import { cn } from "@/lib/utils";

interface ContainerProps<T extends React.ElementType> {
  as?: T;
  children: React.ReactNode;
  className?: string;
}

export function Container<T extends React.ElementType = "div">({
  as,
  children,
  className,
  ...props
}: ContainerProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof ContainerProps<T>>) {
  const Component = as || "div";

  return (
    <Component
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
