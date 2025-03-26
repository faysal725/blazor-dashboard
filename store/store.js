import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import userReducer from "../features/userSlice"
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

// export const store = configureStore({
//     reducer: {
//         cartR: cartReducer
//     }
// })

// Persist config
const persistConfig = {
  key: "root", // Key for storage
  storage, // Use localStorage
  whitelist: ["cartR", 'userR'], // Only persist the 'cart' slice (optional)
};

// Combine reducers
const rootReducer = combineReducers({
  cartR: cartReducer,
  userR: userReducer
  // Add more slices here (e.g., categories, user)
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// Persistor for rehydration
export const persistor = persistStore(store);
