type ComponentNameProps = {
  className?: string
}

export function ComponentName({ className }: ComponentNameProps) {
  return (
    <section
      className={[
        "border-2 border-[#111111] bg-[#FAF8F3] p-4",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <h2 className="text-xl font-semibold text-[#111111]">Title</h2>
      <p className="text-sm text-[#4e4e4e]">Replace with component content.</p>
    </section>
  )
}
