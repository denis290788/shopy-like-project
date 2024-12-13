'use client';

import { Provider } from 'react-redux';
import store from '../store/index';
import './globals.css';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Provider store={store}>
                    <header>
                        <h1>SHOPY-LIKE-PROJECT</h1>
                    </header>
                    <main>{children}</main>
                </Provider>
            </body>
        </html>
    );
}
