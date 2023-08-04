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
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='App'>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
