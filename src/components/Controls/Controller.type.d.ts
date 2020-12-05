import { GameOver, Rolls } from "../Game/Game.type";

export type ControllerState = {
    gameOver : GameOver,
    lastRoll : Rolls, 
    rolls : Rolls
}