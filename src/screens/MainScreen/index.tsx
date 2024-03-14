import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import globalStyles from '../../styles/GlobalStyles';
import {color, fonts} from '../../styles/Base';
import Button from '../../component/Button';
import styles from './styles';

const MainScreen = ({navigation}: {navigation: any}) => {
  const persons: any = [];

  const renderItem = ({item}: any) => (
    <TouchableOpacity onPress={() => {}}>
      <View style={globalStyles.padding8}>
        <View style={globalStyles.flexDirectionRow}>
          <View style={styles.itemViews}>
            <Text style={styles.itemViewName}>{item.name}</Text>
            <Text style={styles.itemViewSubName}>
              {item.occupation} @ {item.company}
            </Text>
          </View>
        </View>
        <View style={globalStyles.flexDirectionRow}>
          <View style={styles.itemViews}>
            <Text>{item.email_address}</Text>
          </View>
        </View>
        <View style={globalStyles.flexDirectionRow}>
          <View style={styles.itemViews}>
            <Text>{item.phone_number}</Text>
          </View>
        </View>
        <View style={styles.lineStyle} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[globalStyles.flex1, {backgroundColor: color.white}]}>
      {persons.length !== 0 ? (
        <FlatList
          refreshing={false}
          scrollEnabled={true}
          style={[globalStyles.width100p]}
          data={persons}
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
            // navigation.navigate(Route.ITEM_SCREEN, {mode: Mode.NEW});
          }}
        />
      </View>
    </View>
  );
};

export default MainScreen;
