import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../redux/cartSlice'
import booksApi from './booksApi'
import ordersApi from './ordersApi'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware().concat(booksApi.middleware, ordersApi.middleware)
  
})