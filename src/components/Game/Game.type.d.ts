export type Score = number
// export type Score = 0|1|2|3|4|5|6|7|8|9|10
export type ScoreDisplay = "X" | "/" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | ""
export type ScoreObject = { 
  score: Score, 
  display: ScoreDisplay
}


export type Action = { type: ActionType, payload: ActionPaylod }
export type ActionPaylod = Score
export type ActionType = 'Game/EnterScore' | 'Game/Restart'
export type Frame = ScoreObject[];
export type Frames = Frame[]
export type FrameScore = Score
export type FramesScores = FrameScore[]
export type GameOver = boolean
export type Scores = Score[]
export type Rolls = number

export type GameState = {
    frames: Frames,
    cumulativeScores: FramesScores,
    gameOver: GameOver,
    scores: Scores,
    rolls: Rolls
  }