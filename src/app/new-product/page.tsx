import Form from '@/components/Form/Form';
import styles from './page.module.css';

const AddProduct = () => {
    return (
        <div className={styles.addPage}>
            <h2 className={styles.addHeader}>Создай продукт!</h2>
            <Form />
        </div>
    );
};

export default AddProduct;
