import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Route} from '../constants/Route';
import MainScreen from '../screens/MainScreen';
import LoginScreen from '../screens/LoginScreen';
import TaskScreen from '../screens/TaskScreen';
import TaskRecordScreen from '../screens/TaskRecordScreen';

const Stack = createNativeStackNavigator();

function RootStack() {
  const mainStack = () => (
    <>
      <Stack.Screen name={Route.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={Route.MAIN_SCREEN} component={MainScreen} />
      <Stack.Screen
        name={Route.TASK_SCREEN}
        component={TaskScreen}
        options={{headerShown: true, headerBackTitle: 'Back'}}
      />
      <Stack.Screen
        name={Route.TASK_RECORD_SCREEN}
        component={TaskRecordScreen}
        options={{headerShown: true, headerBackTitle: 'Back'}}
      />
    </>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          animation: 'none',
        }}>
        {mainStack()}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
