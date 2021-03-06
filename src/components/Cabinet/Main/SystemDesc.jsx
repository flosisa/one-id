import React from 'react'
import Alert from '../../Alert/index.jsx'

import style from './index.scss'

export default ({ locale, showAlert, closeAlert }) => (
  <div className={style.systemDesc}>
    {showAlert && <Alert className={style.newsAlert} localeId="alert-news" closeAlert={closeAlert}/>}
    {
      locale === 'kr' ? (
        <>
          <section>
            <p>Бир аккаунт – электрон ҳукуматнинг барча тизимлари</p>
            <span>OneID нинг электрон ҳукумат тизимлари билан интеграцияси бир аккаунтдан фойдаланган ҳолда барча тегишли ресурсларга кириш имконини беради.</span>
            <span>OneID даги аккаунтингизни қўллаган ҳолда барча хизматлардан фойдаланишингиз мумкин.</span>
          </section>

          <section>
            <p>Хавфсизлик ва ҳақиқийлик</p>
            <span>Ягона идентификация тизимида шахсий ҳақиқийликни тасдиқлаш учун фойдаланувчи томонидан электрон рақамли имзо тақдим этилиши зарур.</span>
            <span>Шундай қилиб, жисмоний шахснинг интернетдаги фойдаланувчига мувофиқлиги таъминланади. Бу эса ўз навбатида илғор давлат хизматларини онлайн тарзда кўрсатишга имкон яратади. </span>
            <span>Бундан ташқари, жисмоний ва юридик шахсларнинг марказий базалари билан интеграцияси ҳисобига ўзининг барча шахсий маълумотларини тўлдириш зарурати қолмайди – фойдаланувчининг долзарб маълумотлари автомат равишда юкланади ва ўз вақтида янгиланиб боради (мисол учун, фамилияси ёки яшаш манзили ўзгарган тақдирда).</span>
          </section>

          <section>
            <p>Бошқа сайтлар билан интеграция</p>
            <span>Агарда Сиз веб-сайт эгаси бўлсангиз ва бирон-бир хизмат кўрсатиш учун (банк хизматлари, электрон тижорат ва ҳ.к.) фойдаланувчини ҳақиқий идентификация қилмоқчи бўлсангиз, унда OneID тўғри ва қулай усулдир. </span>
            <span>Ягона идентификация тизими қонуний мустаҳкамланган. Ўзбекистон Республикаси Вазирлар Маҳкамасининг 2015 йил 17 декабрдаги 365-сон қарорига мувофиқ Ягона идентификация тизимидан фойдаланувчилар ҳақида олинган маълумотлар ҳаққоний ҳисобланади.</span>
          </section>

          <section>
            <p>Юридик шахсларнинг идентификацияси</p>
            <span>Агарда Сиз ташкилот (компания) раҳбари бўлсангиз ва жисмоний шахс сифатида рўйхатдан ўтган бўлсангиз, шахсий кабинетингизда ташкилотингизни қўшишингиз мумкин.</span>
            <span>Бунинг учун OneID тизимида шахсий кабинетда ташкилот раҳбари номига олинган ЭРИни тақдим этиш зарур.</span>
            <span>Юридик шахсни қўшиш орқали, ташкилотингиз номидан давлат хизматларидан фойдаланиш учун ўзингизга юклатилган вазифаларни бошқа фойдаланувчиларга (ходимларингизга) тақсимлаш имкониятига эга бўласиз.</span>
          </section>
        </>
      ) : (
          <>
            <section>
              <p>Одна учетная запись - все системы электронного правительства</p>
              <span>Интеграция OneID с системами электронного правительства позволяет использовать одну учетную запись для получения доступа ко всем соответствующим ресурсам. Вы можете использовать все службы и сервисы, используя ваш аккаунт OneID.</span>
            </section>

            <section>
              <p>Безопасность и подлинность</p>
              <span>Для подтверждения личной подлинности в Единой системе идентификации пользователю необходимо предъявить электронную цифровую подпись. Таким образом обеспечивается соответствие реального человека - пользователю в интернете. Это позволяет оказывать наиболее востребованные государственные услуги онлайн. Кроме того, за счет интеграции с центральными базами данных физических и юридических лиц, нет необходимости заполнять все свои персональные данные - актуальная информация загружается автоматически и своевременно обновляется (например, при изменении фамилии или адреса прописки).</span>
            </section>

            <section>
              <p>Интеграция с другими сайтами</p>
              <span>Если вы владелец веб-сайта и хотите подлинно идентифицировать пользователя для оказания каких-либо услуг (банковские услуги, электронная коммерция и т.п.), то OneID - это легитимный и удобный способ. Единая система идентификации закреплена законодательно. В соответствии с Положением о единой системе идентификации пользователей электронного правительства, утвержденного постановлением Кабинета Министров от 17 декабря 2015 года № 365, полученные от Единой системы идентификации сведения о пользователях являются достоверными.</span>
            </section>

            <section>
              <p>Идентификация юридических лиц</p>
              <span>Если вы руководитель организации (компании), зарегистрировавшись как физическое лицо, в своем кабинете вы можете добавить вашу организацию. Для этого необходимо предъявить ЭЦП, полученное на имя руководителя организации, в своем кабинете в системе OneID. Добавив юридическое лицо вы сможете делегировать свои полномочия другим пользователям (вашим сотрудникам) для использования государственных услуг от имени вашей организации.</span>
            </section>
          </>
        )
    }
  </div>
)
