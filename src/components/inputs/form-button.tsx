import styles from './form-button.module.css';

export interface IFormButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}

export default function FormButton({
    text,
    ...rest
}: IFormButton) {
    return (
        <button className={styles.button} {...rest}>{text}</button>
    )
}
