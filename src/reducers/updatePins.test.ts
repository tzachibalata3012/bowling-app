import isStrike from './isStrike'
import { Scores, Score } from "../components/Game/Game.type"
import updatePinsScores from './updatePins'

describe('update scores logic', () => {
  it('should return new scores state', () => {
    const scores: Scores = []
    var lastScore: Score = 10
    // current score is 10
    // even rolls under 18
    for(var r = 0; r<18; r+=2){
      expect(updatePinsScores(scores, r, lastScore)).toEqual(scores.concat([lastScore, 0]))
    }
    for(var r = 1; r<=17; r+=2){
      expect(updatePinsScores(scores, r, lastScore)).toEqual(scores.concat([lastScore]))
    }

    // current score is not 10
    for(var lastScore=0; lastScore<10;lastScore++){
      for(var r = 0; r<=18; r+=1){
        expect(updatePinsScores(scores, r, lastScore)).toEqual(scores.concat([lastScore]))
      }
    }
  })

  it('should return false if not strike', () => {
    for(var i = 0; i < 10; i++) {
      expect(isStrike(i)).toEqual(false)
    }
  })
})