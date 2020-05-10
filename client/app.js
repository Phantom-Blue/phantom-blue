import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {MapView} from './components/mapView/MapView'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <MapView />
    </div>
  )
}

export default App
