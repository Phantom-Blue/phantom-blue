import React, {Component} from 'react'

const pathA = `M164.5,554.4l-13.6-230.2l-83.6,47.2c-8.6,4.9-19.5-0.2-21.2-10L2.1,16.1C1,7.6,7.6,0,16.3,0h212.6
c8.2,0,14.8,6.7,14.7,14.8L182,186.7l126-71.1c10.5-5.9,23.1,3.2,20.7,15L164.5,554.4z`

const pathB = `M164.5,554.4l76.7-344.1l-127.9,72.1L80.8,0h148.1c8.2,0,14.8,6.7,14.7,14.8L182,186.7l125.9-71
c10.5-5.9,23.2,3.2,20.8,15.1L164.5,554.4z`

const pathAStyle = {
  fill: '#C16385'
}
const pathBStyle = {
  fill: '#982649'
}

export default class MapPin extends Component {
  render() {
    const {size = 500, onClick} = this.props

    return (
      <svg
        // viewBox="0 0 24 24"
        height={size}
        style={{
          ...pathAStyle,
          transform: `translate(${-size / 2}px,${-size}px)`
        }}
        onClick={onClick}
      >
        <path d={pathA} />
        {/* <path d={pathB} /> */}
      </svg>
    )
  }
}

// style={{...pathBStyle}}

// import React, {Component} from 'react'

// const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
//   c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
//   C20.1,15.8,20.2,15.8,20.2,15.7z`

// const pinStyle = {
//   cursor: 'pointer',
//   fill: '#00e3a6',
//   stroke: 'none'
// }

// export default class MapPin extends Component {
//   render() {
//     const {size = 35, onClick} = this.props

//     return (
//       <svg
//         height={size}
//         viewBox="0 0 24 24"
//         style={{...pinStyle, transform: `translate(${-size / 2}px,${-size}px)`}}
//         onClick={onClick}
//       >
//         <path d={ICON} />
//       </svg>
//     )
//   }
// }
