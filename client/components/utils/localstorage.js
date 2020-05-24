export const storeLocation = location => {
  localStorage.setItem('latitude', JSON.stringify(location.latitude))
  localStorage.setItem('longitude', JSON.stringify(location.longitude))
  return `Latitude: ${location.latitude} \nLongitude: ${location.longitude}`
}

export const retrieveLocation = () => {
  let latitude = JSON.parse(localStorage.getItem('latitude'))
  let longitude = JSON.parse(localStorage.getItem('longitude'))
  return {latitude, longitude}
}
