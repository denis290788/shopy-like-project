'use client';

import { useAppDispatch, useAppSelector } from '@/store';
import { getProducts, selectorProductsData, selectorProductsStatus } from '@/store/productsSlice';
import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import Link from 'next/link';

const ProductList = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectorProductsData);
    const status = useAppSelector(selectorProductsStatus);

    const [showFavs, setShowFavs] = useState(false);

    useEffect(() => {
        if (status === 'Idle') {
            dispatch(getProducts());
        }
    }, [dispatch, status]);

    const filteredProducts = showFavs ? products.filter((p) => p.isLiked) : products;

    const toggleFavs = () => {
        setShowFavs((prevState) => !prevState);
    };

    return (
        <>
            <button onClick={toggleFavs}>{!showFavs ? 'В избранном' : 'К товарам'}</button>
            <Link href={`/new-product`}>Добавить продукт</Link>

            {status === 'Loading' && <p>Loading...</p>}
            {status === 'Failed' && <p>Some error</p>}

            {status === 'Success' && (
                <div>
                    {filteredProducts.length === 0 ? (
                        <div>Тебе ничего не понравилось</div>
                    ) : (
                        filteredProducts.map((product) => (
                            <div key={product._id}>
                                <ProductCard product={product} />
                            </div>
                        ))
                    )}
                </div>
            )}
        </>
    );
};

export default ProductList;
