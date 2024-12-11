'use client';

import { useAppSelector } from '@/store';
import { selectorProductsData } from '@/store/productsSlice';
import { useParams } from 'next/navigation';

import Link from 'next/link';

const ProductDetails = () => {
    const products = useAppSelector(selectorProductsData);
    // const status = useAppSelector(selectorProductsStatus);
    const { id } = useParams<{ id: string }>();

    const product = products.find((p) => p._id === id);

    // if (status === 'Loading') return <p>Loading...</p>;
    // if (status === 'Failed') return <p>Some error</p>;

    return (
        <>
            {product && (
                <div>
                    <img src={product.image} alt={product.title} />
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                </div>
            )}

            <Link href="/products">Вернуться к товарам</Link>
        </>
    );
};

export default ProductDetails;
