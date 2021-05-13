/**
 * Logs information passed to it at the `debug` level.
 */
export function debug() {
  const args = ['hero6e |', ...arguments]

  console.debug(...args)
}

/**
 * Logs the current state of an object along with a description.
 *
 * The object and its accompanying message is logged at the `debug` level.
 *
 * @param {String} description Description of what is being dumped
 * @param {*} obj Object to dump to the log
 * @param {*} level Log level to use when dumping the information, defaults to `debug`
 */
export function dump(description, obj, level) {
  let fn = null

  if (typeof level === 'function') {
    fn = level
  } else if (level === 'log' || level === 'info') {
    fn = console.log
  } else {
    fn = console.debug
  }

  fn(`hero6e | ${description}`)
  fn(JSON.parse(JSON.stringify(obj)))
}

/**
 * Logs information passed to it at the normal or `info` level.
 */
export function log() {
  const args = ['hero6e |', ...arguments]

  console.log(...args)
}
