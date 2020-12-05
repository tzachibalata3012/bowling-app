import { Scores, Score, FramesScores } from "../components/Game/Game.type"
import updateCumulativeScore from './updateCumulativeScore'

describe('update roll state', () => {
  it('2 strikes in last roll (bonus)', () => {
    const cumulativeScores: FramesScores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 30]
    const scores: Scores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10]
    const lastScore: Score = 10
    const expectedCummlativeScores = cumulativeScores.slice(0, -1).concat([50])
    expect(updateCumulativeScore(cumulativeScores, scores, lastScore)).toEqual(expectedCummlativeScores)
  })

  it('strike, number < 10 in last roll (bonus)', () => {
    const cumulativeScores: FramesScores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 30]
    const scores: Scores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10]
    for (var score = 0; score < 10; score++) {
      const expectedCummlativeScores = cumulativeScores.slice(0, -1).concat([30 + (score * 2)])
      expect(updateCumulativeScore(cumulativeScores, scores, score)).toEqual(expectedCummlativeScores)
    }
  })

  it('spare in 10th frame in last roll (bonus)', () => {
    const cumulativeScores: FramesScores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 10]
    var scores: Scores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10]
    for (var score = 0; score < 10; score++) {
      const expectedCummlativeScores = cumulativeScores.slice(0, -1).concat([10 + (score * 2)])
      expect(updateCumulativeScore(cumulativeScores, scores, score)).toEqual(expectedCummlativeScores)
    }
    scores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0]

    for (var score = 0; score < 1; score++) {
      const expectedCummlativeScores = cumulativeScores.slice(0, -1).concat([10 + (score * 2)])
      expect(updateCumulativeScore(cumulativeScores, scores, score)).toEqual(expectedCummlativeScores)
    }
  })
  // roll 19
  it('strike on roll 17 and no strike on roll 18 (first throw of last round)', () => {
    const cumulativeScores: FramesScores = [0, 0, 0, 0, 0, 0, 0, 0, 10]
    var scores: Scores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0]
    for (var score = 0; score < 10; score++) {
      expect(updateCumulativeScore(cumulativeScores, scores, score))
        .toEqual([0, 0, 0, 0, 0, 0, 0, 0, 10 + score].concat(10 + score + score))
    }
  })

  it('strike on roll 18 and strike on current', () => {
    const cumulativeScores: FramesScores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 10]
    var scores: Scores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10]
    const expectedCummlativeScores = cumulativeScores.slice(0, -1).concat([10 + (10 * 2)])
    expect(updateCumulativeScore(cumulativeScores, scores, 10))
      .toEqual(expectedCummlativeScores)

  })

  it('strike on roll 18 and no strike on current - should do nothing (waiting for bonus round)', () => {
    const cumulativeScores: FramesScores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 10]
    var scores: Scores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10]
    for (var score = 0; score < 10; score++) {
      expect(updateCumulativeScore(cumulativeScores, scores, score))
        .toEqual(cumulativeScores)
    }
  })

  it('no strike on roll 18 and no strike on current - should do nothing (waiting for bonus round)', () => {
    const cumulativeScores: FramesScores = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    var scores: Scores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4]
    for (var score = 0; score < 1; score++) {
      expect(updateCumulativeScore(cumulativeScores, scores, score))
        .toEqual(cumulativeScores.concat(4 + score))
    }
  })

  // all rounds (2-18)
  it('first attampt (even rolls) - previous round was spare', () => {
    const cumulativeScores: FramesScores = [10]
    var scores: Scores = [6, 4]
    for (var score = 0; score < 10; score++) {
      expect(updateCumulativeScore(cumulativeScores, scores, score))
        .toEqual(cumulativeScores.slice(0, -1).concat([10 + score]))
    }
  })

  it('first attampt (even rolls) - strike on previous round and now!!', () => {
    const cumulativeScores: FramesScores = [10]
    var scores: Scores = [10, 0]
    var score = 10
    expect(updateCumulativeScore(cumulativeScores, scores, score))
      .toEqual(cumulativeScores.slice(0, -1).concat([10 + score]).concat([10 + score + score]))
  })

  it('first attampt (even rolls) - no spare and no strike on previous round', () => {
    const cumulativeScores: FramesScores = [4]
    var scores: Scores = [1, 3]
    var score = 10
    for (var score = 0; score < 10; score++) {
      expect(updateCumulativeScore(cumulativeScores, scores, score))
        .toEqual(cumulativeScores)
    }
  })

  it('second attampt (odd rolls) - strike on previous round', () => {
    const cumulativeScores: FramesScores = [10]
    var scores: Scores = [10, 0, 1]
    var score = 3
    expect(updateCumulativeScore(cumulativeScores, scores, score))
      .toEqual(cumulativeScores.slice(0, -1).concat([10 + 1 + score].concat(10 + 1 + score + 1 + score)))
  })

  it('second attampt (odd rolls) - no strike on previous round', () => {
    const cumulativeScores: FramesScores = [9]
    var scores: Scores = [4, 5, 1]
    var score = 3
    expect(updateCumulativeScore(cumulativeScores, scores, score))
      .toEqual(cumulativeScores.concat(9 + 1 + score))
  })

  it('first roll (first round) - strike!', () => {
    const cumulativeScores: FramesScores = []
    var scores: Scores = []
    var score = 10
    expect(updateCumulativeScore(cumulativeScores, scores, score))
      .toEqual(cumulativeScores.concat([10]))
  })

  it('first roll (first round) - no strike :(', () => {
    const cumulativeScores: FramesScores = []
    var scores: Scores = []
    for (var score = 0; score < 10; score++) {
      expect(updateCumulativeScore(cumulativeScores, scores, score))
        .toEqual(cumulativeScores)
    }
  })


  it('second roll (first round) - doesnt realy metter', () => {
    const cumulativeScores: FramesScores = []
    var scores: Scores = [1]
    for (var score = 0; score < 9; score++) {
      expect(updateCumulativeScore(cumulativeScores, scores, score))
        .toEqual(cumulativeScores.concat([1 + score]))
    }
  })




})