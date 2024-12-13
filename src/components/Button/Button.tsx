import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    isActive?: boolean;
}

const Button = ({ children, isActive, ...props }: ButtonProps) => {
    return (
        <button
            {...props}
            className={isActive ? `${styles.button} ${styles.active}` : styles.button}
        >
            {children}
        </button>
    );
};

export default Button;
