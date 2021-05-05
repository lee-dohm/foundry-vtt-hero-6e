/**
 * Logs the current state of an object along with a description.
 *
 * The object and its accompanying message is logged at the `debug` level.
 *
 * @param {String} description Description of what is being dumped
 * @param {*} obj Object to dump to the log
 */
export function dump(description, obj) {
  console.debug(`hero6e | ${description}`)
  console.debug(JSON.parse(JSON.stringify(obj)))
}
