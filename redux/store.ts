import {
  combineReducers,
  configureStore,
  getDefaultMiddleware
} from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import persistReducer from 'redux-persist/lib/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import locationSlice from './slices/locationSlice'
import resultsSlice from './slices/resultsSlice'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['results']
}

const reducers = combineReducers({
  user: userReducer,
  location: locationSlice,
  results: resultsSlice
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
