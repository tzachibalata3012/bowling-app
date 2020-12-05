import {Rolls} from "../components/Game/Game.type"

const isBonusRoll = (rolls: Rolls) => {
  const bonusRoll = 20
  return rolls === bonusRoll
}

export default isBonusRoll
