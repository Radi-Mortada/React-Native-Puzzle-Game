import React, { Component } from 'react'
import {
  Animated,
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableWithoutFeedback,
  Image
} from 'react-native'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import styles from './Styles/LaunchScreenStyles'
import GameActions from '../Redux/GameMainRedux'
import { Images } from '../Themes'
import _ from 'lodash'
// import { PanGestureHandler, State } from 'react-native-gesture-handler'
const USE_NATIVE_DRIVER = false

export class LaunchScreen extends Component {
  constructor () {
    super()
    this.image = []
    this.state = {
      oldBoxesArray: [],
      shuffledBoxesArray: [],
      currentBoxesArray: [],
      emptyIndex: null,
      nextIndex: null
    }
  }

  componentWillMount () {
    this.props.getData()
  }
  componentWillReceiveProps (nextProps) {
    let fArray = _.map(this.props.oldBoxesArray, 'id')
    let cArray = _.map(nextProps.currentBoxesArray, 'id')
    if (_.isEqual(fArray, cArray)) {
      alert('Yaaaaaaaaaaay !!!')
      this.props.getData()
    }
  }

  _keyExtractor = (item, index) => item.id

  checkMovable = (index) => {
    if(index == 3 && this.props.emptyIndex == 2 || index == 2 && this.props.emptyIndex == 3 || index == 6 && this.props.emptyIndex == 5){
      return false
    }
    if(index === this.props.emptyIndex + 1 || index === this.props.emptyIndex - 1 || index === this.props.emptyIndex +3 || index === this.props.emptyIndex -3){
      return true
    }
  }

  renderItem = (i, index) => {
    if (!i.empty) {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            if (this.checkMovable(index)) {
              this.props.setNext(index)
              this.image[index].rubberBand(800)
              this.props.emptyIndex
                ? this.image[this.props.emptyIndex].rubberBand(800)
                : null
            }
          }}
          style={styles.box}
        >
          <Animatable.View
            easing='ease-out'
            ref={ref => {
              this.image[index] = ref
            }}
          >
            <Image source={i.img} resizeMode='cover' style={styles.img} />
          </Animatable.View>
        </TouchableWithoutFeedback>
      )
    } else {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            {
              /* this.props.move(index === 0 || !index ? '0' : index) */
            }
          }}
          style={[styles.box, { backgroundColor: 'black' }]}
        >
          <Animatable.View
            style={styles.img}
            easing='ease-out'
            ref={ref => {
              this.image[index] = ref
            }}
          >
            <Image
              source={Images.qMark}
              resizeMode='contain'
              style={styles.img}
            />
          </Animatable.View>

        </TouchableWithoutFeedback>
      )
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={this._keyExtractor}
          data={this.props.currentBoxesArray}
          renderItem={({ item, index }) => this.renderItem(item, index)}
        />
      </View>
    )
  }
}

const mapStateToProps = ({ gameMain }) => ({
  ...gameMain
})

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(GameActions.gameMainRequest()),
  setNext: val => dispatch(GameActions.gameMainSetNext(val))
})

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
