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
} from 'react-native';
import globalStyles from '../../styles/GlobalStyles';
import {color} from '../../styles/Base';
import Button from '../../component/Button';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/types';
import {
  insertTaskRecordRequest,
  taskRecordsRequest,
} from '../../redux/taskRecord/actions';
import * as ImagePicker from 'react-native-image-picker';

const TaskRecordScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [lTaskRecords, setlTaskRecords] = useState([]);
  const [mediaUri, setMediaUri] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState(null);

  const dispatch = useDispatch();
  const {taskRecords} = useSelector((state: RootState) => state.taskRecord);
  const {} = useSelector((state: RootState) => state.taskRecord);

  useEffect(() => {
    navigation.setOptions({title: ''});
  }, [navigation, route]);

  useEffect(() => {
    retrieveRecords();
  }, []);

  useEffect(() => {
    taskRecords && taskRecords.length > 0 && setlTaskRecords(taskRecords);
  }, [taskRecords]);

  const retrieveRecords = () => {
    dispatch(taskRecordsRequest(route.params.task_id) as any);
  };

  const handleChoosePhoto = () => {
    ImagePicker.launchImageLibrary({ 'mediaType': 'mixed', 'quality': 1 }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        setPhoto(response as any);
        setMediaUri((response as any).assets[0].uri);
      }
    });
  };

  const handleUploadMedia = () => {
    if (!mediaUri) {
      return;
    }

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
          <Text style={styles.emptyTextStyle}>Task records is empty</Text>
        </View>
      )}
      <View style={styles.btnBusinessStyle}>
        <View style={{width: 'auto', flexDirection: 'row'}}>
          <View
            style={[
              globalStyles.flexDirectionRow,
              globalStyles.paddingVertical4,
              {width: '70%'},
            ]}>
            <TextInput
              placeholder="Message"
              style={styles.txtInputStyle}
              autoCorrect={false}
              autoCapitalize={'none'}
              value={message}
              onChangeText={setMessage}
            />
          </View>
          <View>
            {mediaUri && (
              <Image source={{uri: mediaUri}} style={styles.media} />
            )}
          </View>
        </View>
        <View style={globalStyles.paddingVertical4}>
          <Button title="Choose Media" onPress={handleChoosePhoto} />
        </View>
        <View>
          <Button
            title="Update Task"
            disabled={!mediaUri || uploading}
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
