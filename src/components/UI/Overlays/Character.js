import styles from "./Character.module.css"

const Character = (props) => {
   const classes = `${styles.character} ${styles.ayaka}`

   return <div className={classes} />
}

export default Character
