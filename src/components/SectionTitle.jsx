export default function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="mb-8 max-w-2xl">
      {eyebrow && (
        <p className="mb-2 inline-block rounded-full bg-tea-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-tea-700">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-semibold leading-tight text-tea-950 md:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-3 text-tea-700">{description}</p>}
    </div>
  )
}
