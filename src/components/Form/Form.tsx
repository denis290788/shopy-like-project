'use client';

import { useAppDispatch, useAppSelector } from '@/store';
import { addProduct, selectorProductsData, updateProduct } from '@/store/productsSlice';
import { nanoid } from '@reduxjs/toolkit';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './Form.module.css';
import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface ProductForm {
    title: string;
    description: string;
    price: string;
    image: string;
}

const ProductForm = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const products = useAppSelector(selectorProductsData);
    const { id } = useParams<{ id: string }>();
    const product = products.find((p) => p._id === id);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<ProductForm>({
        mode: 'onChange',
    });

    useEffect(() => {
        if (product) {
            reset({
                title: product.title,
                description: product.description,
                price: product.price.toString(),
                image: product.image,
            });
        }
    }, [product, dispatch, reset]);

    const submit: SubmitHandler<ProductForm> = async (data) => {
        const product = { ...data, _id: nanoid(), isLiked: false, price: Number(data.price) };

        try {
            if (id) {
                await dispatch(updateProduct({ id, updates: { ...product } })).unwrap();
            } else {
                await dispatch(addProduct({ ...product, _id: nanoid(), isLiked: false })).unwrap();
            }

            router.push('/products');

            reset({
                title: '',
                description: '',
                price: '',
                image: '',
            });
        } catch (error) {
            console.error('Ошибка при отправки формы на сервер:', error);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(submit)}>
            <div className={styles.inputSection}>
                <FormInput
                    id="title"
                    label="Название"
                    register={register}
                    options={{ required: 'Название обязательно' }}
                    error={errors.title?.message}
                />
                <FormInput
                    id="description"
                    label="Описание"
                    register={register}
                    options={{ required: 'Описание обязательно' }}
                    error={errors.description?.message}
                />
                <FormInput
                    id="price"
                    label="Цена"
                    register={register}
                    options={{
                        required: 'Цена обязательна',
                        validate: (value) => (!isNaN(Number(value)) ? true : 'Введите число'),
                    }}
                    error={errors.price?.message}
                />
                <FormInput
                    id="image"
                    label="Сылка на картинку"
                    register={register}
                    options={{
                        required: 'URL изображения обязателен',
                        pattern: {
                            value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i,
                            message: 'Введите корректный URL изображения',
                        },
                    }}
                    error={errors.image?.message}
                />
            </div>

            <div className={styles.buttonSection}>
                <Button
                    isActive
                    onClick={() => {
                        router.push('/products');
                        reset({
                            title: '',
                            description: '',
                            price: '',
                            image: '',
                        });
                    }}
                >
                    <ArrowBackIcon />
                </Button>
                <Button type="submit" isActive={isValid}>
                    <CheckIcon />
                </Button>
            </div>
        </form>
    );
};

export default ProductForm;
