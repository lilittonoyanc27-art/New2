// Educational content data for the Spanish "Gustar" and similar verbs learning app
// Explanations are in Armenian to help Armenian speakers master Gustar and its equivalents.

export interface TheoryChapter {
  id: string;
  number: number;
  title: string;
  highlightText?: string;
  sections: {
    title: string;
    description?: string;
    tableHeaders?: string[];
    tableRows?: string[][];
    points?: {
      title: string;
      desc: string;
      examples?: { es: string; arm: string; literal?: string; isCorrect?: boolean }[];
    }[];
    examples?: { es: string; arm: string; literal?: string; isCorrect?: boolean }[];
  }[];
}

export interface VerbDetail {
  verb: string;
  translation: string;
  explanation: string;
  examples: { es: string; arm: string; isVerb?: boolean; isNounPlural?: boolean; isNounSingular?: boolean }[];
}

export const SpanishVerbsData: VerbDetail[] = [
  {
    verb: "gustar",
    translation: "դուր գալ",
    explanation: "Իսպաներենում gustar բայը սովորական ձևով չի թարգմանվում։ Ոչ թե 'Ես սիրում եմ սուրճը', այլ 'Սուրճը ինձ դուր է գալիս'։",
    examples: [
      { es: "Me gusta el café.", arm: "Ինձ դուր է գալիս սուրճը։", isNounSingular: true },
      { es: "Me gustan los libros.", arm: "Ինձ դուր են գալիս գրքերը։", isNounPlural: true },
      { es: "Me gusta viajar.", arm: "Ինձ դուր է գալիս ճանապարհորդել։", isVerb: true }
    ]
  },
  {
    verb: "encantar",
    translation: "շատ դուր գալ / պաշտել",
    explanation: "Օգտագործվում է, երբ ինչ-որ բան մեզ չափազանց շատ է դուր գալիս կամ պաշտում ենք այն։",
    examples: [
      { es: "Me encanta la música.", arm: "Ես շատ եմ սիրում երաժշտությունը (երաժշտությունը ինձ շատ դուր է գալիս)։", isNounSingular: true },
      { es: "Me encantan las flores.", arm: "Ինձ շատ դուր են գալիս ծաղիկները։", isNounPlural: true },
      { es: "Nos encanta viajar.", arm: "Մեզ շատ դուր է գալիս ճանապարհորդել։", isVerb: true }
    ]
  },
  {
    verb: "interesar",
    translation: "հետաքրքրել",
    explanation: "Օգտագործվում է, երբ ինչ-որ թեմա, առարկա կամ գործողություն մեզ հետաքրքրում է։",
    examples: [
      { es: "Me interesa la historia.", arm: "Ինձ հետաքրքրում է պատմությունը։", isNounSingular: true },
      { es: "Me interesan los idiomas.", arm: "Ինձ հետաքրքրում են լեզուները։", isNounPlural: true },
      { es: "¿Te interesa este tema?", arm: "Քեզ հետաքրքրո՞ւմ է այս թեման։", isNounSingular: true }
    ]
  },
  {
    verb: "parecer",
    translation: "թվալ / կարծիքով լինել",
    explanation: "Օգտագործվում է կարծիք հայտնելու համար։",
    examples: [
      { es: "Me parece interesante.", arm: "Ինձ հետաքրքիր է թվում։", isNounSingular: true },
      { es: "¿Te parece bien?", arm: "Քեզ լավ է թվո՞ւմ (համաձայն ե՞ս)։", isNounSingular: true },
      { es: "Nos parece difícil.", arm: "Մեզ դժվար է թվում։", isNounSingular: true },
      { es: "Estas reglas me parecen importantes.", arm: "Այս կանոնները ինձ կարևոր են թվում։", isNounPlural: true }
    ]
  },
  {
    verb: "apetecer",
    translation: "ուզենալ / ցանկանալ տվյալ պահին",
    explanation: "Շատ տարածված բայ է Իսպանիայում, որը ցույց է տալիս տվյալ պահին ինչ-որ բան անելու ցանկություն։",
    examples: [
      { es: "Me apetece un café.", arm: "Ես սուրճ եմ ուզում (սուրճ խմելու ցանկություն ունեմ)։", isNounSingular: true },
      { es: "¿Te apetece ir al cine?", arm: "Կուզե՞ս կինո գնալ։", isVerb: true },
      { es: "No me apetece salir.", arm: "Ես դուրս գալու ցանկություն չունեմ։", isVerb: true }
    ]
  },
  {
    verb: "sorprender",
    translation: "զարմացնել",
    explanation: "Օգտագործվում է, երբ ինչ-որ բան մեզ զարմացնում է։",
    examples: [
      { es: "Me sorprende tu respuesta.", arm: "Քո պատասխանը ինձ զարմացնում է։", isNounSingular: true },
      { es: "Me sorprenden estas noticias.", arm: "Այս լուրերը ինձ զարմացնում են։", isNounPlural: true }
    ]
  },
  {
    verb: "importar",
    translation: "կարևոր լինել / նշանակություն ունենալ",
    explanation: "Ցույց է տալիս, որ ինչ-որ բան կարևոր է մեզ համար։",
    examples: [
      { es: "Me importa mi familia.", arm: "Ինձ համար ընտանիքս կարևոր է։", isNounSingular: true },
      { es: "No me importa.", arm: "Ինձ համար կարևոր չէ / ինձ չի հետաքրքրում։", isNounSingular: true },
      { es: "¿Te importa si abro la ventana?", arm: "Դեմ չե՞ս, եթե բացեմ պատուհանը։", isVerb: true }
    ]
  },
  {
    verb: "molestar",
    translation: "խանգարել / նյարդայնացնել",
    explanation: "Օգտագործվում է, երբ ինչ-որ բան մեզ խանգարում է կամ նյարդայնացնում է։",
    examples: [
      { es: "Me molesta el ruido.", arm: "Աղմուկը ինձ խանգարում է / նյարդայնացնում է։", isNounSingular: true },
      { es: "Me molestan las mentiras.", arm: "Սուտերը ինձ նյարդայնացնում են։", isNounPlural: true },
      { es: "¿Te molesta si hablo?", arm: "Քեզ կխանգարի՞, եթե խոսեմ։", isVerb: true }
    ]
  },
  {
    verb: "enfadar",
    translation: "բարկացնել",
    explanation: "Օգտագործվում է, երբ ինչ-որ իրավիճակ կամ արարք մեզ զայրացնում է։",
    examples: [
      { es: "Me enfada esta situación.", arm: "Այս իրավիճակը ինձ բարկացնում է։", isNounSingular: true },
      { es: "Me enfadan las injustices.", arm: "Անարդարությունները ինձ բարկացնում են։", isNounPlural: true }
    ]
  },
  {
    verb: "preocupar",
    translation: "անհանգստացնել",
    explanation: "Ցույց է տալիս, որ ինչ-որ բան մեզ անհանգստության պատճառ է դառնում։",
    examples: [
      { es: "Me preocupa el examen.", arm: "Քննությունը ինձ անհանգստացնում է։", isNounSingular: true },
      { es: "Me preocupan mis notas.", arm: "Իմ գնահատականները ինձ անհանգստացնում են։", isNounPlural: true }
    ]
  },
  {
    verb: "doler",
    translation: "ցավել",
    explanation: "Սա նույնպես աշխատում է gustar-ի նման՝ մարմնի մասն է ցավ պատճառում մեզ, այլ ոչ թե 'մենք ենք ցավում'։",
    examples: [
      { es: "Me duele la cabeza.", arm: "Գլուխս ցավում է (բառացի՝ գլուխը ինձ ցավ է պատճառում)։", isNounSingular: true },
      { es: "Me duelen los ojos.", arm: "Աչքերս ցավում են։", isNounPlural: true },
      { es: "Le duele la garganta.", arm: "Նրա կոկորդը ցավում է։", isNounSingular: true },
      { es: "Nos duelen las piernas.", arm: "Մեր ոտքերը ցավում են։", isNounPlural: true }
    ]
  }
];

export const TheoryChapters: TheoryChapter[] = [
  {
    id: "chap-1",
    number: 1,
    title: "Հիմնական կառուցվածքը և դերանունները",
    highlightText: "Իսպաներենում gustar-ը թարգմանվում է որպես «դուր գալ», ոչ թե «սիրել»։ Գործողության կենտրոնը առարկան է։",
    sections: [
      {
        title: "1. Գաղափարը",
        description: "Հայերենում ասում ենք՝ «Ես սիրում եմ սուրճ» կամ «Ինձ դուր է գալիս սուրճը»։ Իսպաներենում ավելի ճիշտ մտածում ենք այսպես՝ «Սուրճը ինձ դուր է գալիս»։ Այդ պատճառով ասում ենք՝",
        examples: [
          { es: "Me gusta el café.", arm: "Ինձ դուր է գալիս սուրճը։" },
          { es: "Yo gusto el café. ❌", arm: "Սխալ տարբերակ է, որովհետև Yo gusto նշանակում է՝ ես դուր եմ գալիս սուրճին։", isCorrect: false }
        ]
      },
      {
        title: "2. Կառուցվածքի բանաձևը",
        description: "Կարող ենք օգտագործել շեշտված կամ կարճ ձևերը։",
        points: [
          {
            title: "Ամբողջական շեշտված ձևը՝",
            desc: "a mí / a ti / a él… + me / te / le… + gusta / gustan + բառ"
          },
          {
            title: "Կարճ ձևը (ամենօրյա)՝",
            desc: "me / te / le / nos / os / les + gusta / gustan"
          }
        ],
        examples: [
          { es: "Me gusta la música.", arm: "Ինձ դուր է գալիս երաժշտությունը։" },
          { es: "Te gusta el fútbol.", arm: "Քեզ դուր է գալիս ֆուտբոլը։" },
          { es: "Le gusta el chocolate.", arm: "Նրան դուր է գալիս շոկոլադը։" },
          { es: "Nos gusta viajar.", arm: "Մեզ դուր է գալիս ճանապարհորդելը։" }
        ]
      },
      {
        title: "3. Դերանունները gustar բայի հետ",
        description: "Հայերեն և իսպաներեն դերանունների համապատասխանությունը հետևյալն է.",
        tableHeaders: ["Հայերեն", "Իսպաներեն դերանուն", "Օրինակ (Իսպաներեն)", "Թարգմանություն"],
        tableRows: [
          ["ինձ", "me", "Me gusta bailar.", "Ինձ դուր է գալիս պարել։"],
          ["քեզ", "te", "Te gusta cantar.", "Քեզ դուր է գալիս երգել։"],
          ["նրան / Ձեզ (եզակի)", "le", "Le gusta leer.", "Նրան դուր է գալիս կարդալ։"],
          ["մեզ", "nos", "Nos gusta ver películas.", "Մեզ դուր է գալիս ֆիլմեր նայել։"],
          ["ձեզ", "os", "Os gusta España.", "Ձեզ դուր է գալիս Իսպանիան։"],
          ["նրանց / Ձեզ (հոգնակի)", "les", "Les gusta viajar.", "Նրանց դուր է գալիս ճանապարհորդել։"]
        ]
      }
    ]
  },
  {
    id: "chap-2",
    number: 2,
    title: "Gusta թե՞ Gustan. Ամենակարևոր կանոնը",
    highlightText: "Բայը փոխվում է ոչ թե ըստ նրա, թե ում է դուր գալիս, այլ ըստ նրա, թե ինչն է դուր գալիս։",
    sections: [
      {
        title: "1. Ե՞րբ ենք օգտագործում Gusta",
        description: "Օգտագործում ենք, երբ հաջորդում է եզակի գոյական կամ անորոշ բայ (infinitivo)։",
        points: [
          {
            title: "եզակի գոյական",
            desc: "Մեկ առարկա",
            examples: [
              { es: "Me gusta el libro.", arm: "Ինձ դուր է գալիս գրքը։" },
              { es: "Me gusta esta canción.", arm: "Ինձ դուր է գալիս այս երգը։" },
              { es: "Me gusta la ciudad.", arm: "Ինձ դուր է գալիս քաղաքը։" }
            ]
          },
          {
            title: "բայ infinitivo-ով (սկզբնական ձևով)",
            desc: "Եթե հետո գալիս է բայ՝ hablar, bailar, viajar, comer, միշտ օգտագործում ենք gusta (նույնիսկ եթե մի քանի բայ կան)։",
            examples: [
              { es: "Me gusta bailar.", arm: "Ինձ դուր է գալիս պարել։" },
              { es: "Me gusta viajar.", arm: "Ինձ դուր է գալիս ճանապարհորդել։" },
              { es: "Me gusta aprender español.", arm: "Ինձ դուր է գալիս իսպաներեն սովորել։" },
              { es: "Me gusta cantar y bailar.", arm: "Ինձ դուր է գալիս երգել և պարել։" }
            ]
          }
        ]
      },
      {
        title: "2. Ե՞րբ ենք օգտագործում Gustan",
        description: "Օգտագործում ենք, երբ հաջորդում է հոգնակի գոյական (երկու կամ ավելի առարկաներ)։",
        examples: [
          { es: "Me gustan los libros.", arm: "Ինձ դուր են գալիս գրքերը։" },
          { es: "Me gustan las películas.", arm: "Ինձ դուր են գալիս ֆիլմերը։" },
          { es: "Me gustan estos zapatos.", arm: "Ինձ դուր են գալիս այս կոշիկները։" }
        ]
      },
      {
        title: "3. Շատ պարզ հիշելու ձև",
        points: [
          {
            title: "Me gusta + եզակի բառ / բայ",
            desc: "Me gusta el café. (Ինձ դուր է գալիս սուրճը) | Me gusta estudiar. (Ինձ դուր է գալիս սովորել)"
          },
          {
            title: "Me gustan + հոգնակի բառ",
            desc: "Me gustan los cafés. (Ինձ դուր են գալիս սուրճերը) | Me gustan los libros. (Ինձ դուր են գալիս գրքերը)"
          }
        ]
      }
    ]
  },
  {
    id: "chap-3",
    number: 3,
    title: "Ինչու՞ «me gusta» և ոչ թե «yo gusto»",
    highlightText: "Գիտեի՞ք, որ իսպաներենում gustar բառացիորեն նշանակում է «դուր գալ ինչ-որ մեկին»։",
    sections: [
      {
        title: "1. Գործողության կենտրոնը",
        description: "Me gusta el chocolate բառացի նշանակում է՝ «շոկոլադը ինձ դուր է գալիս»։ Այստեղ սուբյեկտը շոկոլադն է (el chocolate), ոչ թե ես-ը (yo)։ Դրա համար.",
        points: [
          {
            title: "el chocolate եզակի է",
            desc: "→ gusta (շոկոլադը դուր է գալիս)"
          },
          {
            title: "los chocolates հոգնակի է",
            desc: "→ gustan (շոկոլադները դուր են գալիս)"
          }
        ]
      },
      {
        title: "2. Ինչի՞ համար են «A mí, a ti, a él...»",
        description: "Մենք կարող ենք պարզապես ասել՝ Me gusta el café (Ինձ դուր է գալիս սուրճը)։ Բայց կարող ենք նաև շեշտել՝",
        examples: [
          { es: "A mí me gusta el café.", arm: "Հենց ինձ է դուր գալիս սուրճը (շեշտադրում)։" },
          { es: "A mí me gusta el café, pero a Carlos le gusta el té.", arm: "Ինձ դուր է գալիս սուրճը, իսկ Կառլոսին դուր է գալիս թեյը (համեմատություն և շեշտում)։" }
        ]
      },
      {
        title: "3. Շեշտված դերանունների ամբողջական աղյուսակ",
        tableHeaders: ["Շեշտված ձև", "Կարճ դերանուն", "Օրինակ", "Թարգմանություն"],
        tableRows: [
          ["a mí", "me", "A mí me gusta España.", "Ինձ դուր է գալիս Իսպանիան։"],
          ["a ti", "te", "A ti te gusta la música.", "Քեզ դուր է գալիս երաժշտությունը։"],
          ["a él / a ella / a usted", "le", "A ella le gusta bailar.", "Նրան դուր է գալիս պարել։"],
          ["a nosotros/as", "nos", "A nosotros nos gustan los viajes.", "Մեզ դուր են գալիս ճանապարհորդությունները։"],
          ["a vosotros/as", "os", "A vosotros os gusta el chocolate.", "Ձեզ դուր է գալիս շոկոլադը։"],
          ["a ellos / a ellas / a ustedes", "les", "A ellos les gusta el fútbol.", "Նրանց դուր է գալիս ֆուտբոլը։"]
        ]
      }
    ]
  },
  {
    id: "chap-4",
    number: 4,
    title: "Ժխտական, Հարցական ձևերը և Նրբությունները",
    highlightText: "Ժխտական նախադասություններ ձևավորելիս 'no' մասնիկը միշտ դրվում է դերանունից առաջ։",
    sections: [
      {
        title: "1. Բացասական ձև",
        description: "Բացասականում 'no'-ն դնում ենք դերանունից (me, te, le...) առաջ.",
        examples: [
          { es: "No me gusta el café.", arm: "Ինձ դուր չի գալիս սուրճը։" },
          { es: "No te gustan las películas de terror.", arm: "Քեզ դուր չեն գալիս սարսափ ֆիլմերը։" },
          { es: "No le gusta estudiar.", arm: "Նրան դուր չի գալիս սովորել։" },
          { es: "No nos gusta esperar.", arm: "Մեզ դուր չի գալիս սպասել։" }
        ]
      },
      {
        title: "2. Հարցական ձև",
        description: "Հարց տալու համար օգտագործում ենք նույն բանաձևը, բայց այլ հնչերանգով և հարցական նշաններով.",
        examples: [
          { es: "¿Te gusta la música?", arm: "Քեզ դուր է գալիս երաժշտությունը՞։" },
          { es: "¿Te gustan los animales?", arm: "Քեզ դուր են գալիս կենդանիները՞։" },
          { es: "¿Le gusta viajar?", arm: "Նրան / Ձեզ դուր է գալիս ճանապարհորդե՞լ։" },
          { es: "¿Os gusta España?", arm: "Ձեզ դուր է գալիս Իսպանիան՞։" },
          { es: "¿Les gustan estos libros?", arm: "Նրանց / Ձեզ դուր են գալիս այս գրքերը՞։" }
        ]
      }
    ]
  },
  {
    id: "chap-5",
    number: 5,
    title: "Լրացուցիչ բացատրություն. Ինչու՞ 2 ձև",
    highlightText: "Այս բայերը չեն խոնարհվում սովորական խոնարհման պես՝ me/te/le կառուցվածքում ո՞ւմ դուր գալը չի փոխում բայը, փոխում է միայն ի՞նչ դուր գալը։",
    sections: [
      {
        title: "1. Մարդը փոխվում է, բայց բայը նույնն է",
        description: "Եթե խոսքը նույն առարկայի (օրինակ՝ սուրճի) մասին է, բայը մնում է եզակի (gusta), փոխվում է միայն դերանունը.",
        examples: [
          { es: "Me gusta el café. (Ինձ)", arm: "Te gusta el café. (Քեզ)" },
          { es: "Le gusta el café. (Նրան)", arm: "Nos gusta el café. (Մեզ)" },
          { es: "Os gusta el café. (Ձեզ)", arm: "Les gusta el café. (Նրանց)" }
        ]
      },
      {
        title: "2. Հոգնակի դեպքում՝ նույնպես նույն բայը բոլորի հետ",
        description: "Եթե առարկան հոգնակի է (los libros), բոլոր դեմքերի հետ օգտագործվում է gustan.",
        examples: [
          { es: "Me gustan los libros. (Ինձ)", arm: "Te gustan los libros. (Քեզ)" },
          { es: "Le gustan los libros. (Նրան)", arm: "Nos gustan los libros. (Մեզ)" },
          { es: "Os gustan los libros. (Ձեզ)", arm: "Les gustan los libros. (Նրանց)" }
        ]
      },
      {
        title: "3. Գոյականի և բայի կարևոր տարբերությունը",
        description: "Երբ դրան հաջորդում է անորոշ բայ (infinitivo), այն համարվում է մեկ ընդհանուր գործողություն, ուստի միշտ եզակի է.",
        examples: [
          { es: "Me gusta bailar.", arm: "Ինձ դուր է գալիս պարել (հաջորդում է բայ → gusta)։" },
          { es: "Me gustan los bailes españoles.", arm: "Ինձ դուր են գալիս իսպանական պարերը (հաջորդում է հոգնակի գոյական → gustan)։" }
        ]
      }
    ]
  },
  {
    id: "chap-6",
    number: 6,
    title: "Տեսականորեն սովորական խոնարհում. Yo gusto, tú gustas",
    highlightText: "Այո, gustar բայը կարող է սովորական բայի պես խոնարհվել, բայց դա այլ նշանակություն ունի՝ 'ես եմ դուր գալիս ինչ-որ մեկին'։",
    sections: [
      {
        title: "1. Գաղափարը",
        description: "Երբ 'ես' եմ ինչ-որ մեկին դուր գալիս, օգտագործում ենք yo gusto, իսկ երբ 'դու' ես դուր գալիս՝ me gustas։",
        examples: [
          { es: "Me gusta Carlos.", arm: "Կառլոսը ինձ դուր է գալիս։ (Կառլոսն է եզակի առարկան/մարդը, որ դուր է գալիս)" },
          { es: "Le gusto a Carlos.", arm: "Ես Կառլոսին դուր եմ գալիս։ (Ես եմ դուր գալիս → gusto)։" },
          { es: "Me gustas.", arm: "Դու ինձ դուր ես գալիս։ (Դու ես դուր գալիս → gustas)։" },
          { es: "Te gusto.", arm: "Ես քեզ դուր եմ գալիս։ (Ես եմ դուր գալիս → gusto)։" }
        ]
      },
      {
        title: "2. Ամբողջական համապատասխանության աղյուսակ (Մարիայի օրինակով)",
        tableHeaders: ["Իսպաներեն", "Հայերեն թարգմանություն", "Բացատրություն"],
        tableRows: [
          ["Yo le gusto a María.", "Ես Մարիային դուր եմ գալիս։", "Ես եմ դուր գալիս → gusto"],
          ["Tú le gustas a María.", "Դու Մարիային դուր ես գալիս։", "Դու ես դուր գալիս → gustas"],
          ["Él le gusta a María.", "Նա Մարիային դուր է գալիս։", "Նա է դուր գալիս → gusta"],
          ["Nosotros le gustamos a María.", "Մենք Մարիային դուր ենք գալիս։", "Մենք ենք դուր գալիս → gustamos"],
          ["Ellos le gustan a María.", "Նրանք Մարիային դուր ենք գալիս (սխալմամբ՝ դուր են գալիս)։", "Նրանք են դուր գալիս → gustan"]
        ]
      },
      {
        title: "3. Օրինակներ զրույցում",
        examples: [
          { es: "Me gustas mucho.", arm: "Դու ինձ շատ ես դուր գալիս։" },
          { es: "¿Te gusto?", arm: "Ես քեզ դուր գալի՞ս եմ։" },
          { es: "Creo que le gustas a Ana.", arm: "Կարծում եմ՝ դու Անային դուր ես գալիս։" },
          { es: "No le gusto a Carlos.", arm: "Ես Կառլոսին դուր չեմ գալիս։" }
        ]
      }
    ]
  },
  {
    id: "chap-7",
    number: 7,
    title: "Նմանատիպ այլ բայեր",
    highlightText: "Կան տասնյակ այլ բայեր, որոնք աշխատում են նույն սկզբունքով (encantar, doler, interesar, molestar...)։",
    sections: [
      {
        title: "1. Encantar, Interesar, Parecer և Sorprender",
        description: "Սրանք նույնպես ունեն հիմնականում 2 ձև (եզակի և հոգնակի) կախված նրանից, թե ինչն է դուր գալիս/հետաքրքրում/թվում։",
        examples: [
          { es: "Me encanta la música. (եզակի)", arm: "Me encantan las flores. (հոգնակի)" },
          { es: "Me interesa la historia. (եզակի)", arm: "Me interesan los idiomas. (հոգնակի)" },
          { es: "Me parece interesante. (եզակի)", arm: "Me pareces inteligente (Դու ինձ խելացի ես թվում)։" },
          { es: "Me sorprende tu respuesta.", arm: "Me sorprenden estas noticias." }
        ]
      },
      {
        title: "2. Doler (Ցավել) բայի նրբությունը",
        description: "Doler-ը շատ հաճախ սխալ է օգտագործվում։ Իսպաներենում ցավում է մարմնի մասը, ուստի օգտագործում ենք duele (եզակի) կամ duelen (հոգնակի)։",
        examples: [
          { es: "Me duele la cabeza.", arm: "Գլուխս ցավում է (գլուխը եզակի է → duele)։" },
          { es: "Me duelen los ojos.", arm: "Աչքերս ցավում են (աչքերը հոգնակի են → duelen)։" },
          { es: "Nos duelen las piernas.", arm: "Մեր ոտքերը ցավում են։" }
        ]
      },
      {
        title: "3. Molestar, Enfadar, Preocupar և Importar",
        examples: [
          { es: "Me molesta el ruido. (խանգարել)", arm: "Me molestan las mentiras." },
          { es: "Me enfada esta situación. (բարկացնել)", arm: "Me enfadan las injusticias." },
          { es: "Me preocupa el examen. (անհանգստացնել)", arm: "Me preocupan mis notas." },
          { es: "Me importa mi familia. (կարևոր լինել)", arm: "Me importas (Դու կարևոր ես ինձ համար)։" }
        ]
      }
    ]
  }
];

export interface QuizQuestion {
  id: string;
  question: string;
  armenianTranslation: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  verbType: string;
}

// 6 Games databases
export interface GameQuestion {
  id: string;
  instructionArm: string;
  prompt: string; // The text display e.g., "A mí ___ gusta bailar."
  translationArm: string;
  options: string[];
  correct: string;
  extraExplanation: string;
  // For sentence builder:
  scrambledWords?: string[];
  correctWords?: string[];
}

export const Game1Data: GameQuestion[] = [
  // Գուշակիր ճիշտ դերանունը (Guess the Correct Pronoun)
  {
    id: "g1-q1",
    instructionArm: "Ընտրիր ճիշտ դերանունը իսպաներեն հարմար տարբերակից.",
    prompt: "A mí ___ gusta bailar.",
    translationArm: "Ինձ դուր է գալիս պարել։",
    options: ["me", "te", "le", "nos", "os", "les"],
    correct: "me",
    extraExplanation: "«A mí»-ի հետ միշտ օգտագործվում է «me» կարճ դերանունը։"
  },
  {
    id: "g1-q2",
    instructionArm: "Ընտրիր ճիշտ դերանունը.",
    prompt: "A Carlos ___ gusta el café.",
    translationArm: "Կառլոսին դուր է գալիս սուրճը։",
    options: ["me", "te", "le", "nos", "os", "les"],
    correct: "le",
    extraExplanation: "«A Carlos»-ը համապատասխանում է 3-րդ դեմքին (él), ուստի օգտագործում ենք «le»:"
  },
  {
    id: "g1-q3",
    instructionArm: "Ընտրիր ճիշտ դերանունը.",
    prompt: "A nosotros ___ preocupa el examen.",
    translationArm: "Մեզ անհանգստացնում է քննությունը։",
    options: ["me", "te", "le", "nos", "os", "les"],
    correct: "nos",
    extraExplanation: "«A nosotros»-ի հետ միշտ օգտագործվում է «nos» դերանունը։"
  },
  {
    id: "g1-q4",
    instructionArm: "Ընտրիր ճիշտ դերանունը.",
    prompt: "A vosotros ___ interesan los idiomas.",
    translationArm: "Ձեզ (իսպանիայում) հետաքրքրում են լեզուները։",
    options: ["me", "te", "le", "nos", "os", "les"],
    correct: "os",
    extraExplanation: "«A vosotros»-ի հետ միշտ օգտագործվում է «os» դերանունը։"
  },
  {
    id: "g1-q5",
    instructionArm: "Ընտրիր ճիշտ դերանունը.",
    prompt: "A mis padres ___ encantan las flores.",
    translationArm: "Իմ ծնողներին շատ են դուր գալիս ծաղիկները։",
    options: ["me", "te", "le", "nos", "os", "les"],
    correct: "les",
    extraExplanation: "«Mis padres»-ը հոգնակի 3-րդ դեմք է (ellos), ուստի օգտագործում ենք «les»:"
  }
];

export const Game2Data: GameQuestion[] = [
  // Gusta թե՞ Gustan (Gusta or Gustan)
  {
    id: "g2-q1",
    instructionArm: "Ընտրիր ճիշտ բայաձևը (եզակի, թե՞ հոգնակի).",
    prompt: "Me ___ los libros.",
    translationArm: "Ինձ դուր են գալիս գրքերը։",
    options: ["gusta", "gustan"],
    correct: "gustan",
    extraExplanation: "«los libros»-ը հոգնակի գոյական է, ուստի օգտագործում ենք հոգնակի «gustan» ձևը։"
  },
  {
    id: "g2-q2",
    instructionArm: "Ընտրիր ճիշտ բայաձևը.",
    prompt: "Nos ___ viajar.",
    translationArm: "Մեզ դուր է գալիս ճանապարհորդել։",
    options: ["gusta", "gustan"],
    correct: "gusta",
    extraExplanation: "«viajar»-ը անորոշ բայ է (infinitivo), ուստի օգտագործում ենք եզակի «gusta» ձևը։"
  },
  {
    id: "g2-q3",
    instructionArm: "Ընտրիր ճիշտ բայաձևը.",
    prompt: "Me ___ los ojos.",
    translationArm: "Աչքերս ցավում են։",
    options: ["duele", "duelen"],
    correct: "duelen",
    extraExplanation: "«los ojos»-ը (աչքերը) հոգնակի գոյական է, ուստի օգտագործում ենք «duelen»:"
  },
  {
    id: "g2-q4",
    instructionArm: "Ընտրիր ճիշտ բայաձևը.",
    prompt: "Te ___ la cabeza.",
    translationArm: "Գլուխդ ցավում է։",
    options: ["duele", "duelen"],
    correct: "duele",
    extraExplanation: "«la cabeza»-ն (գլուխը) եզակի գոյական է, ուստի օգտագործում ենք «duele»:"
  },
  {
    id: "g2-q5",
    instructionArm: "Ընտրիր ճիշտ բայաձևը.",
    prompt: "Le ___ mucho las ciudades nuevas.",
    translationArm: "Նրան շատ են հետաքրքրում նոր քաղաքները։",
    options: ["interesa", "interesan"],
    correct: "interesan",
    extraExplanation: "«las ciudades nuevas»-ը հոգնակի է, ուստի օգտագործվում է «interesan»-ը։"
  }
];

export const Game3Data: GameQuestion[] = [
  // Կառուցիր նախադասությունը (Sentence Builder)
  {
    id: "g3-q1",
    instructionArm: "Դասավորիր բառերը ճիշտ հերթականությամբ, որպեսզի ստանաս նախադասությունը.",
    prompt: "Ինձ դուր է գալիս սուրճը։",
    translationArm: "Սուրճը ինձ դուր է գալիս։ (Me gusta el café.)",
    options: ["gusta", "café", "me", "el"],
    correct: "me gusta el café",
    scrambledWords: ["gusta", "café", "me", "el"],
    correctWords: ["me", "gusta", "el", "café"],
    extraExplanation: "Իսպաներեն սովորական կառուցվածքն է՝ դերանուն (me) + բայ (gusta) + գոյական (el café)։"
  },
  {
    id: "g3-q2",
    instructionArm: "Դասավորիր բառերը ճիշտ հերթականությամբ.",
    prompt: "Ինձ դուր են գալիս գրքերը։",
    translationArm: "Գրքերը ինձ դուր են գալիս։ (Me gustan los libros.)",
    options: ["libros", "gustan", "me", "los"],
    scrambledWords: ["libros", "gustan", "me", "los"],
    correctWords: ["me", "gustan", "los", "libros"],
    correct: "me gustan los libros",
    extraExplanation: "Քանի որ գրքերը հոգնակի են (los libros), օգտագործվում է «gustan» բայաձևը։"
  },
  {
    id: "g3-q3",
    instructionArm: "Դասավորիր բառերը ճիշտ հերթականությամբ.",
    prompt: "Դու ինձ դուր ես գալիս։",
    translationArm: "Դու ինձ դուր ես գալիս (Me gustas.)",
    options: ["gustas", "me"],
    scrambledWords: ["gustas", "me"],
    correctWords: ["me", "gustas"],
    correct: "me gustas",
    extraExplanation: "«me» նշանակում է ինձ, իսկ «gustas»-ը gustar բայի 2-րդ դեմքն է (tú-ուն համապատասխան), այսինքն՝ դու ես դուր գալիս:"
  },
  {
    id: "g3-q4",
    instructionArm: "Դասավորիր բառերը ճիշտ հերթականությամբ.",
    prompt: "Ես Կառլոսին դուր եմ գալիս։",
    translationArm: "Ես Կառլոսին դուր եմ գալիս։ (Le gusto a Carlos.)",
    options: ["gusto", "Carlos", "le", "a"],
    scrambledWords: ["gusto", "Carlos", "le", "a"],
    correctWords: ["le", "gusto", "a", "Carlos"],
    correct: "le gusto a Carlos",
    extraExplanation: "«le gusto» նշանակում է՝ ես դուր եմ գալիս նրան, իսկ «a Carlos»-ը պարզաբանում է, թե ում։"
  }
];

export const Game4Data: GameQuestion[] = [
  // Մարդկային "Gustar" (Human "Gustar" Challenge)
  {
    id: "g4-q1",
    instructionArm: "Ի՞նչ է նշանակում «Me gustas»-ը.",
    prompt: "Me gustas.",
    translationArm: "Ընտրիր ճիշտ հայերեն թարգմանությունը.",
    options: ["Դու ինձ դուր ես գալիս։", "Ես քեզ դուր եմ գալիս։", "Նա ինձ դուր է գալիս։", "Դու նրան դուր ես գալիս։"],
    correct: "Դու ինձ դուր ես գալիս։",
    extraExplanation: "«me»-ն ինձ, իսկ «gustas»-ը նշանակում է՝ դու ես դուր գալիս։"
  },
  {
    id: "g4-q2",
    instructionArm: "Ի՞նչ է նշանակում «Te gusto»-ն.",
    prompt: "Te gusto.",
    translationArm: "Ընտրիր ճիշտ հայերեն թարգմանությունը.",
    options: ["Դու ինձ դուր ես գալիս։", "Ես քեզ դուր եմ գալիս։", "Ես նրան դուր եմ գալիս։", "Նրանք քեզ դուր են գալիս։"],
    correct: "Ես քեզ դուր եմ գալիս։",
    extraExplanation: "«te»-ն քեզ, իսկ «gusto»-ն նշանակում է՝ ես եմ դուր գալիս։"
  },
  {
    id: "g4-q3",
    instructionArm: "Ի՞նչ է նշանակում «Le gusto a María»-ն.",
    prompt: "Yo le gusto a María.",
    translationArm: "Ընտրիր ճիշտ թարգմանությունը.",
    options: ["Ես Մարիային դուր եմ գալիս։", "Մարիան ինձ դուր է գալիս։", "Դու Մարիային դուր ես գալիս։", "Մենք Մարիային դուր ենք գալիս։"],
    correct: "Ես Մարիային դուր եմ գալիս։",
    extraExplanation: "«Yo le gusto» - Ես դուր եմ գալիս նրան, «a María» - Մարիային։"
  },
  {
    id: "g4-q4",
    instructionArm: "Ի՞նչ է նշանակում «Tú le gustas a María»-ն.",
    prompt: "Tú le gustas a María.",
    translationArm: "Ընտրիր ճիշտ թարգմանությունը.",
    options: ["Դու Մարիային դուր ես գալիս։", "Ես Մարիային դուր եմ գալիս։", "Նա Մարիային դուր է գալիս։", "Մարիան քեզ դուր է գալիս։"],
    correct: "Դու Մարիային դուր ես գալիս։",
    extraExplanation: "«Tú le gustas» - Դու դուր ես գալիս նրան, «a María» - Մարիային։"
  }
];

export const Game5Data: GameQuestion[] = [
  // Ճիշտ թարգմանություն (Choose the Correct Translation) - Cover other verbs (encantar, doler, etc.)
  {
    id: "g5-q1",
    instructionArm: "Ի՞նչ է նշանակում հետևյալ նախադասությունը.",
    prompt: "Me encanta la música.",
    translationArm: "Ընտրիր իսկական հայերեն իմաստը.",
    options: ["Ես շատ եմ սիրում երաժշտությունը (պաշտում եմ)։", "Երաժշտությունը ինձ հետաքրքրում է։", "Երաժշտությունը ինձ զարմացնում է։", "Երաժշտությունը ինձ խանգարում է։"],
    correct: "Ես շատ եմ սիրում երաժշտությունը (պաշտում եմ)։",
    extraExplanation: "«encantar»-ը նշանակում է չափազանց շատ դուր գալ կամ պաշտել:"
  },
  {
    id: "g5-q2",
    instructionArm: "Ի՞նչ է նշանակում հետևյալ նախադասությունը.",
    prompt: "Me duele la cabeza.",
    translationArm: "Ընտրիր ճիշտ թարգմանությունը.",
    options: ["Գլուխս ցավում է։", "Ձեռքս ցավում է։", "Աչքերս ցավում են։", "Կոկորդս ցավում է։"],
    correct: "Գլուխս ցավում է։",
    extraExplanation: "«doler» բայից «duele la cabeza» նշանակում է՝ գլուխս ցավում է։"
  },
  {
    id: "g5-q3",
    instructionArm: "Ի՞նչ է նշանակում հետևյալ նախադասությունը.",
    prompt: "No me importa.",
    translationArm: "Ընտրիր ճիշտ թարգմանությունը.",
    options: ["Ինձ համար կարևոր չէ (ինձ չի հետաքրքրում)։", "Ինձ դուր չի գալիս։", "Ինձ չի խանգարում։", "Ինձ չի անհանգստացնում։"],
    correct: "Ինձ համար կարևոր չէ (ինձ չի հետաքրքրում)։",
    extraExplanation: "«importar» նշանակում է կարևոր լինել, իսկ «no me importa»՝ ինձ համար միևնույն է / կարևոր չէ։"
  },
  {
    id: "g5-q4",
    instructionArm: "Ի՞նչ է նշանակում հետևյալ նախադասությունը.",
    prompt: "Me apetece un café.",
    translationArm: "Ընտրիր ճիշտ թարգմանությունը.",
    options: ["Ես սուրճ խմելու ցանկություն ունեմ (սուրճ եմ ուզում)։", "Ինձ դուր է գալիս սուրճը։", "Ինձ սուրճ է պետք։", "Ես սուրճ եմ պատրաստում։"],
    correct: "Ես սուրճ խմելու ցանկություն ունեմ (սուրճ եմ ուզում)։",
    extraExplanation: "«apetecer» նշանակում է տվյալ պահին ինչ-որ բան կամենալ կամ ցանկանալ:"
  },
  {
    id: "g5-q5",
    instructionArm: "Ի՞նչ է նշանակում հետևյալ նախադասությունը.",
    prompt: "Me molesta el ruido.",
    translationArm: "Ընտրիր ճիշտ թարգմանությունը.",
    options: ["Աղմուկը ինձ խանգարում է / նյարդայնացնում է։", "Աղմուկը ինձ զարմացնում է։", "Աղմուկը ինձ բարկացնում է։", "Աղմուկը ինձ անհանգստացնում է։"],
    correct: "Աղմուկը ինձ խանգարում է / նյարդայնացնում է։",
    extraExplanation: "«molestar» նշանակում է խանգարել/անհանգստություն պատճառել/նյարդայնացնել։"
  }
];

export const Game6Data: GameQuestion[] = [
  // Դիալոգի լրացում (Complete the Dialogue)
  {
    id: "g6-q1",
    instructionArm: "Լրացրու Լուսիայի խոսքի բաց թողնված բառը. Lucía: ¿Te _____ viajar?",
    prompt: "Lucía: ¿Te _____ viajar? (Քեզ դուր է գալիս ճանապարհորդե՞լ։)",
    translationArm: "Գործողությունը ճանապարհորդելն է (անորոշ բայ)։",
    options: ["gusta", "gustan", "gusta a ti"],
    correct: "gusta",
    extraExplanation: "viajar բայից առաջ օգտագործում ենք եզակի «gusta» ձևը։"
  },
  {
    id: "g6-q2",
    instructionArm: "Լրացրու Կառլոսի պատասխանի առաջին մասը. Carlos: Sí, me _____ viajar.",
    prompt: "Carlos: Sí, me _____ viajar. (Այո, ես շատ եմ սիրում ճանապարհորդել։)",
    translationArm: "Շատ սիրելու/պաշտելու բայը սկզբնական բայից առաջ։",
    options: ["encanta", "encantan", "interesa"],
    correct: "encanta",
    extraExplanation: "«viajar» բայից առաջ շատ սիրելու համար օգտագործվում է եզակի «encanta» ձևը։"
  },
  {
    id: "g6-q3",
    instructionArm: "Լրացրու Կառլոսի պատասխանի երկրորդ մասը. Carlos: Me _____ mucho las ciudades nuevas.",
    prompt: "Carlos: Me _____ mucho las ciudades nuevas. (Ինձ շատ են հետաքրքրում նոր քաղաքները։)",
    translationArm: "las ciudades nuevas-ը (նոր քաղաքները) հոգնակի է։",
    options: ["interesa", "interesan", "parece"],
    correct: "interesan",
    extraExplanation: "«las ciudades nuevas»-ը հոգնակի է, ուստի «interesan»-ն է ճիշտ ընտրությունը։"
  },
  {
    id: "g6-q4",
    instructionArm: "Լրացրու Լուսիայի պատասխանը. Lucía: A mí también. Me _____ muy divertido conocer lugares nuevos.",
    prompt: "Lucía: A mí también. Me _____ muy divertido conocer lugares nuevos. (Ինձ շատ զվարճալի է թվում նոր վայրեր ճանաչելը։)",
    translationArm: "«Թվում է» իմաստն ունեցող բայը։",
    options: ["parece", "parecen", "gusta"],
    correct: "parece",
    extraExplanation: "«conocer lugares nuevos»-ն անորոշ բայով է, ուստի «parece» (եզակի) է:"
  },
  {
    id: "g6-q5",
    instructionArm: "Լրացրու Կառլոսի հարցը. Carlos: ¿Te _____ ir a Valencia este verano?",
    prompt: "Carlos: ¿Te _____ ir a Valencia este verano? (Կուզե՞ս այս ամառ գնալ Վալենսիա։)",
    translationArm: "Ցանկություն ունենալու բայը («apetecer»)։",
    options: ["apetece", "apetecen", "apetece a ti"],
    correct: "apetece",
    extraExplanation: "«ir al cine/Valencia»-ն բայական խումբ է, ուստի օգտագործվում է եզակի «apetece»:"
  },
  {
    id: "g6-q6",
    instructionArm: "Լրացրու Լուսիայի պատասխանը. Lucía: Sí, me apetece mucho. Pero me _____ el dinero.",
    prompt: "Lucía: Sí, me apetece mucho. Pero me _____ el dinero. (Բայց փողի հարցը ինձ անհանգստացնում է։)",
    translationArm: "«Անհանգստացնել» («preocupar») բայը, «el dinero» (փողը) եզակի է։",
    options: ["preocupa", "preocupan", "preocupes"],
    correct: "preocupa",
    extraExplanation: "«el dinero»-ն եզակի է, ուստի «preocupa» է պետք (իսկ No te preocupes-ը 'մի անհանգստացիր' հրամայականն է)։"
  }
];

export const FullDialogue = [
  { speaker: "Lucía", es: "¿Te gusta viajar?", arm: "Քեզ դուր է գալիս ճանապարհորդե՞լ։" },
  { speaker: "Carlos", es: "Sí, me encanta viajar. Me interesan mucho las ciudades nuevas.", arm: "Այո, ես շատ եմ սիրում ճանապարհորդել։ Ինձ շատ հետաքրքրում են նոր քաղաքները։" },
  { speaker: "Lucía", es: "A mí también. Me parece muy divertido conocer lugares nuevos.", arm: "Ինձ էլ։ Ինձ շատ զվարճալի է թվում նոր վայրեր ճանաչելը։" },
  { speaker: "Carlos", es: "¿Te apetece ir a Valencia este verano?", arm: "Կուզե՞ս այս ամառ գնալ Վալենսիա։" },
  { speaker: "Lucía", es: "Sí, me apetece mucho. Pero me preocupa el dinero.", arm: "Այո, շատ կուզեի։ Բայց փողի հարցը ինձ անհանգստացնում է։" },
  { speaker: "Carlos", es: "No te preocupes. Buscaremos un hotel barato.", arm: "Մի անհանգստացիր։ Մենք էժան հյուրանոց կգտնենք։" }
];
