import React from "react"
import { Legend, Pie, PieChart } from "recharts"
import { reduce, addIndex, map, slice } from 'ramda'

import style from './index.scss'

const WIDTH = 480
const HEIGHT = 400
const COLORS = ["#6d51ce", "#4faef7", "#fc90e1"]
const INNER_RADIUS_BASE = 60
const INNER_RADIUS_DIFFERENCE = 10
const OUTER_RADIUS = 120

const getTotal = (array = [], dataKey = "value") => reduce((acc, curr) => (curr ? acc + curr[dataKey] : acc[dataKey]), 0, array)
const getPercent = (value, total) => (value * 100) / total
const getDegreeFromPercent = percent => (percent * 360) / 100

export default ({ data, colors = COLORS, width = WIDTH, height = HEIGHT }) => {
  const total = getTotal(data, "value")
  const dataKey = "value"
  const wrapperStyle = {
    color: "#050C42",
    fontSize: 18,
    fontWeight: "regular"
  }

  const renderCustomLegend = () => (
    <ul className={style.legend} style={{ maxHeight: height }}>
      {addIndex(map)((item, key) => (
        <li key={key} className={style.pieData}>
          <span className={style.dot} style={{ backgroundColor: colors[key] }} />
          <div className={style.stat}>
            <span>{item.label}</span> - <span>{item.value}</span>
          </div>
        </li>
      ))(data || [])}
    </ul>
  )

  return (
    <PieChart width={width} height={height}>
      <Legend
        wrapperStyle={wrapperStyle}
        verticalAlign="middle"
        align="right"
        layout="vertical"
        iconType="circle"
        iconSize={18}
        content={renderCustomLegend}
      />
      {addIndex(map)((item, key) => {
        const currTotal = getTotal(slice(0, key, data), "value")
        const startAngle = getDegreeFromPercent(getPercent(currTotal, total))
        const endAngle = getDegreeFromPercent(getPercent(currTotal + item["value"], total))

        return (
          <Pie
            key={key}
            startAngle={startAngle}
            endAngle={endAngle}
            dataKey={dataKey}
            data={[item]}
            cx={125}
            cy={200}
            innerRadius={INNER_RADIUS_BASE + key * INNER_RADIUS_DIFFERENCE}
            outerRadius={OUTER_RADIUS}
            fill={colors[key]}
            stroke={null}
          />
        )
      })(data || [])}
    </PieChart>
  )
}
