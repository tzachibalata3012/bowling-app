import isEven from './isEven'
import isBonusRoll from './isBonusRoll'
import getFrameIndex from './getFrameIndex'
import { Rolls, ActionPaylod, Frames, Score, ScoreDisplay, Scores } from "../components/Game/Game.type"
import isStrike from './isStrike'
import isSpare from './isSpare'

function intToDisplaySimbole(score: Score): ScoreDisplay {
  return (Number(score >= 0 && score <= 9 ? score : 0).toString()) as ScoreDisplay
}

function calcScoreDisplay(lastScore: Score, scores: Scores, roll: Rolls): ScoreDisplay {
  const lastThrow = scores.length > 0 ? scores.slice(-1)[0] : 0
  // return X is score == 10 and roll is even (first round attampt) OR
  // in the 19 roll X can be achived if X was achived in roll 18
  if (
    (isStrike(lastScore) && isEven(roll) && roll !== 20)
     || (isStrike(lastScore) && roll === 19 && isStrike(lastThrow))
     || (roll === 20 && isStrike(lastScore))) { return 'X' }
  if ((isSpare(lastThrow, lastScore) && !isEven(roll) && roll < 20) ||
   (roll === 20 && isSpare(lastThrow, lastScore))) { return '/' }
  return intToDisplaySimbole(lastScore)

}

const updateFrames = (rolls: Rolls, lastScore: ActionPaylod, frames: Frames, scores: Scores): Frames => {
  // console.log("updateFrames: Frames:", frames)
  // regular
  const newFrame = { score: lastScore, display: calcScoreDisplay(lastScore, scores, rolls) }
  if (isEven(rolls) && !isBonusRoll(rolls)) {
    return frames.concat([[newFrame]])
  } else {
    // odd roll (append to even role, and replace with last )
    const newFrameScore = frames[getFrameIndex(frames)].concat([newFrame])
    return frames.slice(0, getFrameIndex(frames)).concat([newFrameScore])
  }
}

export default updateFrames
