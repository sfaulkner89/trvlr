import React from 'react'
import App from './SubApp'
import { persistor, store } from './redux/store'
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split
} from '@apollo/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import 'expo-dev-client'
import { createClient } from 'graphql-ws'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const nodeEnv = process.env.NODE_ENV

const uri =
  nodeEnv === 'production' && process.env.REACT_APP_PROD_HOST
    ? `${process.env.REACT_APP_PROD_HOST}/graphql`
    : 'http://192.168.0.88:8080/graphql'

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000/graphql'
  })
)

const httpLink = new HttpLink({
  uri
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link: splitLink,
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
