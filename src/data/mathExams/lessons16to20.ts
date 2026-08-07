import { ExamPaper } from '../../types';

export const LESSONS_16_TO_20_EXAMS: ExamPaper[] = [
  // =========================================================================
  // វិញ្ញាសា មេរៀនទី ១៦ ៖ ភាគរយ (២០ សំណួរ QCM)
  // =========================================================================
  {
    id: 'math-lesson-16-exam',
    subjectId: 'math',
    title: 'វិញ្ញាសាមេរៀនទី ១៦ ៖ ភាគរយ (២០ សំណួរ QCM)',
    description: 'សំណួរ QCM ទាំង ២០ សម្រាប់ការប្រឡងតេស្តសមត្ថភាពមេរៀនទី១៦៖ ភាគរយ, ការបំប្លែងប្រភាគជាភាគរយ, ការបញ្ចុះតម្លៃ និងភាគរយប្រាក់ចំណេញ',
    durationMinutes: 40,
    totalPoints: 20,
    yearOrType: 'វិញ្ញាសាតាមមេរៀន',
    questions: [
      {
        id: 'm16_q1',
        subjectId: 'math',
        category: 'មេរៀនទី១៦៖ ភាគរយ',
        text: 'សរសេរប្រភាគ 2/5 ជាភាគរយ (%) ៖',
        options: [ '40%', '20%', '50%', '25%' ],
        correctAnswerIndex: 0,
        explanation: '(2/5) × 100% = 40% (ឬ 2/5 = 40/100)។'
      },
      {
        id: 'm16_q2',
        subjectId: 'math',
        category: 'មេរៀនទី១៦៖ ភាគរយ',
        text: 'សរសេរប្រភាគ 3/4 ជាភាគរយ (%) ៖',
        options: [ '30%', '75%', '50%', '80%' ],
        correctAnswerIndex: 1,
        explanation: '(3/4) × 100% = 75%។'
      },
      {
        id: 'm16_q3',
        subjectId: 'math',
        category: 'មេរៀនទី១៦៖ ភាគរយ',
        text: 'សរសេរចំនួនទសភាគ 0.35 ជាភាគរយ (%) ៖',
        options: [ '3.5%', '350%', '35%', '0.35%' ],
        correctAnswerIndex: 2,
        explanation: '0.35 × 100% = 35%។'
      },
      {
        id: 'm16_q4',
        subjectId: 'math',
        category: 'មេរៀនទី១៦៖ ភាគរយ',
        text: 'គណនា 20% នៃប្រាក់ 50 000 រៀល ៖',
        options: [ '5000 រៀល', '20 000 រៀល', '15 000 រៀល', '10 000 រៀល' ],
        correctAnswerIndex: 3,
        explanation: '50 000 × (20/100) = 10 000 រៀល។'
      },
      {
        id: 'm16_q5',
        subjectId: 'math',
        category: 'មេរៀនទី១៦៖ ភាគរយ',
        text: 'ទំនិញមួយថ្លៃ 20 000 រៀល។ ហាងបញ្ចុះតម្លៃ 20%។ តើតម្លៃទំនិញបន្ទាប់ពីបញ្ចុះតម្លៃរួចគឺប៉ុន្មានរៀល?',
        options: [ '16 000 រៀល', '4000 រៀល', '18 000 រៀល', '15 000 រៀល' ],
        correctAnswerIndex: 0,
        explanation: 'ប្រាក់បញ្ចុះ = 20 000 × 20% = 4000រៀល ➔ តម្លៃសល់ = 20 000 - 4000 = 16 000 រៀល។'
      },
      {
        id: 'm16_q6',
        subjectId: 'math',
        category: 'មេរៀនទី១៦៖ ភាគរយ',
        text: 'អាវមួយថ្លៃ 15$។ ហាងបញ្ចុះតម្លៃ 30% (បញ្ចុះ 4.5$)។ តើតម្លៃលក់ចុងក្រោយគឺប៉ុន្មានដុល្លារ?',
        options: [ '11.5$', '10.5$', '12$', '9.5$' ],
        correctAnswerIndex: 1,
        explanation: '15$ - 4.5$ = 10.50$ (ឬ 15 × 70% = 10.5$)។'
      },
      {
        id: 'm16_q7',
        subjectId: 'math',
        category: 'មេរៀនទី១៦៖ ភាគរយ',
        text: 'សិស្ស 24 នាក់ក្នុងចំណោម 40 នាក់ជាសិស្សស្រី។ តើសិស្សស្រីមានភាគរយប៉ុន្មាន %?',
        options: [ '40%', '50%', '60%', '70%' ],
        correctAnswerIndex: 2,
        explanation: '(24 / 40) × 100% = 0.6 × 100% = 60%។'
      },
      {
        id: 'm16_q8',
        subjectId: 'math',
        category: 'មេរៀនទី១៦៖ ភាគរយ',
        text: 'គណនា 15% នៃ 200kg ៖',
        options: [ '15 kg', '20 kg', '40 kg', '30 kg' ],
        correctAnswerIndex: 3,
        explanation: '200 × (15/100) = 30 kg។'
      },
      {
        id: 'm16_q9',
        subjectId: 'math',
        category: 'មេរៀនទី១៦៖ ភាគរយ',
        text: 'ទិញទំនិញដើមថ្លៃ 80$ លក់វិញបាន 100$ (ចំណេញ 20$)។ តើភាគរយប្រាក់ចំណេញធៀបនឹងដើមស្មើប៉ុន្មាន %?',
        options: [ '25%', '20%', '15%', '30%' ],
        correctAnswerIndex: 0,
        explanation: '(20 / 80) × 100% = 1/4 × 100% = 25%។'
      },
      {
        id: 'm16_q10',
        subjectId: 'math',
        category: 'មេរៀនទី១៦៖ ភាគរយ',
        text: 'សរសេរភាគរយ 75% ជាប្រភាគសម្រួល ៖',
        options: [ '75/100', '75/100 ឬ 3/4', '3/4', '4/3' ],
        correctAnswerIndex: 1,
        explanation: '75% = 75/100 = 3/4។'
      },
      {
        id: 'm16_q11',
        subjectId: 'math',
        category: 'មេរៀនទី១៦៖ ភាគរយ',
        text: 'គណនា 50% នៃ 120 ៖',
        options: [ '50', '70', '60', '40' ],
        correctAnswerIndex: 2,
        explanation: '50% គឺពាក់កណ្តាល ➔ 120 / 2 = 60។'
      },
      {
        id: 'm16_q12',
        subjectId: 'math',
        category: 'មេរៀនទី១៦៖ ភាគរយ',
        text: 'គណនា 10% នៃ 85000 ៖',
        options: [ '850', '85', '85000', '8500' ],
        correctAnswerIndex: 3,
        explanation: '85000 × 0.10 = 8500។'
      },
      {
        id: 'm16_q13',
        subjectId: 'math',
        category: 'មេរៀនទី១៦៖ ភាគរយ',
        text: 'ប្រជាជនភូមិមួយមាន 1200 នាក់។ 55% ជាស្ត្រី។ តើមានស្ត្រីប៉ុន្មាននាក់?',
        options: [ '660 នាក់', '600 នាក់', '540 នាក់', '700 នាក់' ],
        correctAnswerIndex: 0,
        explanation: '1200 × (55/100) = 12 × 55 = 660 នាក់។'
      },
      {
        id: 'm16_q14',
        subjectId: 'math',
        category: 'មេរៀនទី១៦៖ ភាគរយ',
        text: 'តាមប្រធានខាងលើ តើមានបុរសប៉ុន្មាននាក់?',
        options: [ '660 នាក់', '540 នាក់', '500 នាក់', '600 នាក់' ],
        correctAnswerIndex: 1,
        explanation: '1200 - 660 = 540 នាក់ (ឬ 1200 × 45% = 540)។'
      },
      {
        id: 'm16_q15',
        subjectId: 'math',
        category: 'មេរៀនទី១៦៖ ភាគរយ',
        text: 'ទំនិញមួយឡើងថ្លៃពី 100$ ទៅ 120$ (ឡើង 20$)។ តើវាឡើងថ្លៃភាគរយប៉ុន្មាន %?',
        options: [ '10%', '12%', '20%', '25%' ],
        correctAnswerIndex: 2,
        explanation: '(20 / 100) × 100% = 20%។'
      },
      {
        id: 'm16_q16',
        subjectId: 'math',
        category: 'មេរៀនទី១៦៖ ភាគរយ',
        text: 'សរសេរភាគរយ 125% ជាចំនួនទសភាគ ៖',
        options: [ '0.125', '125.0', '12.5', '1.25' ],
        correctAnswerIndex: 3,
        explanation: '125 / 100 = 1.25។'
      },
      {
        id: 'm16_q17',
        subjectId: 'math',
        category: 'មេរៀនទី១៦៖ ភាគរយ',
        text: 'ស្រូវ 1000kg ពេលកិនរួចទទួលបានអង្ករ 650kg។ តើអត្រាភាគរយអង្ករទទួលបានស្មើប៉ុន្មាន %?',
        options: [ '65%', '60%', '70%', '55%' ],
        correctAnswerIndex: 0,
        explanation: '(650 / 1000) × 100% = 65%។'
      },
      {
        id: 'm16_q18',
        subjectId: 'math',
        category: 'មេរៀនទី១៦៖ ភាគរយ',
        text: 'គណនា 2.5% នៃ 10 000$ ៖',
        options: [ '25$', '250$', '2500$', '2.5$' ],
        correctAnswerIndex: 1,
        explanation: '10 000 × (2.5/100) = 250$។'
      },
      {
        id: 'm16_q19',
        subjectId: 'math',
        category: 'មេរៀនទី១៦៖ ភាគរយ',
        text: 'ដីស្រែ 2 ha ក្នុងចំណោមដីសរុប 10 ha។ តើដីស្រែស្មើនឹងភាគរយប៉ុន្មាន % នៃដីសរុប?',
        options: [ '10%', '25%', '20%', '50%' ],
        correctAnswerIndex: 2,
        explanation: '(2 / 10) × 100% = 20%។'
      },
      {
        id: 'm16_q20',
        subjectId: 'math',
        category: 'មេរៀនទី១៦៖ ភាគរយ',
        text: 'បើតម្លៃដើម 100% ហើយទទួលបានបញ្ចុះ 15% តើតម្លៃត្រូវបង់ស្មើនឹងភាគរយប៉ុន្មាន % នៃតម្លៃដើម?',
        options: [ '15%', '90%', '115%', '85%' ],
        correctAnswerIndex: 3,
        explanation: '100% - 15% = 85% នៃតម្លៃដើម។'
      }
    ]
  },

  // =========================================================================
  // វិញ្ញាសា មេរៀនទី ១៧ ៖ ការប្រាក់ (២០ សំណួរ QCM)
  // =========================================================================
  {
    id: 'math-lesson-17-exam',
    subjectId: 'math',
    title: 'វិញ្ញាសាមេរៀនទី ១៧ ៖ ការប្រាក់ (២០ សំណួរ QCM)',
    description: 'សំណួរ QCM ទាំង ២០ សម្រាប់ការប្រឡងតេស្តសមត្ថភាពមេរៀនទី១៧៖ ការប្រាក់សាមញ្ញ, ប្រាក់ដើម, អត្រាការប្រាក់, រយៈពេល និងប្រាក់សរុប',
    durationMinutes: 40,
    totalPoints: 20,
    yearOrType: 'វិញ្ញាសាតាមមេរៀន',
    questions: [
      {
        id: 'm17_q1',
        subjectId: 'math',
        category: 'មេរៀនទី១៧៖ ការប្រាក់',
        text: 'រូបមន្តគណនាការប្រាក់សាមញ្ញ (I) គឺ ៖ (P: ប្រាក់ដើម, r: អត្រា, t: រយៈពេល)',
        options: [ 'I = P × r × t', 'I = P + r + t', 'I = P /', 'I = / t' ],
        correctAnswerIndex: 0,
        explanation: 'ការប្រាក់ I = P × r × t (ដែល r ជាភាគរយក្នុងមួយឆ្នាំ)។'
      },
      {
        id: 'm17_q2',
        subjectId: 'math',
        category: 'មេរៀនទី១៧៖ ការប្រាក់',
        text: 'លោកសុខផ្ញើប្រាក់ 800 000 រៀល នៅធនាគារក្នុងរយៈពេល 1 ឆ្នាំ អត្រាការប្រាក់ 12% ក្នុង១ឆ្នាំ។ គណនាការប្រាក់ ៖',
        options: [ '80 000 រៀល', '96 000 រៀល', '120 000 រៀល', '896 000 រៀល' ],
        correctAnswerIndex: 1,
        explanation: 'I = 800 000 × (12/100) × 1 = 96 000 រៀល។'
      },
      {
        id: 'm17_q3',
        subjectId: 'math',
        category: 'មេរៀនទី១៧៖ ការប្រាក់',
        text: 'តាមប្រធានខាងលើ តើប្រាក់សរុបដែលលោកសុខទទួលបានបន្ទាប់ពី 1 ឆ្នាំ គឺប៉ុន្មានរៀល?',
        options: [ '912 000 រៀល', '960 000 រៀល', '896 000 រៀល', '880 000 រៀល' ],
        correctAnswerIndex: 2,
        explanation: 'ប្រាក់សរុប A = P + I = 800 000 + 96 000 = 896 000 រៀល។'
      },
      {
        id: 'm17_q4',
        subjectId: 'math',
        category: 'មេរៀនទី១៧៖ ការប្រាក់',
        text: 'អ្នកស្រីចាន់ខ្ចីប្រាក់ 1000$ រយៈពេល 2 ឆ្នាំ អត្រាការប្រាក់ 10% ក្នុង១ឆ្នាំ។ គណនាការប្រាក់សរុប ៖',
        options: [ '100$', '1200$', '20$', '200$' ],
        correctAnswerIndex: 3,
        explanation: 'I = 1000$ × (10/100) × 2 = 200$។'
      },
      {
        id: 'm17_q5',
        subjectId: 'math',
        category: 'មេរៀនទី១៧៖ ការប្រាក់',
        text: 'តាមប្រធានខាងលើ តើគាត់ត្រូវសងប្រាក់សរុប (ប្រាក់ដើម + ការប្រាក់) ប៉ុន្មានដុល្លារ?',
        options: [ '1200$', '1100$', '1300$', '1050$' ],
        correctAnswerIndex: 0,
        explanation: 'A = 1000$ + 200$ = 1200$។'
      },
      {
        id: 'm17_q6',
        subjectId: 'math',
        category: 'មេរៀនទី១៧៖ ការប្រាក់',
        text: 'ផ្ញើប្រាក់ 500$ រយៈពេល 6 ខែ (0.5 ឆ្នាំ) អត្រា 8% ក្នុង១ឆ្នាំ។ គណនាការប្រាក់ ៖',
        options: [ '40$', '20$', '10$', '25$' ],
        correctAnswerIndex: 1,
        explanation: 'I = 500 × (8/100) × 0.5 = 500 × 0.08 × 0.5 = 20$។'
      },
      {
        id: 'm17_q7',
        subjectId: 'math',
        category: 'មេរៀនទី១៧៖ ការប្រាក់',
        text: 'ប្រាក់ដើម P = 2000$, ការប្រាក់បាន 120$ ក្នុង១ឆ្នាំ។ គណនាអត្រាការប្រាក់ប្រចាំឆ្នាំ (r) ៖',
        options: [ '5%', '8%', '6%', '10%' ],
        correctAnswerIndex: 2,
        explanation: 'r = I / P = 120 / 2000 = 0.06 = 6%។'
      },
      {
        id: 'm17_q8',
        subjectId: 'math',
        category: 'មេរៀនទី១៧៖ ការប្រាក់',
        text: 'ទិញម៉ូតូមួយគ្រឿងបង់រំលស់៖ ប្រាក់ដើម 1500$ បង់មុន 300$ នៅសល់ 1200$ បង់រំលស់ 12 ខែ ក្នុង ១ ខែ 110$ (សរុប 1320$)។ តើប្រាក់ការសរុបប៉ុន្មាន?',
        options: [ '100$', '200$', '150$', '120$' ],
        correctAnswerIndex: 3,
        explanation: 'ការប្រាក់សរុប = 1320$ - 1200$ = 120$។'
      },
      {
        id: 'm17_q9',
        subjectId: 'math',
        category: 'មេរៀនទី១៧៖ ការប្រាក់',
        text: 'ផ្ញើប្រាក់ 4000 000 រៀល រយៈពេល 3 ឆ្នាំ អត្រា 5% ក្នុង១ឆ្នាំ។ គណនាការប្រាក់ ៖',
        options: [ '600 000 រៀល', '200 000 រៀល', '400 000 រៀល', '120 000 រៀល' ],
        correctAnswerIndex: 0,
        explanation: 'I = 4000 000 × 5% × 3 = 200 000 × 3 = 600 000 រៀល។'
      },
      {
        id: 'm17_q10',
        subjectId: 'math',
        category: 'មេរៀនទី១៧៖ ការប្រាក់',
        text: 'បើអត្រាការប្រាក់ 1% ក្នុងមួយខែ តើអត្រាការប្រាក់ប្រចាំឆ្នាំស្មើនឹងប៉ុន្មាន %?',
        options: [ '1%', '12%', '6%', '24%' ],
        correctAnswerIndex: 1,
        explanation: '1% × 12 ខែ = 12% ក្នុងមួយឆ្នាំ។'
      },
      {
        id: 'm17_q11',
        subjectId: 'math',
        category: 'មេរៀនទី១៧៖ ការប្រាក់',
        text: 'បើរយៈពេល t គិតជាខែ (m ខែ) តើរូបមន្ត t គិតជាឆ្នាំស្មើនឹង ៖',
        options: [ 't = m / 30', 't = m × 12', 't = m / 12', 't = m / 365' ],
        correctAnswerIndex: 2,
        explanation: '1 ឆ្នាំ = 12 ខែ ➔ m ខែ = m / 12 ឆ្នាំ។'
      },
      {
        id: 'm17_q12',
        subjectId: 'math',
        category: 'មេរៀនទី១៧៖ ការប្រាក់',
        text: 'ផ្ញើប្រាក់ 10 000$ អត្រា 6% ក្នុង១ឆ្នាំ រយៈពេល 3 ខែ (3/12 = 0.25 ឆ្នាំ)។ គណនាការប្រាក់ ៖',
        options: [ '100$', '300$', '600$', '150$' ],
        correctAnswerIndex: 3,
        explanation: 'I = 10 000 × 0.06 × (3/12) = 600 × 0.25 = 150$។'
      },
      {
        id: 'm17_q13',
        subjectId: 'math',
        category: 'មេរៀនទី១៧៖ ការប្រាក់',
        text: 'ការប្រាក់ I = 300$, អត្រា r = 10%, រយៈពេល t = 1 ឆ្នាំ។ រកប្រាក់ដើម P ៖',
        options: [ '3000$', '2000$', '1000$', '300$' ],
        correctAnswerIndex: 0,
        explanation: 'P = I / (r × t) = 300 / 0.10 = 3000$។'
      },
      {
        id: 'm17_q14',
        subjectId: 'math',
        category: 'មេរៀនទី១៧៖ ការប្រាក់',
        text: 'ប្រាក់ដើម 600$, ការប្រាក់ 36$ ក្នុង១ឆ្នាំ។ រកអត្រាការប្រាក់ r ៖',
        options: [ '5%', '6%', '7%', '8%' ],
        correctAnswerIndex: 1,
        explanation: 'r = 36 / 600 = 0.06 = 6%។'
      },
      {
        id: 'm17_q15',
        subjectId: 'math',
        category: 'មេរៀនទី១៧៖ ការប្រាក់',
        text: 'ទិញទូរស័ព្ទថ្លៃ 600$ ដោយបង់រំលស់ ១ ខែ 55$ រយៈពេល 12 ខែ (សរុប 660$)។ តើការប្រាក់សរុបប៉ុន្មាន?',
        options: [ '50$', '100$', '60$', '66$' ],
        correctAnswerIndex: 2,
        explanation: '660$ - 600$ = 60$។'
      },
      {
        id: 'm17_q16',
        subjectId: 'math',
        category: 'មេរៀនទី១៧៖ ការប្រាក់',
        text: 'ប្រាក់ដើម P = 5000$, អត្រា r = 4% ក្នុង១ឆ្នាំ, ការប្រាក់បាន I = 400$។ រករយៈពេល t ៖',
        options: [ '1 ឆ្នាំ', '4 ឆ្នាំ', '3 ឆ្នាំ', '2 ឆ្នាំ' ],
        correctAnswerIndex: 3,
        explanation: 'I/ឆ្នាំ = 5000 × 0.04 = 200$ ➔ t = 400 / 200 = 2 ឆ្នាំ។'
      },
      {
        id: 'm17_q17',
        subjectId: 'math',
        category: 'មេរៀនទី១៧៖ ការប្រាក់',
        text: 'តើពាក្យ «ប្រាក់សរុប» (Total Amount) មានន័យដូចម្តេច?',
        options: [ 'ប្រាក់ដើម + ការប្រាក់', 'ប្រាក់ដើម - ការប្រាក់', 'ការប្រាក់ ÷ ២', 'ប្រាក់ដើម × ២' ],
        correctAnswerIndex: 0,
        explanation: 'ប្រាក់សរុប = ប្រាក់ដើមដំបូង (P) + ការប្រាក់ដែលទទួលបាន (I)។'
      },
      {
        id: 'm17_q18',
        subjectId: 'math',
        category: 'មេរៀនទី១៧៖ ការប្រាក់',
        text: 'ផ្ញើប្រាក់ 2000$ រយៈពេល 5 ឆ្នាំ អត្រា 5% ក្នុង១ឆ្នាំ។ គណនាការប្រាក់សរុប ៖',
        options: [ '200$', '500$', '1000$', '2500$' ],
        correctAnswerIndex: 1,
        explanation: 'I = 2000 × 0.05 × 5 = 100 × 5 = 500$។'
      },
      {
        id: 'm17_q19',
        subjectId: 'math',
        category: 'មេរៀនទី១៧៖ ការប្រាក់',
        text: 'តាមប្រធានខាងលើ តើប្រាក់សរុបទទួលបានគឺប៉ុន្មានដុល្លារ?',
        options: [ '3000$', '2200$', '2500$', '2050$' ],
        correctAnswerIndex: 2,
        explanation: '2000$ + 500$ = 2500$។'
      },
      {
        id: 'm17_q20',
        subjectId: 'math',
        category: 'មេរៀនទី១៧៖ ការប្រាក់',
        text: 'បើអត្រាការប្រាក់ 0.5% ក្នុងមួយខែ តើ ១ ឆ្នាំ មានអត្រាការប្រាក់ប៉ុន្មាន %?',
        options: [ '3%', '5%', '12%', '6%' ],
        correctAnswerIndex: 3,
        explanation: '0.5% × 12 = 6% ក្នុងមួយឆ្នាំ។'
      }
    ]
  },

  // =========================================================================
  // វិញ្ញាសា មេរៀនទី ១៨ ៖ ស្ថិតិ (២០ សំណួរ QCM)
  // =========================================================================
  {
    id: 'math-lesson-18-exam',
    subjectId: 'math',
    title: 'វិញ្ញាសាមេរៀនទី ១៨ ៖ ស្ថិតិ (២០ សំណួរ QCM)',
    description: 'សំណួរ QCM ទាំង ២០ សម្រាប់ការប្រឡងតេស្តសមត្ថភាពមេរៀនទី១៨៖ តារាងប្រេកង់, ឌីយ៉ាក្រាមបង្កោល, ឌីយ៉ាក្រាមរង្វង់ និងការបកស្រាយទិន្នន័យ',
    durationMinutes: 40,
    totalPoints: 20,
    yearOrType: 'វិញ្ញាសាតាមមេរៀន',
    questions: [
      {
        id: 'm18_q1',
        subjectId: 'math',
        category: 'មេរៀនទី១៨៖ ស្ថិតិ',
        text: 'តើអ្វីជា «ប្រេកង់» (Frequency) ក្នុងតារាងស្ថិតិ?',
        options: [
          'ជាចំនួនដងនៃការលេចឡើងនៃទិន្នន័យនីមួយៗ',
          'ជាផលបូកទិន្នន័យ',
          'ជាមធ្យមភាគ',
          'ជាទិន្នន័យធំជាងគេ'
        ],
        correctAnswerIndex: 0,
        explanation: 'ប្រេកង់គឺជាចំនួនដងដែលទិន្នន័យ ឬព្រឹត្តិការណ៍នីមួយៗកើតឡើង។'
      },
      {
        id: 'm18_q2',
        subjectId: 'math',
        category: 'មេរៀនទី១៨៖ ស្ថិតិ',
        text: 'ពិន្ទុសិស្ស ៥ នាក់គឺ 7, 8, 9, 6, 10. គណនាពិន្ទុមធ្យមភាគ (Mean) ៖',
        options: [ '7', '8', '8.5', '9' ],
        correctAnswerIndex: 1,
        explanation: 'មធ្យមភាគ = (7 + 8 + 9 + 6 + 10) / 5 = 40 / 5 = 8។'
      },
      {
        id: 'm18_q3',
        subjectId: 'math',
        category: 'មេរៀនទី១៨៖ ស្ថិតិ',
        text: 'ក្នុងឌីយ៉ាក្រាមរង្វង់ រង្វង់ទាំងមូលមានមុំសរុបស្មើនឹងប៉ុន្មានដឺក្រេ?',
        options: [ '90°', '180°', '360°', '270°' ],
        correctAnswerIndex: 2,
        explanation: 'មុំផ្ចិតនៃរង្វង់ទាំងមូលស្មើ 360° (ត្រូវនឹង 100%)។'
      },
      {
        id: 'm18_q4',
        subjectId: 'math',
        category: 'មេរៀនទី១៨៖ ស្ថិតិ',
        text: 'ក្នុងឌីយ៉ាក្រាមរង្វង់ ផ្នែកមួយស្មើនឹង 25% នៃទិន្នន័យសរុប។ តើមុំផ្ចិតនៃផ្នែកនោះស្មើនឹងប៉ុន្មានដឺក្រេ?',
        options: [ '45°', '120°', '180°', '90°' ],
        correctAnswerIndex: 3,
        explanation: '360° × 25% = 360° × (1/4) = 90°។'
      },
      {
        id: 'm18_q5',
        subjectId: 'math',
        category: 'មេរៀនទី១៨៖ ស្ថិតិ',
        text: 'ក្នុងឌីយ៉ាក្រាមរង្វង់ ផ្នែកមួយស្មើនឹង 50% នៃទិន្នន័យសរុប។ តើមុំផ្ចិតនៃផ្នែកនោះស្មើនឹងប៉ុន្មានដឺក្រេ?',
        options: [ '180°', '90°', '270°', '360°' ],
        correctAnswerIndex: 0,
        explanation: '360° × 50% = 180° (កន្លះរង្វង់)។'
      },
      {
        id: 'm18_q6',
        subjectId: 'math',
        category: 'មេរៀនទី១៨៖ ស្ថិតិ',
        text: 'ក្នុងឌីយ៉ាក្រាមរង្វង់ ផ្នែកមួយស្មើនឹង 10% នៃទិន្នន័យសរុប។ តើមុំផ្ចិតស្មើនឹងប៉ុន្មានដឺក្រេ?',
        options: [ '10°', '36°', '18°', '45°' ],
        correctAnswerIndex: 1,
        explanation: '360° × 10% = 36°។'
      },
      {
        id: 'm18_q7',
        subjectId: 'math',
        category: 'មេរៀនទី១៨៖ ស្ថិតិ',
        text: 'តារាងប្រេកង់បង្ហាញពណ៌ដែលសិស្សចូលចិត្ត៖ ក្រហម 10នាក់, ខៀវ 15នាក់, លឿង 5នាក់, បៃតង 10នាក់. តើមានសិស្សសរុបប៉ុន្មាននាក់?',
        options: [ '30 នាក់', '50 នាក់', '40 នាក់', '35 នាក់' ],
        correctAnswerIndex: 2,
        explanation: '10 + 15 + 5 + 10 = 40 នាក់។'
      },
      {
        id: 'm18_q8',
        subjectId: 'math',
        category: 'មេរៀនទី១៨៖ ស្ថិតិ',
        text: 'តាមប្រធានខាងលើ តើពណ៌ណាដែលមានប្រេកង់ច្រើនជាងគេ (ម៉ូត/Mode)?',
        options: [ 'ក្រហម', 'បៃតង', 'លឿង', 'ខៀវ' ],
        correctAnswerIndex: 3,
        explanation: 'ពណ៌ខៀវមានប្រេកង់ 15 នាក់ (ច្រើនជាងគេ)។'
      },
      {
        id: 'm18_q9',
        subjectId: 'math',
        category: 'មេរៀនទី១៨៖ ស្ថិតិ',
        text: 'តាមប្រធានខាងលើ តើភាគរយនៃសិស្សដែលចូលចិត្តពណ៌ខៀវស្មើនឹងប៉ុន្មាន %?',
        options: [ '37.5%', '25%', '40%', '30%' ],
        correctAnswerIndex: 0,
        explanation: '(15 / 40) × 100% = 37.5%។'
      },
      {
        id: 'm18_q10',
        subjectId: 'math',
        category: 'មេរៀនទី១៨៖ ស្ថិតិ',
        text: 'ឌីយ៉ាក្រាមបង្កោល (Bar Graph) ប្រើប្រាស់អ្វីដើម្បីបង្ហាញបរិមាណទិន្នន័យ?',
        options: [ 'ខ្សែផ្លោង', 'កម្ពស់ ឬប្រវែងនៃចតុកោណកែង', 'ចំណុចតភ្ជាប់', 'មុំរង្វង់' ],
        correctAnswerIndex: 1,
        explanation: 'ឌីយ៉ាក្រាមបង្កោលប្រើប្រាស់កម្ពស់/ប្រវែងនៃបង្កោលចតុកោណកែងដើម្បីតំណាងទិន្នន័យ។'
      },
      {
        id: 'm18_q11',
        subjectId: 'math',
        category: 'មេរៀនទី១៨៖ ស្ថិតិ',
        text: 'ទិន្នន័យស៊ីសីតុណ្ហភាពប្រចាំសប្តាហ៍៖ 30°, 32°, 31°, 29°, 33°, 30°, 29°. គណនាសីតុណ្ហភាពមធ្យមភាគ ៖',
        options: [ '30°C', '31°C', '30.5°C', '29.5°C' ],
        correctAnswerIndex: 2,
        explanation: 'ផលបូក = 214 ➔ មធ្យម = 214 / 7 = 30.57°C ≈ 30.5°C។'
      },
      {
        id: 'm18_q12',
        subjectId: 'math',
        category: 'មេរៀនទី១៨៖ ស្ថិតិ',
        text: 'តើអ័ក្សឈរក្នុងឌីយ៉ាក្រាមបង្កោលភាគច្រើនតំណាងឲ្យអ្វី?',
        options: [ 'ឈ្មោះប្រភេទ', 'ពណ៌', 'ពេលវេលា', 'ប្រេកង់ ឬចំនួន' ],
        correctAnswerIndex: 3,
        explanation: 'អ័ក្សឈរ (Vertical axis) តំណាងឲ្យប្រេកង់ ឬចំនួនបរិមាណ។'
      },
      {
        id: 'm18_q13',
        subjectId: 'math',
        category: 'មេរៀនទី១៨៖ ស្ថិតិ',
        text: 'តើអ័ក្សដេកក្នុងឌីយ៉ាក្រាមបង្កោលតំណាងឲ្យអ្វី?',
        options: [ 'ប្រភេទ ឬក្រុមទិន្នន័យ', 'ចំនួនសរុប', 'ភាគរយ', 'មុំ' ],
        correctAnswerIndex: 0,
        explanation: 'អ័ក្សដេក (Horizontal axis) តំណាងឲ្យប្រភេទ ឬក្រុមទិន្នន័យ។'
      },
      {
        id: 'm18_q14',
        subjectId: 'math',
        category: 'មេរៀនទី១៨៖ ស្ថិតិ',
        text: 'មុំផ្ចិតនៃផ្នែកមួយក្នុងឌីយ៉ាក្រាមរង្វង់មានរង្វាស់ 72°។ តើវាត្រូវនឹងភាគរយប៉ុន្មាន %?',
        options: [ '15%', '20%', '25%', '30%' ],
        correctAnswerIndex: 1,
        explanation: '(72° / 360°) × 100% = (1/5) × 100% = 20%។'
      },
      {
        id: 'm18_q15',
        subjectId: 'math',
        category: 'មេរៀនទី១៨៖ ស្ថិតិ',
        text: 'ទិន្នន័យ៖ 5, 5, 7, 8, 10, 10, 10. តើតម្លៃណាជា «ម៉ូត» (Mode - តម្លៃដែលមានប្រេកង់ច្រើនជាងគេ)?',
        options: [ '5', '7', '10', '8' ],
        correctAnswerIndex: 2,
        explanation: '10 មានប្រេកង់ 3 ដង (ច្រើនជាងគេ) ដូច្នេះ 10 ជាម៉ូត។'
      },
      {
        id: 'm18_q16',
        subjectId: 'math',
        category: 'មេរៀនទី១៨៖ ស្ថិតិ',
        text: 'រកមេដ្យាន (Median) នៃទិន្នន័យរៀបតាមលំដាប់៖ 3, 5, 7, 9, 11 ៖',
        options: [ '5', '6', '9', '7' ],
        correctAnswerIndex: 3,
        explanation: 'ទិន្នន័យចំកណ្តាល (តួទី៣) គឺ 7។'
      },
      {
        id: 'm18_q17',
        subjectId: 'math',
        category: 'មេរៀនទី១៨៖ ស្ថិតិ',
        text: 'ស្វែងរកចន្លោះប្រវ៉ារ (Range - ផលដកតម្លៃធំបំផុត និងតូចបំផុត) នៃទិន្នន័យ 4, 8, 12, 15, 20 ៖',
        options: [ '16', '12', '20', '8' ],
        correctAnswerIndex: 0,
        explanation: 'ចន្លោះប្រវ៉ារ = តម្លៃធំបំផុត - តម្លៃតូចបំផុត = 20 - 4 = 16។'
      },
      {
        id: 'm18_q18',
        subjectId: 'math',
        category: 'មេរៀនទី១៨៖ ស្ថិតិ',
        text: 'ក្នុងឌីយ៉ាក្រាមរង្វង់ បើទិន្នន័យសរុបគឺ 200 នាក់ ហើយផ្នែកកសិករមានមុំ 180° (50%)។ តើមានកសិករប្រមាណប៉ុន្មាននាក់?',
        options: [ '50 នាក់', '100 នាក់', '150 នាក់', '80 នាក់' ],
        correctAnswerIndex: 1,
        explanation: '200 × 50% = 100 នាក់។'
      },
      {
        id: 'm18_q19',
        subjectId: 'math',
        category: 'មេរៀនទី១៨៖ ស្ថិតិ',
        text: 'ក្នុងការប្រឡង ៤ លើក សិស្សម្នាក់បានពិន្ទុ 70, 80, 85, 85. គណនាពិន្ទុមធ្យមភាគ ៖',
        options: [ '80.0', '82', '80', '80.0' ],
        correctAnswerIndex: 2,
        explanation: '(70 + 80 + 85 + 85) / 4 = 320 / 4 = 80។'
      },
      {
        id: 'm18_q20',
        subjectId: 'math',
        category: 'មេរៀនទី១៨៖ ស្ថិតិ',
        text: 'តើការប្រមូល និងរៀបចំទិន្នន័យជាតារាង មានប្រយោជន៍អ្វីខ្លះ?',
        options: [
          'ប្រើប្រាស់បានតែក្នុងវិស័យកសិកម្ម',
          'ធ្វើឲ្យទិន្នន័យស្មុគស្មាញជាងមុន',
          'គ្មានប្រយោជន៍ទេ',
          'ងាយស្រួលមើល វិភាគ និងធ្វើការសន្និដ្ឋានទិន្នន័យ'
        ],
        correctAnswerIndex: 3,
        explanation: 'តារាងស្ថិតិ និងឌីយ៉ាក្រាមជួយឲ្យងាយស្រួលមើល វិភាគ និងប្រៀបធៀបទិន្នន័យ។'
      }
    ]
  },

  // =========================================================================
  // វិញ្ញាសា មេរៀនទី ១៩ ៖ ប្រមាណវិធីលើរង្វាស់ពេល (២០ សំណួរ QCM)
  // =========================================================================
  {
    id: 'math-lesson-19-exam',
    subjectId: 'math',
    title: 'វិញ្ញាសាមេរៀនទី ១៩ ៖ ប្រមាណវិធីលើរង្វាស់ពេល (២០ សំណួរ QCM)',
    description: 'សំណួរ QCM ទាំង ២០ សម្រាប់ការប្រឡងតេស្តសមត្ថភាពមេរៀនទី១៩៖ រង្វាស់ពេល, វិធីបូក, វិធីដក, វិធីគុណ និងវិធីចែករង្វាស់ពេល (ម៉ោង, នាទី, វិនាទី)',
    durationMinutes: 40,
    totalPoints: 20,
    yearOrType: 'វិញ្ញាសាតាមមេរៀន',
    questions: [
      {
        id: 'm19_q1',
        subjectId: 'math',
        category: 'មេរៀនទី១៩៖ រង្វាស់ពេល',
        text: 'តើ 1 ម៉ោង (h) ស្មើនឹងប៉ុន្មាននាទី (mn)?',
        options: [ '60 mn', '30 mn', '100 mn', '360 mn' ],
        correctAnswerIndex: 0,
        explanation: '1h = 60mn។'
      },
      {
        id: 'm19_q2',
        subjectId: 'math',
        category: 'មេរៀនទី១៩៖ រង្វាស់ពេល',
        text: 'តើ 1 នាទី (mn) ស្មើនឹងប៉ុន្មានវិនាទី (s)?',
        options: [ '10 s', '60 s', '100 s', '360 s' ],
        correctAnswerIndex: 1,
        explanation: '1mn = 60s។'
      },
      {
        id: 'm19_q3',
        subjectId: 'math',
        category: 'មេរៀនទី១៩៖ រង្វាស់ពេល',
        text: 'តើ 1 ម៉ោង (h) ស្មើនឹងប៉ុន្មានវិនាទី (s)?',
        options: [ '60 s', '600 s', '3600 s', '6000 s' ],
        correctAnswerIndex: 2,
        explanation: '1h = 60 × 60 = 3600s។'
      },
      {
        id: 'm19_q4',
        subjectId: 'math',
        category: 'មេរៀនទី១៩៖ រង្វាស់ពេល',
        text: 'គណនាផលបូក 4h 47mn 32s + 3h 50mn 45s = ?',
        options: [ '7h 97mn 77s', '7h 38mn 17s', '8h 37mn 17s', '8h 38mn 17s' ],
        correctAnswerIndex: 3,
        explanation: '32s + 45s = 77s = 1mn 17s; 47mn + 50mn + 1mn = 98mn = 1h 38mn; 4h + 3h + 1h = 8h ➔ 8h 38mn 17s។'
      },
      {
        id: 'm19_q5',
        subjectId: 'math',
        category: 'មេរៀនទី១៩៖ រង្វាស់ពេល',
        text: 'គណនាផលដក 5h 20mn - 2h 45mn = ?',
        options: [ '2h 35mn', '3h 35mn', '2h 25mn', '3h 25mn' ],
        correctAnswerIndex: 0,
        explanation: '5h 20mn = 4h 80mn ➔ 4h 80mn - 2h 45mn = 2h 35mn។'
      },
      {
        id: 'm19_q6',
        subjectId: 'math',
        category: 'មេរៀនទី១៩៖ រង្វាស់ពេល',
        text: 'គណនាផលគុណ 2h 15mn × 3 = ?',
        options: [ '6h 30mn', '6h 45mn', '7h 15mn', '6h 15mn' ],
        correctAnswerIndex: 1,
        explanation: '2h × 3 = 6h; 15mn × 3 = 45mn ➔ 6h 45mn។'
      },
      {
        id: 'm19_q7',
        subjectId: 'math',
        category: 'មេរៀនទី១៩៖ រង្វាស់ពេល',
        text: 'គណនាផលគុណ 1h 40mn × 4 = ?',
        options: [ '4h 160mn', '5h 40mn', '6h 40mn', '6h 20mn' ],
        correctAnswerIndex: 2,
        explanation: '1h × 4 = 4h; 40mn × 4 = 160mn = 2h 40mn ➔ 4h + 2h 40mn = 6h 40mn។'
      },
      {
        id: 'm19_q8',
        subjectId: 'math',
        category: 'មេរៀនទី១៩៖ រង្វាស់ពេល',
        text: 'គណនាផលចែក 9h 30mn ÷ 3 = ?',
        options: [ '2h 50mn', '3h 15mn', '3h 05mn', '3h 10mn' ],
        correctAnswerIndex: 3,
        explanation: '9h ÷ 3 = 3h; 30mn ÷ 3 = 10mn ➔ 3h 10mn។'
      },
      {
        id: 'm19_q9',
        subjectId: 'math',
        category: 'មេរៀនទី១៩៖ រង្វាស់ពេល',
        text: 'គណនាផលចែក 5h 20mn ÷ 2 = ?',
        options: [ '2h 40mn', '2h 10mn', '2h 30mn', '3h 10mn' ],
        correctAnswerIndex: 0,
        explanation: '5h ÷ 2 = 2h នៅសល់ 1h (60mn); 60mn + 20mn = 80mn ➔ 80mn ÷ 2 = 40mn ➔ 2h 40mn។'
      },
      {
        id: 'm19_q10',
        subjectId: 'math',
        category: 'មេរៀនទី១៩៖ រង្វាស់ពេល',
        text: 'បំប្លែង 150 នាទី (mn) ជាម៉ោង និងនាទី ៖',
        options: [ '1h 50mn', '2h 30mn', '2h 50mn', '1h 30mn' ],
        correctAnswerIndex: 1,
        explanation: '150 / 60 = 2h នៅសល់ 30mn ➔ 2h 30mn (2.5 ម៉ោង)។'
      },
      {
        id: 'm19_q11',
        subjectId: 'math',
        category: 'មេរៀនទី១៩៖ រង្វាស់ពេល',
        text: 'បំប្លែង 2 ថ្ងៃ ជាម៉ោង (h) ៖',
        options: [ '24 h', '36 h', '48 h', '72 h' ],
        correctAnswerIndex: 2,
        explanation: '1 ថ្ងៃ = 24 ម៉ោង ➔ 2 ថ្ងៃ = 48 ម៉ោង។'
      },
      {
        id: 'm19_q12',
        subjectId: 'math',
        category: 'មេរៀនទី១៩៖ រង្វាស់ពេល',
        text: 'សិស្សម្នាក់រៀនពេលព្រឹក 3h 15mn និងពេលរសៀល 2h 45mn. តើគាត់រៀនសរុបប៉ុន្មានម៉ោង?',
        options: [ '5h 60mn', '6h 30mn', '5h 30mn', '6h 00mn' ],
        correctAnswerIndex: 3,
        explanation: '3h + 2h = 5h; 15mn + 45mn = 60mn = 1h ➔ 5h + 1h = 6h 00mn (6 ម៉ោង)។'
      },
      {
        id: 'm19_q13',
        subjectId: 'math',
        category: 'មេរៀនទី១៩៖ រង្វាស់ពេល',
        text: 'ភាពយន្តមួយចាប់ផ្តើមម៉ោង 19:30 ហើយបញ្ចប់ម៉ោង 21:45។ តើភាពយន្តនោះមានរយៈពេលប៉ុន្មាន?',
        options: [ '2h 15mn', '2h 30mn', '1h 45mn', '2h 00mn' ],
        correctAnswerIndex: 0,
        explanation: '21:45 - 19:30 = 2h 15mn (2 ម៉ោង 15 នាទី)។'
      },
      {
        id: 'm19_q14',
        subjectId: 'math',
        category: 'មេរៀនទី១៩៖ រង្វាស់ពេល',
        text: 'បំប្លែង 3mn 25s ជាវិនាទី (s) ៖',
        options: [ '180 s', '205 s', '325 s', '145 s' ],
        correctAnswerIndex: 1,
        explanation: '3 × 60s + 25s = 180s + 25s = 205 s។'
      },
      {
        id: 'm19_q15',
        subjectId: 'math',
        category: 'មេរៀនទី១៩៖ រង្វាស់ពេល',
        text: 'គណនា 10h 15mn - 4h 50mn = ?',
        options: [ '5h 35mn', '6h 25mn', '5h 25mn', '6h 35mn' ],
        correctAnswerIndex: 2,
        explanation: '9h 75mn - 4h 50mn = 5h 25mn។'
      },
      {
        id: 'm19_q16',
        subjectId: 'math',
        category: 'មេរៀនទី១៩៖ រង្វាស់ពេល',
        text: 'កម្មករ 1 នាក់ធ្វើការ 7h 30mn ក្នុង ១ ថ្ងៃ។ បើគាត់ធ្វើការ 5 ថ្ងៃ តើប្រើពេលសរុបប៉ុន្មាន?',
        options: [ '35h 30mn', '36h 30mn', '37h 50mn', '37h 30mn' ],
        correctAnswerIndex: 3,
        explanation: '7h × 5 = 35h; 30mn × 5 = 150mn = 2h 30mn ➔ 35h + 2h 30mn = 37h 30mn។'
      },
      {
        id: 'm19_q17',
        subjectId: 'math',
        category: 'មេរៀនទី១៩៖ រង្វាស់ពេល',
        text: 'គណនា 18mn 40s ÷ 4 = ?',
        options: [ '4mn 40s', '4mn 10s', '4mn 20s', '4mn 30s' ],
        correctAnswerIndex: 0,
        explanation: '18mn ÷ 4 = 4mn នៅសល់ 2mn (120s); 120s + 40s = 160s ➔ 160s ÷ 4 = 40s ➔ 4mn 40s។'
      },
      {
        id: 'm19_q18',
        subjectId: 'math',
        category: 'មេរៀនទី១៩៖ រង្វាស់ពេល',
        text: 'តើ 1 សប្តាហ៍ មានប៉ុន្មានម៉ោង (h)?',
        options: [ '120 h', '168 h', '144 h', '200 h' ],
        correctAnswerIndex: 1,
        explanation: '7 ថ្ងៃ × 24 ម៉ោង = 168 ម៉ោង។'
      },
      {
        id: 'm19_q19',
        subjectId: 'math',
        category: 'មេរៀនទី១៩៖ រង្វាស់ពេល',
        text: 'បំប្លែង 0.75 ម៉ោង ជានាទី ៖',
        options: [ '30 mn', '50 mn', '45 mn', '15 mn' ],
        correctAnswerIndex: 2,
        explanation: '0.75 × 60 = 45 នាទី។'
      },
      {
        id: 'm19_q20',
        subjectId: 'math',
        category: 'មេរៀនទី១៩៖ រង្វាស់ពេល',
        text: 'គណនា 1 ថ្ងៃ - 18h 30mn = ?',
        options: [ '6h 00mn', '6h 30mn', '5h 20mn', '5h 30mn' ],
        correctAnswerIndex: 3,
        explanation: '24h 00mn - 18h 30mn = 23h 60mn - 18h 30mn = 5h 30mn។'
      }
    ]
  },

  // =========================================================================
  // វិញ្ញាសា មេរៀនទី ២០ ៖ មាឌ និងផ្ទៃក្រឡាសូលីត (២០ សំណួរ QCM)
  // =========================================================================
  {
    id: 'math-lesson-20-exam',
    subjectId: 'math',
    title: 'វិញ្ញាសាមេរៀនទី ២០ ៖ មាឌ និងផ្ទៃក្រឡាសូលីត (២០ សំណួរ QCM)',
    description: 'សំណួរ QCM ទាំង ២០ សម្រាប់ការប្រឡងតេស្តសមត្ថភាពមេរៀនទី២០៖ មាឌប្រអប់កែង, គូប, ស៊ីឡាំង, កោន, ស៊្វែ និងផ្ទៃក្រឡាសូលីត',
    durationMinutes: 40,
    totalPoints: 20,
    yearOrType: 'វិញ្ញាសាតាមមេរៀន',
    questions: [
      {
        id: 'm20_q1',
        subjectId: 'math',
        category: 'មេរៀនទី២០៖ មាឌនិងផ្ទៃសូលីត',
        text: 'រូបមន្តមាឌប្រអប់កែង (V) ដែលមានបណ្តោយ a, ទទឹង b, កម្ពស់ h គឺ ៖',
        options: [ 'V = a × b × h', 'V = × h', 'V = 2', 'V = a × b / h' ],
        correctAnswerIndex: 0,
        explanation: 'មាឌប្រអប់កែង V = បណ្តោយ × ទទឹង × កម្ពស់ (a × b × h)។'
      },
      {
        id: 'm20_q2',
        subjectId: 'math',
        category: 'មេរៀនទី២០៖ មាឌនិងផ្ទៃសូលីត',
        text: 'ប្រអប់កែងមួយមានបណ្តោយ 10cm, ទទឹង 5cm, កម្ពស់ 4cm. គណនាមាឌប្រអប់ ៖',
        options: [ '100 cm³', '200 cm³', '19 cm³', '400 cm³' ],
        correctAnswerIndex: 1,
        explanation: 'V = 10 × 5 × 4 = 200 cm³។'
      },
      {
        id: 'm20_q3',
        subjectId: 'math',
        category: 'មេរៀនទី២០៖ មាឌនិងផ្ទៃសូលីត',
        text: 'រូបមន្តមាឌគូប (V) ដែលមានជ្រុង a គឺ ៖',
        options: [ 'V = 6 × a', 'V = a²', 'V = a³', 'V = 4 × a³' ],
        correctAnswerIndex: 2,
        explanation: 'មាឌគូប V = a × a × a = a³។'
      },
      {
        id: 'm20_q4',
        subjectId: 'math',
        category: 'មេរៀនទី២០៖ មាឌនិងផ្ទៃសូលីត',
        text: 'គូបមួយមានជ្រុង a = 5 cm. គណនាមាឌគូបនោះ ៖',
        options: [ '25 cm³', '150 cm³', '30 cm³', '125 cm³' ],
        correctAnswerIndex: 3,
        explanation: 'V = 5³ = 5 × 5 × 5 = 125 cm³។'
      },
      {
        id: 'm20_q5',
        subjectId: 'math',
        category: 'មេរៀនទី២០៖ មាឌនិងផ្ទៃសូលីត',
        text: 'រូបមន្តមាឌស៊ីឡាំង (V) ដែលមានកាំបាត R និងកម្ពស់ h គឺ ៖ (យក π ≈ 3.14)',
        options: [ 'V = π × R² × h', 'V = 2 × π × R × h', 'V = × π × R² × h', 'V = π × R × h²' ],
        correctAnswerIndex: 0,
        explanation: 'មាឌស៊ីឡាំង V = ផ្ទៃបាត × កម្ពស់ = π × R² × h។'
      },
      {
        id: 'm20_q6',
        subjectId: 'math',
        category: 'មេរៀនទី២០៖ មាឌនិងផ្ទៃសូលីត',
        text: 'ធុងស៊ីឡាំងមួយមានកាំ R = 3cm, កម្ពស់ h = 5cm (យក π ≈ 3.14)។ គណនាមាឌ ៖',
        options: [ '47.1 cm³', '141.3 cm³', '94.2 cm³', '282.6 cm³' ],
        correctAnswerIndex: 1,
        explanation: 'V = 3.14 × (3²) × 5 = 3.14 × 9 × 5 = 141.3 cm³។'
      },
      {
        id: 'm20_q7',
        subjectId: 'math',
        category: 'មេរៀនទី២០៖ មាឌនិងផ្ទៃសូលីត',
        text: 'តើ 1 លីត្រ (L) ស្មើនឹងប៉ុន្មាន ឬសង់ទីម៉ែត្រគូប (cm³)?',
        options: [ '100 cm³', '10 000 cm³', '1000 cm³', '10 cm³' ],
        correctAnswerIndex: 2,
        explanation: '1 L = 1 dm³ = 1000 cm³ (ឬ 1000 ml)។'
      },
      {
        id: 'm20_q8',
        subjectId: 'math',
        category: 'មេរៀនទី២០៖ មាឌនិងផ្ទៃសូលីត',
        text: 'អាងទឹកមួយរាងប្រអប់កែងមានបណ្តោយ 2m, ទទឹង 1.5m, ជម្រៅ (កម្ពស់) 1m. គណនាមាឌទឹកអាងជា m³ ៖',
        options: [ '1.5 m³', '4.5 m³', '30 m³', '3 m³' ],
        correctAnswerIndex: 3,
        explanation: 'V = 2m × 1.5m × 1m = 3 m³។'
      },
      {
        id: 'm20_q9',
        subjectId: 'math',
        category: 'មេរៀនទី២០៖ មាឌនិងផ្ទៃសូលីត',
        text: 'តាមប្រធានខាងលើ តើអាងនោះអាចផ្ទុកទឹកបានសរុបប៉ុន្មានលីត្រ (L)?',
        options: [ '3000 L', '300 L', '30 000 L', '30 L' ],
        correctAnswerIndex: 0,
        explanation: 'ដោយសារ 1 m³ = 1000 L ➔ 3 m³ = 3000 L។'
      },
      {
        id: 'm20_q10',
        subjectId: 'math',
        category: 'មេរៀនទី២០៖ មាឌនិងផ្ទៃសូលីត',
        text: 'រូបមន្តផ្ទៃក្រឡាសរុបនៃគូប (A) ដែលមានជ្រុង a គឺ ៖',
        options: [ 'A = a²', 'A = 6 × a²', 'A = 4 × a²', 'A = 12 × a' ],
        correctAnswerIndex: 1,
        explanation: 'គូបមានមុខការេចំនួន 6 ស្មើៗគ្នា ➔ ផ្ទៃសរុប A = 6 × a²។'
      },
      {
        id: 'm20_q11',
        subjectId: 'math',
        category: 'មេរៀនទី២០៖ មាឌនិងផ្ទៃសូលីត',
        text: 'គណនាផ្ទៃក្រឡាសរុបនៃគូបដែលមានជ្រុង a = 4 cm ៖',
        options: [ '64 cm²', '16 cm²', '96 cm²', '48 cm²' ],
        correctAnswerIndex: 2,
        explanation: 'A = 6 × (4²) = 6 × 16 = 96 cm²។'
      },
      {
        id: 'm20_q12',
        subjectId: 'math',
        category: 'មេរៀនទី២០៖ មាឌនិងផ្ទៃសូលីត',
        text: 'រូបមន្តមាឌកោន (V) ដែលមានកាំបាត R និងកម្ពស់ h គឺ ៖',
        options: [ 'V = π × R² × h', 'V = 3 × π × R² × h', 'V = × π × R² × h', 'V = × π × R² × h' ],
        correctAnswerIndex: 3,
        explanation: 'មាឌកោនស្មើនឹង ១/៣ នៃមាឌស៊ីឡាំងដែលមានកាំបាត និងកម្ពស់ស្មើគ្នា ➔ V = (1/3) × π × R² × h។'
      },
      {
        id: 'm20_q13',
        subjectId: 'math',
        category: 'មេរៀនទី២០៖ មាឌនិងផ្ទៃសូលីត',
        text: 'រូបមន្តមាឌស៊្វែ (Sphere - គ្រាប់ឃ្លី) គឺ ៖',
        options: [ 'V = × π × R³', 'V = 4 × π × R²', 'V = × π × R³', 'V = π × R³' ],
        correctAnswerIndex: 0,
        explanation: 'មាឌស៊្វែ V = (4/3) × π × R³។'
      },
      {
        id: 'm20_q14',
        subjectId: 'math',
        category: 'មេរៀនទី២០៖ មាឌនិងផ្ទៃសូលីត',
        text: 'តើ 1 m³ (ម៉ែត្រគូប) ស្មើនឹងប៉ុន្មាន dm³ (ដេស៊ីម៉ែត្រគូប)?',
        options: [ '100 dm³', '1000 dm³', '10 000 dm³', '10 dm³' ],
        correctAnswerIndex: 1,
        explanation: '1 m³ = 1000 dm³ (ឬ 1000 លីត្រ)។'
      },
      {
        id: 'm20_q15',
        subjectId: 'math',
        category: 'មេរៀនទី២០៖ មាឌនិងផ្ទៃសូលីត',
        text: 'គូបមួយមានមាឌ V = 27 cm³។ តើជ្រុងគូបនោះមានប្រវែងប៉ុន្មាន cm?',
        options: [ '4.5 cm', '9 cm', '3 cm', '13.5 cm' ],
        correctAnswerIndex: 2,
        explanation: 'a³ = 27 ➔ a = 3 cm (ព្រោះ 3 × 3 × 3 = 27)។'
      },
      {
        id: 'm20_q16',
        subjectId: 'math',
        category: 'មេរៀនទី២០៖ មាឌនិងផ្ទៃសូលីត',
        text: 'ប្រអប់កែងមួយមានបាតរាងការេជ្រុង 5cm និងកម្ពស់ 10cm. គណនាមាឌ ៖',
        options: [ '125 cm³', '500 cm³', '100 cm³', '250 cm³' ],
        correctAnswerIndex: 3,
        explanation: 'V = ផ្ទៃបាត × កម្ពស់ = (5 × 5) × 10 = 25 × 10 = 250 cm³។'
      },
      {
        id: 'm20_q17',
        subjectId: 'math',
        category: 'មេរៀនទី២០៖ មាឌនិងផ្ទៃសូលីត',
        text: 'ផ្ទៃក្រឡាខាង (Lateral surface area) នៃស៊ីឡាំងគឺ ៖',
        options: [ '2 × π × R × h', 'π × R² × h', '2 × π × R²', 'π × D × h²' ],
        correctAnswerIndex: 0,
        explanation: 'ផ្ទៃក្រឡាខាងស៊ីឡាំង = បរិមាត្របាត × កម្ពស់ = 2 × π × R × h។'
      },
      {
        id: 'm20_q18',
        subjectId: 'math',
        category: 'មេរៀនទី២០៖ មាឌនិងផ្ទៃសូលីត',
        text: 'ស៊ីឡាំងមួយមានកាំ R = 10cm និងកម្ពស់ h = 10cm (យក π ≈ 3.14)។ គណនាមាឌ ៖',
        options: [ '6280 cm³', '3140 cm³', '314 cm³', '1000 cm³' ],
        correctAnswerIndex: 1,
        explanation: 'V = 3.14 × (10²) × 10 = 3.14 × 100 × 10 = 3140 cm³។'
      },
      {
        id: 'm20_q19',
        subjectId: 'math',
        category: 'មេរៀនទី២០៖ មាឌនិងផ្ទៃសូលីត',
        text: 'ធុងទឹកមួយមានមាឌ 0.5 m³។ តើផ្ទុកទឹកបានប៉ុន្មានលីត្រ (L)?',
        options: [ '50 L', '5000 L', '500 L', '5 L' ],
        correctAnswerIndex: 2,
        explanation: '0.5 × 1000 L = 500 L (លីត្រ)។'
      },
      {
        id: 'm20_q20',
        subjectId: 'math',
        category: 'មេរៀនទី២០៖ មាឌនិងផ្ទៃសូលីត',
        text: 'ដើម្បីគណនាមាឌសូលីតស្មុគស្មាញ (Irregular solid) ដោយជម្រកទឹក តើគេប្រើវិធានអ្វី?',
        options: [
          'មិនអាចគណនាបានទេ',
          'មាឌសូលីត = ទម្ងន់ ÷ ២',
          'មាឌសូលីត = បរិមាត្រ × ២',
          'មាឌសូលីត = មាឌទឹកកើនឡើង'
        ],
        correctAnswerIndex: 3,
        explanation: 'តាមគោលការណ៍អាកស៊ីម៉ែត មាឌសូលីតស្ទាក់ស្ទើរស្មើនឹងមាឌទឹកដែលវាជំនួស (កើនឡើង ឬរំកិលចេញ)។'
      }
    ]
  }
];
