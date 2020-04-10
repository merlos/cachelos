/**
 * A simple local storage cache for JSON objects
 */
const Cache = ({ validTime }) => {
  const cache = {}
  /**
   * Cache configuration
   */
  cache.config = {
    /**
     * Time an item is valid by default.
     * Expressed in milliseconds
     */
    validTime: validTime ?? 3600 * 1000,
  }

  cache.expiresOnKey = (url) => {
    return url + '--expiresOn'
  }
  /**
   * Returns the time the `url` expires
   * If the url does not exist returns null.
   */

  cache.getExpiresOn = (url) => {
    const expiresOn = localStorage.getItem(cache.expiresOnKey(url))
    return expiresOn ? parseInt(expiresOn) : null
  }

  /**
   * Is the entrance of the time valid
   */
  cache.isValid = (url) => {
    const expiresOn = cache.getExpiresOn(url)
    // If expiration time exists compare with current time
    // If does not exist it has expired.
    return expiresOn ? expiresOn > Date.now() : false
  }

  /**
   * Sets expiration time for the `url`
   */
  cache._setExpiresOn = (url, expiresOn = -1) => {
    const defaultTime = Date.now() + cache.config.validTime
    localStorage.setItem(
      cache.expiresOnKey(url),
      expiresOn < 0 ? defaultTime : expiresOn
    )
  }

  /**
   * Adds or updates the url item in the localStorage
   *
   * expiresOn is expressed in milliseconds. If negative uses the default config.
   * Example const expires = Date.now().getTime() + 1000
   */
  cache.set = (url, data, expiresOn = -1) => {
    //Adds/Update expiration time
    cache._setExpiresOn(url, expiresOn)
    //add/Update data
    localStorage.setItem(url, JSON.stringify(data))
  }
  /**
   *  Get item from cache
   */
  cache.get = (url) => {
    return JSON.parse(localStorage.getItem(url))
  }
  return cache
}
export default Cache
