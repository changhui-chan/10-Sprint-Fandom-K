import styles from './Button.module.scss';

const Button = ({
  type = 'button',
  className = '',
  disabled = false,
  children,
  onClick = () => {},
}) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
