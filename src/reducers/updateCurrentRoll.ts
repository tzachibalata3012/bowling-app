import isStrike from './isStrike'
import isEven from './isEven'
import { Rolls, Score } from "../components/Game/Game.type"

const updateCurrentRoll = (rolls: Rolls, lastScore: Score) => {
  if (isStrike(lastScore) && isEven(rolls) && rolls < 18) {
    return rolls + 2
  } else {
    return rolls + 1
  }
}

export default updateCurrentRoll
