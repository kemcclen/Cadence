import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import Login from "./component/login";
import Signup from "./component/signup";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Searchbar from "./components/Searchbar";
import SavedPlaylists from "./components/SavedPlaylists";
import AppNavbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const httpLink = new HttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false,
  }),
  link: authLink.concat(httpLink),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <AppNavbar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route index={true} path='/' element={<Searchbar />} />
          <Route path='/playlists' element={<SavedPlaylists />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
