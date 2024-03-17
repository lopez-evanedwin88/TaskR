/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import RootStack from './src/navigation';
import globalStyles from './src/styles/GlobalStyles';
import {Provider} from 'react-redux';
import store from './src/redux/store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView style={globalStyles.flex1}>
        <RootStack />
      </SafeAreaView>
    </Provider>
  );
}

export default App;
