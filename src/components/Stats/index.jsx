import React from 'react'
import Pie from '../Charts/Pie.jsx'
import Bar from '../Charts/Bar.jsx'
import Locale from 'Components/Locale'

import style from './index.scss'

export default ({ usersByGender, usersByRegion, transitions }) => (
  <div className={style.stats}>
    <p><Locale id="stat" /></p>
    <div className={style.pies}>
      <Pie data={usersByGender} />
      <Pie data={transitions} />
    </div>
    <Bar data={usersByRegion} />
  </div>
)
