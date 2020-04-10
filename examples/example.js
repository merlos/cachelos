import Cache from '../src/Cache'

/**
 * Basic example
 */
export const example1 = async () => {
  const cache = Cache()
  const url = './users.json'
  try {
    console.log('==== example 1 ========')
    console.log('1) A fetch that makes a request to server')
    const users = await cache.fetch(url)
    console.log('   Response:', users) // an array with users
    console.log('   isValid', cache.isValid(url)) // true
    console.log('   expiresOn:', Date.parse(cache.getExpiresOn()))

    console.log('2) Second fetch gets JSON from cache, not from server')
    const users2 = await cache.fetch(url)
    console.log('   Response:', users2) // an array with users
  } catch (error) {
    console.log(error)
  }
  //Clear cache
  cache.clear()
}

//Sleep function
function sleep(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000))
}

const example2 = async () => {
  try {
    const config = {
      name: 'MyCacheName', //If you need have more than one cache at a time, set a name
      expiresAfter: 5, // Time an item in the cache will persist as valid in ms}
    }
    console.log('==== example 2  ========')
    console.log(`Cache items will expire after ${config.expiresAfter} sec`)
    const cache = Cache(config)
    const url = './users.json'

    console.log('1) A fetch that makes a request to server')
    const users = await cache.fetch(url)
    console.log('   isValid? ', cache.isValid(url)) // true
    console.log('   expiresOn:', Date(cache.getExpiresOn()))

    console.log('2) Waiting 6 seconds:')
    await sleep(6)
    console.log('   done waiting')
    console.log('   isValid? ', cache.isValid(url)) // false
  } catch (error) {
    console.log(error)
  }
}

const example3 = async () => {
  try {
    const config = {
      expiresAfter: 5, // Time an item in the cache will persist as valid in ms}
    }
    console.log('==== example 3 ========')
    console.log(`Cache items will expire after ${config.expiresAfter} ms`)
    const cache = Cache(config)
    const url = './users.json'

    // If you want to have a lower level control of the cache
    // you can create your own fetch
    const myCacheFetch = async (url) => {
      if (cache.isValid(url)) {
        console.log('myCacheFetch: data from cache')
        return cache.get(url)
      }
      console.log('myCacheFetch: data from server')
      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json()
        //save to cache
        cache.set(url, data)
        return data
      }
      throw Error(res.errorText)
    }

    console.log('1) myCacheFech fetch ')
    const users = await myCacheFetch(url)
    console.log('2) Waiting 6 seconds:')
    await sleep(6)
    console.log('   done waiting')
  } catch (error) {
    console.log(error)
  }
}

const runExamples = async () => {
  await example1()
  await example2()
  await example3()
}

runExamples().then('finished running example')
