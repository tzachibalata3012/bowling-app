import React from 'react'
import isStrike from './isStrike'
import { shallow } from 'enzyme'
import { Rolls, Scores, Score, Frames, Frame, FrameScore, ScoreObject } from "../components/Game/Game.type"
import updateCurrentRoll from './updateCurrentRoll'

describe('update roll state', () => {
  it('should increment by one', () => {
    const lastScoreAllPins: Score = 10
    // odd rolls (will always inc by 1, even if spare)
    for(var roll: Rolls=1; roll < 18; roll+=2){
      expect(updateCurrentRoll(roll, lastScoreAllPins)).toEqual(roll+1)
    }

    // even rolls - will increment by 2 
    for(var roll: Rolls=0; roll < 18; roll+=2){
      expect(updateCurrentRoll(roll, lastScoreAllPins)).toEqual(roll+2)
    }

    // non strike rolls
    for(var score = 0; score < 10; score++){
      for(var roll: Rolls=0; roll < 18; roll++){
        expect(updateCurrentRoll(roll, score)).toEqual(roll+1)
      }
    }

    // rolls 18, 19 & 20
    for(var roll: Rolls=18; roll <=20; roll++){
      expect(updateCurrentRoll(roll, lastScoreAllPins)).toEqual(roll+1)
    }
    
  })


})