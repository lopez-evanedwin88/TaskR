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
import {clearResponse, tasksRequest} from '../../redux/task/actions';
import {RootState} from '../../redux/types';
import {Route} from '../../constants/Route';

const MainScreen = ({navigation}: {navigation: any}) => {
  const [lTasks, setlTasks] = useState([]);
  const dispatch = useDispatch();
  const {tasks} = useSelector((state: RootState) => state.task);
  const {user} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    retrieveTasks();
  }, []);

  useEffect(() => {
    tasks && tasks.length > 0 && setlTasks(tasks);
  }, [tasks]);

  const retrieveTasks = () => {
    dispatch(tasksRequest(user.id) as any);
  };

  const initClearResponse = () => {
    dispatch(clearResponse());
  }

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(Route.TASK_RECORD_SCREEN, {task_id: item.id});
      }}>
      <View style={globalStyles.padding8}>
        <View style={globalStyles.flexDirectionRow}>
          <View style={styles.itemViews}>
            <Text style={styles.itemViewName}>{item.name}</Text>
            <Text style={styles.itemViewSubName}>Start: {item.start_date}</Text>
            <Text style={styles.itemViewSubName}>Due: {item.start_date}</Text>
          </View>
        </View>
        <View style={globalStyles.flexDirectionRow}>
          <View style={styles.itemViews}>
            <Text>Title: {item.title}</Text>
          </View>
        </View>
        <View style={globalStyles.flexDirectionRow}>
          <View style={styles.itemViews}>
            <Text>Client: {item.client_id}</Text>
          </View>
        </View>
        <View style={globalStyles.flexDirectionRow}>
          <View style={styles.itemViews}>
            <Text>
              Status: {item.status ? item.status : 'Not yet assigned'}
            </Text>
          </View>
        </View>
        <View style={globalStyles.flexDirectionRow}>
          <View style={styles.itemViews}>
            <Text>Uploaded media: {item.medias}</Text>
          </View>
        </View>
        <View style={styles.lineStyle} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[globalStyles.flex1, {backgroundColor: color.white}]}>
      {lTasks.length !== 0 ? (
        <FlatList
          refreshing={false}
          scrollEnabled={true}
          style={[globalStyles.width100p]}
          data={lTasks}
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
      {user.role === 'Client' && (
        <View style={styles.btnBusinessStyle}>
          <Button
            title="ADD | CREATE TASK"
            onPress={() => {
              initClearResponse();
              navigation.navigate(Route.TASK_SCREEN);
              // navigation.navigate(Route.ITEM_SCREEN, {mode: Mode.NEW});
            }}
          />
        </View>
      )}
    </View>
  );
};

export default MainScreen;
