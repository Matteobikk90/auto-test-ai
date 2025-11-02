export default function InfoRow({
  label,
  value,
  multiline = false,
}: {
  label: string;
  value?: string;
  multiline?: boolean;
}) {
  return multiline ? (
    <div className="flex flex-col border-b border-accent border-dashed py-3">
      <span className="text-foreground">{label}</span>
      <p className="font-medium text-foreground/90 whitespace-pre-line">
        {value ?? "—"}
      </p>
    </div>
  ) : (
    <div className="flex justify-between border-b border-accent border-dashed py-3 last-of-type:border-0">
      <span className="text-foreground">{label}</span>
      <span className="font-medium text-foreground/90 text-right truncate max-w-1/2">
        {value ?? "—"}
      </span>
    </div>
  );
}
