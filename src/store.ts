import {createStore} from 'redux'

import reducers from './state'
// import reducer from "./components/Game/state"

export default createStore(reducers)
