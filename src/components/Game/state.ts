import { createAction } from 'redux-actions'
import updateFrames from '../../reducers/updateFrames'
import updateCumulativeScore from '../../reducers/updateCumulativeScore'
import isGameOver from '../../reducers/isGameOver'
import updateCurrentRoll from '../../reducers/updateCurrentRoll'
import updatePinsScores from "../../reducers/updatePins"
import { Action, GameState } from "./Game.type.d"
const types = {
  enterScore: 'Game/EnterScore',
  restart: 'Game/Restart',
}


export const enterScore = createAction(types.enterScore)
export const restart = createAction(types.restart)
export const initialState: GameState = {
  frames: [],
  cumulativeScores: [],
  gameOver: false,
  scores: [],
  rolls: 0,
}



export default (state: GameState = initialState, action: Action) => {
  switch (action.type) {
    case types.enterScore:
      const {
        frames,
        cumulativeScores,
        scores,
        // rolls,
      } = state

      const rolls = scores.length

      return {
        ...state,
        frames: updateFrames(rolls, action.payload, frames, scores),
        cumulativeScores: updateCumulativeScore(cumulativeScores, scores, action.payload),
        gameOver: isGameOver(rolls, action.payload, scores),
        scores: updatePinsScores(scores, rolls, action.payload),
        rolls: updateCurrentRoll(rolls, action.payload),
      }
    case types.restart:
      return initialState
    default:
      return state
  }
}
