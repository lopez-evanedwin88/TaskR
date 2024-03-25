import {StyleSheet} from 'react-native';
import {color, fonts} from '../../styles/Base';

const styles = StyleSheet.create({
  itemViews: {
    alignContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 8,
  },
  itemViewName: {fontSize: fonts.xxlg, fontWeight: '500'},
  itemViewSubName: {
    fontSize: fonts.lg,
    color: color.green,
    textTransform: 'uppercase',
  },
  imageStyle: {height: 50, width: 25},
  lineStyle: {
    borderBottomColor: color.black2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 4,
    marginHorizontal: 120,
  },
  btnBusinessStyle: {
    marginVertical: 10,
    marginHorizontal: 16,
  },
  emptyTextStyleView: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  emptyTextStyle: {
    fontSize: fonts.lg,
    color: color.gray,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  media: {
    width: 300,
    height: 200,
    marginBottom: 5,
    alignSelf: 'flex-end',
  },
  txtInputStyle: {
    marginHorizontal: 16,
    borderBottomWidth: 0.3,
    flex: 1,
    fontSize: fonts.xlg,
    padding: 10,
  },
});

export default styles;
