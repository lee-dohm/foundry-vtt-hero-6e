import * as hero from '../../src/hero/hero'

describe('validateDamageRoll', () => {
  it('accepts a simple number of d6 as valid', () => {
    expect(hero._validateDamageRoll('5d6')).toBe(true)
  })

  it('accepts a normal damage specifier', () => {
    expect(hero._validateDamageRoll('5d6N')).toBe(true)
  })

  it('accepts a killing damage specifier', () => {
    expect(hero._validateDamageRoll('5d6k')).toBe(true)
  })

  it('accepts a half d6', () => {
    expect(hero._validateDamageRoll('5.5D6')).toBe(true)
  })

  it('rejects a fractional number of dice other than half', () => {
    expect(hero._validateDamageRoll('5.7d6')).toBe(false)
  })

  it('accepts an actual half fraction', () => {
    expect(hero._validateDamageRoll('5½d6')).toBe(true)
  })

  it('rejects non-d6', () => {
    expect(hero._validateDamageRoll('5d10')).toBe(false)
  })

  it('accepts a plus or minus one', () => {
    expect(hero._validateDamageRoll('5d6-1')).toBe(true)
    expect(hero._validateDamageRoll('5d6+1')).toBe(true)
  })

  it('rejects a plus or minus amount other than one', () => {
    expect(hero._validateDamageRoll('5d6-7')).toBe(false)
    expect(hero._validateDamageRoll('5d6+3')).toBe(false)
  })

  it('accepts all the things', () => {
    expect(hero._validateDamageRoll('5½d6+1K')).toBe(true)
  })
})
