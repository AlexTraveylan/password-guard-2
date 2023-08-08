import styles from "@/components/styles/loader.module.css"

export async function Loader() {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner}></div>
    </div>
  )
}
