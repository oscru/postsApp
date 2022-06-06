// import ButtonProps from "./props";
import styles from "./styles.module.css";

const Button = (props: any) => {
  const { content, action } = props;
  return (
    <button onClick={action} className={styles.mainButton}>
      {content}
    </button>
  );
};
export default Button;
