import { ExamPaper } from '../types';

export const ENGLISH_EXAM_PAPERS: ExamPaper[] = [
  // =============================================================================================
  // វិញ្ញាសាទី ១: Model Exam 1 (TIME AND ACTIVITIES) - Directly from Official Ministry PDF Sample
  // =============================================================================================
  {
    id: 'english-exam-1',
    subjectId: 'english',
    title: 'វិញ្ញាសាប្រឡងទី ១៖ ភាសាអង់គ្លេស ថ្នាក់ទី៦ (TIME AND ACTIVITIES)',
    description: 'វិញ្ញាសាស្តង់ដារបឋមសិក្សា ៤ ផ្នែក (Vocabulary 2.5pt, Grammar 2pt, Reading 2.5pt, Writing 3pt) - សរុប ១០ ពិន្ទុ',
    durationMinutes: 60,
    totalPoints: 10,
    yearOrType: 'វិញ្ញាសាស្តង់ដារក្រសួង (១៧ សំណួរ)',
    questions: [
      // ---------------- Part 1: Vocabulary (2.5 points) ----------------
      {
        id: 'e1_q1',
        subjectId: 'english',
        category: 'Part 1: Vocabulary (២.៥ ពិន្ទុ) - Words: school / happy / watch / television / bath',
        text: '1. My friends go to __________.',
        options: [ 'school', 'happy', 'watch', 'bath' ],
        correctAnswerIndex: 0,
        explanation: 'The sentence describes going to a place ➔ "school".'
      },
      {
        id: 'e1_q2',
        subjectId: 'english',
        category: 'Part 1: Vocabulary (២.៥ ពិន្ទុ) - Words: school / happy / watch / television / bath',
        text: '2. I __________ television.',
        options: [ 'happy', 'watch', 'bath', 'school' ],
        correctAnswerIndex: 1,
        explanation: 'The verb used with television is "watch" (មើលទូរទស្សន៍) ➔ "I watch television."'
      },
      {
        id: 'e1_q3',
        subjectId: 'english',
        category: 'Part 1: Vocabulary (២.៥ ពិន្ទុ) - Words: school / happy / watch / television / bath',
        text: '3. He takes a cold __________.',
        options: [ 'television', 'watch', 'bath', 'happy' ],
        correctAnswerIndex: 2,
        explanation: 'The phrase for bathing is "take a cold bath" (ងូតទឹកត្រជាក់).'
      },
      {
        id: 'e1_q4',
        subjectId: 'english',
        category: 'Part 1: Vocabulary (២.៥ ពិន្ទុ) - Words: school / happy / watch / television / bath',
        text: '4. We look at a big __________.',
        options: [ 'happy', 'bath', 'watch', 'television' ],
        correctAnswerIndex: 3,
        explanation: 'We look at a big "television" (ទូរទស្សន៍ធំ).'
      },
      {
        id: 'e1_q5',
        subjectId: 'english',
        category: 'Part 1: Vocabulary (២.៥ ពិន្ទុ) - Words: school / happy / watch / television / bath',
        text: '5. My mother is very __________.',
        options: [ 'happy', 'television', 'bath', 'watch' ],
        correctAnswerIndex: 0,
        explanation: 'The adjective describing feeling or emotion is "happy" (សប្បាយចិត្ត).'
      },

      // ---------------- Part 2: Grammar (2 points) ----------------
      {
        id: 'e1_q6',
        subjectId: 'english',
        category: 'Part 2: Grammar (២ ពិន្ទុ) - Options: What time / How / When / Who',
        text: '1. __________ do you get up? -> I get up at five o\'clock.',
        options: [ 'How', 'What time', 'When', 'Who' ],
        correctAnswerIndex: 1,
        explanation: 'Since the response specifies a clock time ("at five o\'clock"), the question uses "What time".'
      },
      {
        id: 'e1_q7',
        subjectId: 'english',
        category: 'Part 2: Grammar (២ ពិន្ទុ) - Options: What time / How / When / Who',
        text: '2. __________ do you go to school? -> I go to school on foot.',
        options: [ 'What time', 'When', 'How', 'Who' ],
        correctAnswerIndex: 2,
        explanation: 'The response states the means of travel ("on foot"), so the question uses "How".'
      },
      {
        id: 'e1_q8',
        subjectId: 'english',
        category: 'Part 2: Grammar (២ ពិន្ទុ) - Options: What time / How / When / Who',
        text: '3. __________ do you play badminton? -> I play badminton at half past four.',
        options: [ 'What time', 'How', 'Who', 'When' ],
        correctAnswerIndex: 3,
        explanation: 'The question asks about time/schedule ("at half past four"), using "When" (or What time).'
      },
      {
        id: 'e1_q9',
        subjectId: 'english',
        category: 'Part 2: Grammar (២ ពិន្ទុ) - Options: What time / How / When / Who',
        text: '4. __________ do you play with? -> I play with my mother.',
        options: [ 'Who', 'How', 'When', 'What time' ],
        correctAnswerIndex: 0,
        explanation: 'The response mentions a person ("my mother"), so the question uses "Who".'
      },

      // ---------------- Part 3: Reading (2.5 points) ----------------
      {
        id: 'e1_q10',
        subjectId: 'english',
        category: 'Part 3: Reading (២.៥ ពិន្ទុ) - Text: Dara is my best friend. He studies in Grade 6 with me. He has a new bicycle. He goes to school with his sister. Every day he goes to school on time. He is a punctual student and helpful friend. He spends his free time on his studies and family. After dinner, he reads books and does homework. He sometimes watches television and does housework. He is a smart student in the class. All classmates love him very much. His parents are really happy with his activities and study record.',
        text: '1. Dara studies in Grade 6.',
        options: [ 'False', 'True' ],
        correctAnswerIndex: 1,
        explanation: 'True! The text says: "He studies in Grade 6 with me."'
      },
      {
        id: 'e1_q11',
        subjectId: 'english',
        category: 'Part 3: Reading (២.៥ ពិន្ទុ)',
        text: '2. Dara goes to school alone.',
        options: [ 'False', 'True' ],
        correctAnswerIndex: 0,
        explanation: 'False! The text states: "He goes to school with his sister."'
      },
      {
        id: 'e1_q12',
        subjectId: 'english',
        category: 'Part 3: Reading (២.៥ ពិន្ទុ)',
        text: '3. After dinner, he reads books and does homework.',
        options: [ 'False', 'True' ],
        correctAnswerIndex: 1,
        explanation: 'True! The text states: "After dinner, he reads books and does homework."'
      },
      {
        id: 'e1_q13',
        subjectId: 'english',
        category: 'Part 3: Reading (២.៥ ពិន្ទុ)',
        text: '4. Dara never watches television.',
        options: [ 'False', 'True' ],
        correctAnswerIndex: 0,
        explanation: 'False! The text says: "He sometimes watches television and does housework."'
      },
      {
        id: 'e1_q14',
        subjectId: 'english',
        category: 'Part 3: Reading (២.៥ ពិន្ទុ)',
        text: '5. His parents are really happy.',
        options: [ 'False', 'True' ],
        correctAnswerIndex: 1,
        explanation: 'True! The text states: "His parents are really happy with his activities and study record."'
      },

      // ---------------- Part 4: Writing (3 points) ----------------
      {
        id: 'e1_q15',
        subjectId: 'english',
        category: 'Part 4: Writing (៣ ពិន្ទុ) - Answer in complete sentences',
        text: '1. What time do you get up in the morning?',
        options: [
          'Get up five o\'clock.',
          'I getting up five o\'clock.',
          'I get up at five o\'clock in the morning.',
          'I am get up at night.'
        ],
        correctAnswerIndex: 2,
        explanation: 'A complete, grammatically correct answer is "I get up at five o\'clock in the morning."'
      },
      {
        id: 'e1_q16',
        subjectId: 'english',
        category: 'Part 4: Writing (៣ ពិន្ទុ) - Answer in complete sentences',
        text: '2. How do you go to school? (On foot, by bicycle, or by motorbike?)',
        options: [
          'I goes to school on motorbike.',
          'Go school bicycle.',
          'By bicycle I going.',
          'I go to school by bicycle.'
        ],
        correctAnswerIndex: 3,
        explanation: 'The proper full-sentence answer is "I go to school by bicycle."'
      },
      {
        id: 'e1_q17',
        subjectId: 'english',
        category: 'Part 4: Writing (៣ ពិន្ទុ) - Answer in complete sentences',
        text: '3. What do you do in your free time to feel happy?',
        options: [
          'In my free time, I read books and play sports to feel happy.',
          'Free time I sleeping all day.',
          'I not have free time.',
          'Read books happy.'
        ],
        correctAnswerIndex: 0,
        explanation: 'The full complete sentence is "In my free time, I read books and play sports to feel happy."'
      }
    ]
  },

  // =============================================================================================
  // វិញ្ញាសាទី ២: Model Exam 2 (TIME AT SCHOOL & EVENTS) - Directly from Official Ministry PDF Sample
  // =============================================================================================
  {
    id: 'english-exam-2',
    subjectId: 'english',
    title: 'វិញ្ញាសាប្រឡងទី ២៖ ភាសាអង់គ្លេស ថ្នាក់ទី៦ (TIME AT SCHOOL & EVENTS)',
    description: 'វិញ្ញាសាស្តង់ដារបឋមសិក្សា ៤ ផ្នែក (Vocabulary 2.5pt, Grammar 2pt, Reading 2.5pt, Writing 3pt) - សរុប ១០ ពិន្ទុ',
    durationMinutes: 60,
    totalPoints: 10,
    yearOrType: 'វិញ្ញាសាស្តង់ដារក្រសួង (១៧ សំណួរ)',
    questions: [
      // ---------------- Part 1: Vocabulary (2.5 points) ----------------
      {
        id: 'e2_q1',
        subjectId: 'english',
        category: 'Part 1: Vocabulary (២.៥ ពិន្ទុ) - Words: board / classroom / library / sports / attendance list',
        text: '1. Every morning, I go to school early to clean the __________.',
        options: [ 'board', 'classroom', 'library', 'sports' ],
        correctAnswerIndex: 1,
        explanation: 'Students go to school early to clean the "classroom" (បន្ទប់រៀន).'
      },
      {
        id: 'e2_q2',
        subjectId: 'english',
        category: 'Part 1: Vocabulary (២.៥ ពិន្ទុ) - Words: board / classroom / library / sports / attendance list',
        text: '2. My teacher uses a marker to write the lesson on the __________.',
        options: [ 'library', 'sports', 'board', 'attendance list' ],
        correctAnswerIndex: 2,
        explanation: 'Teachers write lessons on the "board" (ក្ដារខៀន).'
      },
      {
        id: 'e2_q3',
        subjectId: 'english',
        category: 'Part 1: Vocabulary (២.៥ ពិន្ទុ) - Words: board / classroom / library / sports / attendance list',
        text: '3. Ratha often goes to the __________ to read books.',
        options: [ 'sports', 'classroom', 'board', 'library' ],
        correctAnswerIndex: 3,
        explanation: 'We go to read books at the "library" (បណ្ណាល័យ).'
      },
      {
        id: 'e2_q4',
        subjectId: 'english',
        category: 'Part 1: Vocabulary (២.៥ ពិន្ទុ) - Words: board / classroom / library / sports / attendance list',
        text: '4. Before the lesson starts, my teacher checks the __________.',
        options: [ 'attendance list', 'sports', 'board', 'library' ],
        correctAnswerIndex: 0,
        explanation: 'Teachers check the "attendance list" (បញ្ជីវត្តមាន) before lessons.'
      },
      {
        id: 'e2_q5',
        subjectId: 'english',
        category: 'Part 1: Vocabulary (២.៥ ពិន្ទុ) - Words: board / classroom / library / sports / attendance list',
        text: '5. At breaktime, I like to play __________ with my friends.',
        options: [ 'attendance list', 'sports', 'library', 'board' ],
        correctAnswerIndex: 1,
        explanation: 'During breaktime, students like to play "sports" (កីឡា).'
      },

      // ---------------- Part 2: Grammar (2 points) ----------------
      {
        id: 'e2_q6',
        subjectId: 'english',
        category: 'Part 2: Grammar (២ ពិន្ទុ) - Options: What / When / What time',
        text: '1. __________ do you do before class? -> I clean the classroom and water the flowers.',
        options: [ 'What time', 'When', 'What', 'Who' ],
        correctAnswerIndex: 2,
        explanation: 'Asking about an action/activity uses "What": "What do you do before class?".'
      },
      {
        id: 'e2_q7',
        subjectId: 'english',
        category: 'Part 2: Grammar (២ ពិន្ទុ) - Options: What / When / What time',
        text: '2. __________ do you go to school? -> I go to school at 6:30 AM.',
        options: [ 'How', 'What', 'Who', 'When' ],
        correctAnswerIndex: 3,
        explanation: 'Asking about time/schedule uses "When" (or What time).'
      },
      {
        id: 'e2_q8',
        subjectId: 'english',
        category: 'Part 2: Grammar (២ ពិន្ទុ) - Options: What / When / What time',
        text: '3. __________ does the class start? -> It starts at 7:00 AM.',
        options: [ 'What time', 'What', 'Who', 'Where' ],
        correctAnswerIndex: 0,
        explanation: 'Asking for specific clock time uses "What time".'
      },
      {
        id: 'e2_q9',
        subjectId: 'english',
        category: 'Part 2: Grammar (២ ពិន្ទុ) - Options: What / When / What time',
        text: '4. __________ does your teacher do first? -> She checks the attendance list.',
        options: [ 'When', 'What', 'What time', 'Where' ],
        correctAnswerIndex: 1,
        explanation: 'Asking about the initial action performed uses "What".'
      },

      // ---------------- Part 3: Reading (2.5 points) ----------------
      {
        id: 'e2_q10',
        subjectId: 'english',
        category: 'Part 3: Reading (២.៥ ពិន្ទុ) - Text: Ratha is a class leader and a good student. Everyone at school knows her well because she works hard. She always goes to school early to clean the classroom and water the flowers. She often reads books in the library. From three o\'clock to half past four in the afternoon, she joins the study club. She is the club leader because she is a smart student. She sometimes plays sports with her friends. She has a lot of things to do, but she is happy.',
        text: '1. Ratha is a class leader and a good student.',
        options: [ 'True', 'False' ],
        correctAnswerIndex: 0,
        explanation: 'True! The text says: "Ratha is a class leader and a good student."'
      },
      {
        id: 'e2_q11',
        subjectId: 'english',
        category: 'Part 3: Reading (២.៥ ពិន្ទុ)',
        text: '2. She goes to school late every day.',
        options: [ 'True', 'False' ],
        correctAnswerIndex: 1,
        explanation: 'False! The text says: "She always goes to school early..."'
      },
      {
        id: 'e2_q12',
        subjectId: 'english',
        category: 'Part 3: Reading (២.៥ ពិន្ទុ)',
        text: '3. Ratha often reads books in the library.',
        options: [ 'True', 'False' ],
        correctAnswerIndex: 0,
        explanation: 'True! The text states: "She often reads books in the library."'
      },
      {
        id: 'e2_q13',
        subjectId: 'english',
        category: 'Part 3: Reading (២.៥ ពិន្ទុ)',
        text: '4. She is the leader of the study club.',
        options: [ 'False', 'True' ],
        correctAnswerIndex: 1,
        explanation: 'True! The text says: "She is the club leader because she is a smart student."'
      },
      {
        id: 'e2_q14',
        subjectId: 'english',
        category: 'Part 3: Reading (២.៥ ពិន្ទុ)',
        text: '5. Ratha is unhappy because she is very busy.',
        options: [ 'False', 'True' ],
        correctAnswerIndex: 0,
        explanation: 'False! The text states: "She has a lot of things to do, but she is happy."'
      },

      // ---------------- Part 4: Writing (3 points) ----------------
      {
        id: 'e2_q15',
        subjectId: 'english',
        category: 'Part 4: Writing (៣ ពិន្ទុ) - Answer in complete sentences',
        text: '1. What do you do before class?',
        options: [
          'I am no do anything before class.',
          'I cleaning before class.',
          'Clean classroom before class.',
          'Before class, I clean the classroom and prepare my books.'
        ],
        correctAnswerIndex: 3,
        explanation: 'The complete grammatically correct sentence is "Before class, I clean the classroom and prepare my books."'
      },
      {
        id: 'e2_q16',
        subjectId: 'english',
        category: 'Part 4: Writing (៣ ពិន្ទុ) - Answer in complete sentences',
        text: '2. What do you do at breaktime?',
        options: [
          'At breaktime, I play sports with my friends in the school yard.',
          'Breaktime play sport.',
          'I am play sport breaktime.',
          'Play with friend breaktime.'
        ],
        correctAnswerIndex: 0,
        explanation: 'The complete full sentence is "At breaktime, I play sports with my friends in the school yard."'
      },
      {
        id: 'e2_q17',
        subjectId: 'english',
        category: 'Part 4: Writing (៣ ពិន្ទុ) - Answer in complete sentences',
        text: '3. What do you do in the library?',
        options: [
          'Library read book.',
          'In the library, I read storybooks and study quietly.',
          'I am read books in library.',
          'Reading storybook library.'
        ],
        correctAnswerIndex: 1,
        explanation: 'The complete proper sentence is "In the library, I read storybooks and study quietly."'
      }
    ]
  },

  // =============================================================================================
  // វិញ្ញាសាទី ៣: Model Exam 3 (MY BODY, APPEARANCE & CARE)
  // =============================================================================================
  {
    id: 'english-exam-3',
    subjectId: 'english',
    title: 'វិញ្ញាសាប្រឡងទី ៣៖ ភាសាអង់គ្លេស ថ្នាក់ទី៦ (MY BODY, APPEARANCE & CARE)',
    description: 'វិញ្ញាសាស្តង់ដារបឋមសិក្សា ៤ ផ្នែក (Vocabulary 2.5pt, Grammar 2pt, Reading 2.5pt, Writing 3pt) - សរុប ១០ ពិន្ទុ',
    durationMinutes: 60,
    totalPoints: 10,
    yearOrType: 'វិញ្ញាសាស្តង់ដារក្រសួង (១៧ សំណួរ)',
    questions: [
      // ---------------- Part 1: Vocabulary (2.5 points) ----------------
      {
        id: 'e3_q1',
        subjectId: 'english',
        category: 'Part 1: Vocabulary (២.៥ ពិន្ទុ) - Words: eyes / straight / helmet / pullover / ears',
        text: '1. I have two __________ to see things around me.',
        options: [ 'helmet', 'ears', 'eyes', 'pullover' ],
        correctAnswerIndex: 2,
        explanation: 'We use our "eyes" (ភ្នែក) to see things.'
      },
      {
        id: 'e3_q2',
        subjectId: 'english',
        category: 'Part 1: Vocabulary (២.៥ ពិន្ទុ) - Words: eyes / straight / helmet / pullover / ears',
        text: '2. We listen to music with our __________.',
        options: [ 'pullover', 'straight', 'eyes', 'ears' ],
        correctAnswerIndex: 3,
        explanation: 'We listen to music with our "ears" (ត្រចៀក).'
      },
      {
        id: 'e3_q3',
        subjectId: 'english',
        category: 'Part 1: Vocabulary (២.៥ ពិន្ទុ) - Words: eyes / straight / helmet / pullover / ears',
        text: '3. She has long, black __________ hair.',
        options: [ 'straight', 'pullover', 'helmet', 'eyes' ],
        correctAnswerIndex: 0,
        explanation: 'Hair style adjective is "straight" (សក់ត្រង់).'
      },
      {
        id: 'e3_q4',
        subjectId: 'english',
        category: 'Part 1: Vocabulary (២.៥ ពិន្ទុ) - Words: eyes / straight / helmet / pullover / ears',
        text: '4. You should wear a __________ to protect your head when riding a bicycle.',
        options: [ 'pullover', 'helmet', 'eyes', 'straight' ],
        correctAnswerIndex: 1,
        explanation: 'We wear a "helmet" (មួកសុវត្ថិភាព) to protect our head.'
      },
      {
        id: 'e3_q5',
        subjectId: 'english',
        category: 'Part 1: Vocabulary (២.៥ ពិន្ទុ) - Words: eyes / straight / helmet / pullover / ears',
        text: '5. When it is cold in winter, I wear a warm __________.',
        options: [ 'eyes', 'straight', 'pullover', 'helmet' ],
        correctAnswerIndex: 2,
        explanation: 'In cold weather, we wear a warm "pullover" (អាវរងា).'
      },

      // ---------------- Part 2: Grammar (2 points) ----------------
      {
        id: 'e3_q6',
        subjectId: 'english',
        category: 'Part 2: Grammar (២ ពិន្ទុ) - Options: This is / These are / should / How many',
        text: '1. __________ is my left arm.',
        options: [ 'How many', 'These are', 'Should', 'This is' ],
        correctAnswerIndex: 3,
        explanation: 'For a singular noun ("my left arm"), we use "This is".'
      },
      {
        id: 'e3_q7',
        subjectId: 'english',
        category: 'Part 2: Grammar (២ ពិន្ទុ) - Options: This is / These are / should / How many',
        text: '2. __________ my ten fingers.',
        options: [ 'These are', 'This is', 'Should', 'How many' ],
        correctAnswerIndex: 0,
        explanation: 'For plural nouns ("my ten fingers"), we use "These are".'
      },
      {
        id: 'e3_q8',
        subjectId: 'english',
        category: 'Part 2: Grammar (២ ពិន្ទុ) - Options: This is / These are / should / How many',
        text: '3. __________ eyes do you have? -> I have two eyes.',
        options: [ 'This is', 'How many', 'These are', 'Should' ],
        correctAnswerIndex: 1,
        explanation: 'Asking about count/quantity uses "How many".'
      },
      {
        id: 'e3_q9',
        subjectId: 'english',
        category: 'Part 2: Grammar (២ ពិន្ទុ) - Options: This is / These are / should / How many',
        text: '4. You __________ wear a mask and wash your hands every day.',
        options: [ 'These are', 'This is', 'should', 'How many' ],
        correctAnswerIndex: 2,
        explanation: 'Modal verb "should" is used for good advice and hygiene.'
      },

      // ---------------- Part 3: Reading (2.5 points) ----------------
      {
        id: 'e3_q10',
        subjectId: 'english',
        category: 'Part 3: Reading (២.៥ ពិន្ទុ) - Text: Vichet is twelve years old. He is tall and thin. He has an oval face and short black hair. Vichet likes playing basketball and running in the morning. Every day, he brushes his teeth three times, washes his face, and takes a bath to keep his body clean. When he rides his bicycle, he always wears a helmet. Vichet’s parents are proud of him because he takes good care of his health.',
        text: '1. Vichet is twelve years old.',
        options: [ 'False', 'True' ],
        correctAnswerIndex: 1,
        explanation: 'True! The text states: "Vichet is twelve years old."'
      },
      {
        id: 'e3_q11',
        subjectId: 'english',
        category: 'Part 3: Reading (២.៥ ពិន្ទុ)',
        text: '2. Vichet has long curly hair.',
        options: [ 'False', 'True' ],
        correctAnswerIndex: 0,
        explanation: 'False! The text says: "He has an oval face and short black hair."'
      },
      {
        id: 'e3_q12',
        subjectId: 'english',
        category: 'Part 3: Reading (២.៥ ពិន្ទុ)',
        text: '3. He brushes his teeth three times a day.',
        options: [ 'False', 'True' ],
        correctAnswerIndex: 1,
        explanation: 'True! The text states: "he brushes his teeth three times..."'
      },
      {
        id: 'e3_q13',
        subjectId: 'english',
        category: 'Part 3: Reading (២.៥ ពិន្ទុ)',
        text: '4. Vichet never wears a helmet when riding his bicycle.',
        options: [ 'False', 'True' ],
        correctAnswerIndex: 0,
        explanation: 'False! The text states: "When he rides his bicycle, he always wears a helmet."'
      },
      {
        id: 'e3_q14',
        subjectId: 'english',
        category: 'Part 3: Reading (២.៥ ពិន្ទុ)',
        text: '5. His parents are proud of him for taking care of his health.',
        options: [ 'False', 'True' ],
        correctAnswerIndex: 1,
        explanation: 'True! The text states: "Vichet’s parents are proud of him because he takes good care of his health."'
      },

      // ---------------- Part 4: Writing (3 points) ----------------
      {
        id: 'e3_q15',
        subjectId: 'english',
        category: 'Part 4: Writing (៣ ពិន្ទុ) - Answer in complete sentences',
        text: '1. How many eyes and ears do you have?',
        options: [
          'I have two eyes and two ears.',
          'I have two eye and one ear.',
          'Two eyes two ears.',
          'I having eyes ears.'
        ],
        correctAnswerIndex: 0,
        explanation: 'The full complete sentence is "I have two eyes and two ears."'
      },
      {
        id: 'e3_q16',
        subjectId: 'english',
        category: 'Part 4: Writing (៣ ពិន្ទុ) - Answer in complete sentences',
        text: '2. What do you look like? (Describe your height and hair)',
        options: [
          'I tall short hair.',
          'I am tall and I have short black hair.',
          'Look like tall hair.',
          'I am look like black hair.'
        ],
        correctAnswerIndex: 1,
        explanation: 'The complete proper sentence is "I am tall and I have short black hair."'
      },
      {
        id: 'e3_q17',
        subjectId: 'english',
        category: 'Part 4: Writing (៣ ពិន្ទុ) - Answer in complete sentences',
        text: '3. What should you wear when it is cold in winter?',
        options: [
          'I wearing pullover cold.',
          'Cold wear pullover.',
          'When it is cold, I should wear a pullover and socks.',
          'Should wear swimsuit.'
        ],
        correctAnswerIndex: 2,
        explanation: 'The complete grammatically correct response is "When it is cold, I should wear a pullover and socks."'
      }
    ]
  },

  // =============================================================================================
  // វិញ្ញាសាទី ៤: Model Exam 4 (ANIMALS & NATURE)
  // =============================================================================================
  {
    id: 'english-exam-4',
    subjectId: 'english',
    title: 'វិញ្ញាសាប្រឡងទី ៤៖ ភាសាអង់គ្លេស ថ្នាក់ទី៦ (ANIMALS & NATURE)',
    description: 'វិញ្ញាសាស្តង់ដារបឋមសិក្សា ៤ ផ្នែក (Vocabulary 2.5pt, Grammar 2pt, Reading 2.5pt, Writing 3pt) - សរុប ១០ ពិន្ទុ',
    durationMinutes: 60,
    totalPoints: 10,
    yearOrType: 'វិញ្ញាសាស្តង់ដារក្រសួង (១៧ សំណួរ)',
    questions: [
      // ---------------- Part 1: Vocabulary (2.5 points) ----------------
      {
        id: 'e4_q1',
        subjectId: 'english',
        category: 'Part 1: Vocabulary (២.៥ ពិន្ទុ) - Words: dog / monkey / whale / farmer / dangerous',
        text: '1. A domestic pet raised in many homes is a __________.',
        options: [ 'dangerous', 'monkey', 'whale', 'dog' ],
        correctAnswerIndex: 3,
        explanation: 'A common domestic pet raised at home is a "dog" (ឆ្កែ).'
      },
      {
        id: 'e4_q2',
        subjectId: 'english',
        category: 'Part 1: Vocabulary (២.៥ ពិន្ទុ) - Words: dog / monkey / whale / farmer / dangerous',
        text: '2. A baby __________ clings to its mother in the forest.',
        options: [ 'monkey', 'whale', 'farmer', 'dog' ],
        correctAnswerIndex: 0,
        explanation: 'A baby "monkey" (ស្វា) clings to its mother.'
      },
      {
        id: 'e4_q3',
        subjectId: 'english',
        category: 'Part 1: Vocabulary (២.៥ ពិន្ទុ) - Words: dog / monkey / whale / farmer / dangerous',
        text: '3. The largest sea creature that eats small fish is the __________.',
        options: [ 'dangerous', 'whale', 'dog', 'farmer' ],
        correctAnswerIndex: 1,
        explanation: 'The largest sea creature is the "whale" (ត្រីបាឡែន).'
      },
      {
        id: 'e4_q4',
        subjectId: 'english',
        category: 'Part 1: Vocabulary (២.៥ ពិន្ទុ) - Words: dog / monkey / whale / farmer / dangerous',
        text: '4. The __________ is ploughing the field and feeding ducks.',
        options: [ 'monkey', 'dog', 'farmer', 'whale' ],
        correctAnswerIndex: 2,
        explanation: 'The person working on the farm is a "farmer" (កសិករ).'
      },
      {
        id: 'e4_q5',
        subjectId: 'english',
        category: 'Part 1: Vocabulary (២.៥ ពិន្ទុ) - Words: dog / monkey / whale / farmer / dangerous',
        text: '5. The cobra and female mosquitoes are __________ to people.',
        options: [ 'dog', 'farmer', 'whale', 'dangerous' ],
        correctAnswerIndex: 3,
        explanation: 'Cobras and mosquitoes are "dangerous" (គ្រោះថ្នាក់).'
      },

      // ---------------- Part 2: Grammar (2 points) ----------------
      {
        id: 'e4_q6',
        subjectId: 'english',
        category: 'Part 2: Grammar (២ ពិន្ទុ) - Options: like / its / their / is ploughing',
        text: '1. The bear catches fish for __________ baby.',
        options: [ 'its', 'their', 'like', 'is ploughing' ],
        correctAnswerIndex: 0,
        explanation: 'For a singular animal owner ("The bear"), we use possessive "its".'
      },
      {
        id: 'e4_q7',
        subjectId: 'english',
        category: 'Part 2: Grammar (២ ពិន្ទុ) - Options: like / its / their / is ploughing',
        text: '2. Birds lay eggs in __________ nests.',
        options: [ 'its', 'their', 'like', 'is ploughing' ],
        correctAnswerIndex: 1,
        explanation: 'For plural animal owners ("Birds"), we use possessive "their".'
      },
      {
        id: 'e4_q8',
        subjectId: 'english',
        category: 'Part 2: Grammar (២ ពិន្ទុ) - Options: like / its / their / is ploughing',
        text: '3. I __________ dogs and cats, but I don\'t like mice.',
        options: [ 'their', 'its', 'like', 'is ploughing' ],
        correctAnswerIndex: 2,
        explanation: 'Expressing preference uses verb "like".'
      },
      {
        id: 'e4_q9',
        subjectId: 'english',
        category: 'Part 2: Grammar (២ ពិន្ទុ) - Options: like / its / their / is ploughing',
        text: '4. Look! The farmer __________ the rice field right now.',
        options: [ 'like', 'its', 'their', 'is ploughing' ],
        correctAnswerIndex: 3,
        explanation: 'Present Continuous for singular subject "The farmer" is "is ploughing".'
      },

      // ---------------- Part 3: Reading (2.5 points) ----------------
      {
        id: 'e4_q10',
        subjectId: 'english',
        category: 'Part 3: Reading (២.៥ ពិន្ទុ) - Text: On Sunday, Rithy and his friends visit Phnom Tamao Zoo in Takeo province. At the zoo, they see many wild animals such as monkeys, deer, elephants, bears, and tigers. Rithy sees a baby monkey clinging to its mother. He buys bananas for the monkeys. Near the zoo, there is a big farm where farmers are feeding cows and ducks. Rithy loves animals very much and wants to have his own farm in the future.',
        text: '1. Rithy visits Phnom Tamao Zoo on Sunday.',
        options: [ 'True', 'False' ],
        correctAnswerIndex: 0,
        explanation: 'True! The text says: "On Sunday, Rithy and his friends visit Phnom Tamao Zoo..."'
      },
      {
        id: 'e4_q11',
        subjectId: 'english',
        category: 'Part 3: Reading (២.៥ ពិន្ទុ)',
        text: '2. Phnom Tamao Zoo is located in Siem Reap province.',
        options: [ 'True', 'False' ],
        correctAnswerIndex: 1,
        explanation: 'False! The text says Phnom Tamao Zoo is in Takeo province.'
      },
      {
        id: 'e4_q12',
        subjectId: 'english',
        category: 'Part 3: Reading (២.៥ ពិន្ទុ)',
        text: '3. Rithy sees a baby monkey clinging to its mother.',
        options: [ 'True', 'False' ],
        correctAnswerIndex: 0,
        explanation: 'True! The text states: "Rithy sees a baby monkey clinging to its mother."'
      },
      {
        id: 'e4_q13',
        subjectId: 'english',
        category: 'Part 3: Reading (២.៥ ពិន្ទុ)',
        text: '4. He buys meat for the monkeys.',
        options: [ 'True', 'False' ],
        correctAnswerIndex: 1,
        explanation: 'False! The text says: "He buys bananas for the monkeys."'
      },
      {
        id: 'e4_q14',
        subjectId: 'english',
        category: 'Part 3: Reading (២.៥ ពិន្ទុ)',
        text: '5. Rithy wants to have his own farm in the future.',
        options: [ 'True', 'False' ],
        correctAnswerIndex: 0,
        explanation: 'True! The text states: "...and wants to have his own farm in the future."'
      },

      // ---------------- Part 4: Writing (3 points) ----------------
      {
        id: 'e4_q15',
        subjectId: 'english',
        category: 'Part 4: Writing (៣ ពិន្ទុ) - Answer in complete sentences',
        text: '1. What pets do you like to raise at home?',
        options: [
          'Like dog and cat.',
          'I like to raise dogs and cats at my home.',
          'I am raising pets home.',
          'Raise dog cat yes.'
        ],
        correctAnswerIndex: 1,
        explanation: 'The full proper sentence response is "I like to raise dogs and cats at my home."'
      },
      {
        id: 'e4_q16',
        subjectId: 'english',
        category: 'Part 4: Writing (៣ ពិន្ទុ) - Answer in complete sentences',
        text: '2. What animal is dangerous to people?',
        options: [
          'Is dangerous mosquito.',
          'Cobra dangerous people.',
          'The cobra and female mosquitoes are dangerous to people.',
          'Dangerous animal cobra yes.'
        ],
        correctAnswerIndex: 2,
        explanation: 'The complete grammatically correct response is "The cobra and female mosquitoes are dangerous to people."'
      },
      {
        id: 'e4_q17',
        subjectId: 'english',
        category: 'Part 4: Writing (៣ ពិន្ទុ) - Answer in complete sentences',
        text: '3. What sea creature do you like best?',
        options: [
          'I am like dolphin.',
          'Like dolphin best.',
          'Dolphin is best sea.',
          'I like dolphins best because they are smart and friendly.'
        ],
        correctAnswerIndex: 3,
        explanation: 'The complete full sentence is "I like dolphins best because they are smart and friendly."'
      }
    ]
  },

  // =============================================================================================
  // វិញ្ញាសាទី ៥: Model Exam 5 (SPECIAL DAYS, DATES & HOMETOWN)
  // =============================================================================================
  {
    id: 'english-exam-5',
    subjectId: 'english',
    title: 'វិញ្ញាសាប្រឡងទី ៥៖ ភាសាអង់គ្លេស ថ្នាក់ទី៦ (SPECIAL DAYS, DATES & HOMETOWN)',
    description: 'វិញ្ញាសាស្តង់ដារបឋមសិក្សា ៤ ផ្នែក (Vocabulary 2.5pt, Grammar 2pt, Reading 2.5pt, Writing 3pt) - សរុប ១០ ពិន្ទុ',
    durationMinutes: 60,
    totalPoints: 10,
    yearOrType: 'វិញ្ញាសាស្តង់ដារក្រសួង (១៧ សំណួរ)',
    questions: [
      // ---------------- Part 1: Vocabulary (2.5 points) ----------------
      {
        id: 'e5_q1',
        subjectId: 'english',
        category: 'Part 1: Vocabulary (២.៥ ពិន្ទុ) - Words: celebrate / birthday / market / October / village',
        text: '1. I celebrate my __________ on March 13th every year.',
        options: [ 'birthday', 'market', 'October', 'village' ],
        correctAnswerIndex: 0,
        explanation: 'The annual event of one\'s birth is "birthday" (ខួបកំណើត).'
      },
      {
        id: 'e5_q2',
        subjectId: 'english',
        category: 'Part 1: Vocabulary (២.៥ ពិន្ទុ) - Words: celebrate / birthday / market / October / village',
        text: '2. We invite our friends to __________ my birthday party.',
        options: [ 'village', 'celebrate', 'market', 'October' ],
        correctAnswerIndex: 1,
        explanation: 'The verb for holding or organizing a celebration is "celebrate" (ប្រារព្ធ).'
      },
      {
        id: 'e5_q3',
        subjectId: 'english',
        category: 'Part 1: Vocabulary (២.៥ ពិន្ទុ) - Words: celebrate / birthday / market / October / village',
        text: '3. My mother goes to the local __________ in our village to buy fresh food.',
        options: [ 'October', 'birthday', 'market', 'village' ],
        correctAnswerIndex: 2,
        explanation: 'The place where people buy and sell food is the "market" (ផ្សារ).'
      },
      {
        id: 'e5_q4',
        subjectId: 'english',
        category: 'Part 1: Vocabulary (២.៥ ពិន្ទុ) - Words: celebrate / birthday / market / October / village',
        text: '4. The tenth month of the year is __________.',
        options: [ 'village', 'market', 'birthday', 'October' ],
        correctAnswerIndex: 3,
        explanation: 'The 10th month of the calendar year is "October" (ខែតុលា).'
      },
      {
        id: 'e5_q5',
        subjectId: 'english',
        category: 'Part 1: Vocabulary (២.៥ ពិន្ទុ) - Words: celebrate / birthday / market / October / village',
        text: '5. My hometown is a beautiful green __________ in Takeo province.',
        options: [ 'village', 'market', 'October', 'birthday' ],
        correctAnswerIndex: 0,
        explanation: 'A rural community or hometown location is a "village" (ភូមិ).'
      },

      // ---------------- Part 2: Grammar (2 points) ----------------
      {
        id: 'e5_q6',
        subjectId: 'english',
        category: 'Part 2: Grammar (២ ពិន្ទុ) - Options: on / in / at / was born',
        text: '1. I was born _____ October 15th, 2004.',
        options: [ 'in', 'on', 'at', 'was born' ],
        correctAnswerIndex: 1,
        explanation: 'We use preposition "on" before a specific full date (on October 15th).'
      },
      {
        id: 'e5_q7',
        subjectId: 'english',
        category: 'Part 2: Grammar (២ ពិន្ទុ) - Options: on / in / at / was born',
        text: '2. She _____ on March 11th, 2005.',
        options: [ 'in', 'on', 'was born', 'at' ],
        correctAnswerIndex: 2,
        explanation: 'The past verb phrase for birth is "was born".'
      },
      {
        id: 'e5_q8',
        subjectId: 'english',
        category: 'Part 2: Grammar (២ ពិន្ទុ) - Options: on / in / at / was born',
        text: '3. We study English _____ Tuesday and Friday.',
        options: [ 'was born', 'in', 'at', 'on' ],
        correctAnswerIndex: 3,
        explanation: 'We use "on" for days of the week (on Tuesday and Friday).'
      },
      {
        id: 'e5_q9',
        subjectId: 'english',
        category: 'Part 2: Grammar (២ ពិន្ទុ) - Options: on / in / at / was born',
        text: '4. The class starts _____ 7:00 AM in the morning.',
        options: [ 'at', 'on', 'in', 'was born' ],
        correctAnswerIndex: 0,
        explanation: 'We use preposition "at" for specific clock times (at 7:00 AM).'
      },

      // ---------------- Part 3: Reading (2.5 points) ----------------
      {
        id: 'e5_q10',
        subjectId: 'english',
        category: 'Part 3: Reading (២.៥ ពិន្ទុ) - Text: Borith lives in a quiet village in Siem Reap province. He was born on March 15th, 2004. In his village, there is a busy market where his mother sells fruits and vegetables. Every year on March 15th, Borith celebrates his birthday with his family and classmates. His parents buy a cake, candles, balloons, and delicious food. All his friends sing the birthday song and give him nice gifts. Borith feels very happy on his special day.',
        text: '1. Borith lives in Siem Reap province.',
        options: [ 'False', 'True' ],
        correctAnswerIndex: 1,
        explanation: 'True! The text says: "Borith lives in a quiet village in Siem Reap province."'
      },
      {
        id: 'e5_q11',
        subjectId: 'english',
        category: 'Part 3: Reading (២.៥ ពិន្ទុ)',
        text: '2. Borith was born on October 15th, 2004.',
        options: [ 'False', 'True' ],
        correctAnswerIndex: 0,
        explanation: 'False! The text says: "He was born on March 15th, 2004."'
      },
      {
        id: 'e5_q12',
        subjectId: 'english',
        category: 'Part 3: Reading (២.៥ ពិន្ទុ)',
        text: '3. His mother sells fruits and vegetables at the village market.',
        options: [ 'False', 'True' ],
        correctAnswerIndex: 1,
        explanation: 'True! The text states: "...his mother sells fruits and vegetables."'
      },
      {
        id: 'e5_q13',
        subjectId: 'english',
        category: 'Part 3: Reading (២.៥ ពិន្ទុ)',
        text: '4. Borith’s friends never come to his birthday party.',
        options: [ 'False', 'True' ],
        correctAnswerIndex: 0,
        explanation: 'False! The text states that his classmates and friends sing the birthday song and give him gifts.'
      },
      {
        id: 'e5_q14',
        subjectId: 'english',
        category: 'Part 3: Reading (២.៥ ពិន្ទុ)',
        text: '5. Borith feels very happy on his birthday.',
        options: [ 'False', 'True' ],
        correctAnswerIndex: 1,
        explanation: 'True! The text ends with: "Borith feels very happy on his special day."'
      },

      // ---------------- Part 4: Writing (3 points) ----------------
      {
        id: 'e5_q15',
        subjectId: 'english',
        category: 'Part 4: Writing (៣ ពិន្ទុ) - Answer in complete sentences',
        text: '1. When were you born?',
        options: [
          'I am born March 2004.',
          'Born March 15th.',
          'I was born on March 15th, 2004.',
          'When born March.'
        ],
        correctAnswerIndex: 2,
        explanation: 'The complete grammatically correct sentence is "I was born on March 15th, 2004."'
      },
      {
        id: 'e5_q16',
        subjectId: 'english',
        category: 'Part 4: Writing (៣ ពិន្ទុ) - Answer in complete sentences',
        text: '2. Where do you live?',
        options: [
          'Where live village.',
          'Live village Cambodia.',
          'I am living in home.',
          'I live in a peaceful village in Cambodia.'
        ],
        correctAnswerIndex: 3,
        explanation: 'The full proper sentence response is "I live in a peaceful village in Cambodia."'
      },
      {
        id: 'e5_q17',
        subjectId: 'english',
        category: 'Part 4: Writing (៣ ពិន្ទុ) - Answer in complete sentences',
        text: '3. When do you celebrate your birthday?',
        options: [
          'I celebrate my birthday on March 15th every year.',
          'Celebrate birthday March.',
          'I am celebrate birthday.',
          'My birthday celebrate yes.'
        ],
        correctAnswerIndex: 0,
        explanation: 'The full complete sentence is "I celebrate my birthday on March 15th every year."'
      }
    ]
  }
];
