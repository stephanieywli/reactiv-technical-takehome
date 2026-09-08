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
      className={`w-1 h-1 rounded-full ${isActive ? "bg-white" : "bg-white/50"}`}
    />
  );
};
