import React from 'react'

import style from './index.scss'

export default ({ locale }) => (
  <div className={style.userAgreement}>
    {
      locale === 'kr' ? (
        <>
          <header>
            <p>Фойдаланиш келишуви</p>
            <span>
              Ушбу Фойдаланиш келишуви (кейинги ўринларда – Келишув) Ўзбекистон Республикаси Фуқаролик кодексининг 369-моддасига мувофиқ Ўзбекистон Республикаси Ахборот технологиялари ва коммуникацияларини ривожлантириш вазирлиги ҳузуридаги «Электрон ҳукумат лойиҳаларини бошқариш маркази» давлат муассасаси (кейинги ўринларда – Марказ)нинг оммавий офертаси ҳисобланади ва ҳар қандай мурожаат қилган жисмоний ёки юридик шахс (кейинги ўринларда – Фойдаланувчи) билан «Электрон ҳукумат» тизими фойдаланувчиларини идентификациялашнинг ягона ахборот тизимини (кейинги ўринларда – Идентификация тизими)дан  фойдаланиш шартлари ва қоидаларини белгилайди.
      </span>
            <br />
            <span>
              Ушбу Келишув шартлари барча Фойдаланувчилар учун бир ҳил ҳисобланади.
      </span>
          </header>

          <section>
            <p>1. Атамалар ва таърифлар</p>
            <h4>Электрон ҳукумат </h4>
            <span>– давлат органларининг жисмоний ва юридик шахсларга ахборот-коммуникация технологияларини қўллаш йўли билан давлат хизматлари кўрсатишга доир фаолиятини, шунингдек идоралараро электрон ҳамкорлик қилишни таъминлашга қаратилган ташкилий-ҳуқуқий чора-тадбирлар ва техник воситалар тизими;</span>
            <br />
            <h4>Электрон давлат хизмати </h4>
            <span>— ариза берувчиларнинг сўровларига кўра амалга ошириладиган, давлат органларининг вазифаларини бажариш бўйича улар томонидан кўрсатиладиган хизмат. Агар қонун ҳужжатларига мувофиқ давлат хизматлари кўрсатиш функциялари бошқа ташкилотлар зиммасига юклатилган бўлса, улар ҳам давлат хизматини кўрсатишлари мумкин;</span>
            <br />
            <h4>Фойдаланувчи </h4>
            <span>– давлат хизматига эҳтиёжи бўлган ва уни олиш учун техник имкониятига эга бўлган, ушбу Келишувда баён қилинган шартларда ушбу Келишувни тузган юридк ва/ёки жисмоний шахс;</span>
            <br />
            <h5>Жисмоний шахс </h5>
            <span>— жисмоний шахснинг паспорти бўйича аниқланадиган жисмоний шахснинг шахсий идентификация рақами (ЖШШИР)га эга бўлган Ўзбекистон Республикасининг фуқароси, чет эл фуқароси ёки фуқаролиги бўлмаган шахс;</span>
            <br />
            <h5>Юридик шахс </h5>
            <span>– Ўзбекистон Республикаси қонун ҳужжатларига мувофиқ ташкил қилинган, солиқ хизмати идораларида ҳисобга олинган, солиқ тўловчининг идентификация рақами (СТИР)га эга бўлган ташкилот;</span>
            <br />
            <h4>ЭРИ </h4>
            <span>– Давлат хизматлари марказларидан олиш мумкин бўлган электрон рақамли имзо.</span>
            <br />
          </section>

          <section>
            <p>2. Келишув предмети</p>
            <span>2.1. Марказ Идентификация тизими эгаси ҳисобланган ҳолда электрон давлат хизматларидан рухсат билан фойдалана олиш учун жисмоний ва юридик шахсларга Идентификация тизимидан рўйхатдан ўтиш имкониятини тақдим этади.</span><br />
            <span>2.2. Идентификация тизими томонидан «Электрон ҳукумат» тизимидан фойдалана олиш учун Фойдаланувчиларни ҳақиқий идентификация, аутентификация ва авторизация қилиш таъминланади.</span>
          </section>

          <section>
            <p>3. Келишувни тузиш тартиби</p>
            <span>3.1. Жисмоний шахс Идентификация тизимида рўйхатдан ўтиб, ушбу Келишув шартларини сўзсиз ва тўлиқ қабул қилади ҳамда «Электрон ҳукумат» тизимининг Фойдаланувчиларини идентфикациялаш, аутентификациялаш ва авторизациялашни таъминлаш учун ўзининг шахсий маълумотларини қайта ишлаш ва сақлашга розилик беради.</span><br />
            <span>3.2. Идентификация тизимида рўйхатдан ўтгунча Фойдаланувчи ушбу Келишувнинг барча шартлари билан танишишга мажбур. Идентификация тизимида рўйхатдан ўтган Фойдаланувчи ушбу Келишувнинг барча шартлари билан танишган ва уларга рози ҳисобланади, бунда Келишув ушбу оммавий оферта шартлари асосида ёзма шаклда тузилган ҳисобланади ва икки томон тарафидан имзоланган Келишув ҳисобланади. Жисмоний шахснинг Идентификация тизимида рўйхатдан ўтган вақти ушбу Келишув тузилган пайт ҳисобланади.</span>
          </section>

          <section>
            <p>4. Идентификация тизимида рўйхатдан ўтиш шартлари</p>
            <span>4.1. Идентификация тизимида рўйхатдан ўтиш учун Фойдаланувчи – жисмоний шахс қуйидаги маълумотларни кўрсатиши керак:</span><br />
            <span>биометрик паспорт маълумотлари (ЖШШИР, биометрик паспорт серияси ва рақами (кейинги ўринларда – шахсий маълумотлар);</span> <br />
            <span>логин ёки пароль йўқолганда, ҳисобга олиш ёзувини бирламчи активация қилиш кодини олиш ва ҳисобга олиш ёзувини (учетная запись) тиклаш учун мобил телефоннинг ҳақиқий рақами;</span> <br />
            <span>логин ёки пароль йўқолганда ҳисобга олиш ёзувини тиклаш учун электрон почтанинг ҳақиқий манзили;</span> <br />
            <span>Электрон рақамли имзо калитлари (кейинги ўринларда – ЭРИ)нинг сертификати бўлганда ЭРИдан фойдаланиб рўйхатдан ўтиш вақтида ўзининг ҳисобга олиш ёзувини тасдиқлаш ҳуқуқига эга. ЭРИ калитларининг сертификати бўлмаганда ЭРИдан фойдаланиб ҳисобга олиш ёзувини Идентификация тизимида кейинги авторизация пайтида тасдиқлаш мумкин.</span> <br />
            <span>логин ёки пароль йўқолган ҳолда Фойдаланувчи ҳисобга олиш ёзувини тиклаш учун электрон почтанинг ҳақиқий манзилини кўрсатиши мумкин;</span> <br />
            <span>4.2. ЭРИ калитининг сертификати Идентификация тизимида рўйхатдан ўтиш пайтига амалда бўлиши керак.</span> <br />
            <span>4.3. Идентификация тизимида рўйхатдан ўтиш учун Фойдаланувчи – юридик шахс 4.1-бандга мувофиқ аввал жисмоний шахснинг ҳисобга олиш ёзувини рўйхатдан ўтказиши керак.</span> <br />
            <span>Жисмоний шахснинг ҳисобга олиш ёзувини яратгандан кейин жисмоний шахс кабинетида қуйидагилар орқали юридик шахсни қўшиш керак:</span> <br />
            <span>Юридик шахс ЭРИ калитининг сертификатини;</span> <br />
            <span>Юридик шахснинг СТИРни.</span> <br />
            <span>4.4. Юридик шахсни тўлдириладиган ва Ўзбекистон Республикаси Давлат солиқ қўмитасига топшириладиган 8-сон ҳисобот шаклида кўрсатилган шахслар рўйхатдан ўтказиши мумкин.</span> <br />
            <span>4.5. Мобил телефоннинг логини, пароли ва рақамини бир вақтнинг ўзида акс эттириш имкони бўлмаган ҳолда ҳисобга олиш ёзувини ЭРИни қўллаш ёки давлат хизматлари марказига мурожаат қилиш орқали тиклаш мумкин.</span>
          </section>

          <section>
            <p>5. Фойдаланувчининг ҳуқуқлари ва мажбуриятлари</p>
            <span>5.1. Фойдаланувчи қуйидаги ҳуқуқларга эга:</span><br />
            <span>идоралараро электрон ўзаро ҳамкорликда давлат хизматларини кўрсатувчи давлат органлари ва бошқа ташкилотлардан рухсат билан фойдалана олиш учун Идентификация тизимида ўз ҳисобга олиш ёзувидан фойдаланиш.</span> <br />
            <span>Ўз шахсий маълумотларига нисбатан Ўзбекистон Республикасининг «Шахсий маълумотлар тўғрисида»ги Қонуни 30-моддасининг биринчи қисмига мувофиқ хатти-ҳаракатларни амалга ошириш. Исталган вақтда бир томонлама тартибда ушбу келишувни бекор қилиш ва ўзининг ҳисобга олиш ёзувини ўчириб ташлаш йўли орқали ахборот тизимлари ва ресурсларидан фойдаланишдан воз кечиш.</span> <br />
            <span>5.2. Идентификация тизимидан Фойдаланувчи қуйидагиларга мажбур:</span> <br />
            <span>Идентификация тизими ёки Идентификация тизимига уланган ахборот тизимларининг ишлаш жараёнини бузишга қаратилган хатти-ҳаракатларни амалга оширмаслик;</span> <br />
            <span>Рўйхатга олиш ва аутентификациялашда ишончли бўлган маълумотларни тақдим этиш, шунингдек уларнинг актуал ҳолатини таъминлаш, ўзини бошқа шахс ёки қандайдир ташкилот вакили қилиб кўрсатмаслик, ўзининг ЭРИдан фойдаланиш;</span> <br />
            <span>Марказ томонидан Келишув шартларига киритилган ўзгартиришларга рози бўлмаганда Идентификация тизимидан фойдаланишдан воз кечиш ва Идентификация тизимига уланган ахборот тизимлари, ресурслари ва сервисларидан фойдаланишни тўхтатиш;</span> <br />
            <span>ўзининг ҳисобга олиш ёзувларининг сақланишини таъминлаш учун керакли чораларни кўриш;</span> <br />
            <span>конфиденциаллик ёки ҳисобга олиш ёзувидан ўзининг фойдалана олиш воситалари (мобил телефон рақами, логин ва пароль)нинг сақланиши бузилган ҳолда зудлик билан логин ва/ёки паролни ўзгартириш ёки Марказни хабардор қилиш.</span>
          </section>

          <section>
            <p>6. Марказ ҳуқуқлари ва мажбуриятлари</p>
            <span>6.1. Марказ қуйидаги ҳуқуқларга эга:</span> <br />
            <span>Идентификация тизимида фойдаланувчининг хатти-ҳаракатларининг мониторингини ўтказиш;</span> <br />
            <span>Фойдаланувчи томонидан ушбу Келишув талаблари бузилган ҳолда, фойдаланувчининг Идентификация тизимига уланган ахборот тизимларидан фойдалана олишини, шу жумладан Идентификация тизимидаги фойдаланувчининг ҳисобга олиш ёзувини блоклаш орқали чеклаш;</span> <br />
            <span>Дастлаб Фойдаланувчини хабардор қилмасдан Идентификация тизимидан фойдаланишнинг ушбу шартларини ўзгартириш. Ўзгартирилган шартлар Идентификация тизимининг бош саҳифасига жойлаштирилиши керак.</span> <br />
            <span>Фойдаланувчига ахборот хабарларини юбориш.</span> <br />
            <span>6.2. Марказ қуйидаги мажбуриятларга эга:</span> <br />
            <span>Идентификация тизими ишлашини (Идентификация тизимига уланган ахборот тизимларидан фойдаланишда Идентификация тизими фойдаланувчиларини идентификациялаш, авториациялаш ва аутентификациялашни) таъминлаш;</span> <br />
            <span>Идентификация тизимида фойдаланувчилар маълумотларининг бутунлиги ва ўзгармаслигини кафолатлаш;</span> <br />
            <span>фойдаланувчиларнинг Идентификация тизимига мурожаатлари ҳисоби ва статистикасини юритиш;</span> <br />
            <span>қонун ҳужжатлари талаблари ва шахсий маълумотлардан фойдаланиш шартларига мувофиқ фойдаланувчининг шахсий маълумотларини ҳимоялашни таъминлаш;</span>
          </section>

          <section>
            <p>7. Келишувнинг амал қилиш муддати </p>
            <span>7.1. Ушбу Келишув Фойдаланувчининг Идентификация тизимида рўйхатдан ўтган вақтдан бошлаб кучга киради ва Томонлар тарафидан тўлиқ бажарилгунчага амал қилади.</span>
          </section>

          <section>
            <p>8. Жавобгарлик</p>
            <span>8.1. Марказ унинг айби билан юзага келмаган шахсий маълумотларнинг йўқолганлиги учун Фойдаланувчи олдида жавобгар бўлмайди.</span> <br />
            <span>8.2. Марказ Идентификация тизими фаолиятидаги носозликлар ёки ишлаш қобилиятининг йўқолиши учун жавобгар бўлмайди, агар кўрсатилган носозликлар ёки ишлаш қобилиятининг йўқолиши қуйидагилар оқибатида содир бўлган бўлса:</span> <br />
            <span>учинчи шахсларнинг Идентификация тизими дастурий таъминотидан рухсатсиз фойдаланишига ва/ёки кўрсатилган дастурий таъминотнинг ишдан чиқишига қаратилган хатти-ҳаракатлари.</span> <br />
            <span>уланган веб-сервисларнинг ишламай қолиши.</span> <br />
            <span>8.3. Марказ Идентификация тизимидан фойдаланиш ёки фойдаланиш имконияти бўлмаганлиги сабабли содир бўлган ҳар қандай бевосита ва билвосита зарарлар учун жавобгар бўлмайди.</span> <br />
            <span>8.4. Марказ қуйидаги ҳолларда Фойдаланувчининг ҳисобга олиш ёзувининг хавфсизлиги учун жавобгар бўлмайди:</span> <br />
            <span>Фойдаланувчи томонидан учинчи шахсларга (қасддан ёки эҳтиётсизлик сабабли) пароль ва шахсий маълумотларнинг тақдим этилиши;</span> <br />
            <span>паролни танлаш ва/ёки кодни очиш имконини берадиган дастурий воситалардан фойдаланиш оқибатида Фойдаланувчининг ҳисобга олиш ёзувидан учинчи шахсларнинг фойдаланиши;</span> <br />
            <span>пароль ва ҳисобга олиш маълумотларини танлаш (подбор) йўли билан Фойдаланувчи ҳисобга олиш ёзувидан учинчи шахсларнинг фойдаланиши.</span> <br />
            <span>8.5. Фойдаланувчи фуқаролик, жиноят қонун ҳужжатлари, шунингдек маъмурий ҳуқуқбузарликлар тўғрисидаги қонун ҳужжатлари талабларига мувофиқ тақдим этилган шахсий маълумотларнинг ишончлилиги, шу жумладан уларнинг ўз вақтида янгиланиши ва тузатилишига тўлиқ жавобгар бўлади.</span> <br />
            <span>8.6. Фойдаланувчи ушбу Келишув бўйича ўзининг вазифаларига риоя этмаганлиги сабабли Марказга етказилган зарар учун жавобгар бўлади.</span> <br />
            <span>8.7. Фойдаланувчи ҳисобга олиш ёзувидан фойдаланиш учун ўзи танлаб олган воситаларнинг хавфсизлиги (шунингдек аниқлашга нисбатан барқарорлик), сақланиши учун шахсан жавобгар бўлади, шунингдек уларнинг махфийлигини мустақил таъминлайди. Бунда Фойдаланувчининг ҳисобга олиш ёзуви остидаги барча хатти-ҳаракатлари Фойдаланувчи томонидан амалга оширилган деб ҳисобланади.</span> <br />
            <span>8.8. Томонлар ушбу Келишув бўйича мажбуриятларни қисман ёки тўлиқ бажармаганлиги учун жавобгар бўлмайди, агар бундай бажармаслик ушбу Келишув тузилгандан кейин ва Томонлар оқилона чора-тадбирлар билан олдини ололмаган фавқулодда тусидаги ҳодисалар (форс-мажор) натижасида пайдо бўлган енгиб бўлмас кучлар ҳолатининг оқибати ҳисобланса. Бундай фавқулодда тусидаги ҳодисаларга Келишувни бажаришга тўсқинлик қилувчи сув тошқини, ёнғин, зилзила, тупроқ чўкиши ва бошқа табиий офатлар; уруш ёки ҳарбий ҳаракатлар, эмбарго, қамаллар, ҳукумат ҳаракатлари кириши мумкин.</span>
          </section>

          <section>
            <p>9. Даъволарни кўриб чиқиш тартиби</p>
            <span>9.1. Марказ ушбу Келишув бўйича мажбуриятларини бажармаган ёки лозим даражада бажармаганда Фойдаланувчи Марказга ёзма ёки электрон шаклдаги даъвосини тақдим этиш ҳуқуқига эга.</span> <br />
            <span>9.2. Марказ Ўзбекистон Республикасининг «Жисмоний ва юридик шахсларнинг мурожаатлари тўғрисида»ги Қонунида белгиланган тартибда келиб тушган санадан бошлаб 15 кун ичида даъвони кўриб чиқиши ва унга жавоб бериши, агар қўшимча ўрганиш ва (ёки) текшириш, қўшимча ҳужжатларни сўраш талаб қилинганда бир ойгача бўлган муддатда даъвони кўриб чиқишга мажбур. Даъвога жавоб буюртма хат орқали, электрон шаклда юборилади ёки Фойдаланувчига имзо қўйдирган ҳолда тақдим этилади.</span> <br />
            <span>9.3. Агар Фойдаланувчи тақдим этилган жавобдан қониқмаганда, у Ўзбекистон Республикаси Ахборот технологиялари ва коммуникацияларини ривожлантириш вазирлигига шикоят қилиш ҳуқуқига эга.</span>
          </section>

          <section>
            <p>10. Низоларни ҳал қилиш тартиби</p>
            <span>10.1. Ушбу Келишувни бажариш бўйича барча низолар ва келишмовчиликлар Томонлар тарафидан Ўзбекистон Республикасининг амалдаги қонун ҳужжатларига мувофиқ ҳал этилади.</span>
          </section>
        </>
      ) : (
          <>
            <header>
              <p>Пользовательское соглашение</p>
              <span>
                Настоящее Пользовательское соглашение (далее – Соглашение) в соответствии со статьей 369 Гражданского кодекса Республики Узбекистан является публичной офертой ГУ «Центр управления проектами электронного правительства» при Министерстве по развитию информационных технологий и коммуникаций Республики Узбекистан (далее – Центр) и определяет условия и правила использования единой информационной системы идентификации пользователей системы «Электронное правительство» (далее — ЕИСИ), на которых заключается настоящее Соглашение с любым обратившимся физическим или юридическим лицом (далее – Пользователь).
              </span>
              <br />
              <span>
                Условия настоящего Соглашения являются едиными для всех Пользователей.
              </span>
            </header>

            <section>
              <p>1. Термины и определения</p>
              <h4>Электронное правительство </h4>
              <span>— система организационно-правовых мер и технических средств, направленная на обеспечение деятельности государственных органов по оказанию государственных услуг физическим и юридическим лицам путем применения информационно-коммуникационных технологий, а также межведомственного электронного взаимодействия.</span>
              <br />
              <h4>Электронная государственная услуга </h4>
              <span>— услуга, оказываемая государственными органами с применением информационно-коммуникационных технологий по реализации их функций по запросам заявителей. Государственную услугу могут оказывать также иные организации в случаях, если на них возложены функции по оказанию государственных услуг в соответствии с законодательством;</span>
              <br />
              <h4>Пользователь </h4>
              <span>— юридическое и/или физическое лицо, нуждающееся в государственной услуге, и имеющее техническую возможность ее получать, заключившее настоящее Соглашение на условиях, изложенных в настоящем Соглашении:</span>
              <br />
              <h5>физическое лицо </h5>
              <span>— гражданин Республики Узбекистан, иностранный гражданин, или лицо без гражданства, имеющие персональный идентификационный номер физического лица (ПИНФЛ),</span>
              <br />
              <h5>юридическое лицо </h5>
              <span>— организация, созданная в соответствии с законодательством Республики Узбекистан, поставленная на учет в органах налоговой службы, имеющая идентификационный номер налогоплательщика (ИНН)</span>
              <br />
              <h4>ЭЦП </h4>
              <span>— Электронная цифровая подпись, которую можно получить в Центрах государственных услуг.</span>
              <br />
            </section>

            <section>
              <p>2. Предмет Соглашения</p>
              <span>2.1. Центр, являясь собственником ЕИСИ, предоставляет физическим и юридическим лицам возможность регистрации в ЕИСИ для получения санкционированного доступа к электронным государственным услугам.</span><br />
              <span>2.2. ЕИСИ обеспечивается подлинная идентификация, аутентификация и авторизация Пользователей для доступа в систему «Электронное правительство».</span>
            </section>

            <section>
              <p>3. Порядок заключения Соглашения</p>
              <span>3.1. Физическое лицо, регистрируясь в ЕИСИ, безоговорочно и полностью принимает условия настоящего Соглашения и дает согласие на обработку и хранение его персональных данных для обеспечения подлинной идентификации, аутентификации и авторизации Пользователей системы «Электронное правительство».</span><br />
              <span>3.2. До совершения регистрации в ЕИСИ Пользователь обязан ознакомиться со всеми условиями настоящего Соглашения. Пользователь, осуществивший регистрацию в ЕИСИ, считается ознакомившимся и согласным со всеми условиями настоящего Соглашения, при этом Соглашение считается заключенным в письменной форме на условиях настоящей публичной оферты и является Соглашением, подписанным двумя сторонами. Моментом заключения настоящего Соглашения является регистрация физического лица в ЕИСИ.</span>
            </section>

            <section>
              <p>4. Условия Регистрации в ЕИСИ</p>
              <span>4.1. Для регистрации в ЕИСИ Пользователь - физическое лицо должен указать следующие данные:</span><br />
              <span>биометрические паспортные данные (ПИНФЛ, серию и номер биометрического паспорта (далее – персональные данные);</span> <br />
              <span>действительный номер мобильного телефона, для получения кода первичной активации учетной записи и восстановления учетной записи, в случае утери логина или пароля;</span> <br />
              <span>действительный адрес электронной почты, для восстановления учетной записи, в случае утери логина или пароля;</span> <br />
              <span>При наличии сертификата ключей электронно-цифровой подписи (далее – ЭЦП) пользователь вправе подтвердить свою учетную запись в момент регистрации с использованием ЭЦП. При отсутствии сертификата ключей ЭЦП, подтверждение учетной записи с использованием ЭЦП можно осуществить в момент последующих авторизаций в ЕИСИ).</span> <br />
              <span>Пользователь может указать действительный адрес электронной почты для восстановления учетной записи, в случае утери логина или пароля;</span> <br />
              <span>4.2. Сертификат ключа ЭЦП должен быть действующим на момент регистрации в ЕИСИ.</span> <br />
              <span>4.3. Для регистрации в ЕИСИ Пользователь - юридическое лицо в начале должен осуществить регистрацию учетной записи физического лица согласно пункту 4.1.</span> <br />
              <span>После создания учетной записи физического лица, необходимо в кабинете физического лица добавить юридическое лицо посредством:</span> <br />
              <span>Сертификата ключа ЭЦП юридического лица;</span> <br />
              <span>ИНН юридического лица.</span> <br />
              <span>4.4. Регистрацию юридического лица могут осуществлять лица, указанные в форме отчета №8, заполняемой и передаваемой в Государственный налоговый комитет Республики Узбекистан.</span> <br />
              <span>4.5. В случае невозможности единовременного воспроизведения логина, пароля и номера мобильного телефона восстановление учетной записи производится с применением ЭЦП или путем обращения в центр государственных услуг.</span>
            </section>

            <section>
              <p>5. Права и обязанности пользователя</p>
              <span>5.1. Пользователь вправе:</span><br />
              <span>использовать свою учётную запись в ЕИСИ для санкционированного доступа государственных органов и иных организаций, оказывающих государственные услуги, при межведомственном электронном взаимодействии.</span> <br />
              <span>осуществлять действия в отношении своих персональных данных в соответствии с частью первой статьи 30 Закона Республики Узбекистан «О персональных данных».  в любое время расторгнуть в одностороннем порядке настоящее соглашение и отказаться от использования информационных систем и ресурсов путём удаления своей учётной записи.</span> <br />
              <span>5.2. Пользователь ЕИСИ обязан:</span> <br />
              <span>не производить действия, направленные на нарушение процесса функционирования ЕИСИ или информационных систем, подключенных к ЕИСИ;</span> <br />
              <span>предоставлять достоверные данные при регистрации и аутентификации, а также поддерживать их в актуальном состоянии, не выдавать себя за другое лицо или представителя какой-либо организации, использовать собственную ЭЦП;</span> <br />
              <span>при несогласии с изменениями, внесенными в условия Соглашения со стороны Центра, отказаться от доступа к ЕСИ и прекратить использование информационных систем, ресурсов и сервисов, подключенных к ЕСИ;</span> <br />
              <span>принимать надлежащие меры для обеспечения сохранности своих учетных записей;</span> <br />
              <span>незамедлительно изменить логин и/или пароль или уведомить Центр, в случае нарушения (подозрениях о нарушении) конфиденциальности или сохранности своих средств доступа (номер мобильного телефона, логин и пароль) к учетной записи.</span>
            </section>

            <section>
              <p>6. Права и обязанности Центра</p>
              <span>6.1. Центр вправе:</span> <br />
              <span>проводить мониторинг действий пользователя в ЕИСИ;</span> <br />
              <span>в случае нарушения Пользователем требований настоящего Соглашения, ограничивать доступ пользователя к информационным системам, подключенным к ЕИСИ, в том числе путём блокировки учётной записи пользователя в ЕИСИ;</span> <br />
              <span>изменить настоящие условия использования ЕИСИ без предварительного уведомления Пользователя. Изменённые условия должны быть размещены на главной странице ЕИСИ.</span> <br />
              <span>направлять Пользователю информационные сообщения.</span> <br />
              <span>6.2. Центр обязан:</span> <br />
              <span>обеспечить функционирование ЕИСИ (идентификацию, авторизацию и аутентификацию пользователей ЕИСИ при доступе к информационным системам, подключенным к ЕИСИ);</span> <br />
              <span>гарантировать целостность и неизменность данных пользователей в ЕИСИ;</span> <br />
              <span>вести учёт и статистику обращений пользователей к ЕИСИ;</span> <br />
              <span>обеспечить защиту персональных данных пользователя в соответствии с требованиями законодательства и Условиями использования персональных данных;</span>
            </section>

            <section>
              <p>7. Срок действия Соглашения</p>
              <span>7.1. Настоящее Соглашение вступает в силу с момента регистрации Пользователя в ЕИСИ, до полного его исполнения Сторонами.</span>
            </section>

            <section>
              <p>8. Ответственность</p>
              <span>8.1. Центр не несет ответственности перед Пользователем за потерю персональных данных, произошедшую не по его вине.</span> <br />
              <span>8.2. Центр не несет ответственности за сбои в работе или неработоспособность ЕИСИ, если указанные сбои или неработоспособность стали следствием:</span> <br />
              <span>действий третьих лиц, направленных на несанкционированный доступ к программному обеспечению ЕИСИ и/или на выведение указанного программного обеспечения из строя.</span> <br />
              <span>неработоспособности подключенных веб-сервисов.</span> <br />
              <span>8.3. Центр не несет ответственности за любые прямые либо косвенные убытки, произошедшие из-за использования либо невозможности использования ЕСИ.</span> <br />
              <span>8.4. Центр не несет ответственность за безопасность учетной записи Пользователя в случаях: </span> <br />
              <span>передачи Пользователем третьим лицам (умышленно или по неосторожности) пароля и персональных данных; </span> <br />
              <span>доступа третьих лиц к учетной записи Пользователя вследствие использования программных средств, позволяющих осуществить подбор и/или раскодирование пароля;</span> <br />
              <span>доступа третьих лиц к учетной записи Пользователя путем подбора пароля и учетных данных.</span> <br />
              <span>8.5. Пользователь несет ответственность в полной мере за достоверность предоставленных персональных данных, а также за своевременное их обновление и корректировку, в соответствии с требованиями гражданского, уголовного законодательства, а также законодательства об административных правонарушениях.</span> <br />
              <span>8.6. Пользователь несет ответственность за ущерб, причиненный Центру в связи с несоблюдением им обязанностей по настоящему Соглашению.</span> <br />
              <span>8.7. Пользователь несет личную ответственность за безопасность (в том числе устойчивость к угадыванию), сохранность выбранных им средств для доступа к учетной записи, а также самостоятельно обеспечивает их конфиденциальность. При этом все действия под учетной записью Пользователя считаются произведенными самим Пользователем.</span> <br />
              <span>8.8. Стороны настоящего Соглашения не несут ответственности за полное или частичное неисполнение своих обязательств по Соглашению, если такое неисполнение явилось следствием обстоятельств непреодолимой силы, возникших после заключения Соглашения в результате событий чрезвычайного характера, которые они не могли ни предвидеть, ни предотвратить разумными мерами (форс-мажор). К таким событиям чрезвычайного характера относятся: наводнение, пожар, землетрясение, оседание почвы и другие стихийные бедствия; война или военные действия, эмбарго, блокады, действия властей, препятствующие исполнению Соглашения.</span>
            </section>

            <section>
              <p>9. Порядок рассмотрения претензий</p>
              <span>9.1. При неисполнении или ненадлежащем исполнении Центром обязательств по настоящему Соглашению, Пользователь имеет право предоставить в Центр претензию в письменном или электронном виде.</span> <br />
              <span>9.2. Центр обязан рассмотреть претензию в порядке, установленном Законом Республики Узбекистан «Об обращениях физических и юридических лиц» в течение пятнадцати дней, со дня поступления и дать на нее ответ, а когда требуется дополнительное изучение и (или) проверка, запрос дополнительных документов — в срок до одного месяца. Ответ на претензию отправляется заказным письмом, в электронном виде, либо вручается Пользователю под расписку.</span> <br />
              <span>9.3. В случае, если Пользователь не удовлетворен предоставленным ответом, он имеет право подать жалобу в Министерство по развитию информационных технологий и коммуникаций Республики Узбекистан.</span>
            </section>

            <section>
              <p>10. Порядок разрешения споров</p>
              <span>10.1. Все споры и разногласия по исполнению настоящего Соглашения разрешаются сторонами в соответствии с действующим законодательством Республики Узбекистан.</span>
            </section>
          </>
        )
    }
  </div>
)
