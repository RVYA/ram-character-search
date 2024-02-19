import styles from "styles/squiggly-hr.module.css"

/* #region not working */
interface SquigglyHRProps {}

export default function SquigglyHR({}: SquigglyHRProps) {
  return <hr className={styles.squigglyHR} />
}
/* #endregion */
