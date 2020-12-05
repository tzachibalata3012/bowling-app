import React, {Component} from 'react'
import { GameState, Score } from '../Game/Game.type'

import './Controls.css'

const biglwisdomrepo : string[] = [
  '“Obviously you’re not a golfer.” — The Dude',
  '“Hey, nice marmot.” — The Dude',
  '“F*ck it, Dude. Let’s go bowling.” — Walter Sobchak',
  '“This is not ‘Nam. This is bowling. There are rules.” — Walter Sobchak',
  '“What’s a pederast, Walter?” — Donny',
  '“This aggression will not stand, man.” — The Dude',
  '“Careful man, there’s a beverage here!” — The Dude',
  '“Yeah, well, you know, that’s just, like, your opinion, man.” — The Dude'
]

// ports
interface Props {
  restart: ()=> void,
  enterScore: (score: Score) => void
}
export default class Controls extends Component<Partial<Props & GameState & {lastRoll: Score}>> {
  
  handleClick = (score: Score): void => {
      this.props.enterScore!(score)
  }

  disableButton = (number: number) => {
    const {
      gameOver,
      lastRoll,
      rolls,
    } = this.props
    if (gameOver) return true
    if (rolls! % 2 === 0 || rolls === 0) return false
    if (rolls === 19 && lastRoll === 10) return false
    return lastRoll! + number > 10
  }

  render () {
    var sizeable_rand = Math.floor((Math.random() * (biglwisdomrepo.length-1)) + 1);
    if(sizeable_rand > biglwisdomrepo.length-1) { sizeable_rand = 0 }
    const biglwisdom = biglwisdomrepo[sizeable_rand]
    console.log("biglwisdomrepo.length-1: ", biglwisdomrepo.length-1)
    console.log("biglwisdom: ", biglwisdom, ", sizeable_rand: ", sizeable_rand)
    return (
      <div className='Container'>
        {!this.props.gameOver!  &&
          <div >
          <p className="Intro">{biglwisdom}</p>
          <button id='pin0' disabled={this.disableButton(0)} onClick={() => this.handleClick(0)}>0</button>
          <button id='pin1' disabled={this.disableButton(1)} onClick={() => this.handleClick(1)}>1</button>
          <button id='pin2' disabled={this.disableButton(2)} onClick={() => this.handleClick(2)}>2</button>
          <button id='pin3' disabled={this.disableButton(3)} onClick={() => this.handleClick(3)}>3</button>
          <button id='pin4' disabled={this.disableButton(4)} onClick={() => this.handleClick(4)}>4</button>
          <button id='pin5' disabled={this.disableButton(5)} onClick={() => this.handleClick(5)}>5</button>
          <button id='pin6' disabled={this.disableButton(6)} onClick={() => this.handleClick(6)}>6</button>
          <button id='pin7' disabled={this.disableButton(7)} onClick={() => this.handleClick(7)}>7</button>
          <button id='pin8' disabled={this.disableButton(8)} onClick={() => this.handleClick(8)}>8</button>
          <button id='pin9' disabled={this.disableButton(9)} onClick={() => this.handleClick(9)}>9</button>
          <button id='pin10' disabled={this.disableButton(10)} onClick={() => this.handleClick(10)}>10</button>
        </div>
        }
        
        {this.props.rolls! > 0 &&
          <button className={'Restart'} onClick={this.props.restart}>Restart</button>
        }
      </div>
    )
  }
}
