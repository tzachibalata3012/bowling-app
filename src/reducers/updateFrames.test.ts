import React from 'react'
import isStrike from './isStrike'
import { shallow } from 'enzyme'
import { Rolls, Scores, Score, Frames, Frame, FrameScore, ScoreObject } from "../components/Game/Game.type"
import updateFrames from './updateFrames'

describe('update scores logic', () => {
  it('should add new frame', () => {
    const frame: Frame = [{ score: 1, display: '1' }]
    const frames: Frames = [frame, frame]
    const scores: Scores = []
    const evenNotBonusRolls: Rolls = 2
    var lastScore: Score = 2
    const expectedFrames: Frames = [
      frame, frame, [{ score: lastScore, display: '2' }]
    ]
    for(var roll = 0; roll < 20; roll+=2) {
      expect(updateFrames(roll, lastScore, frames, scores)).toEqual(expectedFrames)
    }

  })

  it('should replace current frame', () => {
    const frameScore: ScoreObject = { score: 1, display: '1' }
    const frame: Frame = [frameScore]
    const frames: Frames = [frame]
    const scores: Scores = []
    const evenNotBonusRolls: Rolls = 1
    var lastScore: Score = 2
    const expectedFrames: Frames = [
      [frameScore, { score: lastScore, display: '2' }]
    ]
    for(var roll = 1; roll < 20; roll+=2) {
      expect(updateFrames(evenNotBonusRolls, lastScore, frames, scores)).toEqual(expectedFrames)
    }
  })

  it('bonus - should add new frame - thired!', () => {
    const frameScore: ScoreObject = { score: 9, display: '9' }
    const frameScore2: ScoreObject = { score: 1, display: '/' }
    const frame: Frame = [frameScore, frameScore2]
    const frames: Frames = [frame]
    const scores: Scores = []
    const bonusRolls: Rolls = 20
    var lastScore: Score = 2
    const expectedFrames: Frames = [
      [frameScore, frameScore2, { score: lastScore, display: '2' }]
    ]
    expect(updateFrames(bonusRolls, lastScore, frames, scores)).toEqual(expectedFrames)
  })

})