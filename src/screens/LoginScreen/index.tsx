import React from 'react';
import {View, Text, TextInput, Button as TextButton} from 'react-native';
import styles from './styles';
import globalStyles from '../../styles/GlobalStyles';
import {fonts} from '../../styles/Base';
import Button from '../../component/Button';

const LoginScreen = ({navigation}: {navigation: any}) => {
  return (
    <View
      style={[
        globalStyles.flex1,
        {
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}>
      <View>
        <Text style={[{fontSize: fonts.xxxlg}, globalStyles.padding10]}>
          TaskR
        </Text>
      </View>
      <View style={[globalStyles.flexDirectionRow, styles.txtInputStyleView]}>
        <TextInput
          placeholder="Staff Id"
          style={styles.txtInputStyle}
          autoCorrect={false}
          autoCapitalize={'none'}
        />
      </View>
      <View style={[globalStyles.flexDirectionRow, styles.txtInputStyleView]}>
        <TextInput
          placeholder="Password"
          style={styles.txtInputStyle}
          autoCorrect={false}
          autoCapitalize={'none'}
          secureTextEntry={true}
        />
      </View>
      <View style={[globalStyles.padding8, globalStyles.flexDirectionRow]}>
        <Button title="Sign in" onPress={() => {}} style={globalStyles.flex1} />
      </View>
      <View style={[globalStyles.padding8, globalStyles.flexDirectionRow]}>
        <Text style={[{fontSize: fonts.xxlg, alignSelf: 'center'}]}>
          Don't have an account?
        </Text>
        <TextButton title="Create yours now" />
      </View>
    </View>
  );
};

export default LoginScreen;
