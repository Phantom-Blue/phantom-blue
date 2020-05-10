/* eslint-disable semi */
/* eslint-disable no-console */
/* eslint-disable array-callback-return */
/* eslint-disable no-constant-condition */
/* eslint-disable import/prefer-default-export */

export function generateUrl(loc) {
  let initialUrl = 'https://www.google.com/maps/dir/?api=1&query=';
  loc.split(' ').map((word, ind) => {
    if (ind === 0) {
      initialUrl = initialUrl.concat(word);
    } else if (word !== ',' || '.' || '!' || '?') {
      if (word.endsWith(',')) {
        const comaLessWord = word.substring(0, word.length - 1)
        initialUrl = initialUrl.concat('+', comaLessWord);
      } else {
        initialUrl = initialUrl.concat('+', word);
      }
    }
    if (word === ',') {
      initialUrl = initialUrl.concat('%', '2C');
    }
  });
  return initialUrl;
}
