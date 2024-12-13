'use client';

import { useAppSelector } from '@/store';
import { selectorProductsData } from '@/store/productsSlice';
import { useParams, useRouter } from 'next/navigation';
import styles from './page.module.css';
import Button from '@/components/Button/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProductDetails = () => {
    const products = useAppSelector(selectorProductsData);
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const product = products.find((p) => p._id === id);

    return (
        <div className={styles.detailsContainer}>
            {product && (
                <div className={styles.info}>
                    <img src={product.image} alt={product.title} className={styles.image} />
                    <div className={styles.details}>
                        <h2 className={styles.title}>{product.title}</h2>
                        <p className={styles.description}>{product.description}</p>
                        <p className={styles.price}>Цена: {product.price}р.</p>
                    </div>
                </div>
            )}
            <div className={styles.buttonSection}>
                <Button
                    isActive
                    onClick={() => {
                        router.push('/products');
                    }}
                >
                    <ArrowBackIcon />
                </Button>
            </div>
        </div>
    );
};

export default ProductDetails;
