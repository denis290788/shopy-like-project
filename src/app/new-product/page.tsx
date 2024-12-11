'use client';

import FormInput from '@/components/FormInput/FormInput';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch } from '@/store';
import { addProduct } from '@/store/productsSlice';
import { nanoid } from '@reduxjs/toolkit';
// import { FormEvent } from 'react';

interface NewProductForm {
    title: string;
    description: string;
    price: number;
    image: string;
}

export default function NewProduct() {
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<NewProductForm>();

    const submit: SubmitHandler<NewProductForm> = (data) => {
        console.log(data);
        const productWithId = { ...data, _id: nanoid(), isLiked: false };
        dispatch(addProduct(productWithId));
        reset({
            title: '',
            description: '',
            price: 0,
            image: '',
        });
    };

    const error: SubmitErrorHandler<NewProductForm> = (data) => {
        console.log(data);
    };

    return (
        <>
            <h2>Новый продукт</h2>
            <form onSubmit={handleSubmit(submit, error)}>
                <FormInput
                    id="title"
                    type="text"
                    label="Title"
                    register={register}
                    options={{ required: 'Обязательно' }}
                    error={errors.title?.message}
                />
                <FormInput
                    id="description"
                    type="text"
                    label="Description"
                    register={register}
                    options={{ required: 'Обязательно' }}
                    error={errors.description?.message}
                />
                <FormInput
                    id="price"
                    type="number"
                    label="Price"
                    register={register}
                    options={{ required: 'Обязательно' }}
                    error={errors.price?.message}
                />
                <FormInput
                    id="image"
                    type="text"
                    label="Image"
                    register={register}
                    options={{ required: 'Обязательно' }}
                    error={errors.image?.message}
                />

                <button type="submit">Создать</button>
            </form>
        </>
    );
}
