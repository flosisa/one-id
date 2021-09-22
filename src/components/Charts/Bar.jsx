import React from "react"
import { Bar, BarChart, CartesianGrid, Cell, Tooltip, XAxis, YAxis, Legend } from "recharts"
import { injectIntl } from 'react-intl'
import { addIndex, map } from 'ramda'
import clsx from 'clsx'

import style from './index.scss'

const WIDTH = 1100
const HEIGHT = 400
const GRID_STROKE_COLOR = "#F4F4F4"
const GRID_STROKE_WIDTH = 1
const Y_AXIS_COLOR = "#C4C4C4"
const BAR_COLOR = "#0C7B93"
const BAR_BACKGROUND_COLOR = "#F4F4F4"
const BAR_SIZE = 40
const BAR_RADIUS = 10

const COLORS = [
  "#0C7B93",
  "#FF2727",
  "#21BF73",
  "#6E5773",
  "#5F6CAF",
  "#40BFC1",
  "#916DD5",
  "#2C786C",
  "#758184",
  "#FF971D",
  "#CF56A1",
  "#007944",
  '#face70',
  '#f589a0',
  '#11a2c2',
  '#d60606',
  '#0bb362',
  '#9547a6',
  '#2e4ce6',
  '#19a4a6',
  '#442382',
  '#149c86',
  '#8fabb3',
  '#d69242',
  '#de2899',
  '#05a35e',
  '#d19f34',
  '#d65c76'
]

export default injectIntl(({
  data,
  colors = COLORS,
  width = WIDTH,
  height = HEIGHT,
  gridStrokeColor = GRID_STROKE_COLOR,
  gridStrokeWidth = GRID_STROKE_WIDTH,
  yAxisColor = Y_AXIS_COLOR,
  barColor = BAR_COLOR,
  barBackgroundColor = BAR_BACKGROUND_COLOR,
  barSize = BAR_SIZE,
  barRadius = BAR_RADIUS,
  intl
}) => {
  const dataKey = 'value'
  const barName = intl.formatMessage({ id: 'total' })
  const barUnit = intl.formatMessage({ id: 'user-short' })

  const renderCustomLegend = () => (
    <ul className={style.legend} style={{ maxHeight: height }}>
      {addIndex(map)((item, key) => (
        <li key={key} className={clsx(style.barData, style.stat)} style={{ borderLeft: `0.125rem solid ${colors[key]}` }}>
          <span>{item.label}</span> - <span>{item.value}</span>
        </li>
      ))(data)}
    </ul>
  )

  return (
    <BarChart width={width} height={height} data={map(item => ({ ...item, radius: barRadius }))(data || [])}>
      <CartesianGrid stroke={gridStrokeColor} strokeWidth={gridStrokeWidth} />
      <XAxis dataKey="label" hide={true} />
      <YAxis axisLine={false} stroke={yAxisColor} />
      <Tooltip separator=": " />
      <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ display: "flex" }} content={renderCustomLegend} />

      <Bar
        dataKey={dataKey}
        barSize={barSize}
        name={barName}
        unit={barUnit}
        xAxis={null}
        fill={barColor}
        background={{ fill: barBackgroundColor }}
      >
        {addIndex(map)((_, key) => (
          <Cell key={key} fill={colors[key]} />
        ))(data)}
      </Bar>
    </BarChart>
  )
})
