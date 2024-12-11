import { TProduct } from '@/types/product';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface TProductsState {
    data: TProduct[];
    status: 'Idle' | 'Loading' | 'Success' | 'Failed';
    error: string | null;
}

const initialState: TProductsState = {
    data: [],
    status: 'Idle',
    error: null,
};

export const getProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(
                'https://675833c060576a194d0f5794.mockapi.io/shopy/v1/products'
            );
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            return data; // Успешно полученные данные
        } catch (error) {
            return rejectWithValue((error as Error).message); // Обработка ошибок
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (productId: string, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `https://675833c060576a194d0f5794.mockapi.io/shopy/v1/products/${productId}`,
                {
                    method: 'DELETE',
                }
            );
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            return productId;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const toggleLike = createAsyncThunk(
    'products/toggleLike',
    async (product: TProduct, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `https://675833c060576a194d0f5794.mockapi.io/shopy/v1/products/${product._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...product,
                        isLiked: !product.isLiked, // Меняем статус лайка
                    }),
                }
            );
            if (!response.ok) {
                throw new Error('Failed to toggle like');
            }
            const updatedProduct = await response.json();
            return updatedProduct;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (newProduct: TProduct, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `https://675833c060576a194d0f5794.mockapi.io/shopy/v1/products/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newProduct),
                }
            );
            if (!response.ok) {
                throw new Error('Failed to add product');
            }
            const addedProduct = await response.json();
            return addedProduct;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, { payload }) => {
            state.data.push(payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.status = 'Loading';
                state.error = null;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.status = 'Success';
                state.data = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.status = 'Failed';
                state.error = action.payload as string;
            });
        builder
            .addCase(deleteProduct.pending, (state) => {
                state.status = 'Loading';
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.status = 'Success';
                state.data = state.data.filter((product) => product._id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state) => {
                state.status = 'Failed';
            });
        builder
            .addCase(toggleLike.pending, (state) => {
                state.status = 'Loading';
            })
            .addCase(toggleLike.fulfilled, (state, action) => {
                state.status = 'Success';
                const updatedProduct = action.payload;
                const index = state.data.findIndex((p) => p._id === updatedProduct._id);
                if (index !== -1) {
                    state.data[index] = updatedProduct;
                }
            })
            .addCase(toggleLike.rejected, (state) => {
                state.status = 'Failed';
            });
        builder
            .addCase(addProduct.pending, (state) => {
                state.status = 'Loading';
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.status = 'Success';
                state.data.push(action.payload);
            })
            .addCase(addProduct.rejected, (state) => {
                state.status = 'Failed';
            });
    },
    selectors: {
        selectorProductsData: (state) => state.data,
        selectorProductsStatus: (state) => state.status,
        selectorProductsError: (state) => state.error,
    },
});

export const { selectorProductsData, selectorProductsStatus, selectorProductsError } =
    productSlice.selectors;
