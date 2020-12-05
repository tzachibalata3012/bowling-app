import { Score } from "../components/Game/Game.type"

const isStrike = (score: Score): boolean => {
  const strike = 10
  return score === strike
}

export default isStrike
