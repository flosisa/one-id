import React from 'react'
import Svg from 'Components/Svg/index.jsx'
import Spinner from 'Components/Spinner/index.jsx'

import style from './index.scss'

export default ({ login, name, photo, onProfileClick, loading }) => (
  <div className={style.profile} onClick={onProfileClick}>
    {loading ? (
      <Spinner />
    ) : login && name && (
      <>
        <div>
          <p>{login}</p>
          <p>{name}</p>
        </div>
        {photo ? <div className={style.circleAvatar}><img className={style.img} src={`data:image/jpeg;base64,${photo}`}/></div>:<Svg id="profile" name="profile" />}
      </>
    )}
  </div>
)
