import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
//
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
//
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include", // ✅ Ensures cookies are sent and received
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App/>
  </ApolloProvider>
  </StrictMode>,
)
