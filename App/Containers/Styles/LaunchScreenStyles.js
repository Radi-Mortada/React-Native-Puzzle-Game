import { StyleSheet, Dimensions } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

const { width , height} = Dimensions.get('window')
const BOX_SIZE = width /3

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  box: {
    width: BOX_SIZE,
    height: height / 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: BOX_SIZE,
    height: height / 3
  }
})


export default styles