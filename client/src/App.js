<<<<<<< HEAD
import React from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Searchbar from "./components/Searchbar";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});
=======
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/login';
import Signup from './component/signup';
import { ApolloProvider , ApolloClient, InMemoryCache, useApolloClient} from '@apollo/client';
const client = new ApolloClient({uri:'/graphql', cache: new InMemoryCache() })
>>>>>>> fba0b50 (login and signup page)

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} /> 
        </Routes>
      </div>
    </Router>
    </ApolloProvider>
  );
}

export default App;
