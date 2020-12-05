import isStrike from './isStrike'
import isSpare from "./isSpare"
import isEven from "./isEven"
import { FramesScores, Scores, Rolls, Score } from "../components/Game/Game.type"


function isEvenRoll(roll: Rolls) {
  return isEven(roll)
}
function isRoll(currentRoll: Rolls, queriedRollStart: Rolls, queriedRollEnd?: Rolls): boolean {
  if (!queriedRollEnd) queriedRollEnd = queriedRollStart
  const ret = currentRoll >= queriedRollStart && currentRoll <= queriedRollEnd
  return ret
}
const updateCumulativeScore = (cumulativeScores: FramesScores, scores: Scores, lastScore: Score): FramesScores | undefined => {
  const currentScore = cumulativeScores.slice(-1)[0] || 0
  const lastThrow = scores.length > 0 ? scores!.slice(-1)![0]! : 0
  const preLastThrow = scores.length > 0 ? scores.slice(-2)[0] : 0
  const rolls = scores.length

  /* Round1 - First attampt (roll 0) */
  // Nothing to do (frame does not updated)
  if (isRoll(rolls, 0)) {
    if (isStrike(lastScore)) {
      return cumulativeScores.concat([lastScore])
    }
    return cumulativeScores
  }

  /* Round 1 - Second attampt (roll 1) */
  // return roll 1 + lastScore
  if (isRoll(rolls, 1)) { return cumulativeScores.concat([lastThrow + lastScore]) }

  /* Round 2 - Firts attampt -> Round 10 First Round (roll 2-18 )*/
  // if (rolls >= 2 && rolls <= 18) {
  if (isRoll(rolls, 2, 18)) {
    // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    /* First attampt (even rolls) */
    if (isEvenRoll(rolls)) {
      /* /SPARE MODE/ (prevoius frame is sapre - calc it!) */
      var updatePreviuosFrameScore = undefined
      if (isSpare(preLastThrow, lastThrow)) {
        const lastFrameBonus = lastScore
        updatePreviuosFrameScore = currentScore + lastFrameBonus
      }
      /* AND THEN *3/
      /* STRIKE!! (lastScore==10) - need to create current frame and concat it!! */
      if (isStrike(lastScore)) {
        // check if last farame was strike - if so, updatePreviuosFrameScore
        if (isStrike(preLastThrow)) {
          const bonusScore = lastScore
          updatePreviuosFrameScore = currentScore + bonusScore
        }
        // return also this frame
        return updatePreviuosFrameScore ?
          cumulativeScores.slice(0, -1).concat([updatePreviuosFrameScore]).concat([updatePreviuosFrameScore + lastScore])
          :
          cumulativeScores.concat([currentScore + lastScore])
      } else {
        // first attampt with no strike! no frame is created
        return updatePreviuosFrameScore ?
          cumulativeScores.slice(0, -1).concat([updatePreviuosFrameScore])
          :
          cumulativeScores
      }
    }
    /* Second attampt (odd rolls) - asuumption - if First attampt was STRIKE this will not be called. Also, current frame is not created yet */
    else {
      const prepreLastThrow = scores.length > 0 ? scores.slice(-3)[0] : 0
      /* /STRIKE MODE/ (prevoius frame is strike)  - update prev frame and current*/
      if (isStrike(prepreLastThrow)) {  // for example, roll 3 after strike in roll 0
        const currentRoundScore = lastScore + lastThrow
        const bonus = currentRoundScore
        const updatePreviuosFrameScore = currentScore + bonus
        const updateCurrentFrameScore = updatePreviuosFrameScore + currentRoundScore
        return cumulativeScores.slice(0, -1).concat([updatePreviuosFrameScore]).concat([updateCurrentFrameScore])
      }
      /* Any other case, update current frame */
      const currentRoundScore = lastScore + lastThrow
      return cumulativeScores.concat([currentScore + currentRoundScore])
    }
  }


  /* Round 10 - Second attampt (role 19) */
  if (isRoll(rolls, 19)) {
    var previousFrameScore = undefined;
    /* /STRIKE MODE/ (previous frame - round 9 roll 16)  - calc prev frame and continue */
    // if in roll 18 there were a strike, than the bonus was given when it happen, so dont recalculate prevoius's frame
    // also, this means that this frame exist
    if (isStrike(preLastThrow) && !isStrike(lastThrow)) {
      const roundScore = lastScore + lastThrow
      previousFrameScore = currentScore + roundScore
    }
    /* /STRIKE MODE/ (previous roll - 18) */
    /* STRIKE!! (lastScore==10) - calculate total frame score - SOULD BE GAMEOVER!! */
    console.log("lastThrow: ", lastThrow)
    if (isStrike(lastThrow)) {
      if (isStrike(lastScore)) {
        const currentRoundScore = lastScore + lastThrow // should be 20
        return cumulativeScores.slice(0, -1).concat([currentScore + currentRoundScore])
      } else {
        console.log("##########################")
        // else - previous is strike, & this was not, we have a bonus round! - do nothing - 
        // TODO check if first attmpt after strike update frame score. here and in regular round Rirst attampt
        return cumulativeScores;
      }
    }
    /* First attmpt (roll 18) was number < 10 - create current frame  */
    const currentRoundScore = lastScore + lastThrow
    return previousFrameScore ?
      cumulativeScores.slice(0, -1).concat([previousFrameScore]).concat([previousFrameScore + currentRoundScore])
      :
      cumulativeScores.concat([currentScore + currentRoundScore])

  }


  /* Bonus Round - roll 20 */
  if (isRoll(rolls, 20)) {
    if (isSpare(preLastThrow, lastThrow) || isStrike(lastThrow)) {
      /* /SPARE MODE/ roll 18+19=10  - update current with bonus of lastScore */
      // console.log("###########################")
      console.log("lastScore: ", lastScore)
      const specialLastRoundSpareonus = lastScore
      return cumulativeScores.slice(0, -1).concat([currentScore + lastScore + specialLastRoundSpareonus])
    }

    if (isStrike(preLastThrow)) {
      /* /STRIKE MODE/ (previous roll - 18) - update current with bonus of 19+lastScore */
      const currentSpecialRoundScore = lastScore + lastThrow
      const specialRoundBonus = currentSpecialRoundScore
      return cumulativeScores.slice(0, -1).concat([currentScore + currentSpecialRoundScore + specialRoundBonus])
    }
  }
  return cumulativeScores
}
export default updateCumulativeScore
