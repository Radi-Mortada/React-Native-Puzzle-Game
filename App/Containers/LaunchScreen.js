import React, { Component } from 'react'
import {
  Animated,
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image
} from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/LaunchScreenStyles'
import GameActions from '../Redux/GameMainRedux'
// import { PanGestureHandler, State } from 'react-native-gesture-handler'
const USE_NATIVE_DRIVER = false

export class LaunchScreen extends Component {
  constructor () {
    super()
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

  _keyExtractor = (item, index) => item.id

  renderItem = (i, index) => {
    if (!i.empty) {
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.setNext(!index || index === 0 ? '0' : index)
          }}
          style={styles.box}
        >
          <Image source={i.img} />
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity
          onPress={() => {
            {/* this.props.move(index === 0 || !index ? '0' : index) */}
          }}
          style={[styles.box, { backgroundColor: 'white' }]}
        >

        </TouchableOpacity>
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
  setNext: val => dispatch(GameActions.gameMainSetNext(val)),
  move: val => dispatch(GameActions.gameMainMove(val))
})

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
