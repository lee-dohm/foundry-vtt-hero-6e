/**
 * Rounds the number according to the HERO System 6th Edition rules.
 *
 * It always rounds numbers with a fractional part starting with `0.4` down (toward zero) and a
 * fractional part starting with `0.6` up (away from zero). Numbers with a fractional part
 * starting with `0.5` are rounded to the benefit of the player. The `direction` parameter
 * indicates which direction would be more advantageous to the player. Pass `'up'` for away from
 * zero and `'down'` for towards zero.
 *
 * @param {Number} number Number to round
 * @param {String} direction Direction to round on `0.5`
 * @return {Number} Rounded number
 * @hero 6E1 12 Character Points and Rounding
 */
export function round(number, direction) {
  if (!direction) {
    throw new Error('Direction parameter is required')
  }

  const sign = number < 0 ? -1 : 1
  const magnitude = Math.abs(number)
  const fracDigit = getFirstDecimalDigit(magnitude)
  let integer = Math.floor(magnitude)

  if (fracDigit > 5) {
    integer += 1
  } else if (fracDigit === 5 && direction === 'up') {
    integer += 1
  }

  return integer * sign
}

function getFirstDecimalDigit(number) {
  return Math.floor(number * 10) % 10
}
