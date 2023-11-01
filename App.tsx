import React from 'react'
import App from './SubApp'
import { persistor, store } from './redux/store'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import 'expo-dev-client'
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const nodeEnv = process.env.NODE_ENV

const uri =
  nodeEnv === 'production' && process.env.REACT_APP_PROD_HOST
    ? `${process.env.REACT_APP_PROD_HOST}/graphql`
    : 'http://localhost:8080/graphql'

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache()
})

export default function Wrapper () {
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
