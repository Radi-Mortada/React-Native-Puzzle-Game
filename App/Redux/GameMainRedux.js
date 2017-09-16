import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'
import { Images } from '../Themes'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  gameMainRequest: null,
  gameMainSetNext: ['nextIndex'],
  gameMainMove: ['emptyIndex']
})

export const GameMainTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  oldBoxesArray: null,
  shuffledBoxesArray: null,
  currentBoxesArray: null,
  emptyIndex: null,
  nextIndex: null
})

/* ------------- Reducers ------------- */

export const request = state => {
  let boxesArray = []
  for (var index = 0; index < 9; index++) {
    boxesArray.push({
      id: index,
      title: `B${index}`,
      empty: index == 8,
      img: index !== 8 ? Images.catPuzzle[index] : null
    })
  }

  return state.merge({
    oldBoxesArray: boxesArray,
    currentBoxesArray: _.shuffle(boxesArray)
  })
}

export const setNext = (state, action) => {
  const { nextIndex } = action
  let emptyIndex = state.emptyIndex
  if(!state.emptyIndex){
    state.currentBoxesArray.map((bx,index) => {if(bx.empty) emptyIndex = index})
  }
  return state.merge({
    currentBoxesArray: state.currentBoxesArray.map((box, index) => {
      if (index == emptyIndex) {
        return {
          ...box,
          img: state.currentBoxesArray[nextIndex].img,
          empty: !box.empty
        }
      } else if (index === nextIndex) {
        return {
          ...box,
          img: state.currentBoxesArray[emptyIndex].img,          
          empty: !box.empty
        }
      }
      return box
    }),
    emptyIndex: nextIndex
  })
}

export const move = (state, action) => {
  const { emptyIndex } = action
  return state.merge({
    currentBoxesArray: state.currentBoxesArray.map((box, index) => {
      if (index == emptyIndex) {
        return {
          ...box,
          img: state.currentBoxesArray[state.nextIndex].img,
          empty: !box.empty
        }
      } else if (index === state.nextIndex) {
        return {
          ...box,
          img: state.currentBoxesArray[emptyIndex].img,          
          empty: !box.empty
        }
      }
      return box
    }),
    emptyIndex: state.nextIndex
  })
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GAME_MAIN_REQUEST]: request,
  [Types.GAME_MAIN_SET_NEXT]: setNext,
  [Types.GAME_MAIN_MOVE]: move
})
