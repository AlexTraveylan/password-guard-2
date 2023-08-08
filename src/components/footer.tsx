export function Footer() {
  const date = new Date()
  const year = date.getFullYear()
  const mouth = date.toLocaleString("fr-fr", { month: "long" })
  const formatMouth = mouth.charAt(0).toUpperCase() + mouth.slice(1)

  return (
    <footer className="z-20 w-full border-t border-slate-200">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
        <div>Beta v 0.5.0</div>
        <div>{`${formatMouth} ${year}`}</div>
        <div>Alex Traveylan</div>
      </div>
    </footer>
  )
}
