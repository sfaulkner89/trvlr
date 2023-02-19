import { View, Text } from 'react-native'
import React from 'react'
import App from './App'
import { persistor, store } from './redux/store'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import 'expo-dev-client'

const uri =
  process.env.NODE_ENV === 'produciton'
    ? `${process.env.API_URL}/graphql`
    : 'http://localhost:8080/graphql'

console.log(uri)
const client = new ApolloClient({
  uri,
  cache: new InMemoryCache()
})

export default function Wrapper () {
  console.log(process.env.NODE_ENV)
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  )
}
