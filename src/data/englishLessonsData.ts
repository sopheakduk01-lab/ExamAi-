import { LessonSummary } from '../types';

export const ENGLISH_LESSONS: LessonSummary[] = [
  // ================= CHAPTER 1: TIME AND ACTIVITIES =================
  {
    id: 'eng-u1',
    subjectId: 'english',
    chapter: 'Chapter 1: Time and Activities',
    title: 'Unit 1: Greeting and Introduction (កិច្ចស្វាគមន៍ និងការណែនាំខ្លួន)',
    content: 'រៀនពីការស្វាគមន៍តាមពេលវេលា (Good morning, Good afternoon, Good evening), ការសួរសុខទុក្ខ (How are you?), ការណែនាំឈ្មោះ (My name is... / I’m...) និងការប្រើប្រាស់កិរិយាសព្ទ To Be (am/is/are)។',
    keyPoints: [
      'Good morning! ប្រើសម្រាប់ពេលព្រឹក (ពីព្រលឹម ដល់ ម៉ោង ១២ថ្ងៃត្រង់)',
      'Good afternoon! ប្រើសម្រាប់ពេលរសៀល (ពីម៉ោង ១២ថ្ងៃត្រង់ ដល់ ម៉ោង ៦ល្ងាច)',
      'Good evening! ប្រើសម្រាប់ពេលល្ងាច ឬយប់ (ចាប់ពីម៉ោង ៦ល្ងាចឡើងទៅ)',
      ' Verb "To be": I am (I’m), He/She/It is (He’s/She’s), You/We/They are (You’re/We’re/They’re)'
    ],
    formulaCard: {
      title: 'Grammar Focus: Verb "To be" (am/is/are)',
      content: 'Positive: Subject + am/is/are + Name/Noun\nQuestion: Am/Is/Are + Subject + Name/Noun?',
      example: 'I am Borith. / What is your name? / My name is Nary.'
    },
    quickPractice: {
      questionText: 'Choose the correct greeting for 2:30 PM:',
      options: [ 'Good afternoon', 'Good morning', 'Good evening', 'Good night' ],
      correctIndex: 0,
      explanation: 'At 2:30 PM (afternoon), we use "Good afternoon!".'
    }
  },
  {
    id: 'eng-u2',
    subjectId: 'english',
    chapter: 'Chapter 1: Time and Activities',
    title: 'Unit 2: Telling the Time (ការប្រាប់ពេលវេលា)',
    content: 'រៀនប្រាប់ម៉ោង និងនាទីជាភាសាអង់គ្លេស ដោយប្រើប្រាស់ពាក្យ o’clock, quarter past (លើស ១៥នាទី), half past (លើស ៣០នាទី/កន្លះ) និង quarter to (ខ្វះ ១៥នាទី)។',
    keyPoints: [
      '7:00 ➔ It is seven o’clock.',
      '7:15 ➔ It is quarter past seven. (ឬ seven fifteen)',
      '7:30 ➔ It is half past seven. (ឬ seven thirty)',
      '7:45 ➔ It is quarter to eight. (ឬ seven forty-five)'
    ],
    formulaCard: {
      title: 'Grammar Focus: Asking and Telling the Time',
      content: 'Question: What time is it? / What time do you...? \nAnswer: It is + [time] / At + [time]',
      example: 'What time is it? ➔ It is quarter to ten. (9:45)'
    },
    quickPractice: {
      questionText: 'How do you say "6:30" in English time format?',
      options: [ 'It is quarter past six', 'It is half past six', 'It is quarter to six', 'It is six o’clock' ],
      correctIndex: 1,
      explanation: '6:30 is "half past six".'
    }
  },
  {
    id: 'eng-u3',
    subjectId: 'english',
    chapter: 'Chapter 1: Time and Activities',
    title: 'Unit 3: Feeling Happy (អារម្មណ៍សប្បាយរីករាយ)',
    content: 'ការសួរ និងឆ្លើយអំពីសកម្មភាពប្រចាំថ្ងៃ និងអារម្មណ៍សប្បាយរីករាយ ដោយប្រើប្រាស់ Wh-Questions (What, How, What time) ជាមួយ Present Simple Tense។',
    keyPoints: [
      'What time do you get up? ➔ I get up at five o’clock.',
      'How do you go to school? ➔ I go to school on foot / by bicycle.',
      'What grade do you study? ➔ I study in Grade 6.',
      'What do you do in your free time? ➔ I read books and watch television.'
    ],
    formulaCard: {
      title: 'Wh- Questions with Present Simple',
      content: 'Wh-word + do/does + subject + verb (base form)?',
      example: 'What time do they play football? ➔ They play football at 5 o’clock.'
    }
  },
  {
    id: 'eng-u4',
    subjectId: 'english',
    chapter: 'Chapter 1: Time and Activities',
    title: 'Unit 4: Time at Home (ពេលវេលានៅផ្ទះ)',
    content: 'ពាក្យកិរិយាសព្ទសកម្មភាពប្រចាំថ្ងៃនៅផ្ទះ (wash, eat, brush, clean, cook) និងការប្រើប្រាស់ផ្នែកនៃថ្ងៃ (in the morning, in the afternoon, in the evening)។',
    keyPoints: [
      'wash my face / wash my clothes (លុបមុខ / បោកខោអាវ)',
      'brush my teeth (ដុសធ្មេញ) / clean the house (បោសសម្អាតផ្ទះ)',
      'cook dinner / have breakfast (ដាំស្ល / ញ៉ាំអាហារពេលព្រឹក)',
      'in the morning (ពេលព្រឹក), in the afternoon (ពេលរសៀល), in the evening (ពេលល្ងាច)'
    ],
    formulaCard: {
      title: 'Present Simple with Parts of the Day',
      content: 'I/You/We/They + Verb | He/She + Verb(-s/-es)\n+ in the morning / afternoon / evening',
      example: 'He washes his face in the morning. She cooks dinner in the evening.'
    }
  },
  {
    id: 'eng-u5',
    subjectId: 'english',
    chapter: 'Chapter 1: Time and Activities',
    title: 'Unit 5: Time at School (ពេលវេលានៅសាលារៀន)',
    content: 'ពាក្យរៀនសូត្រ និងសម្ភារក្នុងសាលា (classroom, attendance list, library, sport, board) និងការប្រើ Present Simple ជាមួយប្រធាន Singular He/She (ថែម s/es)។',
    keyPoints: [
      'classroom (បន្ទប់រៀន), attendance list (បញ្ជីវត្តមាន), library (បណ្ណាល័យ)',
      'board (ក្ដារខៀន), sport (កីឡា)',
      'ច្បាប់ថែម -s/es៖ កិរិយាសព្ទបញ្ចប់ដោយ -o, -ch, -sh, -ss, -x ត្រូវថែម -es ជាមួយ He/She/It (e.g., wash ➔ washes, go ➔ goes).'
    ],
    formulaCard: {
      title: 'Present Simple Third Person Singular Rule',
      content: 'He / She / It + Verb + s/es\nQuestion: What does he/she do before class?',
      example: 'She cleans the classroom and waters flowers before class starts.'
    }
  },

  // ================= CHAPTER 2: THE DATE =================
  {
    id: 'eng-u6',
    subjectId: 'english',
    chapter: 'Chapter 2: The Date',
    title: 'Unit 1: The Days (ថ្ងៃនៃសប្តាហ៍)',
    content: 'ឈ្មោះថ្ងៃទាំង ៧ ក្នុងមួយសប្តាហ៍ (Sunday to Saturday) ការប្រើប្រាស់ Preposition "on" ជាមួយថ្ងៃ និង phonics សំឡេង ea, oa, ue។',
    keyPoints: [
      '៧ ថ្ងៃ៖ Sunday (អាទិត្យ), Monday (ច័ន្ទ), Tuesday (អង្គារ), Wednesday (ពុធ), Thursday (ព្រហស្បតិ៍), Friday (សុក្រ), Saturday (សៅរ៍)',
      'Preposition of Time: ប្រើ "on" ជាមួយថ្ងៃ (on Monday, on Friday)',
      'Preposition of Time: ប្រើ "at" ជាមួយម៉ោង (at 7 o’clock)',
      'Phonics: ea = /iː/ (sea, teach), oa = /oʊ/ (road, coat), ue = /uː/ (cue, argue)'
    ],
    formulaCard: {
      title: 'Prepositions: ON vs AT',
      content: 'on + Days of the week (on Tuesday)\nat + Specific Clock Times (at 8 o’clock)',
      example: 'We study English on Monday at 7 o’clock.'
    }
  },
  {
    id: 'eng-u7',
    subjectId: 'english',
    chapter: 'Chapter 2: The Date',
    title: 'Unit 2: The Months (ខែទាំង ១២)',
    content: 'ឈ្មោះខែទាំង ១២ ក្នុងមួយឆ្នាំ (January to December) និងការសួរខែបច្ចុប្បន្ន ខែបន្ទាប់ ឬខែមុន។',
    keyPoints: [
      '១២ ខែ៖ January, February, March, April, May, June, July, August, September, October, November, December',
      'What month is it now? ➔ It’s November.',
      'What is the first month of the year? ➔ It’s January.',
      'September has 30 days. December is the twelfth month.'
    ]
  },
  {
    id: 'eng-u8',
    subjectId: 'english',
    chapter: 'Chapter 2: The Date',
    title: 'Unit 3: Family Birth Dates (កាលបរិច្ឆេទថ្ងៃកំណើតគ្រួសារ)',
    content: 'លេខរៀង Ordinal Numbers (1st, 2nd, 3rd, 4th...) ការសួរថ្ងៃខែឆ្នាំកំណើតដោយប្រើ "When was/were ... born?" និងការឆ្លើយតបជាមួយ "was/were born on [date]"។',
    keyPoints: [
      'Ordinal Numbers: 1st (first), 2nd (second), 3rd (third), 4th (fourth), 15th (fifteenth)',
      'When were you born? ➔ I was born on October 15th, 2004.',
      'When was your sister born? ➔ She was born on March 13th, 2001.',
      'ប្រើ Preposition "on" ពីមុខកាលបរិច្ឆេទពេញលេញ (on October 15th).'
    ],
    formulaCard: {
      title: 'Past Simple: Was / Were Born',
      content: 'Question: When was/were + Subject + born?\nAnswer: Subject + was/were born on + Month + Ordinal Day.',
      example: 'When were you born? ➔ I was born on March 13th.'
    }
  },
  {
    id: 'eng-u9',
    subjectId: 'english',
    chapter: 'Chapter 2: The Date',
    title: 'Unit 4: My Special Day (ថ្ងៃពិសេសរបស់ខ្ញុំ)',
    content: 'ពាក្យពិធីបុណ្យខួបកំណើត (balloons, gifts, candles, cake, friends, celebrate, invite, excited) និងការសួរថ្ងៃប្រារព្ធពិធីខួបកំណើត។',
    keyPoints: [
      'balloons (បាល់ប៉ោង), gifts (អំណោយ), candles (ទៀន), cake (នំខេក), friends (មិត្តភក្តិ)',
      'celebrate (ប្រារព្ធ), invite (អញ្ជើញ), excited (រំភើប), sing (ច្រៀង)',
      'When do you celebrate your birthday? ➔ I celebrate my birthday on March 3rd.',
      'How old are you this year? ➔ I’m twelve years old.'
    ]
  },
  {
    id: 'eng-u10',
    subjectId: 'english',
    chapter: 'Chapter 2: The Date',
    title: 'Unit 5: School Events (ព្រឹត្តិការណ៍សាលារៀន)',
    content: 'ពាក្យព្រឹត្តិការណ៍សាលា (smart, reading, exam, sport, award, celebrate, join, recite) និងកាលបរិច្ឆេទសំខាន់ៗដូចជាទិវាជាតិអានអត្ថបទ (National Reading Day)។',
    keyPoints: [
      'National Reading Day in Cambodia: March 11th (ថ្ងៃទី១១ ខែមីនា)',
      'Samdech Choun Nath’s birthday: March 11th, 1883',
      'award (រង្វាន់/ពានរង្វាន់), exam (ការប្រឡង), recite poetry (សូត្រកំណាព្យ)',
      'When is National Reading Day? ➔ It is on March 11th.'
    ]
  },

  // ================= CHAPTER 3: MY BODY =================
  {
    id: 'eng-u11',
    subjectId: 'english',
    chapter: 'Chapter 3: My Body',
    title: 'Unit 1: My Head (ក្បាលរបស់ខ្ញុំ)',
    content: 'ឈ្មោះផ្នែកផ្សេងៗនៃក្បាល (ear, eye, mouth, nose, cheek, forehead) និងការប្រើប្រាស់រចនាសម្ព័ន្ធរាប់ចំនួន "How many ... do you have? I have..."។',
    keyPoints: [
      'eye (ភ្នែក), ear (ត្រចៀក), nose (ច្រមុះ), mouth (មាត់), cheek (ថ្ពាល់), forehead (ថ្ងាស)',
      'How many eyes do you have? ➔ I have two eyes.',
      'How many noses does she have? ➔ She has one nose.',
      'I / You / We / They ➔ have | He / She / It ➔ has'
    ],
    formulaCard: {
      title: 'Grammar: Have / Has Questions',
      content: 'How many + Plural Noun + do/does + Subject + have?\nSubject + have/has + Number + Noun.',
      example: 'How many ears do you have? ➔ I have two ears.'
    }
  },
  {
    id: 'eng-u12',
    subjectId: 'english',
    chapter: 'Chapter 3: My Body',
    title: 'Unit 2: My Arms and Legs (ដៃ និងជើងរបស់ខ្ញុំ)',
    content: 'ឈ្មោះផ្នែកដៃជើង (arm, hand, fingers, leg, foot, knee, toes) និងការប្រើប្រាស់ This is... (វត្ថុឯកវចនៈជិត) / These are... (វត្ថុពហុវចនៈជិត)។',
    keyPoints: [
      'arm (ដៃ), hand (ប្រអប់ដៃ), fingers (ម្រាមដៃ), leg (ជើង), foot/feet (ប្រអប់ជើង), knee (ជង្គង់), toes (ម្រាមជើង)',
      'Singular: What is this? ➔ This is my left arm.',
      'Plural: What are these? ➔ These are my fingers / toes.'
    ],
    formulaCard: {
      title: 'Grammar: This is vs These are',
      content: 'Singular: This is + my/a + [noun]\nPlural: These are + my + [plural noun]',
      example: 'This is my knee. / These are my two feet.'
    }
  },
  {
    id: 'eng-u13',
    subjectId: 'english',
    chapter: 'Chapter 3: My Body',
    title: 'Unit 3: Appearance (រូបរាងខាងក្រៅ)',
    content: 'គុណនាមពណ៌នាpass រូបរាងមនុស្ស (curly, straight, blonde, brown, oval, thin, tall, short, pointed) និងសំណួរ "What does she/he look like?"។',
    keyPoints: [
      'curly hair (សក់រួញ), straight hair (សក់ត្រង់), blonde hair (សក់ពណ៌ទង់ដែង/លឿង)',
      'oval face (មុខរាងពងក្រពើ), pointed nose (ច្រមុះស្រួច), thin (ស្គម), tall (ខ្ពស់)',
      'What does she look like? ➔ She has long straight hair and an oval face.',
      'What do you look like? ➔ I am tall and I have black hair.'
    ],
    formulaCard: {
      title: 'Asking about Appearance',
      content: 'Question: What + do/does + Subject + look like?\nAnswer: Subject + is/am/are + Adj OR Subject + have/has + Adj + Noun.',
      example: 'What does Vichet look like? ➔ He is tall and thin with short black hair.'
    }
  },
  {
    id: 'eng-u14',
    subjectId: 'english',
    chapter: 'Chapter 3: My Body',
    title: 'Unit 4: Body Functions (មុខងារសរីរាង្គកាយ)',
    content: 'កិរិយាសព្ទសកម្មភាពសរីរាង្គ (eat, hear, run, see, smell, write, hold, walk, clap, point) និងការប្រើប្រាស់ Modal verb "Can"។',
    keyPoints: [
      'My eyes can see people and things around me.',
      'My ears can hear sounds and listen to music.',
      'My nose can breathe and smell.',
      'My hands can hold, write, draw, clap and point.',
      'My legs can walk, stand and run.'
    ],
    formulaCard: {
      title: 'Grammar: Can for Ability',
      content: 'Question: What can + Subject + do?\nAnswer: Subject + can + Verb (bare infinitive).',
      example: 'What can your nose do? ➔ My nose can smell.'
    }
  },
  {
    id: 'eng-u15',
    subjectId: 'english',
    chapter: 'Chapter 3: My Body',
    title: 'Unit 5: Body Care (ការថែទាំរាងកាយ)',
    content: 'សម្លៀកបំពាក់ និងសម្ភារការពាររាងកាយ (gloves, helmet, mask, pullover, socks, umbrella) និងការប្រើ Modal verb "Should" សម្រាប់ផ្តល់អនុសាសន៍។',
    keyPoints: [
      'gloves (ស្រោមដៃ), helmet (មួកសុវត្ថិភាព), mask (ម៉ាសរ៉ាំងមុខ/ម៉ាស)',
      'pullover (អាវរងាដៃវែង), socks (ស្រោមជើង), umbrella (ឆ័ត្រ)',
      'What should you wear in Winter? ➔ You should wear a pullover, gloves and socks.',
      'What should we do when our hair is so long? ➔ We should get a haircut.'
    ],
    formulaCard: {
      title: 'Grammar: Should for Advice',
      content: 'Question: What + should + Subject + wear/do?\nAnswer: Subject + should + Verb (base form).',
      example: 'It is cold today. You should wear a pullover.'
    }
  },

  // ================= CHAPTER 5: ANIMALS =================
  {
    id: 'eng-u16',
    subjectId: 'english',
    chapter: 'Chapter 5: Animals',
    title: 'Unit 1: Pets (សត្វចិញ្ចឹម)',
    content: 'ឈ្មោះសត្វចិញ្ចឹម (cat, fish, dove, dog, rabbit, parrot) និងការសម្តែងការចូលចិត្តដោយប្រើ "like / do not (don’t) like / doesn’t like"។',
    keyPoints: [
      'cat (ឆ្មា), dog (ឆ្កែ), fish (ត្រី), dove (លលក), rabbit (ទន្សាយ), parrot (សេក)',
      'Positive: I like dogs. / She likes cats.',
      'Negative: I don’t like mice. / Thida doesn’t like parrots.',
      'Question: Do you like rabbits? ➔ Yes, I do. / No, I don’t.'
    ]
  },
  {
    id: 'eng-u17',
    subjectId: 'english',
    chapter: 'Chapter 5: Animals',
    title: 'Unit 2: Wild Animals (សត្វព្រៃ)',
    content: 'ឈ្មោះសត្វព្រៃ (monkey, deer, elephant, snake, bear, bird) និងការប្រើប្រាស់ Possessive Adjectives "its" (របស់វា - ឯកវចនៈ) និង "their" (របស់ពួកវា - ពហុវចនៈ)។',
    keyPoints: [
      'monkey (ស្វា), deer (ឈ្លូស/ប្រើស), elephant (ដំរី), snake (ពស់), bear (ខ្លាឃ្មុំ), bird (បក្សី)',
      'The baby monkey clings to its mother. (its = របស់ស្វាតូចមួយ)',
      'The tigers catch deer for their meals. (their = របស់ខ្លាទាំងឡាយ)',
      'Phnom Tamao Zoo is located in Takeo province.'
    ],
    formulaCard: {
      title: 'Possessive Adjectives: ITS vs THEIR',
      content: 'its + Noun (singular animal owner)\ntheir + Noun (plural animals owner)',
      example: 'The bear catches fish for its baby. / Birds lay eggs in their nests.'
    }
  },
  {
    id: 'eng-u18',
    subjectId: 'english',
    chapter: 'Chapter 5: Animals',
    title: 'Unit 3: Sea Creatures (សត្វសមុទ្រ)',
    content: 'ឈ្មោះសត្វសមុទ្រ (squid, crab, lobster, shark, dolphin, whale) និងកិរិយាសព្ទ (eat, catch, buy, fry, live, use) ក្នុង Present Simple Tense។',
    keyPoints: [
      'squid (មឹក), crab (ក្តាម), lobster (បង្គានាគ/បង្គា), shark (ត្រីឆ្លាម), dolphin (ផ្សោត), whale (ត្រីបាឡែន)',
      'The whale eats small fish.',
      'Fishermen catch fishes, lobsters, squids and crabs at sea.',
      'They fry the lobsters with oil.'
    ]
  },
  {
    id: 'eng-u19',
    subjectId: 'english',
    chapter: 'Chapter 5: Animals',
    title: 'Unit 4: Farm Animals (សត្វស្រុក)',
    content: 'ឈ្មោះសត្វក្នុងកសិដ្ឋាន (horse, goat, turkey, chicken, cow, goose) និងការប្រើ Present Continuous Tense (Subject + am/is/are + Verb-ing)។',
    keyPoints: [
      'horse (សេះ), goat (ពពែ), turkey (មាន់ទួរគី), chicken (មាន់), cow (គោ), goose (ក្ងាន)',
      'plough (ភ្ជួរ), shear (កាត់រោមសត្វ), collect (ប្រមូល), feed (ផ្តល់ចំណី)',
      'The farmer is ploughing the field.',
      'My brothers are collecting the eggs of chickens and ducks.'
    ],
    formulaCard: {
      title: 'Present Continuous Tense (កំពុងធ្វើ)',
      content: 'Subject + am/is/are + Verb-ing',
      example: 'The duck is eating grain. / The farmers are feeding their pigs.'
    }
  },
  {
    id: 'eng-u20',
    subjectId: 'english',
    chapter: 'Chapter 5: Animals',
    title: 'Unit 5: Dangerous Animals (សត្វដែលនាំឱ្យមានគ្រោះថ្នាក់)',
    content: 'ឈ្មោះសត្វប្រហែសមានគ្រោះថ្នាក់ (mosquito, cobra, shark, crocodile, lion, tiger) និងការប្រើ Verb "To be" + Adjectives (dangerous, harmful, afraid, hungry, dead)។',
    keyPoints: [
      'mosquito (មូស), cobra (ពស់វែក), crocodile (ក្រពើ), lion (សឹង្ហ/តោ), tiger (ខ្លា)',
      'The cobra is dangerous to people.',
      'Mosquitoes are harmful to human health. Female mosquitoes cause dengue fever and Zika virus.',
      'All wild animals are afraid of lions.'
    ],
    formulaCard: {
      title: 'To Be + Adjectives for Animal Characteristics',
      content: 'Subject + am/is/are + Adjective (dangerous / harmful / afraid / hungry)',
      example: 'Mosquitoes are dangerous because they spread diseases.'
    }
  }
];
