import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore';

import adminReducer from './admin/adminSlice'
import userReducer from './user/userSlice'
import themeReducer from './theme/themeSlice'
import locationReducer from './admin/locationSlice'

const rootReducer = combineReducers({ user: userReducer, admin: adminReducer, theme: themeReducer, location: locationReducer });

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});

export const persistor = persistStore(store);