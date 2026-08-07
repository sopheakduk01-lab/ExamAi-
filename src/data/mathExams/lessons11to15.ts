import { ExamPaper } from '../../types';

export const LESSONS_11_TO_15_EXAMS: ExamPaper[] = [
  // =========================================================================
  // វិញ្ញាសា មេរៀនទី ១១ ៖ វិធីគុណ និងវិធីចែកប្រភាគ (២០ សំណួរ QCM)
  // =========================================================================
  {
    id: 'math-lesson-11-exam',
    subjectId: 'math',
    title: 'វិញ្ញាសាមេរៀនទី ១១ ៖ វិធីគុណ និងវិធីចែកប្រភាគ (២០ សំណួរ QCM)',
    description: 'សំណួរ QCM ទាំង ២០ សម្រាប់ការប្រឡងតេស្តសមត្ថភាពមេរៀនទី១១៖ វិធីគុណប្រភាគ, វិធីចែកប្រភាគ, ប្រភាគច្រាស់ និងចំណោទអនុវត្ត',
    durationMinutes: 40,
    totalPoints: 20,
    yearOrType: 'វិញ្ញាសាតាមមេរៀន',
    questions: [
      {
        id: 'm11_q1',
        subjectId: 'math',
        category: 'មេរៀនទី១១៖ គុណចែកប្រភាគ',
        text: 'គណនាផលគុណប្រភាគ៖ (2/3) × (4/5) = ?',
        options: [ '8/15', '6/8', '10/12', '8/8' ],
        correctAnswerIndex: 0,
        explanation: '(2 × 4) / (3 × 5) = 8/15។'
      },
      {
        id: 'm11_q2',
        subjectId: 'math',
        category: 'មេរៀនទី១១៖ គុណចែកប្រភាគ',
        text: 'គណនាផលគុណប្រភាគ៖ (3/4) × (2/3) = ?',
        options: [ '5/7', '6/12 ឬ 1/2', '1/4', '9/8' ],
        correctAnswerIndex: 1,
        explanation: '(3 × 2) / (4 × 3) = 6/12 = 1/2។'
      },
      {
        id: 'm11_q3',
        subjectId: 'math',
        category: 'មេរៀនទី១១៖ គុណចែកប្រភាគ',
        text: 'តើប្រភាគច្រាស់ (Reciprocal) នៃ 3/4 គឺអ្វី?',
        options: [ '-3/4', '1/4', '4/3', '3/1' ],
        correctAnswerIndex: 2,
        explanation: 'ប្រភាគច្រាស់នៃ a/b គឺ b/a ដូច្នេះប្រភាគច្រាស់នៃ 3/4 គឺ 4/3។'
      },
      {
        id: 'm11_q4',
        subjectId: 'math',
        category: 'មេរៀនទី១១៖ គុណចែកប្រភាគ',
        text: 'គណនាផលចែកប្រភាគ៖ (3/4) ÷ (1/2) = ?',
        options: [ '3/8', '2/3', '1/4', '3/2 ឬ 1.5' ],
        correctAnswerIndex: 3,
        explanation: '(3/4) × (2/1) = 6/4 = 3/2 = 1.5។'
      },
      {
        id: 'm11_q5',
        subjectId: 'math',
        category: 'មេរៀនទី១១៖ គុណចែកប្រភាគ',
        text: 'គណនាផលចែកប្រភាគ៖ (5/6) ÷ (2/3) = ?',
        options: [ '5/4 ឬ 1', '10/18', '15/12', '5/4 ឬ 1' ],
        correctAnswerIndex: 0,
        explanation: '(5/6) × (3/2) = 15/12 = 5/4 = 1 1/4។'
      },
      {
        id: 'm11_q6',
        subjectId: 'math',
        category: 'មេរៀនទី១១៖ គុណចែកប្រភាគ',
        text: 'គណនា 5 × (2/3) = ?',
        options: [ '7/3', '10/3 ឬ 3', '10/15', '2/15' ],
        correctAnswerIndex: 1,
        explanation: '(5 × 2) / 3 = 10/3 = 3 1/3។'
      },
      {
        id: 'm11_q7',
        subjectId: 'math',
        category: 'មេរៀនទី១១៖ គុណចែកប្រភាគ',
        text: 'គណនា (3/4) ÷ 2 = ?',
        options: [ '3/2', '6/4', '3/8', '1/8' ],
        correctAnswerIndex: 2,
        explanation: '(3/4) × (1/2) = 3/8។'
      },
      {
        id: 'm11_q8',
        subjectId: 'math',
        category: 'មេរៀនទី១១៖ គុណចែកប្រភាគ',
        text: 'ដីស្រែមួយរាងចតុកោណកែងមានបណ្តោយ 3/4 km និងទទឹង 1/2 km។ គណនាផ្ទៃក្រឡាជា km² ៖',
        options: [ '2/8 km²', '4/6 km²', '3/6 km²', '3/8 km²' ],
        correctAnswerIndex: 3,
        explanation: 'S = (3/4) × (1/2) = 3/8 km²។'
      },
      {
        id: 'm11_q9',
        subjectId: 'math',
        category: 'មេរៀនទី១១៖ គុណចែកប្រភាគ',
        text: 'ខ្សែរប្រវែង 3/4 m ត្រូវកាត់ជា 3 កំណាត់ស្មើៗគ្នា។ តើមួយកំណាត់ៗប្រវែងប៉ុន្មានម៉ែត្រ?',
        options: [ '1/4 m ឬ 3/12 m', '9/4 m', '3/12 m', '1/4 m' ],
        correctAnswerIndex: 0,
        explanation: '(3/4) ÷ 3 = (3/4) × (1/3) = 1/4 m (ឬ 3/12 m)។'
      },
      {
        id: 'm11_q10',
        subjectId: 'math',
        category: 'មេរៀនទី១១៖ គុណចែកប្រភាគ',
        text: 'គណនា (1/2) × (2/3) × (3/4) = ?',
        options: [ '1/24', '6/24 ឬ 1/4', '6/9', '1/2' ],
        correctAnswerIndex: 1,
        explanation: '(1×2×3) / (2×3×4) = 6/24 = 1/4។'
      },
      {
        id: 'm11_q11',
        subjectId: 'math',
        category: 'មេរៀនទី១១៖ គុណចែកប្រភាគ',
        text: 'គណនា 2 ÷ (1/3) = ?',
        options: [ '2/3', '1/6', '6', '3/2' ],
        correctAnswerIndex: 2,
        explanation: '2 × (3/1) = 6។'
      },
      {
        id: 'm11_q12',
        subjectId: 'math',
        category: 'មេរៀនទី១១៖ គុណចែកប្រភាគ',
        text: 'តើប្រភាគណាដែលគុណនឹងប្រភាគច្រាស់របស់វាស្មើនឹង 1 ជានិច្ច?',
        options: [ 'ប្រភាគស្មើ 0', 'មានតែប្រភាគ 1/2', 'គ្មានទេ', 'ប្រភាគគ្រប់ប្រភាគ ≠ 0' ],
        correctAnswerIndex: 3,
        explanation: '(a/b) × (b/a) = 1 ជានិច្ច ចំពោះប្រភាគមិនសូន្យ។'
      },
      {
        id: 'm11_q13',
        subjectId: 'math',
        category: 'មេរៀនទី១១៖ គុណចែកប្រភាគ',
        text: 'គណនា (5/8) × (4/5) = ?',
        options: [ '20/40 ឬ 1/2', '1/8', '9/13', '20/20' ],
        correctAnswerIndex: 0,
        explanation: '(5×4) / (8×5) = 20/40 = 1/2។'
      },
      {
        id: 'm11_q14',
        subjectId: 'math',
        category: 'មេរៀនទី១១៖ គុណចែកប្រភាគ',
        text: 'គណនា (7/10) ÷ (7/10) = ?',
        options: [ '0', '1', '49/100', '14/20' ],
        correctAnswerIndex: 1,
        explanation: 'ចំនួនណាក៏ដោយចែកនឹងខ្លួនវា ស្មើនឹង 1។'
      },
      {
        id: 'm11_q15',
        subjectId: 'math',
        category: 'មេរៀនទី១១៖ គុណចែកប្រភាគ',
        text: 'គណនា (3/5) ÷ (9/10) = ?',
        options: [ '27/50', '2/3', '2/3 ឬ 30/45', '30/45' ],
        correctAnswerIndex: 2,
        explanation: '(3/5) × (10/9) = 30/45 = 2/3។'
      },
      {
        id: 'm11_q16',
        subjectId: 'math',
        category: 'មេរៀនទី១១៖ គុណចែកប្រភាគ',
        text: 'ថ្នាក់រៀនមួយមានសិស្ស 40 នាក់ ដែលមានសិស្សស្រី 3/5 នៃសិស្សសរុប។ តើមានសិស្សស្រីប៉ុន្មាននាក់?',
        options: [ '15 នាក់', '20 នាក់', '16 នាក់', '24 នាក់' ],
        correctAnswerIndex: 3,
        explanation: '40 × (3/5) = 120 / 5 = 24 នាក់។'
      },
      {
        id: 'm11_q17',
        subjectId: 'math',
        category: 'មេរៀនទី១១៖ គុណចែកប្រភាគ',
        text: 'តាមប្រធានខាងលើ តើមានសិស្សប្រុសប៉ុន្មាននាក់?',
        options: [ '16 នាក់', '24 នាក់', '15 នាក់', '20 នាក់' ],
        correctAnswerIndex: 0,
        explanation: '40 - 24 = 16 នាក់ (ឬ 40 × 2/5 = 16)។'
      },
      {
        id: 'm11_q18',
        subjectId: 'math',
        category: 'មេរៀនទី១១៖ គុណចែកប្រភាគ',
        text: 'គណនា (4/9) × 3 = ?',
        options: [ '4/27', '12/9 ឬ 4/3', '7/9', '12/27' ],
        correctAnswerIndex: 1,
        explanation: '12/9 = 4/3 = 1 1/3។'
      },
      {
        id: 'm11_q19',
        subjectId: 'math',
        category: 'មេរៀនទី១១៖ គុណចែកប្រភាគ',
        text: 'គណនា (8/15) ÷ 4 = ?',
        options: [ '2/15', '32/15', '2/15 ឬ 8/60', '8/60' ],
        correctAnswerIndex: 2,
        explanation: '(8/15) × (1/4) = 8/60 = 2/15។'
      },
      {
        id: 'm11_q20',
        subjectId: 'math',
        category: 'មេរៀនទី១១៖ គុណចែកប្រភាគ',
        text: 'ដើម្បីចែកប្រភាគមួយនឹងប្រភាគមួយទៀត តើគេត្រូវធ្វើយ៉ាងដូចម្តេច?',
        options: [
          'តម្រូវភាគបែងរួម',
          'ចែកភាគយកនិងភាគបែង',
          'យកប្រភាគទី១ ដកប្រភាគទី២',
          'យកប្រភាគទី១ គុណនឹងប្រភាគច្រាស់នៃប្រភាគទី២'
        ],
        correctAnswerIndex: 3,
        explanation: '(a/b) ÷ (c/d) = (a/b) × (d/c) គឺយកប្រភាគទី១ គុណនឹងប្រភាគច្រាស់នៃប្រភាគទី២។'
      }
    ]
  },

  // =========================================================================
  // វិញ្ញាសា មេរៀនទី ១២ ៖ ផលធៀប (២០ សំណួរ QCM)
  // =========================================================================
  {
    id: 'math-lesson-12-exam',
    subjectId: 'math',
    title: 'វិញ្ញាសាមេរៀនទី ១២ ៖ ផលធៀប (២០ សំណួរ QCM)',
    description: 'សំណួរ QCM ទាំង ២០ សម្រាប់ការប្រឡងតេស្តសមត្ថភាពមេរៀនទី១២៖ ផលធៀប, ការសម្រួលផលធៀប, អត្រា និងការចែករំលែកតាមផលធៀប',
    durationMinutes: 40,
    totalPoints: 20,
    yearOrType: 'វិញ្ញាសាតាមមេរៀន',
    questions: [
      {
        id: 'm12_q1',
        subjectId: 'math',
        category: 'មេរៀនទី១២៖ ផលធៀប',
        text: 'សរសេរផលធៀបនៃ ២០ ទៅ ២៥ ជាប្រភាគសម្រួលមិនបាន ៖',
        options: [ '4/5', '20/25', '5/4', '2/5' ],
        correctAnswerIndex: 0,
        explanation: '20/25 = 4/5 (ឬ 4 : 5)។'
      },
      {
        id: 'm12_q2',
        subjectId: 'math',
        category: 'មេរៀនទី១២៖ ផលធៀប',
        text: 'ក្នុងថ្នាក់មួយមានសិស្សប្រុស 15 នាក់ និងសិស្សស្រី 20 នាក់។ តើផលធៀបសិស្សប្រុសទៅសិស្សស្រីស្មើនឹងប៉ុន្មាន?',
        options: [ '4 : 3', '3 : 4', '3 : 7', '15 : 35' ],
        correctAnswerIndex: 1,
        explanation: '15 / 20 = 3 / 4 (ឬ 3 : 4)។'
      },
      {
        id: 'm12_q3',
        subjectId: 'math',
        category: 'មេរៀនទី១២៖ ផលធៀប',
        text: 'តាមប្រធានខាងលើ តើផលធៀបសិស្សស្រីទៅសិស្សសរុបស្មើនឹងប៉ុន្មាន?',
        options: [ '4 : 3', '3 : 7', '4 : 7', '20 : 15' ],
        correctAnswerIndex: 2,
        explanation: 'សិស្សសរុប = 15 + 20 = 35 ➔ 20 / 35 = 4 / 7 (ឬ 4 : 7)។'
      },
      {
        id: 'm12_q4',
        subjectId: 'math',
        category: 'មេរៀនទី១២៖ ផលធៀប',
        text: 'សម្រួលផលធៀប 12 : 18 ឲ្យទៅជាផលធៀបសម្រួល ៖',
        options: [ '6 : 9', '4 : 6', '3 : 2', '2 : 3' ],
        correctAnswerIndex: 3,
        explanation: 'ចែកទាំងពីរនឹង 6 ➔ 2 : 3។'
      },
      {
        id: 'm12_q5',
        subjectId: 'math',
        category: 'មេរៀនទី១២៖ ផលធៀប',
        text: 'ឡានមួយបើកបាន 180 km ក្នុងរយៈពេល 3 ម៉ោង។ តើអត្រាល្បឿនមធ្យមស្មើនឹងប៉ុន្មាន km/h?',
        options: [ '60 km/h', '50 km/h', '70 km/h', '54 km/h' ],
        correctAnswerIndex: 0,
        explanation: '180 ÷ 3 = 60 km/h។'
      },
      {
        id: 'm12_q6',
        subjectId: 'math',
        category: 'មេរៀនទី១២៖ ផលធៀប',
        text: 'ទិញផ្លែឈើ 5kg ថ្លៃ 20 000 រៀល។ តើអត្រាតម្លៃ ១kg ស្មើនឹងប៉ុន្មានរៀល?',
        options: [ '3000 រៀល', '4000 រៀល', '5000 រៀល', '2000 រៀល' ],
        correctAnswerIndex: 1,
        explanation: '20 000 / 5 = 4000 រៀល/kg។'
      },
      {
        id: 'm12_q7',
        subjectId: 'math',
        category: 'មេរៀនទី១២៖ ផលធៀប',
        text: 'ចែកប្រាក់ 5600$ ឲ្យមនុស្សពីរនាក់តាមផលធៀប 3 : 4។ តើអ្នកទី១ ទទួលបានប៉ុន្មានដុល្លារ?',
        options: [ '2100$', '3200$', '2400$', '2800$' ],
        correctAnswerIndex: 2,
        explanation: 'ចំនួនភាគសរុប = 3 + 4 = 7 ភាគ ➔ ១ភាគ = 5600 / 7 = 800$ ➔ អ្នកទី១ (3ភាគ) = 3 × 800$ = 2400$។'
      },
      {
        id: 'm12_q8',
        subjectId: 'math',
        category: 'មេរៀនទី១២៖ ផលធៀប',
        text: 'តាមប្រធានខាងលើ តើអ្នកទី២ ទទួលបានប៉ុន្មានដុល្លារ?',
        options: [ '2400$', '2800$', '3500$', '3200$' ],
        correctAnswerIndex: 3,
        explanation: 'អ្នកទី២ (4ភាគ) = 4 × 800$ = 3200$ (2400$ + 3200$ = 5600$)។'
      },
      {
        id: 'm12_q9',
        subjectId: 'math',
        category: 'មេរៀនទី១២៖ ផលធៀប',
        text: 'ដង់ស៊ីតេប្រជាជនជាផលធៀបរវាងអ្វី និងអ្វី?',
        options: [
          'ចំនួនប្រជាជន និងផ្ទៃដី',
          'ផ្ទៃដី និងចំនួនប្រជាជន',
          'ចំនួនប្រជាជន និងអាយុ',
          'ចំនួនប្រជាជន និងចំណូល'
        ],
        correctAnswerIndex: 0,
        explanation: 'ដង់ស៊ីតេប្រជាជន = ចំនួនប្រជាជន ÷ ផ្ទៃដី (គិតជា នាក់/km²)។'
      },
      {
        id: 'm12_q10',
        subjectId: 'math',
        category: 'មេរៀនទី១២៖ ផលធៀប',
        text: 'ខេត្តមួយមានប្រជាជន 500 000 នាក់ និងផ្ទៃដី 10 000 km²។ គណនាដង់ស៊ីតេប្រជាជន ៖',
        options: [ '500 នាក់/km²', '50 នាក់/km²', '5 នាក់/km²', '5000 នាក់/km²' ],
        correctAnswerIndex: 1,
        explanation: '500 000 / 10 000 = 50 នាក់/km²។'
      },
      {
        id: 'm12_q11',
        subjectId: 'math',
        category: 'មេរៀនទី១២៖ ផលធៀប',
        text: 'សម្រួលផលធៀប 0.5 : 1.5 ៖',
        options: [ '1 : 2', '5 : 15', '1 : 3', '2 : 3' ],
        correctAnswerIndex: 2,
        explanation: 'គុណ 10 ➔ 5 : 15 = 1 : 3។'
      },
      {
        id: 'm12_q12',
        subjectId: 'math',
        category: 'មេរៀនទី១២៖ ផលធៀប',
        text: 'សរសេរផលធៀប 1/2 : 1/4 ជាផលធៀបចំនួនគត់សម្រួល ៖',
        options: [ '1 : 2', '4 : 1', '1 : 4', '2 : 1' ],
        correctAnswerIndex: 3,
        explanation: '(1/2) ÷ (1/4) = (1/2) × 4 = 2 ➔ 2 : 1។'
      },
      {
        id: 'm12_q13',
        subjectId: 'math',
        category: 'មេរៀនទី១២៖ ផលធៀប',
        text: 'ផលធៀបសមមូលនឹង 3 : 5 គឺ ៖',
        options: [ 'ត្រូវទាំងអស់', '9 : 15', '12 : 20', '6 : 10' ],
        correctAnswerIndex: 0,
        explanation: 'គុណភាគទាំងពីរនឹង 2, 3, 4 ទទួលបានផលធៀបសមមូលដូចគ្នាទាំងអស់។'
      },
      {
        id: 'm12_q14',
        subjectId: 'math',
        category: 'មេរៀនទី១២៖ ផលធៀប',
        text: 'កម្មករ 3 នាក់ធ្វើការបានប្រាក់ឈ្នួល 90$។ តើប្រាក់ឈ្នួលមធ្យម ១ នាក់ស្មើនឹងប៉ុន្មាន?',
        options: [ '20$', '30$', '45$', '25$' ],
        correctAnswerIndex: 1,
        explanation: '90$ / 3 = 30$/នាក់។'
      },
      {
        id: 'm12_q15',
        subjectId: 'math',
        category: 'មេរៀនទី១២៖ ផលធៀប',
        text: 'ផលធៀប 15 : 45 ស្មើនឹង ៖',
        options: [ '1 : 4', '3 : 1', '1 : 3', '1 : 5' ],
        correctAnswerIndex: 2,
        explanation: 'ចែកនឹង 15 ➔ 1 : 3។'
      },
      {
        id: 'm12_q16',
        subjectId: 'math',
        category: 'មេរៀនទី១២៖ ផលធៀប',
        text: 'បែងចែកដី 1000m² ជាពីរភាគតាមផលធៀប 2 : 3។ រកផ្ទៃដីភាគធំ ៖',
        options: [ '400 m²', '300 m²', '500 m²', '600 m²' ],
        correctAnswerIndex: 3,
        explanation: '2 + 3 = 5 ភាគ ➔ ១ភាគ = 200m² ➔ ភាគធំ (3ភាគ) = 600 m²។'
      },
      {
        id: 'm12_q17',
        subjectId: 'math',
        category: 'មេរៀនទី១២៖ ផលធៀប',
        text: 'តើផលធៀប 8 : 12 និង 10 : 15 ស្មើគ្នាដែរឬទេ?',
        options: [ 'ស្មើគ្នា', 'មិនស្មើគ្នាទេ', 'ស្មើតែពេលបូក', 'មិនអាចប្រៀបធៀបបាន' ],
        correctAnswerIndex: 0,
        explanation: '8/12 = 2/3 និង 10/15 = 2/3 ដូច្នេះវាស្មើគ្នា។'
      },
      {
        id: 'm12_q18',
        subjectId: 'math',
        category: 'មេរៀនទី១២៖ ផលធៀប',
        text: 'ម៉ូតូមួយស៊ីសាំង 2 លីត្រ ជិះបាន 100 km। តើជិះបានប៉ុន្មាន km ក្នុង ១ លីត្រ?',
        options: [ '20 km', '50 km', '40 km', '25 km' ],
        correctAnswerIndex: 1,
        explanation: '100 / 2 = 50 km/លីត្រ។'
      },
      {
        id: 'm12_q19',
        subjectId: 'math',
        category: 'មេរៀនទី១២៖ ផលធៀប',
        text: 'សម្រួលផលធៀប 100 : 250 ៖',
        options: [ '4 : 10', '1 : 2.5', '2 : 5', '2 : 5 ឬ 4 : 10' ],
        correctAnswerIndex: 2,
        explanation: 'ចែកនឹង 50 ➔ 2 : 5 (ទម្រង់សម្រួលបំផុត)។'
      },
      {
        id: 'm12_q20',
        subjectId: 'math',
        category: 'មេរៀនទី១២៖ ផលធៀប',
        text: 'ក្នុងការលាយថ្នាំពណ៌ គេប្រើពណ៌ក្រហម 2 លីត្រ និងពណ៌លឿង 3 លីត្រ។ បើគេប្រើពណ៌ក្រហម 6 លីត្រ តើត្រូវប្រើពណ៌លឿងប៉ុន្មានលីត្រ?',
        options: [ '6 លីត្រ', '8 លីត្រ', '12 លីត្រ', '9 លីត្រ' ],
        correctAnswerIndex: 3,
        explanation: '2 : 3 = 6 : x ➔ 2x = 18 ➔ x = 9 លីត្រ។'
      }
    ]
  },

  // =========================================================================
  // វិញ្ញាសា មេរៀនទី ១៣ ៖ សមាមាត្រ និងមាត្រដ្ឋាន (២០ សំណួរ QCM)
  // =========================================================================
  {
    id: 'math-lesson-13-exam',
    subjectId: 'math',
    title: 'វិញ្ញាសាមេរៀនទី ១៣ ៖ សមាមាត្រ និងមាត្រដ្ឋាន (២០ សំណួរ QCM)',
    description: 'សំណួរ QCM ទាំង ២០ សម្រាប់ការប្រឡងតេស្តសមត្ថភាពមេរៀនទី១៣៖ សមាមាត្រ, លក្ខណៈគ្រឹះសមាមាត្រ, រកតម្លៃអថេរ និងមាត្រដ្ឋានផែនទី',
    durationMinutes: 40,
    totalPoints: 20,
    yearOrType: 'វិញ្ញាសាតាមមេរៀន',
    questions: [
      {
        id: 'm13_q1',
        subjectId: 'math',
        category: 'មេរៀនទី១៣៖ សមាមាត្រ',
        text: 'តើអ្វីជា «សមាមាត្រ»?',
        options: [
          'ជាសមភាពនៃពីរផលធៀប',
          'ជាផលបូកពីរផលធៀប',
          'ជាផលដកពីរផលធៀប',
          'ជាផលគុណពីរផលធៀប'
        ],
        correctAnswerIndex: 0,
        explanation: 'សមាមាត្រគឺជាសមភាពរវាងពីរផលធៀប a/b = c/d (b, d ≠ 0)។'
      },
      {
        id: 'm13_q2',
        subjectId: 'math',
        category: 'មេរៀនទី១៣៖ សមាមាត្រ',
        text: 'តាមលក្ខណៈគ្រឹះនៃសមាមាត្រ a / b = c / d តើសមភាពណាត្រឹមត្រូវ?',
        options: [ 'a × c = b × d', 'a × d = b × c', 'a + d = b + c', 'a / d = b / c' ],
        correctAnswerIndex: 1,
        explanation: 'ផលគុណចុងកាត់ចុង = ផលគុណកណ្តាលកាត់កណ្តាល ➔ a × d = b × c។'
      },
      {
        id: 'm13_q3',
        subjectId: 'math',
        category: 'មេរៀនទី១៣៖ សមាមាត្រ',
        text: 'រកតម្លៃ n ក្នុងសមាមាត្រ n / 21 = 4 / 7 ៖',
        options: [ 'n = 8', 'n = 14', 'n = 12', 'n = 16' ],
        correctAnswerIndex: 2,
        explanation: '7n = 21 × 4 = 84 ➔ n = 84 / 7 = 12។'
      },
      {
        id: 'm13_q4',
        subjectId: 'math',
        category: 'មេរៀនទី១៣៖ សមាមាត្រ',
        text: 'រកតម្លៃ x ក្នុងសមាមាត្រ 3 / 5 = x / 20 ៖',
        options: [ 'x = 10', 'x = 18', 'x = 15', 'x = 12' ],
        correctAnswerIndex: 3,
        explanation: '5x = 3 × 20 = 60 ➔ x = 60 / 5 = 12។'
      },
      {
        id: 'm13_q5',
        subjectId: 'math',
        category: 'មេរៀនទី១៣៖ សមាមាត្រ',
        text: 'ផែនទីមួយមានមាត្រដ្ឋាន 1 : 600 000។ តើវាមានន័យថាយ៉ាងដូចម្តេច?',
        options: [
          '1cm លើផែនទី ស្មើនឹង 600 000cm លើដីពិត',
          '1m លើផែនទី ស្មើ 600m លើដីពិត',
          '1km លើផែនទី ស្មើ 600km លើដីពិត',
          '600cm លើផែនទី ស្មើ 1cm លើដីពិត'
        ],
        correctAnswerIndex: 0,
        explanation: '1cm លើផែនទី តំណាងឲ្យចម្ងាយពិតប្រាកដ 600 000 cm = 6 km។'
      },
      {
        id: 'm13_q6',
        subjectId: 'math',
        category: 'មេរៀនទី១៣៖ សមាមាត្រ',
        text: 'ផែនទីមានមាត្រដ្ឋាន 1 : 600 000។ បើចម្ងាយលើផែនទីរវាងពីរក្រុងគឺ 5cm តើចម្ងាយពិតប្រាកដគឺប៉ុន្មាន km?',
        options: [ '3 km', '30 km', '300 km', '3000 km' ],
        correctAnswerIndex: 1,
        explanation: 'ចម្ងាយពិត = 5cm × 600 000 = 3 000 000 cm = 30 000 m = 30 km។'
      },
      {
        id: 'm13_q7',
        subjectId: 'math',
        category: 'មេរៀនទី១៣៖ សមាមាត្រ',
        text: 'ចម្ងាយពិតរវាងពីរកន្លែងគឺ 15km (1 500 000 cm)។ លើផែនទីមានប្រវែង 3cm។ រកមាត្រដ្ឋានផែនទី៖',
        options: [ '1 : 5 000 000', '1 : 50 000', '1 : 500 000', '1 : 150 000' ],
        correctAnswerIndex: 2,
        explanation: 'មាត្រដ្ឋាន = 3 / 1 500 000 = 1 / 500 000 (ឬ 1 : 500 000)។'
      },
      {
        id: 'm13_q8',
        subjectId: 'math',
        category: 'មេរៀនទី១៣៖ សមាមាត្រ',
        text: 'រកតម្លៃ a ក្នុងសមាមាត្រ 2 / a = 8 / 20 ៖',
        options: [ 'a = 4', 'a = 10', 'a = 6', 'a = 5' ],
        correctAnswerIndex: 3,
        explanation: '8a = 2 × 20 = 40 ➔ a = 40 / 8 = 5។'
      },
      {
        id: 'm13_q9',
        subjectId: 'math',
        category: 'មេរៀនទី១៣៖ សមាមាត្រ',
        text: 'រកតម្លៃ y ក្នុងសមាមាត្រ 5 / 8 = 25 / y ៖',
        options: [ 'y = 40', 'y = 30', 'y = 50', 'y = 35' ],
        correctAnswerIndex: 0,
        explanation: '5y = 8 × 25 = 200 ➔ y = 200 / 5 = 40។'
      },
      {
        id: 'm13_q10',
        subjectId: 'math',
        category: 'មេរៀនទី១៣៖ សមាមាត្រ',
        text: 'ប៊ិក 6 ដើមថ្លៃ 12 000 រៀល។ តើប៊ិក 10 ដើមថ្លៃប៉ុន្មានរៀល?',
        options: [ '18 000 រៀល', '20 000 រៀល', '24 000 រៀល', '15 000 រៀល' ],
        correctAnswerIndex: 1,
        explanation: '6/12000 = 10/x ➔ 6x = 120000 ➔ x = 20 000 រៀល (ឬ ១ដើម 2000រៀល)។'
      },
      {
        id: 'm13_q11',
        subjectId: 'math',
        category: 'មេរៀនទី១៣៖ សមាមាត្រ',
        text: 'ផ្លង់ផ្ទះមួយមានមាត្រដ្ឋាន 1 : 100។ បើបន្ទប់ដេកលើផ្លង់មានបណ្តោយ 5cm តើបណ្តោយពិតប្រាកដស្មើប៉ុន្មានម៉ែត្រ?',
        options: [ '0.5 m', '50 m', '5 m', '500 m' ],
        correctAnswerIndex: 2,
        explanation: '5cm × 100 = 500 cm = 5 m។'
      },
      {
        id: 'm13_q12',
        subjectId: 'math',
        category: 'មេរៀនទី១៣៖ សមាមាត្រ',
        text: 'តើផលធៀបពីរណាបង្កើតបានជាសមាមាត្រ?',
        options: [ '2/5 និង 3/10', '1/2 និង 2/5', '3/4 និង 5/6', '2/3 និង 4/6' ],
        correctAnswerIndex: 3,
        explanation: '2/3 = 4/6 = 2/3 (សមភាពពិត)។'
      },
      {
        id: 'm13_q13',
        subjectId: 'math',
        category: 'មេរៀនទី១៣៖ សមាមាត្រ',
        text: 'រក x ក្នុងសមាមាត្រ x / 10 = 7 / 5 ៖',
        options: [ 'x = 14', 'x = 12', 'x = 35', 'x = 20' ],
        correctAnswerIndex: 0,
        explanation: '5x = 70 ➔ x = 14។'
      },
      {
        id: 'm13_q14',
        subjectId: 'math',
        category: 'មេរៀនទី១៣៖ សមាមាត្រ',
        text: 'កម្មករ 4 នាក់ធ្វើការងារមួយហើយក្នុងរយៈពេល 6 ថ្ងៃ។ បើមានកម្មករ 8 នាក់ (សមាមាត្រច្រាស់) តើធ្វើហើយក្នុងរយៈពេលប៉ុន្មានថ្ងៃ?',
        options: [ '4 ថ្ងៃ', '3 ថ្ងៃ', '12 ថ្ងៃ', '2 ថ្ងៃ' ],
        correctAnswerIndex: 1,
        explanation: 'សមាមាត្រច្រាស់៖ 4 × 6 = 8 × t ➔ 24 = 8t ➔ t = 3 ថ្ងៃ។'
      },
      {
        id: 'm13_q15',
        subjectId: 'math',
        category: 'មេរៀនទី១៣៖ សមាមាត្រ',
        text: 'មាត្រដ្ឋាន 1 : 200 000។ បើចម្ងាយពិត 10km (1 000 000 cm) តើលើផែនទីប្រវែងប៉ុន្មាន cm?',
        options: [ '2 cm', '10 cm', '5 cm', '20 cm' ],
        correctAnswerIndex: 2,
        explanation: '1 000 000 / 200 000 = 5 cm។'
      },
      {
        id: 'm13_q16',
        subjectId: 'math',
        category: 'មេរៀនទី១៣៖ សមាមាត្រ',
        text: 'រក m ក្នុងសមាមាត្រ 9 / m = 3 / 4 ៖',
        options: [ 'm = 16', 'm = 10', 'm = 15', 'm = 12' ],
        correctAnswerIndex: 3,
        explanation: '3m = 9 × 4 = 36 ➔ m = 12។'
      },
      {
        id: 'm13_q17',
        subjectId: 'math',
        category: 'មេរៀនទី១៣៖ សមាមាត្រ',
        text: 'អង្ករ 10 kg ថ្លៃ 40 000 រៀល។ តើប្រាក់ 100 000 រៀលទិញអង្ករបានប៉ុន្មាន kg?',
        options: [ '25 kg', '20 kg', '30 kg', '15 kg' ],
        correctAnswerIndex: 0,
        explanation: '1kg = 4000រៀល ➔ 100 000 / 4000 = 25 kg។'
      },
      {
        id: 'm13_q18',
        subjectId: 'math',
        category: 'មេរៀនទី១៣៖ សមាមាត្រ',
        text: 'ក្នុងសមាមាត្រ a / b = c / d តើតួ a និង d ហៅថាអ្វី?',
        options: [ 'តួកណ្តាល', 'តួចុង', 'ភាគបែង', 'ភាគយក' ],
        correctAnswerIndex: 1,
        explanation: 'a និង d ហៅថា «តួចុង» ហើយ b និង c ហៅថា «តួកណ្តាល»។'
      },
      {
        id: 'm13_q19',
        subjectId: 'math',
        category: 'មេរៀនទី១៣៖ សមាមាត្រ',
        text: 'រក k ក្នុងសមាមាត្រ 0.4 / 2 = k / 10 ៖',
        options: [ 'k = 0.2', 'k = 4', 'k = 2', 'k = 8' ],
        correctAnswerIndex: 2,
        explanation: '2k = 0.4 × 10 = 4 ➔ k = 4 / 2 = 2។'
      },
      {
        id: 'm13_q20',
        subjectId: 'math',
        category: 'មេរៀនទី១៣៖ សមាមាត្រ',
        text: 'បើ 3/4 = x/16 នោះ x ស្មើនឹង ៖',
        options: [ '8', '15', '9', '12' ],
        correctAnswerIndex: 3,
        explanation: '4x = 48 ➔ x = 12។'
      }
    ]
  },

  // =========================================================================
  // វិញ្ញាសា មេរៀនទី ១៤ ៖ ល្បឿន (២០ សំណួរ QCM)
  // =========================================================================
  {
    id: 'math-lesson-14-exam',
    subjectId: 'math',
    title: 'វិញ្ញាសាមេរៀនទី ១៤ ៖ ល្បឿន (២០ សំណួរ QCM)',
    description: 'សំណួរ QCM ទាំង ២០ សម្រាប់ការប្រឡងតេស្តសមត្ថភាពមេរៀនទី១៤៖ ល្បឿនមធ្យម, ចម្ងាយផ្លូវ, រយៈពេល និងល្បឿនរួម',
    durationMinutes: 40,
    totalPoints: 20,
    yearOrType: 'វិញ្ញាសាតាមមេរៀន',
    questions: [
      {
        id: 'm14_q1',
        subjectId: 'math',
        category: 'មេរៀនទី១៤៖ ល្បឿន',
        text: 'រូបមន្តគណនាល្បឿនមធ្យម (V) គឺ ៖',
        options: [ 'V = d / t', 'V = d × t', 'V = t / d', 'V = d + t' ],
        correctAnswerIndex: 0,
        explanation: 'ល្បឿន V = ចម្ងាយ (d) ÷ រយៈពេល (t)។'
      },
      {
        id: 'm14_q2',
        subjectId: 'math',
        category: 'មេរៀនទី១៤៖ ល្បឿន',
        text: 'រូបមន្តគណនាចម្ងាយផ្លូវ (d) គឺ ៖',
        options: [ 'd = V / t', 'd = V × t', 'd = t / V', 'd = V + t' ],
        correctAnswerIndex: 1,
        explanation: 'ចម្ងាយ d = ល្បឿន (V) × រយៈពេល (t)។'
      },
      {
        id: 'm14_q3',
        subjectId: 'math',
        category: 'មេរៀនទី១៤៖ ល្បឿន',
        text: 'រូបមន្តគណនារយៈពេល (t) គឺ ៖',
        options: [ 't = d × V', 't = V / d', 't = d / V', 't = d - V' ],
        correctAnswerIndex: 2,
        explanation: 'រយៈពេល t = ចម្ងាយ (d) ÷ ល្បឿន (V)។'
      },
      {
        id: 'm14_q4',
        subjectId: 'math',
        category: 'មេរៀនទី១៤៖ ល្បឿន',
        text: 'ឡានមួយបើកបរបានចម្ងាយ 180 km ក្នុងរយៈពេល 3 ម៉ោង។ គណនាល្បឿនមធ្យម ៖',
        options: [ '50 km/h', '540 km/h', '70 km/h', '60 km/h' ],
        correctAnswerIndex: 3,
        explanation: 'V = 180 / 3 = 60 km/h។'
      },
      {
        id: 'm14_q5',
        subjectId: 'math',
        category: 'មេរៀនទី១៤៖ ល្បឿន',
        text: 'ម៉ូតូមួយបើកបរដោយល្បឿន 45 km/h ក្នុងរយៈពេល 2.5 ម៉ោង (2h 30mn)។ គណនាចម្ងាយចរ ៖',
        options: [ '112.5 km', '90 km', '100 km', '110 km' ],
        correctAnswerIndex: 0,
        explanation: 'd = V × t = 45 × 2.5 = 112.5 km។'
      },
      {
        id: 'm14_q6',
        subjectId: 'math',
        category: 'មេរៀនទី១៤៖ ល្បឿន',
        text: 'អ្នករត់ប្រណាំងម្នាក់រត់បានចម្ងាយ 400m ក្នុងរយៈពេល 50 វិនាទី (s)។ គណនាល្បឿនជា m/s ៖',
        options: [ '6 m/s', '8 m/s', '10 m/s', '12 m/s' ],
        correctAnswerIndex: 1,
        explanation: 'V = 400 / 50 = 8 m/s។'
      },
      {
        id: 'm14_q7',
        subjectId: 'math',
        category: 'មេរៀនទី១៤៖ ល្បឿន',
        text: 'រថភ្លើងមួយបើកបរដោយល្បឿន 80 km/h ចម្ងាយ 240 km។ តើប្រើរយៈពេលប៉ុន្មានម៉ោង?',
        options: [ '2 ម៉ោង', '4 ម៉ោង', '3 ម៉ោង', '2.5 ម៉ោង' ],
        correctAnswerIndex: 2,
        explanation: 't = d / V = 240 / 80 = 3 ម៉ោង។'
      },
      {
        id: 'm14_q8',
        subjectId: 'math',
        category: 'មេរៀនទី១៤៖ ល្បឿន',
        text: 'បំប្លែងរយៈពេល 2.5 ម៉ោង ជាម៉ោង និងនាទី ៖',
        options: [ '2 ម៉ោង 5 នាទី', '2 ម៉ោង 50 នាទី', '2 ម៉ោង 25 នាទី', '2 ម៉ោង 30 នាទី' ],
        correctAnswerIndex: 3,
        explanation: '0.5 ម៉ោង = 0.5 × 60 = 30 នាទី ➔ 2 ម៉ោង 30 នាទី។'
      },
      {
        id: 'm14_q9',
        subjectId: 'math',
        category: 'មេរៀនទី១៤៖ ល្បឿន',
        text: 'បំប្លែងរយៈពេល 1 ម៉ោង 15 នាទី ជាម៉ោងទសភាគ ៖',
        options: [ '1.25 ម៉ោង', '1.15 ម៉ោង', '1.5 ម៉ោង', '1.75 ម៉ោង' ],
        correctAnswerIndex: 0,
        explanation: '15 / 60 = 0.25 ម៉ោង ➔ 1 + 0.25 = 1.25 ម៉ោង។'
      },
      {
        id: 'm14_q10',
        subjectId: 'math',
        category: 'មេរៀនទី១៤៖ ល្បឿន',
        text: 'អ្នកជិះកង់ A ចេញពីក្រុង A ទៅ B ល្បឿន 12 km/h។ អ្នកជិះម៉ូតូ B ចេញពី B ទៅ A ល្បឿន 30 km/h (ទិសដៅផ្ទុយគ្នា)។ ចម្ងាយ AB = 84 km។ រកល្បឿនរួម ៖',
        options: [ '18 km/h', '42 km/h', '360 km/h', '24 km/h' ],
        correctAnswerIndex: 1,
        explanation: 'ល្បឿនរួម = 12 + 30 = 42 km/h។'
      },
      {
        id: 'm14_q11',
        subjectId: 'math',
        category: 'មេរៀនទី១៤៖ ល្បឿន',
        text: 'តាមប្រធានខាងលើ តើរយៈពេលប៉ុន្មានម៉ោងទើបអ្នកទាំងពីរជួបគ្នា?',
        options: [ '1.5 ម៉ោង', '2.5 ម៉ោង', '2 ម៉ោង', '3 ម៉ោង' ],
        correctAnswerIndex: 2,
        explanation: 't = ចម្ងាយ / ល្បឿនរួម = 84 / 42 = 2 ម៉ោង។'
      },
      {
        id: 'm14_q12',
        subjectId: 'math',
        category: 'មេរៀនទី១៤៖ ល្បឿន',
        text: 'ឡានមួយចេញដំណើរម៉ោង 7:00 ហើយទៅដល់គោលដៅម៉ោង 10:30។ រយៈពេលធ្វើដំណើរ t = ?',
        options: [ '3 ម៉ោង', '3 ម៉ោង 50 នាទី', '4 ម៉ោង', '3 ម៉ោង 30 នាទី' ],
        correctAnswerIndex: 3,
        explanation: '10:30 - 7:00 = 3 ម៉ោង 30 នាទី (3.5 ម៉ោង)។'
      },
      {
        id: 'm14_q13',
        subjectId: 'math',
        category: 'មេរៀនទី១៤៖ ល្បឿន',
        text: 'តាមប្រធានខាងលើ បើចម្ងាយផ្លូវគឺ 210 km គណនាល្បឿនមធ្យម ៖',
        options: [ '60 km/h', '50 km/h', '70 km/h', '65 km/h' ],
        correctAnswerIndex: 0,
        explanation: 'V = 210 / 3.5 = 60 km/h។'
      },
      {
        id: 'm14_q14',
        subjectId: 'math',
        category: 'មេរៀនទី១៤៖ ល្បឿន',
        text: 'បំប្លែងល្បឿន 36 km/h ទៅជា m/s ៖',
        options: [ '100 m/s', '10 m/s', '3.6 m/s', '360 m/s' ],
        correctAnswerIndex: 1,
        explanation: '36 km/h = (36 × 1000m) / 3600s = 36000 / 3600 = 10 m/s។'
      },
      {
        id: 'm14_q15',
        subjectId: 'math',
        category: 'មេរៀនទី១៤៖ ល្បឿន',
        text: 'កុមារម្នាក់ដើរដោយល្បឿន 4 km/h ក្នុងរយៈពេល 45 នាទី (0.75h)។ គណនាចម្ងាយដើរបាន ៖',
        options: [ '2 km', '3.5 km', '3 km', '4 km' ],
        correctAnswerIndex: 2,
        explanation: 'd = 4 × 0.75 = 3 km (ឬ 4 × 45/60 = 3 km)។'
      },
      {
        id: 'm14_q16',
        subjectId: 'math',
        category: 'មេរៀនទី១៤៖ ល្បឿន',
        text: 'ឡាន A ដេញតាមឡាន B ក្នុងទិសដៅស្របគ្នា។ ឡាន A ល្បឿន 70km/h, ឡាន B ល្បឿន 50km/h. ល្បឿនខុសគ្នា (ល្បឿនខិតជិត) ស្មើ ៖',
        options: [ '120 km/h', '35 km/h', '3500 km/h', '20 km/h' ],
        correctAnswerIndex: 3,
        explanation: 'ល្បឿនខិតជិត = 70 - 50 = 20 km/h។'
      },
      {
        id: 'm14_q17',
        subjectId: 'math',
        category: 'មេរៀនទី១៤៖ ល្បឿន',
        text: 'បើឡាន B នៅមុខឡាន A ចម្ងាយ 40 km តើឡាន A ប្រើពេលប៉ុន្មានម៉ោងទើបដេញទាន់ឡាន B?',
        options: [ '2 ម៉ោង', '1 ម៉ោង', '3 ម៉ោង', '4 ម៉ោង' ],
        correctAnswerIndex: 0,
        explanation: 't = 40 / (70 - 50) = 40 / 20 = 2 ម៉ោង។'
      },
      {
        id: 'm14_q18',
        subjectId: 'math',
        category: 'មេរៀនទី១៤៖ ល្បឿន',
        text: 'ឯកតាល្បឿនផ្លូវការក្នុងប្រព័ន្ធអន្តរជាតិ (SI) គឺ ៖',
        options: [ 'km/h', 'm/s', 'cm/s', 'm/mn' ],
        correctAnswerIndex: 1,
        explanation: 'ឯកតាផ្លូវការ SI នៃល្បឿនគឺ ម៉ែត្រក្នុងមួយវិនាទី (m/s)។'
      },
      {
        id: 'm14_q19',
        subjectId: 'math',
        category: 'មេរៀនទី១៤៖ ល្បឿន',
        text: 'អូប័រមួយបើកបានចម្ងាយ 90 km ប្រើពេល 1 ម៉ោង 30 នាទី (1.5h)។ គណនាល្បឿន ៖',
        options: [ '45 km/h', '75 km/h', '60 km/h', '90 km/h' ],
        correctAnswerIndex: 2,
        explanation: 'V = 90 / 1.5 = 60 km/h។'
      },
      {
        id: 'm14_q20',
        subjectId: 'math',
        category: 'មេរៀនទី១៤៖ ល្បឿន',
        text: 'ជិះកង់ល្បឿន 15 km/h ប្រើពេល 20 នាទី (1/3 ម៉ោង)។ គណនាចម្ងាយ ៖',
        options: [ '3 km', '10 km', '7.5 km', '5 km' ],
        correctAnswerIndex: 3,
        explanation: 'd = 15 × (20/60) = 15 × (1/3) = 5 km។'
      }
    ]
  },

  // =========================================================================
  // វិញ្ញាសា មេរៀនទី ១៥ ៖ ប្រមាណវិធីលើចំនួនចម្រុះ (២០ សំណួរ QCM)
  // =========================================================================
  {
    id: 'math-lesson-15-exam',
    subjectId: 'math',
    title: 'វិញ្ញាសាមេរៀនទី ១៥ ៖ ប្រមាណវិធីលើចំនួនចម្រុះ (២០ សំណួរ QCM)',
    description: 'សំណួរ QCM ទាំង ២០ សម្រាប់ការប្រឡងតេស្តសមត្ថភាពមេរៀនទី១៥៖ ការបំប្លែងចំនួនចម្រុះ, វិធីបូក, វិធីដក, វិធីគុណ និងវិធីចែកចំនួនចម្រុះ',
    durationMinutes: 40,
    totalPoints: 20,
    yearOrType: 'វិញ្ញាសាតាមមេរៀន',
    questions: [
      {
        id: 'm15_q1',
        subjectId: 'math',
        category: 'មេរៀនទី១៥៖ ចំនួនចម្រុះ',
        text: 'បំប្លែងចំនួនចម្រុះ 3 (1/2) ទៅជាប្រភាគមិនតម្រូវ ៖',
        options: [ '7/2', '5/2', '6/2', '4/2' ],
        correctAnswerIndex: 0,
        explanation: '3 1/2 = (3 × 2 + 1) / 2 = 7/2។'
      },
      {
        id: 'm15_q2',
        subjectId: 'math',
        category: 'មេរៀនទី១៥៖ ចំនួនចម្រុះ',
        text: 'បំប្លែងប្រភាគមិនតម្រូវ 11/4 ទៅជាចំនួនចម្រុះ ៖',
        options: [ '2', '2', '3', '2' ],
        correctAnswerIndex: 1,
        explanation: '11 ÷ 4 = 2 សល់ 3 ➔ 2 3/4។'
      },
      {
        id: 'm15_q3',
        subjectId: 'math',
        category: 'មេរៀនទី១៥៖ ចំនួនចម្រុះ',
        text: 'គណនាផលបូកចំនួនចម្រុះ 6 (3/4) + 5 (2/4) = ?',
        options: [ '11', '11', '12', '12' ],
        correctAnswerIndex: 2,
        explanation: '(6 + 5) + (3/4 + 2/4) = 11 + 5/4 = 11 + 1 1/4 = 12 1/4។'
      },
      {
        id: 'm15_q4',
        subjectId: 'math',
        category: 'មេរៀនទី១៥៖ ចំនួនចម្រុះ',
        text: 'គណនាផលបូក 2 (1/3) + 4 (1/2) = ?',
        options: [ '6', '7', '6', '6' ],
        correctAnswerIndex: 3,
        explanation: '2 + 4 = 6; 1/3 + 1/2 = 2/6 + 3/6 = 5/6 ➔ 6 5/6។'
      },
      {
        id: 'm15_q5',
        subjectId: 'math',
        category: 'មេរៀនទី១៥៖ ចំនួនចម្រុះ',
        text: 'គណនាផលដក 5 (3/4) - 2 (1/4) = ?',
        options: [ '3 ឬ 3', '3', '3', '2' ],
        correctAnswerIndex: 0,
        explanation: '(5 - 2) + (3/4 - 1/4) = 3 + 2/4 = 3 1/2។'
      },
      {
        id: 'm15_q6',
        subjectId: 'math',
        category: 'មេរៀនទី១៥៖ ចំនួនចម្រុះ',
        text: 'គណនាផលដក 4 (1/3) - 1 (1/2) = ?',
        options: [ '3', '2', '2', '3' ],
        correctAnswerIndex: 1,
        explanation: '13/3 - 3/2 = 26/6 - 9/6 = 17/6 = 2 5/6។'
      },
      {
        id: 'm15_q7',
        subjectId: 'math',
        category: 'មេរៀនទី១៥៖ ចំនួនចម្រុះ',
        text: 'គណនាផលគុណ 2 (1/2) × 1 (1/3) = ?',
        options: [ '2', '3', '3 ឬ 10/3', '2' ],
        correctAnswerIndex: 2,
        explanation: '(5/2) × (4/3) = 20/6 = 10/3 = 3 1/3។'
      },
      {
        id: 'm15_q8',
        subjectId: 'math',
        category: 'មេរៀនទី១៥៖ ចំនួនចម្រុះ',
        text: 'គណនាផលចែក 3 (1/2) ÷ 1 (3/4) = ?',
        options: [ '1', '1.5', '3', '2' ],
        correctAnswerIndex: 3,
        explanation: '(7/2) ÷ (7/4) = (7/2) × (4/7) = 28/14 = 2។'
      },
      {
        id: 'm15_q9',
        subjectId: 'math',
        category: 'មេរៀនទី១៥៖ ចំនួនចម្រុះ',
        text: 'បំប្លែង 5 (2/5) ទៅជាប្រភាគមិនតម្រូវ ៖',
        options: [ '27/5', '25/5', '10/5', '22/5' ],
        correctAnswerIndex: 0,
        explanation: '(5 × 5 + 2) / 5 = 27/5។'
      },
      {
        id: 'm15_q10',
        subjectId: 'math',
        category: 'មេរៀនទី១៥៖ ចំនួនចម្រុះ',
        text: 'បំប្លែង 17/5 ទៅជាចំនួនចម្រុះ ៖',
        options: [ '3', '3', '2', '3' ],
        correctAnswerIndex: 1,
        explanation: '17 ÷ 5 = 3 សល់ 2 ➔ 3 2/5។'
      },
      {
        id: 'm15_q11',
        subjectId: 'math',
        category: 'មេរៀនទី១៥៖ ចំនួនចម្រុះ',
        text: 'គណនា 1 (1/2) + 2 (1/4) + 3 (1/8) = ?',
        options: [ '6', '6', '6', '7' ],
        correctAnswerIndex: 2,
        explanation: '(1+2+3) + (4/8 + 2/8 + 1/8) = 6 7/8។'
      },
      {
        id: 'm15_q12',
        subjectId: 'math',
        category: 'មេរៀនទី១៥៖ ចំនួនចម្រុះ',
        text: 'គណនា 5 - 2 (1/3) = ?',
        options: [ '3', '3', '2', '2' ],
        correctAnswerIndex: 3,
        explanation: '4 (3/3) - 2 (1/3) = 2 2/3 (ឬ 15/3 - 7/3 = 8/3 = 2 2/3)។'
      },
      {
        id: 'm15_q13',
        subjectId: 'math',
        category: 'មេរៀនទី១៥៖ ចំនួនចម្រុះ',
        text: 'គណនា 4 × 1 (1/2) = ?',
        options: [ '6', '4', '5', '8' ],
        correctAnswerIndex: 0,
        explanation: '4 × (3/2) = 12/2 = 6។'
      },
      {
        id: 'm15_q14',
        subjectId: 'math',
        category: 'មេរៀនទី១៥៖ ចំនួនចម្រុះ',
        text: 'គណនា 6 ÷ 1 (1/2) = ?',
        options: [ '3', '4', '9', '2' ],
        correctAnswerIndex: 1,
        explanation: '6 ÷ (3/2) = 6 × (2/3) = 12/3 = 4។'
      },
      {
        id: 'm15_q15',
        subjectId: 'math',
        category: 'មេរៀនទី១៥៖ ចំនួនចម្រុះ',
        text: 'ចតុកោណកែងមួយមានបណ្តោយ 4 (1/2) m និងទទឹង 2 (1/3) m។ គណនាបរិមាត្រ ៖',
        options: [ '13 m', '6 m', '13 m', '14 m' ],
        correctAnswerIndex: 2,
        explanation: 'P = [4 1/2 + 2 1/3] × 2 = [6 + (3/6+2/6)] × 2 = [6 5/6] × 2 = 41/6 × 2 = 82/6 = 13 4/6 = 13 2/3 m។'
      },
      {
        id: 'm15_q16',
        subjectId: 'math',
        category: 'មេរៀនទី១៥៖ ចំនួនចម្រុះ',
        text: 'តាមប្រធានខាងលើ គណនាផ្ទៃក្រឡាជា m² ៖',
        options: [ '9 m²', '8 m²', '10 m²', '10 m²' ],
        correctAnswerIndex: 3,
        explanation: 'S = (9/2) × (7/3) = 63/6 = 21/2 = 10 1/2 m²។'
      },
      {
        id: 'm15_q17',
        subjectId: 'math',
        category: 'មេរៀនទី១៥៖ ចំនួនចម្រុះ',
        text: 'ប្រភាគ 23/4 ស្មើនឹងចំនួនទសភាគណា?',
        options: [ '5.75', '5.25', '5.5', '5.35' ],
        correctAnswerIndex: 0,
        explanation: '23 ÷ 4 = 5.75 (ឬ 5 3/4 = 5.75)។'
      },
      {
        id: 'm15_q18',
        subjectId: 'math',
        category: 'មេរៀនទី១៥៖ ចំនួនចម្រុះ',
        text: 'ចំនួនទសភាគ 3.5 សរសេរជាចំនួនចម្រុះ ៖',
        options: [ '3', 'ត្រូវទាំង A និង C', '3 ឬ 3', '3' ],
        correctAnswerIndex: 1,
        explanation: '3.5 = 3 5/10 = 3 1/2។'
      },
      {
        id: 'm15_q19',
        subjectId: 'math',
        category: 'មេរៀនទី១៥៖ ចំនួនចម្រុះ',
        text: 'គណនា 2 (3/4) + 1 (1/2) - 1 (1/4) = ?',
        options: [ '3', '3', '3', '2' ],
        correctAnswerIndex: 2,
        explanation: '11/4 + 6/4 - 5/4 = 12/4 = 3។'
      },
      {
        id: 'm15_q20',
        subjectId: 'math',
        category: 'មេរៀនទី១៥៖ ចំនួនចម្រុះ',
        text: 'ដើម្បីគុណ ឬចែកចំនួនចម្រុះ តើជំហានដំបូងត្រូវធ្វើយ៉ាងណា?',
        options: [
          'តម្រូវភាគបែង',
          'គុណផ្នែកគត់នឹងផ្នែកគត់',
          'គុណភាគយកនឹងភាគយក',
          'បំប្លែងចំនួនចម្រុះទៅជាប្រភាគមិនតម្រូវជាមុនសិន'
        ],
        correctAnswerIndex: 3,
        explanation: 'ត្រូវបំប្លែងចំនួនចម្រុះទៅជាប្រភាគមិនតម្រូវជាមុនសិន ទើបធ្វើវិធីគុណឬចែកតាមធម្មតា។'
      }
    ]
  }
];
