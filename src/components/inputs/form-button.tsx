import styles from './form-button.module.css';

export interface IFormButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    error: string|null|undefined;
}

export default function FormButton({
    text,
    error,
    ...rest
}: IFormButton) {
    return (
        <>
        <button className={styles.button} {...rest}>{text}</button>
        {error &&
        <p className={styles.error}>{error}</p>
        }
        </>
    )
}
