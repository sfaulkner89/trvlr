import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import persistReducer from 'redux-persist/lib/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import locationSlice from './slices/locationSlice'
import resultsSlice from './slices/resultsSlice'
import contactSlice from './slices/contactSlice'
import searchSlice from './slices/searchSlice'
import messageSlice from './slices/messageSlice'
import colorSlice from './slices/colorSlice'
import listSlice from './slices/listSlice'
import optionsSlice from './slices/optionsSlice'
import devToolsEnhancer from 'remote-redux-devtools'
import listEditorSlice from './slices/listEditorSlice'
import modalSlice from './slices/modalSlice'
import messagingGroupSlice from './slices/messagingGroupSlice'
import notificationSlice from './slices/notificationSlice'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['results', 'list', 'options']
}

const reducers = combineReducers({
  user: userReducer,
  location: locationSlice,
  results: resultsSlice,
  contact: contactSlice,
  search: searchSlice,
  chat: messageSlice,
  colors: colorSlice,
  list: listSlice,
  options: optionsSlice,
  message: messageSlice,
  listEditor: listEditorSlice,
  modals: modalSlice,
  messagingGroups: messagingGroupSlice,
  notification: notificationSlice
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  devTools: true,
  enhancers: [devToolsEnhancer({ realtime: true })]
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
