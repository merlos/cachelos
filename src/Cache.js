/**
 * A simple local storage cache for JSON objects
 *
 * Configuration options are
 * ```json
 *   {
 *     expiresAfter: 3600 , // is the time an entry in the cache will be valid expressed in seconds
 *     name: "@merlos/cachelos" // is the name of the cache. It is used to identify the items in the local storage that belong to the cache
 *  }
 * ```
 * @param {Object} config optional configuration object
 *
 * @returns {Cache} A cache object
 */
const Cache = (config = {}) => {
  const { expiresAfter, name } = config

  const cache = {}
  /**
   * Cache configuration
   */
  cache.config = {
    /**
     * Time an item is valid by default.
     * Expressed in seconds
     */
    expiresAfter: expiresAfter ?? 3600,
    name: name ?? '@merlos/cachelos',
  }

  /**
   * Gets the key in local storage for the url
   */
  cache.itemKey = (url) => {
    return `${cache.config.name}--${url}`
  }
  /**
   * Gets the key in local storage with the expiration time for the url
   *
   */
  cache.expiresOnKey = (url) => {
    return `${cache.itemKey(url)}--expiresOn`
  }

  /**
   * Returns the time (EPOC) when the `url` is expected to expire
   * If the url does not exist returns null.
   *
   * @returns {number} Number of milliseconds (EPOC)
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
    const defaultTime = Date.now() + cache.config.expiresAfter * 1000
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
    localStorage.setItem(cache.itemKey(url), JSON.stringify(data))
  }
  /**
   *  Get item from cache
   * @param {string} url
   * @returns {Object} Parsed json object
   */
  cache.get = (url) => {
    return JSON.parse(localStorage.getItem(cache.itemKey(url)))
  }
  cache.remove = (url) => {
    localStorage.removeItem(cache.itemKey(url))
  }

  /**
   * Fetch call that
   */
  cache.fetch = async (url, options) => {
    if (cache.isValid(url)) {
      return cache.get(url)
    } else {
      const res = await fetch(url, options)
      if (res.ok) {
        const data = await res.json()
        cache.set(url, data)
        return data
      } else {
        throw Error(res.statusText)
      }
    }
  }
  /**
   * Clears the cache
   */
  cache.clear = async () => {
    const keys = Object.keys(localStorage)
    keys.map((key) => {
      console.log('clear key:', key, key.includes(cache.config.name))
      key.includes(cache.config.name) && localStorage.removeItem(key)
    })
  }
  return cache
}

export default Cache
