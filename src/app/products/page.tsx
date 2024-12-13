'use client';

import { useState } from 'react';
import ProductControls from '@/components/ProductControls/ProductControls';
import ProductList from '@/components/ProductList/ProductList';
import styles from './page.module.css';

const ProductPage = () => {
    const [showFavs, setShowFavs] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleFavs = () => {
        setShowFavs((prevState) => !prevState);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };
    return (
        <div className={styles.productPage}>
            <ProductControls
                onToggleFavs={toggleFavs}
                onSearchChange={handleSearchChange}
                showFavs={showFavs}
                searchTerm={searchTerm}
            />
            <ProductList showFavs={showFavs} searchTerm={searchTerm} />
        </div>
    );
};

export default ProductPage;
