'use client';

import styles from './FormInput.module.css';
import React from 'react';
import { UseFormRegister, RegisterOptions, FieldValues, Path } from 'react-hook-form';

interface FormInputProps<TFormValues extends FieldValues> {
    id: Path<TFormValues>; // используем Path вместо keyof
    label: string;
    type?: string;
    register: UseFormRegister<TFormValues>;
    options?: RegisterOptions<TFormValues>;
    error?: string;
}

const FormInput = <TFormValues extends FieldValues>({
    id,
    label,
    register,
    options,
    error,
}: FormInputProps<TFormValues>) => {
    return (
        <div className={styles.formInput}>
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>
            <input
                className={error ? `${styles.input} ${styles.error}` : styles.input}
                id={id}
                type="text"
                {...register(id, options)}
            />
            <div className={styles.errorContainer}>
                {error && <div className={styles.errorText}>{error}</div>}
            </div>
        </div>
    );
};

export default FormInput;
