import styles from "@/components/styles/loader.module.css"

export async function Loader({ show }: { show: boolean }) {
  if (!show) return null

  return (
    <div className={styles.loader}>
      <div className={styles.spinner}></div>
    </div>
  )
}
