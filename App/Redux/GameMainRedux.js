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
  let emptyI = null
  for (var index = 1; index < 10; index++) {
    boxesArray.push({
      id: index,
      title: `B${index}`,
      empty: index == 9,
      img: index !== 9 ? Images.catPuzzle[index-1] : null
    })
  }
  let randomize =  _.shuffle(boxesArray)
  randomize.map((item, i) => {
    if(item.empty){
      emptyI = i
    }
  })

  return state.merge({
    oldBoxesArray: boxesArray,
    currentBoxesArray: randomize,
    emptyIndex : emptyI
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
          id: state.currentBoxesArray[nextIndex].id,
          img: state.currentBoxesArray[nextIndex].img,
          empty: !box.empty
        }
      } else if (index === nextIndex) {
        return {
          ...box,
          id: state.currentBoxesArray[emptyIndex].id,           
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
return state
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GAME_MAIN_REQUEST]: request,
  [Types.GAME_MAIN_SET_NEXT]: setNext,
  [Types.GAME_MAIN_MOVE]: move
})
