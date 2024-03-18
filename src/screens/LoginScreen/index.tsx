import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button as TextButton, Alert} from 'react-native';
import styles from './styles';
import globalStyles from '../../styles/GlobalStyles';
import {fonts} from '../../styles/Base';
import Button from '../../component/Button';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/types';
import {loginRequest} from '../../redux/login/actions';
import {Route} from '../../constants/Route';

const LoginScreen = ({navigation}: {navigation: any}) => {
  // const [staff_id, setStaffId] = useState('005');
  // const [password, setPassword] = useState('test123');
  const [staff_id, setStaffId] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const {user, loading, error} = useSelector((state: RootState) => state.auth);

  const handleLogin = () => {
    //Added basic validation
    if (!staff_id) {
      Alert.alert('Field Required', 'Please enter staff id');
      return;
    }
    if (!password) {
      Alert.alert('Field Required', 'Please enter password');
      return;
    }

    dispatch(loginRequest(staff_id, password) as any);
  };

  useEffect(() => {
    if (user) {
      navigation.navigate(Route.MAIN_SCREEN);
    }
  }, [user]);

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
          value={staff_id}
          onChangeText={setStaffId}
        />
      </View>
      <View style={[globalStyles.flexDirectionRow, styles.txtInputStyleView]}>
        <TextInput
          placeholder="Password"
          style={styles.txtInputStyle}
          autoCorrect={false}
          autoCapitalize={'none'}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={[globalStyles.padding8, globalStyles.flexDirectionRow]}>
        <Button
          title="Sign in"
          onPress={handleLogin}
          style={globalStyles.flex1}
        />
      </View>
      <View style={[globalStyles.padding8, globalStyles.flexDirectionRow]}>
        <Text style={[{fontSize: fonts.xxlg, alignSelf: 'center'}]}>
          Don't have an account?
        </Text>
        <TextButton
          title="Create yours now"
          onPress={() => {
            Alert.alert(
              'Not yet supported',
              'This feature is not yet supported. Contact the developer for more info',
            );
          }}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
