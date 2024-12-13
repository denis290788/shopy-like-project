import './page.module.css';

import ProductPage from '@/app/products/page';
import styles from './page.module.css';

export default function Home() {
    return (
        <div className={styles.main}>
            <ProductPage />
        </div>
    );
}
