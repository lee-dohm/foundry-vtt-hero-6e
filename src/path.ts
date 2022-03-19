/**
 * Functions for properly and consistently dealing with paths.
 */
export default class Path {
  /**
   * Joins all given path segments together using the platform-specific separator as a delimiter.
   *
   * @param paths Segments of the path to join into one
   * @returns Single joined path
   */
  static join(...paths: string[]): string {
    return paths.join('/')
  }
}
