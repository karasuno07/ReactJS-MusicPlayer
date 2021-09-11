import styles from "./Header.module.css"

const Header = (props) => {
   return (
      <header className={styles.header}>
         <h4>Now playing:</h4>
         <h2>{props.songName}</h2>
      </header>
   )
}

export default Header
