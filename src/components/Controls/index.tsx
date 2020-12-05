import {connect} from 'react-redux'
// import {actions} from '../Game/state'

import Controls from './Controls'
import {enterScore, restart} from '../Game/state'
const mapDispatchToProps = {
  enterScore,//: actions.enterScore,
  restart//: actions.restart,
  // updateTotalScore: actions.updateTotalScore,
}

export default connect(null, mapDispatchToProps)(Controls)
