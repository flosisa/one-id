import React from 'react'
import Locale from 'Components/Locale'

export const genericPersonalData = [
  [
    { label: <Locale id="surname" />, key: 'surname' },
    { label: <Locale id="name" />, key: 'name' },
    { label: <Locale id="middle_name" />, key: 'patronym_latin' },
    { label: <Locale id="p_birth" />, key: 'birth_date' },
  ],
  [
    { label: <Locale id="sex" />, key: 'sex' },
    { label: <Locale id="nationality" />, key: 'nationality' },
    { label: <Locale id="p_birth_c" />, key: 'birth_country' },
    { label: <Locale id="p_birth_p" />, key: 'birth_place' },
  ],
  [
    { label: <Locale id="citizenship" />, key: 'citizenship' },
    { label: <Locale id="given" />, key: 'doc_give_place' },
  ],
  [
    { label: <Locale id="doc_given_date" />, key: 'date_begin_document' },
    { label: <Locale id="doc_expiry_date" />, key: 'date_end_document' },
  ]
]
export const userProfile = 'userProfile'
export const contacts = 'contacts'
export const settings = 'settings'

export const physicalEntity = 'physicalEntity'

export const personalDataTabs = [
  { value: userProfile, label: <Locale id="user_profile" /> },
  { value: contacts, label: <Locale id="contacts" /> },
  { value: settings, label: <Locale id="settings" /> },
]
