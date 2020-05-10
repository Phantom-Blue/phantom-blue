export function generateUrl(loc) {
  const initialUrl = 'https://www.google.com/maps/search/?api=1';
  loc.split(' ').filter((word) => {
    if (word !== ',' || '.' || '!' || '?') {
      initialUrl.concat('', word);
    }
  });
  return initialUrl;
}
