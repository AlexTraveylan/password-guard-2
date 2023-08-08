import styles from "@/components/styles/loader.module.css"

export default function Loading() {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner}></div>
    </div>
  )
}
