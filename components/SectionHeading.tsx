export default function SectionHeading({
  eyebrow,
  title,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red">
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-2 font-display text-4xl tracking-wide sm:text-5xl ${
          light ? "text-white" : "text-black"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
