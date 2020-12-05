import React from 'react'
import isSpare from './isSpare'
import {shallow} from 'enzyme'

describe('isSpare function', () => {
  it('should return true if spare', () => {
    for (var i = 0; i < 10; i++) {
      expect(isSpare(i, 10 - i)).toEqual(true)
    }
  })

  it('should return false if not spare', () => {
    for(var i = 0; i < 9; i++) {
      expect(isSpare(i, 1)).toEqual(false)
    }
    // strike! not spare
    expect(isSpare(10,0)).toEqual(false)
  })
})
