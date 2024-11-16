import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import storageSession from "redux-persist/lib/storage/session";
import {persistReducer, persistStore} from "redux-persist";
import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import authReducer from "./reducers/auth-reducer";
import pageReducer from "./reducers/page-reducer";

const persistConfig = {
    key: 'root',
    storage: storageSession,
    whitelist: ['auth', 'page'],
};

const rootReducer = combineReducers({
    auth: authReducer,
    page: pageReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
