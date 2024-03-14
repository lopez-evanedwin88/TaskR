import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button as TextButton,
  StyleSheet,
} from 'react-native';
import externalStyle1 from '../LoginScreen/styles';
import globalStyles from '../../styles/GlobalStyles';
import {fonts} from '../../styles/Base';
import Button from '../../component/Button';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import moment from 'moment';

const TaskScreen = ({navigation}: {navigation: any}) => {
  const dateFormatter = 'Y-MM-DD HH:mm';
  const [startDate, setStartDate] = useState(moment().format(dateFormatter));
  const [endDate, setEndDate] = useState(moment().format(dateFormatter));
  const [displayPicker, setDisplayPicker] = useState(false);
  const [whichDatePicked, setWhichDatePicked] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');

  const setDate = (event: DateTimePickerEvent, date?: Date) => {
    let formattedDate = moment(date).format(dateFormatter);
    whichDatePicked ? setStartDate(formattedDate) : setEndDate(formattedDate);
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
        />
      </View>
      <View
        style={[
          {alignSelf: 'flex-start', paddingLeft: 20, alignItems: 'center'},
          globalStyles.padding10,
          globalStyles.flexDirectionRow,
        ]}>
        <Text style={[{fontSize: fonts.xxlg}]}>Upload Image:</Text>
        <TextButton title="+" />
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
        <Button title="Create" onPress={() => {}} style={globalStyles.flex1} />
      </View>
    </View>
  );
};

export default TaskScreen;
