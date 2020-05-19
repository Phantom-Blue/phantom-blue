import React, {Component} from 'react'

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`

const pinStyle = {
  cursor: 'pointer',
  fill: '#00e3a6',
  stroke: 'none'
}

export default class MapPin extends Component {
  render() {
    const {size = 35, onClick} = this.props

    return (
      <svg
        height={size}
        viewBox="0 0 24 24"
        style={{...pinStyle, transform: `translate(${-size / 2}px,${-size}px)`}}
        onClick={onClick}
      >
        <path d={ICON} />
      </svg>
    )
  }
}

// import React, {Component} from 'react'

// const ICON = `M54 24a22 22 0 1 0-28 21.1L32 59l6-13.8A22 22 0 0 0 54 24z`

// const pathStyle = {
//   strokeWidth: '2',
//   strokeMiterLimit: '10',
//   stroke: '#ADDEFF',
//   fill: 'none',
//   dataName: 'layer2',
//   strokeLinejoin: 'round',
//   strokeLineCap: 'round'
// }

// const circleStyle = {
//   strokeWidth: '2',
//   strokeMiterLimit: '10',
//   stroke: '#ADDEFF',
//   fill: 'none',
//   r: '12',
//   cy: '24',
//   cx: '32',
//   dataName: 'layer1',
//   strokeLinejoin: 'round',
//   strokeLineCap: 'round'
// }

// export default class CityPin extends Component {
//   render() {
//     const {size = 2, onClick} = this.props

//     return (
//       <svg
//         style={{
//           ...pathStyle,
//           transform: `translate(${-size / 2}px,${-size}px)`
//         }}
//         onClick={onClick}
//       >
//         <path d={ICON} />
//         <circle style={{...circleStyle}} />
//       </svg>
//     )
//   }
// }
