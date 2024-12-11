'use client';

import React from 'react';
import { UseFormRegister, RegisterOptions } from 'react-hook-form';

interface FormInputProps<TFormValues> {
    id: keyof TFormValues;
    label: string;
    type?: string;
    register: UseFormRegister<TFormValues>;
    options?: RegisterOptions<TFormValues>;
    error?: string;
}

const FormInput = <TFormValues extends Record<string, any>>({
    id,
    label,
    type = 'text',
    register,
    options,
    error,
}: FormInputProps<TFormValues>) => {
    return (
        <div className="form-input">
            <label htmlFor={id as string}>{label}</label>
            <input id={id as string} type={type} {...register(id, options)} />
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default FormInput;
