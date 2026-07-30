/* garment care-label block: bone swatch with a stitched (dashed) inner border */
export default function CareLabel({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-bone p-2 text-ink">
      <div className="border border-dashed border-ink/40 px-4 py-3">
        <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60">{label}</dt>
        <dd className="mt-1 text-sm font-medium leading-snug">{value}</dd>
      </div>
    </div>
  )
}
