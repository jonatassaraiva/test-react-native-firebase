import React from 'react';

import { StackNavigator } from 'react-navigation';
import HomeScreen from './screens/home.screen';
import DetailsScreen from './screens/details.screen';

import firebase from 'react-native-firebase';


// gets the current screen from navigation state
function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

const Navigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'Home',
    },
  },
  Details: {
    screen: DetailsScreen,
    navigationOptions: {
      headerTitle: 'Details',
    },
  }
});

export default () => (
  <Navigator
    onNavigationStateChange={(prevState, currentState) => {
      const currentScreen = getCurrentRouteName(currentState);
      const prevScreen = getCurrentRouteName(prevState);

      if (prevScreen !== currentScreen) {
        // the line below uses the Google Analytics tracker
        // change the tracker here to use other Mobile analytics SDK.
        firebase.analytics().setCurrentScreen(currentScreen);
      }
    }}
  />
);