import React from 'react';
import { Switch } from 'react-router-dom';

import DeliverymanForm from '~/pages/Deliveryman/DeliverymanForm';
import Deliverymans from '~/pages/Deliveryman/Deliverymans';
import OrderForm from '~/pages/Order/OrderForm';
import Orders from '~/pages/Order/Orders';
import Problems from '~/pages/Problem/Problems';
import Profile from '~/pages/Profile';
import RecipientForm from '~/pages/Recipient/RecipientForm';
import Recipients from '~/pages/Recipient/Recipients';
import SignIn from '~/pages/SignIn';

import Route from './Routes';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={SignIn} />

    <Route exact path="/profile" component={Profile} isPrivate />

    <Route exact path="/orders" component={Orders} isPrivate />
    <Route exact path="/orders/new" component={OrderForm} isPrivate />
    <Route exact path="/orders/:orderId/edit" component={OrderForm} isPrivate />

    <Route exact path="/recipients" component={Recipients} isPrivate />
    <Route exact path="/recipients/new" component={RecipientForm} isPrivate />
    <Route
      exact
      path="/recipients/:recipientId/edit"
      component={RecipientForm}
      isPrivate
    />

    <Route exact path="/deliverymans" component={Deliverymans} isPrivate />
    <Route
      exact
      path="/deliverymans/new"
      component={DeliverymanForm}
      isPrivate
    />

    <Route
      exact
      path="/deliverymans/:deliverymanId/edit"
      component={DeliverymanForm}
      isPrivate
    />

    <Route exact path="/problems" component={Problems} isPrivate />
  </Switch>
);

export default Routes;
