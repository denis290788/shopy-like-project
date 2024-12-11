'use client';

import { useAppDispatch } from '@/store';
import { deleteProduct, toggleLike } from '@/store/productsSlice';
import Link from 'next/link';
import { TProduct } from '@/types/product';
import React from 'react';

interface ProductCardProps {
    product: TProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const dispatch = useAppDispatch();

    // const [isLiked, setIsLiked] = useState(product.isLiked);

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault();
        // setIsLiked(!isLiked);
        dispatch(toggleLike(product));
    };
    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(deleteProduct(product._id));
    };

    return (
        <li>
            <Link href={`/products/${product._id}`}>
                <img src={product.image} alt={product.title} width={200} height={200} />
                <h2>{product.title}</h2>
                <p>{product.price}</p>
            </Link>
            <button onClick={handleLike}>Лайк {product.isLiked ? '❤️' : '♡'}</button>
            <button onClick={handleDelete}>Удалить</button>
        </li>
    );
};

export default React.memo(ProductCard);
