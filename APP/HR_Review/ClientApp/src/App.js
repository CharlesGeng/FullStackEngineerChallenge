import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchUsers } from './components/FetchUsers';
import { FetchPerformances } from './components/FetchPerformances';
import { AddUser } from './components/AddUser';
import { AddPerformance } from './components/AddPerformance';
import { ReviewUser } from './components/ReviewUser';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/fetch-users' component={FetchUsers} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
        <AuthorizeRoute path='/fetch-performances' component={FetchPerformances} />
        <AuthorizeRoute path='/users/edit/:id' component={AddUser} />
        <AuthorizeRoute path='/review-user' component={ReviewUser} />
        <AuthorizeRoute path='/add-user' component={AddUser} />
        <Route path='/add-performance' component={AddPerformance} />
      </Layout>
    );
  }
}
