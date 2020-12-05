import {combineReducers} from 'redux'

import reducer from './components/Game/state'

export default combineReducers({
  game: reducer,
})
