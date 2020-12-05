import React, {Component} from 'react'

import Scorecard from '../Scorecard'
import Controls from '../Controls'
import {Frames, FramesScores, GameOver, Scores, Rolls} from "./Game.type"

import './Game.css'
import { SystemState } from '../../App.type'

interface Props {
  game : {
    frames: Frames,
    cumulativeScores: FramesScores,
    gameOver: GameOver,
    scores: Scores,
    rolls: Rolls
  }
}

export default class Game extends Component<Props, SystemState> {
  render () {
    const {
      game: {
        frames,
        cumulativeScores,
        gameOver,
        scores,
        rolls,
      },
    } = this.props

    const totalScore = cumulativeScores.slice(-1)[0]
    var lastRoll = 0
    if(scores.slice(-1)[0] && scores.slice(-1)[0]){
      lastRoll = scores.slice(-1)[0]!
    }
    return (
      <div className='Game'>
        <Scorecard
          frames={frames}
          cumulativeScores={cumulativeScores}
          totalScore={totalScore}
        />
        <Controls
          gameOver={gameOver}
          lastRoll={lastRoll}
          rolls={rolls}
        />
        {gameOver &&
          <div className='Game-over-text'>
            <h1>Game Over</h1>
            <h2>You Scored: {totalScore}</h2>
          </div>
        }
      </div>
    )
  }
}
