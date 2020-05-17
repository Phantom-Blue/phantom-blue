import React, {Component} from 'react'

const ICON = `M54 24a22 22 0 1 0-28 21.1L32 59l6-13.8A22 22 0 0 0 54 24z`

const pathStyle = {
  strokeWidth: '2',
  strokeMiterLimit: '10',
  stroke: '#202020',
  fill: 'none',
  dataName: 'layer2',
  strokeLinejoin: 'round',
  strokeLineCap: 'round'
}
const circleStyle = {
  strokeWidth: '2',
  strokeMiterLimit: '10',
  stroke: '#202020',
  fill: 'none',
  r: '12',
  cy: '24',
  cx: '32',
  dataName: 'layer1',
  strokeLinejoin: 'round',
  strokeLineCap: 'round'
}

export default class CityPin extends Component {
  render() {
    const {size = 2, onClick} = this.props

    return (
      <svg
        style={{
          ...pathStyle,
          transform: `translate(${-size / 2}px,${-size}px)`
        }}
        onClick={onClick}
      >
        <path d={ICON} />
        <circle style={{...circleStyle}} />
      </svg>
    )
  }
}
