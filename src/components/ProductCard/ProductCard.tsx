'use client';

import { useAppDispatch } from '@/store';
import { deleteProduct, updateProduct } from '@/store/productsSlice';
import Link from 'next/link';
import { TProduct } from '@/types/product';
import React from 'react';
import styles from './ProductCard.module.css';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
    product: TProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(updateProduct({ id: product._id, updates: { isLiked: !product.isLiked } }));
    };
    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(deleteProduct(product._id));
    };

    return (
        <div className={styles.card}>
            <Link href={`/products/${product._id}`} className={styles.cardContainer}>
                <img
                    src={product.image}
                    alt={product.title}
                    width={200}
                    height={200}
                    className={styles.cardImage}
                />
                <div className={styles.cardInfo}>
                    <h2 className={styles.cardTitle}>{product.title}</h2>
                    <p className={styles.cardPrice}>Цена {product.price}р.</p>
                </div>
            </Link>
            <div className={styles.cardActions}>
                <button onClick={handleLike} className={styles.cardButton}>
                    {product.isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </button>
                <button onClick={handleDelete} className={styles.cardButton}>
                    <DeleteIcon />
                </button>
                <button
                    className={styles.cardButton}
                    onClick={() => {
                        router.push(`/edit-product/${product._id}`);
                    }}
                >
                    <EditIcon />
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
