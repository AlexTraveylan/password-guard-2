import styles from "@/lib/styles/loader.module.css"

export function Loader() {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner}></div>
    </div>
  )
}
