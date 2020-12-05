import isBonusRoll from './isBonusRoll'

describe('isBonusRoll function', () => {
  it('should return true if bonus roll', () => {
    expect(isBonusRoll(20)).toEqual(true)
  })

  it('should return false if not bonus roll', () => {
    for(var i = 0; i < 20; i++) {
      expect(isBonusRoll(i)).toEqual(false)
    }
  })
})
