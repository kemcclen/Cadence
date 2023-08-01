import React from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Searchbar from "./components/Searchbar";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <Searchbar />
      </div>
    </ApolloProvider>
  );
}

export default App;
