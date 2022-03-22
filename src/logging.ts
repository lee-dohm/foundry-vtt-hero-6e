import { HERO_CONFIG } from './config.js'

type LogFunction = (..._data: any[]) => void

/**
 * Formatted logging functions for the Hero6E system.
 */
export default class HeroLog {
  /**
   * Logs information passed to it at the `debug` level.
   */
  static debug(...data: any[]) {
    const args = [`${HERO_CONFIG.system.shortName} |`, ...data]

    console.debug(...args)
  }

  /**
   * Logs the current state of an object along with a description.
   *
   * The object and its accompanying message is logged at the `debug` level.
   *
   * @param description Description of what is being dumped
   * @param obj Object to dump to the log
   * @param level Log level to use when dumping the information, defaults to `debug`
   */
  static dump(description: string, obj: any, level?: string | LogFunction) {
    let fn: LogFunction

    if (typeof level === 'function') {
      fn = level
    } else if (level === 'log' || level === 'info') {
      fn = console.log
    } else {
      fn = console.debug
    }

    fn(`${HERO_CONFIG.system.shortName} | ${description}`)
    if (obj) {
      fn(JSON.parse(JSON.stringify(obj)))
    }
  }

  /**
   * Logs information passed to it at the normal or `info` level.
   */
  static log(...data: any[]) {
    const args = [`${HERO_CONFIG.system.shortName} |`, ...data]

    console.log(...args)
  }
}
