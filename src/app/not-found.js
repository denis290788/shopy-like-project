'use client';

import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
    return (
        <div className={styles.message}>
            <h2>Осторожно! Ты заблудился</h2>
            <Link href="/products">Возвращайся:)</Link>
        </div>
    );
}
