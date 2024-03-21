import {configureStore} from '@reduxjs/toolkit'
import  useReducer from '../slice/userSlice.js'
import categorySlice  from '../slice/categorySlice.js'
import storage from 'redux-persist/lib/storage'
import modalSlice from '../slice/modalSlice.js'
import {combineReducers} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['userState', 'category', 'modal'],
};

const rootReducer = combineReducers({
  userState: useReducer,
  category: categorySlice,
  modal: modalSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    category: categorySlice,
    modal: modalSlice,
  },
  middleware: [thunk],
});