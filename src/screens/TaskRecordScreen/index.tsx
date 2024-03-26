import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Image,
  TextInput,
  Alert,
  Button as TextButton,
} from 'react-native';
import globalStyles from '../../styles/GlobalStyles';
import {color, fonts} from '../../styles/Base';
import Button from '../../component/Button';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/types';
import {
  insertTaskRecordRequest,
  taskRecordsRequest,
} from '../../redux/taskRecord/actions';
import * as ImagePicker from 'react-native-image-picker';
import {updateTaskStatusRequest} from '../../redux/task/actions';
import {Status} from '../../constants/Status';
import Video from 'react-native-video';

const TaskRecordScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [lTaskRecords, setlTaskRecords] = useState([]);
  const [mediaUri, setMediaUri] = useState(null);
  const [mediaType, setMediaType] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState(null);
  const [toggleDetails, setToggleDetails] = useState(true);

  const dispatch = useDispatch();
  const {taskRecords, status, response} = useSelector(
    (state: RootState) => state.taskRecord,
  );
  const {status: taskStatus, response: taskResponse} = useSelector(
    (state: RootState) => state.task,
  );
  const {user} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    navigation.setOptions({title: ''});
  }, [navigation, route]);

  useEffect(() => {
    retrieveRecords();
  }, []);

  useEffect(() => {
    if (status === 200) {
      Alert.alert('Updated the task', response as string);
      navigation.goBack();
    }
  }, [status, response]);

  useEffect(() => {
    if (taskStatus === 200) {
      Alert.alert('Task has been assigned', response as string);
      navigation.goBack();
    }
  }, [taskStatus, taskResponse]);

  useEffect(() => {
    setlTaskRecords([]);
    taskRecords && taskRecords.length > 0 && setlTaskRecords(taskRecords);
  }, [taskRecords]);

  const retrieveRecords = () => {
    dispatch(taskRecordsRequest(route.params.task_id) as any);
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
          setMediaType((response as any).assets[0].type);
        }
      },
    );
  };

  const handleUploadMedia = () => {
    try {
      setUploading(true);
      // Handle successful upload
      dispatch(
        insertTaskRecordRequest({
          message: message,
          task_id: route.params.task_id,
          photo: photo,
        }),
      );
    } catch (error) {
      // Handle upload error
      console.error('Upload error:', (error as any).message);
    } finally {
      setUploading(false);
    }
  };

  const assignTask = (assignee_id: string) => {
    dispatch(
      updateTaskStatusRequest({
        status: Status.IN_PROGRESS,
        task_id: route.params.task_id,
        assignee_id: assignee_id,
      }),
    );
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

  const renderMedia = () => {
    if (mediaUri && mediaType.includes('video')) {
      return (
        <Video
          source={{uri: mediaUri}}
          style={styles.media}
          controls={true}
          resizeMode="contain"
        />
      );
    } else if (mediaUri && mediaType.includes('image')) {
      return <Image source={{uri: mediaUri}} style={styles.media} />;
    } else {
      return <Text style={{color: 'red'}}>No media selected</Text>;
    }
  };

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
          <Text style={styles.emptyTextStyle}>Task records is empty</Text>
        </View>
      )}
      {route.params.status === Status.PENDING && user.role === 'Admin' && (
        <View
          style={[
            {alignSelf: 'flex-start', paddingLeft: 20, alignItems: 'center'},
            globalStyles.flexDirectionRow,
          ]}>
          <Text style={[{fontSize: fonts.lg, fontWeight: 'bold'}]}>
            This task was not assign yet:
          </Text>
          <TextButton
            title="Assign here."
            onPress={() => {
              Alert.prompt(
                'Enter assignee',
                'Enter assignee id to assign this task',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: text => assignTask(text as string),
                  },
                ],
              );
            }}
          />
        </View>
      )}

      <View
        style={[
          {alignSelf: 'flex-start', paddingLeft: 10, alignItems: 'flex-start'},
        ]}>
        <TextButton
          title={`${toggleDetails ? '+Show' : '-Hide'} task details`}
          onPress={() => setToggleDetails(!toggleDetails)}
        />
        {!toggleDetails && (
          <View style={globalStyles.padding8}>
            <Text style={[{fontSize: fonts.lg}]}>
              Title: {route.params.title}
            </Text>
            <Text style={[{fontSize: fonts.lg}]}>
              Description: {route.params.description}
            </Text>
            <Text style={[{fontSize: fonts.lg}]}>
              Assigned to: {route.params.assignee_id}
            </Text>
            <Text style={[{fontSize: fonts.lg}]}>
              Start Date: {route.params.start_date}
            </Text>
            <Text style={[{fontSize: fonts.lg}]}>
              Due Date: {route.params.due_date}
            </Text>
          </View>
        )}
      </View>
      <View
        style={[
          {alignSelf: 'flex-start', paddingLeft: 20, alignItems: 'center'},
          globalStyles.flexDirectionRow,
        ]}>
        <Text style={[{fontSize: fonts.lg}]}>Upload Image:</Text>
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
        {renderMedia()}
      </View>
      <View style={[globalStyles.flexDirectionRow, {paddingHorizontal: 10}]}>
        <TextInput
          placeholder="Message"
          style={styles.txtInputStyle}
          autoCorrect={false}
          autoCapitalize={'none'}
          value={message}
          onChangeText={setMessage}
        />
      </View>
      <View style={styles.btnBusinessStyle}>
        <View>
          <Button
            title="Update Task"
            disabled={uploading}
            onPress={() => {
              handleUploadMedia();
              // navigation.navigate(Route.TASK_SCREEN);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default TaskRecordScreen;
