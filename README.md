# Cachelos
[![npm version](https://badge.fury.io/js/%40merlos%2Fcachelos.svg)](https://badge.fury.io/js/%40merlos%2Fcachelos)

Simple browser cache for storing JSON requests in a Local Storage cache.

## Usage

```
npm install --save @merlos/cachelos
```

Then in your code:


```js static
import { Cache } from 'cachelos'

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
      expiresAfter: 5, // Time an item in the cache will persist in seconds
    }
    console.log('==== example 3 ========')
    console.log(`Cache items will expire after ${config.expiresAfter} sec`)
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
        //save item to cache
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
    console.log('   isValid?', cache.isValid(url))
    const users2 = await myCacheFetch(url)
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
```

Note that the cache uses the URL as part of the key.

The cache expects the responses to be JSON valid contents.

## Development

```bash
git clone https://github.com/merlos/cachelos.git
npm install
```

### `npm start`

Runs a server in `http://localhost:3000/` in watch mode pointing to the [examples folder](https://github.com/merlos/cachelos/tree/master/examples)

### `npm run build`

Builds the package for distribution

### `npm test`

Runs the tests


## License MIT

MIT License

Copyright (c) 2020 Juan M. Merlos (@merlos)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

