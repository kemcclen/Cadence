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
  useApolloClient,
} from "@apollo/client";
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
        <div>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/' element={<Login />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
