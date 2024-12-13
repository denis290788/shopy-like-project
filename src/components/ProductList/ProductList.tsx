'use client';

import { useAppDispatch, useAppSelector } from '@/store';
import { getProducts, selectorProductsData, selectorProductsStatus } from '@/store/productsSlice';
import { useEffect } from 'react';
import styles from './ProductList.module.css';
import ProductCard from '../ProductCard/ProductCard';

interface ProductListProps {
    showFavs: boolean;
    searchTerm: string;
}

const ProductList: React.FC<ProductListProps> = ({ showFavs, searchTerm }) => {
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectorProductsData);
    const status = useAppSelector(selectorProductsStatus);

    useEffect(() => {
        if (status === 'Idle') {
            dispatch(getProducts());
        }
    }, [dispatch, status]);

    const filteredProducts = products.filter((p) => {
        const matchesSearch =
            searchTerm && p.title ? p.title.toLowerCase().includes(searchTerm.toLowerCase()) : true;
        const matchesFavs = !showFavs || p.isLiked;
        return matchesSearch && matchesFavs;
    });

    return (
        <div>
            {status === 'Loading' && <p className={styles.message}>Загружаю</p>}
            {status === 'Failed' && <p className={styles.message}>Какая-то ошибка</p>}

            {status === 'Success' && (
                <div className={styles.cardsList}>
                    {filteredProducts.length === 0 ? (
                        <p className={styles.message}>Тут пусто ):</p>
                    ) : (
                        filteredProducts.map((product) => (
                            <div key={product._id}>
                                <ProductCard product={product} />
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductList;
