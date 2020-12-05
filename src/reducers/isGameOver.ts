import {Scores, Rolls, Score} from "../components/Game/Game.type"

import isSpare from './isSpare'
import isStrike from './isStrike'

const isGameOver = (rolls: Rolls, lastScore: Score, scores: Scores) => {
  const previousRollScore = scores.length > 0 ? scores.slice(-1)[0] : 0
  const GameNotOver =
    rolls < 19 || (rolls === 19 && (isSpare(previousRollScore, lastScore) || isStrike(previousRollScore)))
  return !GameNotOver
}

export default isGameOver
