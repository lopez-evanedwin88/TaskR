import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button as TextButton,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import externalStyle1 from '../LoginScreen/styles';
import globalStyles from '../../styles/GlobalStyles';
import {fonts} from '../../styles/Base';
import Button from '../../component/Button';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/types';
import {insertTaskRequest} from '../../redux/task/actions';
import * as ImagePicker from 'react-native-image-picker';
import styles from './styles';

const TaskScreen = ({navigation}: {navigation: any}) => {
  const dateFormatter = 'Y-MM-DD HH:mm';
  const [startDate, setStartDate] = useState(moment().format(dateFormatter));
  const [endDate, setEndDate] = useState(moment().format(dateFormatter));
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [displayPicker, setDisplayPicker] = useState(false);
  const [whichDatePicked, setWhichDatePicked] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [mediaUri, setMediaUri] = useState(null);
  const [photo, setPhoto] = useState(null);

  const dispatch = useDispatch();
  const {user} = useSelector((state: RootState) => state.auth);
  const {status, response} = useSelector((state: RootState) => state.task);

  const setDate = (event: DateTimePickerEvent, date?: Date) => {
    let formattedDate = moment(date).format(dateFormatter);
    whichDatePicked ? setStartDate(formattedDate) : setEndDate(formattedDate);
  };

  useEffect(() => {
    navigation.setOptions({title: ''});
  }, [navigation]);

  useEffect(() => {
    if (response) {
      Alert.alert('Task created', 'Task has been successfully created!');
      navigation.goBack();
    }
  }, [status, response]);

  const insertTaskApi = () => {
    dispatch(
      insertTaskRequest({
        client_id: user.staff_id,
        start_date: startDate,
        due_date: endDate,
        title: title,
        description: description,
        message: description,
        image_url: '',
        photo: photo,
      }) as any,
    );
  };

  const handleChoosePhoto = () => {
    ImagePicker.launchImageLibrary(
      {mediaType: 'mixed', quality: 1},
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else {
          setPhoto(response as any);
          setMediaUri((response as any).assets[0].uri);
        }
      },
    );
  };

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
          Create a Task
        </Text>
      </View>
      <View
        style={[
          globalStyles.flexDirectionRow,
          externalStyle1.txtInputStyleView,
        ]}>
        <TextInput
          placeholder="Title or name of the task"
          style={externalStyle1.txtInputStyle}
          autoCorrect={false}
          autoCapitalize={'none'}
          value={title}
          onChangeText={setTitle}
        />
      </View>
      <View
        style={[
          globalStyles.flexDirectionRow,
          externalStyle1.txtInputStyleView,
        ]}>
        <TextInput
          placeholder="Brief details on task"
          style={externalStyle1.txtInputStyle}
          autoCorrect={false}
          autoCapitalize={'none'}
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <View
        style={[
          {alignSelf: 'flex-start', paddingLeft: 20, alignItems: 'center'},
          globalStyles.padding10,
          globalStyles.flexDirectionRow,
        ]}>
        <Text style={[{fontSize: fonts.xxlg}]}>Upload Image:</Text>
        <TextButton
          title="+"
          onPress={() => {
            handleChoosePhoto();
          }}
        />
      </View>
      <View
        style={{
          alignSelf: 'flex-start',
          paddingLeft: 20,
        }}>
        {mediaUri && <Image source={{uri: mediaUri}} style={styles.media} />}
      </View>
      <View
        style={[
          {alignSelf: 'flex-start', paddingLeft: 20},
          globalStyles.padding10,
        ]}>
        <Text style={[{fontSize: fonts.xxlg}]}>Set Timeline</Text>
      </View>
      <View
        style={[
          globalStyles.flexDirectionRow,
          externalStyle1.txtInputStyleView,
        ]}>
        <TextInput
          value={startDate}
          placeholder="Start Date"
          style={[externalStyle1.txtInputStyle, {paddingRight: 0}]}
          autoCorrect={false}
          autoCapitalize={'none'}
          editable={false}
          onPressIn={() => {
            setDisplayPicker(true);
            setWhichDatePicked(true);
            setSelectedDate(startDate);
          }}
        />
        <TextInput
          value={endDate}
          placeholder="Due Date"
          style={[externalStyle1.txtInputStyle, {paddingRight: 0}]}
          autoCorrect={false}
          autoCapitalize={'none'}
          editable={false}
          onPressIn={() => {
            setDisplayPicker(true);
            setWhichDatePicked(false);
            setSelectedDate(endDate);
          }}
        />
      </View>
      {displayPicker && (
        <>
          <DateTimePicker
            value={new Date(selectedDate)}
            mode="datetime"
            display="spinner"
            onChange={setDate}
          />
          <TextButton
            title="SET"
            onPress={() => {
              setDisplayPicker(false);
              setSelectedDate('');
            }}
          />
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,
              width: '90%',
            }}></View>
        </>
      )}
      <View style={[globalStyles.padding8, globalStyles.flexDirectionRow]}>
        <Button
          title="Create"
          onPress={() => {
            insertTaskApi();
          }}
          style={globalStyles.flex1}
        />
      </View>
    </View>
  );
};

export default TaskScreen;
