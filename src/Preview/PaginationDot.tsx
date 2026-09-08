export const PaginationDot = ({
  isActive,
  onClick,
  label,
}: {
  isActive: boolean;
  onClick: () => void;
  label: string;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-white" : "bg-white/50"}`}
    />
  );
};
