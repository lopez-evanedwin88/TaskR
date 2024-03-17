import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import globalStyles from '../../styles/GlobalStyles';
import {color} from '../../styles/Base';
import Button from '../../component/Button';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/types';
import { Route } from '../../constants/Route';
import { taskRecordsRequest } from '../../redux/taskRecord/actions';

const TaskRecordScreen = ({navigation}: {navigation: any}) => {
  const [lTaskRecords, setlTaskRecords] = useState([]);
  const dispatch = useDispatch();
  const {taskRecords, loading, error} = useSelector((state: RootState) => state.taskRecord);
  console.log('wewski');

  useEffect(() => {
    retrieveRecords();
  }, []);

  useEffect(() => {
    taskRecords && taskRecords.length > 0 && setlTaskRecords(taskRecords);
  }, [taskRecords]);

  const retrieveRecords = () => {
    dispatch(taskRecordsRequest(1) as any);
  };

  const renderItem = ({item}: any) => (
    <TouchableOpacity onPress={() => {}}>
      <View style={globalStyles.padding8}>
        <View style={globalStyles.flexDirectionRow}>
          <View style={styles.itemViews}>
            <Text>Message: {item.message}</Text>
          </View>
        </View>
        <View style={globalStyles.flexDirectionRow}>
          <View style={styles.itemViews}>
            <Text>Image: {item.image_url}</Text>
          </View>
        </View>
        <View style={styles.lineStyle} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[globalStyles.flex1, {backgroundColor: color.white}]}>
      {lTaskRecords.length !== 0 ? (
        <FlatList
          refreshing={false}
          scrollEnabled={true}
          style={[globalStyles.width100p]}
          data={lTaskRecords}
          onEndReached={() => {}}
          onEndReachedThreshold={0}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={() => {}} />
          }
          ListFooterComponent={
            <ActivityIndicator
              style={globalStyles.marginVertical10}
              animating={false}
            />
          }
        />
      ) : (
        <View style={styles.emptyTextStyleView}>
          <Text style={styles.emptyTextStyle}>Task list is empty</Text>
        </View>
      )}
      <View style={styles.btnBusinessStyle}>
        <Button
          title="ADD | CREATE TASK"
          onPress={() => {
            navigation.navigate(Route.TASK_SCREEN);
            // navigation.navigate(Route.ITEM_SCREEN, {mode: Mode.NEW});
          }}
        />
      </View>
    </View>
  );
};

export default TaskRecordScreen;
