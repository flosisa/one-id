import en from './messages/en_US'
import ru from './messages/ru_RU'
import kr from './messages/uz_KR'
import lt from './messages/uz_LT'

const locales = {
  ru: 'ru',
  en: 'en',
  lt: 'uz',
  kr: 'uz',
}

export default ({
  en: { locale: locales.en, messages: en },
  ru: { locale: locales.ru, messages: ru },
  kr: { locale: locales.kr, messages: kr },
  lt: { locale: locales.lt, messages: lt }
})
