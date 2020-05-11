export function generateUrl(loc) {
  let directionsUrl = 'https://www.google.com/maps/dir//'
  loc.split(' ').map((word, ind) => {
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
  return directionsUrl
}
