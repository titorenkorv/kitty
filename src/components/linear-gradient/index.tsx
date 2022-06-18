import React, { FC } from 'react'
import Svg, { Defs, LinearGradient as RNLinearGradient, Rect, Stop, SvgProps } from 'react-native-svg'

interface IGradientCoords {
  readonly x: number
  readonly y: number
}

interface IGradientStop {
  readonly offset: number
  readonly color: string
  readonly opacity: number
}

export interface ILinearGradientProps extends SvgProps {
  readonly start?: IGradientCoords
  readonly end?: IGradientCoords
  readonly stops?: ReadonlyArray<IGradientStop>
}

const defaultStartingCoords = {
  x: 0,
  y: 0
}

const defaultEndingCoords = {
  x: 0,
  y: 1
}

const defaultStops = [
  {
    offset: 0,
    color: 'rgb(0,0,0)',
    opacity: 0
  },
  {
    offset: 1,
    color: 'rgb(0,0,0)',
    opacity: 1
  }
]

export const LinearGradient: FC<ILinearGradientProps> = ({
  start = defaultStartingCoords,
  end = defaultEndingCoords,
  stops = defaultStops,
  ...props
}) => {
  return (
    <Svg {...props}>
      <Defs>
        <RNLinearGradient id="grad" x1={`${start.x * 100}%`} y1={`${start.y * 100}%`} x2={`${end.x * 100}%`} y2={`${end.y * 100}%`}>
          {stops.map((stopPoint, index) => (
            <Stop key={index} offset={`${stopPoint.offset * 100}%`} stopColor={stopPoint.color} stopOpacity={stopPoint.opacity} />
          ))}
        </RNLinearGradient>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
    </Svg>
  )
}
