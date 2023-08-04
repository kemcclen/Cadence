import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./component/login";
import Signup from "./component/signup";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Searchbar from "./components/Searchbar";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='App'>
          <Routes>
            <Route path='/' element={<Searchbar />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
