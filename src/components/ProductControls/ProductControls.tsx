import React from 'react';
import styles from './ProductControls.module.css';
import AddIcon from '@mui/icons-material/Add';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';

interface ProductControlsProps {
    onToggleFavs: () => void;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showFavs: boolean;
    searchTerm: string;
}

const ProductControls: React.FC<ProductControlsProps> = ({
    onToggleFavs,
    onSearchChange,
    showFavs,
    searchTerm,
}) => {
    const router = useRouter();

    return (
        <div className={styles.controlBar}>
            <div className={styles.buttonsSection}>
                <button onClick={onToggleFavs} className={styles.controlButton}>
                    {!showFavs ? (
                        <BookmarkIcon fontSize="large" />
                    ) : (
                        <ArrowBackIcon fontSize="large" />
                    )}
                </button>
                <button
                    className={styles.controlButton}
                    onClick={() => {
                        router.push('/new-product');
                    }}
                >
                    <AddIcon fontSize="large" />
                </button>
            </div>

            <div className={styles.searchSection}>
                <SearchIcon fontSize="large" />
                <input
                    onChange={onSearchChange}
                    placeholder="Поиск"
                    value={searchTerm}
                    className={styles.controlInput}
                />
            </div>
        </div>
    );
};

export default ProductControls;
