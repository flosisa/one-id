import React from 'react'
import Locale from 'Components/Locale'
import Alert from 'Components/Alert/index.jsx'
import style from './index.scss'
import getPersonalData from 'Util/getPersonalData'
import { genericPersonalData } from 'Constants/cabinet'
const personalDataFields = [
    [
        { label: <Locale id="organization" />, key: 'name_latin', width: "55%"  },
        { label: <Locale id="inn" />, key: 'inn', width: "20%"  },
        { label: <Locale id="work_start" />, key: 'work_start', width: "20%"  },
    ],
    [
        { label: <Locale id="position" />, key: 'position', width: "90%" },
    ],
    [
        { label: <Locale id="work_contract" />, key: 'work_contract' },
        { label: <Locale id="command" />, key: 'command' },
    ]
]

const personalData = { 
    name_latin: "ELEKTRON HUKUMAT MARKAZI", 
    inn: '207322159', 
    work_start: "15.10.2020 г.", 
    position: "Етакчи мутахассис в отделе Ижтимоий, таълим ва соғлиқни сақлаш тизимида рақамли технологияларни жорий этиш бўлими (141.,1239,У)",
    work_contract: "№ 46 от 15.10.2020",
    command: "№ 46 от 15.10.2020"
}


export default function WorkHistory() {
    return (
        <div className={style.workHistory}>
            <p className={style.header}>
                <Locale id="work-history" />
            </p>
            <Alert localeId="work-history-alert"/>
            <div className={style.workHistoryCard}>
                {getPersonalData(personalData, personalDataFields, style.workHistoryItems)}
            </div>
            <button type="button" className="secondary">
                <Locale id="reload_info" />
            </button>
        </div>
    )
}
