function formatDice(dice) {
  const full = Math.floor(dice)
  const half = frac(dice) === 0.5 ? 1 : 0

  let rollText = `${full}d6`

  if (half === 1) {
    rollText += ' + 1d3'
  }

  return rollText
}

function frac(num) {
  return num - Math.floor(num)
}

export function rollNormalDamage(dice) {
  const roll = new Roll(formatDice(dice))
}
