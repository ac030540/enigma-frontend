/* eslint-disable react/prefer-stateless-function */
import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import SignIn from './Components/signin/index';
import SignUp from './Components/signup/index';
import BlogsList from './Components/blogsList/index';
import CreateBlog from './Components/createBlog/index';
import UserContext from './Contexts/UserContext';
import ScrollToTop from './ScrollToTop';
import { ApolloClient } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import './App.scss';

const App = () => {
  // Here we add all the routes in the app.
  // Depending upon the path, individual route will be rendered.
  const [user, setUser] = useState(false);
  const httpLink = createHttpLink({
    uri: 'http://localhost:3000/graphql'
  });
  const cache = new InMemoryCache();
  const client = new ApolloClient({
    link: httpLink,
    cache
  })

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ScrollToTop>
        <ApolloProvider client={client}>
          <UserContext.Provider value={{ user, setUser }}>
            <Route path="/auth/signin" exact component={SignIn} />
            <Route path="/auth/signup" exact component={SignUp} />
            <Route path="/blog" exact component={BlogsList} />
            <Route path="/blog/create" exact component={CreateBlog} />
          </UserContext.Provider>
        </ApolloProvider>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default App;
