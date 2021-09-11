import styles from "./Button.module.css"

const Button = (props) => {
   const { type = "button", className = "", ...others } = props

   return (
      <button type={type} className={`${styles.button} ${className}`} {...others}>
         {props.children}
      </button>
   )
}

export default Button
