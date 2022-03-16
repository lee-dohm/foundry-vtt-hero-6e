export enum RoundDirection {
  Down = 'down',
  Up = 'up'
}

export class HeroMath {
  /**
   * Rounds the number according to the HERO System 6th Edition rules.
   *
   * It always rounds numbers with a fractional part starting with `0.4` down (toward zero) and a
   * fractional part starting with `0.6` up (away from zero). Numbers with a fractional part
   * starting with `0.5` are rounded to the benefit of the player. The `direction` parameter
   * indicates which direction would be more advantageous to the player. Pass `'up'` for away from
   * zero and `'down'` for towards zero.
   *
   * @param number Number to round
   * @param direction Direction to round on `0.5`
   * @return Rounded number
   * @hero 6E1 12 Character Points and Rounding
   */
  static round(number: number, direction: RoundDirection): number {
    const sign = number < 0 ? -1 : 1
    const magnitude = Math.abs(number)
    const fracDigit = this.getFirstDecimalDigit(magnitude)
    let integer = Math.floor(magnitude)

    if (fracDigit > 5) {
      integer += 1
    } else if (fracDigit === 5 && direction === RoundDirection.Up) {
      integer += 1
    }

    return integer * sign
  }

  private static getFirstDecimalDigit(number: number): number {
    return Math.floor(number * 10) % 10
  }
}
