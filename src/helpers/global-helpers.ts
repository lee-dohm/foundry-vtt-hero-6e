/**
 * Safely returns the global `game` instance.
 *
 * @returns Global `game` instance
 */
export function getGame(): Game {
  if (!(game instanceof Game)) {
    throw new Error('init hook has not been executed yet')
  }

  return game
}
