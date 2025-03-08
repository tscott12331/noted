import { ReactElement } from 'react';
import styles from './form-input.module.css';

export interface IFormInput extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    labelText: string;
}

export default function FormInput({
    name,
    labelText,
    ...rest
}: IFormInput) {
    
    return (
        <div className={styles.formInput}>
            <label htmlFor={name}>{labelText}</label>
            <input name={name} {...rest}/>
        </div>
    );
}
