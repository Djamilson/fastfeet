import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Dashboard from '~/pages/Dashboard';
import Logout from '~/pages/Logout';
import DeliveryProblem from '~/pages/Order/DeliveryProblem';
import ListProblem from '~/pages/Order/ListProblem';
import ProductDetail from '~/pages/Order/ProductDetail';
import Signature from '~/pages/Order/Signature';
import OrderDelivered from '~/pages/OrderDelivered';
import Pending from '~/pages/Pending';
import Profile from '~/pages/Profile';
import RegulationReview from '~/pages/RegulationRaview';
import SignIn from '~/pages/SignIn';
import colors from '~/styles/colors';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

function newDashboard() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: `${colors.white_}`,
        headerLeftContainerStyle: {
          marginLeft: 10,
        },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Pending"
        component={Pending}
        options={{
          title: 'Encomendas pendentes',
          headerLeft: () => <TouchableOpacity onPress={() => {}} />,
        }}
      />

      <Stack.Screen
        name="OrderDelivered"
        component={OrderDelivered}
        options={{
          title: 'Encomendas entregues',
          headerLeft: () => <TouchableOpacity onPress={() => {}} />,
        }}
      />

      <Stack.Screen
        name="Logout"
        component={Logout}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{
          title: 'Detalhes da encomenda',
          headerLeft: () => <TouchableOpacity onPress={() => {}} />,
        }}
      />

      <Stack.Screen
        name="DeliveryProblem"
        component={DeliveryProblem}
        options={{
          title: 'Informar problema',
          headerLeft: () => <TouchableOpacity onPress={() => {}} />,
        }}
      />
      <Stack.Screen
        name="ListProblem"
        component={ListProblem}
        options={{
          title: 'Visualizar problemas',
          headerLeft: () => <TouchableOpacity onPress={() => {}} />,
        }}
      />

      <Stack.Screen
        name="Signature"
        component={Signature}
        options={{
          title: 'Confirmar entrega',
          headerLeft: () => <TouchableOpacity onPress={() => {}} />,
        }}
      />
    </Stack.Navigator>
  );
}

function newProfile() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: `${colors.white_}`,
        headerLeftContainerStyle: {
          marginLeft: 10,
        },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Meu Perfil',
          headerLeft: () => <TouchableOpacity onPress={() => {}} />,
        }}
      />
    </Stack.Navigator>
  );
}

function getInitialRoute(isSigned, acceped_regulation) {
  const {profile} = acceped_regulation.user;

  console.log('acceped_regulation::: ', acceped_regulation);
  const acceped_regulation_ =
    profile !== undefined && profile !== null && profile.person.privacy === true
      ? profile.person.privacy
      : false;

  if (isSigned) {
    if (acceped_regulation_ === true) {
      return (
        <Tabs.Navigator
          tabBarOptions={{
            activeTintColor: `${colors.third}`,
            inactiveTintColor: `${colors.sixX}`,
            style: {backgroundColor: `${colors.white_}`},
            keyboardHidesTabBar: true,
          }}>
          <Tabs.Screen
            name="Dashboard"
            component={newDashboard}
            options={{
              tabBarLabel: 'Entregas',
              tabBarIcon: ({color}) => (
                <Icon name="menu" size={20} color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="Profile"
            component={newProfile}
            options={{
              tabBarLabel: 'Meu Perfil',
              tabBarIcon: ({color}) => (
                <Icon name="person" size={20} color={color} />
              ),
            }}
          />
        </Tabs.Navigator>
      );
    }
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="RegulationReview" component={RegulationReview} />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
}

export default function createRouter(isSigned = false, acceped_regulation) {
  return getInitialRoute(isSigned, acceped_regulation);
}
