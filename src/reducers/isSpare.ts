import {Rolls} from "../components/Game/Game.type"

const isSpare = (roll1: Rolls, roll2: Rolls): boolean => { const spare = 10; return roll1 + roll2 === spare && roll1 !== spare}

export default isSpare
