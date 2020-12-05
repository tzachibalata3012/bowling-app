import isStrike from "./isStrike";
import { Rolls, Scores, Score } from "../components/Game/Game.type"

const updatePinsScores = (scores: Scores, rolls: Rolls, lastScore: Score) => {
  console.log("rolls: ", rolls, ", lastScore: ", lastScore, ", scores: ", scores)
  if (isStrike(lastScore) && rolls % 2 === 0 && rolls < 18) {
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
    return scores.concat([lastScore, 0]);
  } else {

    return scores.concat([lastScore]);
  }
};

export default updatePinsScores;
