type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  direction?: "left" | "right";
  gap?: number;
};

const IconButton = ({
  direction = "left",
  gap = 0,
  children,
  className,
  ...props
}: IconButtonProps) => {
  return (
    <button
      style={
        {
          "--direction-x": direction === "left" ? -1 : 1,
          "--gap": gap,
          "--x": `calc(100% * (var(--gap) + 1) * var(--direction-x))`,
        } as React.CSSProperties
      }
      className={`group flex aspect-square shrink-0 justify-center gap-[calc(100%*var(--gap))] overflow-hidden rounded-full transition-all duration-300 ${className}`}
      {...props}
    >
      <div className="grid size-full shrink-0 place-items-center transition-all duration-300 group-hover:translate-x-[var(--x)]">
        {children}
      </div>
      <div className="grid size-full shrink-0 place-items-center transition-all duration-300 group-hover:translate-x-[var(--x)]">
        {children}
      </div>
      <div className="grid size-full shrink-0 place-items-center transition-all duration-300 group-hover:translate-x-[var(--x)]">
        {children}
      </div>
    </button>
  );
};

export default IconButton;
