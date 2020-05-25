import ls from 'local-storage'

export const getLSLocation = () => {
  const latitude = ls.get('latitude')
  const longitude = ls.get('longitude')
  const lSLocation = {latitude, longitude}
  return lSLocation
}

export const setLSLocation = location => {
  ls.set('latitude', location.latitude)
  ls.set('longitude', location.longitude)
}

export const windowCheck = () => {
  if (window) {
    return window
  }
}

export function generateUrl(loc, loc2) {
  let directionsUrl = 'https://www.google.com/maps/dir//'

  function craftUrls(str) {
    str.split(' ').map((word, ind) => {
      if (ind === 0) {
        directionsUrl = directionsUrl.concat(word)
      } else if (word !== ',' || word !== '.' || word !== '!' || word !== '?') {
        if (word.endsWith(',')) {
          const comaLessWord = word.substring(0, word.length - 1)
          directionsUrl = directionsUrl.concat('+', comaLessWord)
        } else {
          directionsUrl = directionsUrl.concat('+', word)
        }
      }
      if (word === ',') {
        directionsUrl = directionsUrl.concat('%', '2C')
      }
    })
  }
  if (typeof loc !== 'string') {
    let num = loc.toString(10)
    // console.log(num, ' inside utils, first number')
    craftUrls(num)
  }
  if (loc2 && loc !== 'string') {
    let num2 = loc2.toString(10)
    // console.log(num2, 'inside utils, second number')
    craftUrls(num2)
  } else {
    craftUrls(loc)
  }
  return directionsUrl
}
