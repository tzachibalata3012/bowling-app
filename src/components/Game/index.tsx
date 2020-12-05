import Game from './Game'
import {connect} from 'react-redux'
import {GameState} from "./Game.type"

const mapStateToProps = (game: GameState) => ({
  ...game,
})

export default connect(mapStateToProps)(Game)
