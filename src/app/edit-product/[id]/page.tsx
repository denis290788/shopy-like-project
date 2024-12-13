import Form from '@/components/Form/Form';
import styles from './page.module.css';

const EditProduct = () => {
    return (
        <div className={styles.editPage}>
            <h2 className={styles.editHeader}>Улучшь продукт!</h2>
            <Form />
        </div>
    );
};

export default EditProduct;
