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
});

export default styles;