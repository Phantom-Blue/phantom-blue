/* eslint-disable semi */
/* eslint-disable no-console */
/* eslint-disable array-callback-return */
/* eslint-disable no-constant-condition */
/* eslint-disable import/prefer-default-export */

export function generateUrl(loc) {
  let directionsUrl = 'https://www.google.com/maps/dir/?api=1&query='
  loc.split(' ').map((word, ind) => {
    if (ind === 0) {
      directionsUrl = directionsUrl.concat(word)
    } else if (word !== ',' || '.' || '!' || '?') {
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
  return directionsUrl
}
