import { ExamPaper } from '../../types';

export const LESSONS_6_TO_10_EXAMS: ExamPaper[] = [
  // =========================================================================
  // វិញ្ញាសា មេរៀនទី ៦ ៖ បរិមាត្រ (២០ សំណួរ QCM)
  // =========================================================================
  {
    id: 'math-lesson-6-exam',
    subjectId: 'math',
    title: 'វិញ្ញាសាមេរៀនទី ៦ ៖ បរិមាត្រ (២០ សំណួរ QCM)',
    description: 'សំណួរ QCM ទាំង ២០ សម្រាប់ការប្រឡងតេស្តសមត្ថភាពមេរៀនទី៦៖ បរិមាត្ររាងធរណីមាត្រផ្សេងៗ, បរិមាត្ររង្វង់ និងកង់បររត់',
    durationMinutes: 40,
    totalPoints: 20,
    yearOrType: 'វិញ្ញាសាតាមមេរៀន',
    questions: [
      {
        id: 'm6_q1',
        subjectId: 'math',
        category: 'មេរៀនទី៦៖ បរិមាត្រ',
        text: 'រូបមន្តបរិមាត្រចតុកោណកែង (P) គឺ៖',
        options: [ 'P = × 2', 'P = a × b', 'P = 4 × a', 'P = a + b + c' ],
        correctAnswerIndex: 0,
        explanation: 'បរិមាត្រចតុកោណកែង P = (បណ្តោយ + ទទឹង) × 2 ឬ P = (a + b) × 2។'
      },
      {
        id: 'm6_q2',
        subjectId: 'math',
        category: 'មេរៀនទី៦៖ បរិមាត្រ',
        text: 'ដីមួយកន្លែងមានរាងចតុកោណកែង ដែលមានបណ្តោយ 25m និងទទឹង 15m។ គណនាបរិមាត្រដីនោះ៖',
        options: [ '40 m', '80 m', '375 m', '100 m' ],
        correctAnswerIndex: 1,
        explanation: 'P = (25 + 15) × 2 = 40 × 2 = 80 m។'
      },
      {
        id: 'm6_q3',
        subjectId: 'math',
        category: 'មេរៀនទី៦៖ បរិមាត្រ',
        text: 'រូបមន្តបរិមាត្រការេ (P) ដែលមានជ្រុង a គឺ៖',
        options: [ 'P = a²', 'P = 2 × a', 'P = 4 × a', 'P = a / 4' ],
        correctAnswerIndex: 2,
        explanation: 'បរិមាត្រការេ P = 4 × a (ផលបូកជ្រុងទាំង 4 ស្មើគ្នា)។'
      },
      {
        id: 'm6_q4',
        subjectId: 'math',
        category: 'មេរៀនទី៦៖ បរិមាត្រ',
        text: 'តុមួយមានរាងជាការេដែលមានជ្រុង 1.2m។ គណនាបរិមាត្រតុនោះ៖',
        options: [ '2.4 m', '3.6 m', '1.44 m', '4.8 m' ],
        correctAnswerIndex: 3,
        explanation: 'P = 4 × 1.2m = 4.8 m។'
      },
      {
        id: 'm6_q5',
        subjectId: 'math',
        category: 'មេរៀនទី៦៖ បរិមាត្រ',
        text: 'រូបមន្តបរិមាត្ររង្វង់ (P) តាមអង្កត់ផ្ចិត D គឺ៖ (ដោយ π ≈ 3.14)',
        options: [ 'P = π × D', 'P = 2 × π × D', 'P = π × D²', 'P = D / π' ],
        correctAnswerIndex: 0,
        explanation: 'បរិមាត្ររង្វង់ P = π × D ឬ P = 2 × π × R។'
      },
      {
        id: 'm6_q6',
        subjectId: 'math',
        category: 'មេរៀនទី៦៖ បរិមាត្រ',
        text: 'រង្វង់មួយមានអង្កត់ផ្ចិត D = 10 cm (យក π ≈ 3.14)។ គណនាបរិមាត្ររង្វង់នោះ៖',
        options: [ '15.7 cm', '31.4 cm', '62.8 cm', '78.5 cm' ],
        correctAnswerIndex: 1,
        explanation: 'P = π × D = 3.14 × 10 = 31.4 cm។'
      },
      {
        id: 'm6_q7',
        subjectId: 'math',
        category: 'មេរៀនទី៦៖ បរិមាត្រ',
        text: 'រង្វង់មួយមានកាំ R = 5 cm (យក π ≈ 3.14)។ គណនាបរិមាត្ររង្វង់នោះ៖',
        options: [ '15.7 cm', '62.8 cm', '31.4 cm', '25 cm' ],
        correctAnswerIndex: 2,
        explanation: 'P = 2 × π × R = 2 × 3.14 × 5 = 31.4 cm។'
      },
      {
        id: 'm6_q8',
        subjectId: 'math',
        category: 'មេរៀនទី៦៖ បរិមាត្រ',
        text: 'កង់ឡានមួយមានអង្កត់ផ្ចិត D = 0.7m (យក π ≈ 3.14)។ តើកង់នោះវិលបាន ១ ជុំ បើកបរបានចម្ងាយប៉ុន្មានម៉ែត្រ?',
        options: [ '1.1 m', '3.14 m', '4.396 m', '2.198 m' ],
        correctAnswerIndex: 3,
        explanation: 'ចម្ងាយ ១ ជុំ = បរិមាត្រកង់ P = 3.14 × 0.7m = 2.198 m។'
      },
      {
        id: 'm6_q9',
        subjectId: 'math',
        category: 'មេរៀនទី៦៖ បរិមាត្រ',
        text: 'តាមប្រធានខាងលើ បើកង់ឡាននោះវិលបាន 100 ជុំ តើវាបើកបរបានចម្ងាយប៉ុន្មានម៉ែត្រ?',
        options: [ '219.8 m', '21.98 m', '2198 m', '21980 m' ],
        correctAnswerIndex: 0,
        explanation: 'ចម្ងាយ = 2.198m × 100 = 219.8 m។'
      },
      {
        id: 'm6_q10',
        subjectId: 'math',
        category: 'មេរៀនទី៦៖ បរិមាត្រ',
        text: 'ត្រីកោណមួយមានជ្រុងទាំងបីស្មើនឹង 6cm, 8cm, 10cm។ គណនាបរិមាត្រត្រីកោណនោះ៖',
        options: [ '48 cm', '24 cm', '14 cm', '18 cm' ],
        correctAnswerIndex: 1,
        explanation: 'P = 6 + 8 + 10 = 24 cm។'
      },
      {
        id: 'm6_q11',
        subjectId: 'math',
        category: 'មេរៀនទី៦៖ បរិមាត្រ',
        text: 'ត្រីកោណសម័ង្សមួយមានបរិមាត្រ 36cm។ តើជ្រុងនីមួយៗមានប្រវែងប៉ុន្មាន cm?',
        options: [ '6 cm', '9 cm', '12 cm', '18 cm' ],
        correctAnswerIndex: 2,
        explanation: 'ត្រីកោណសម័ង្សមានជ្រុង 3 ស្មើគ្នា ➔ a = 36 / 3 = 12 cm។'
      },
      {
        id: 'm6_q12',
        subjectId: 'math',
        category: 'មេរៀនទី៦៖ បរិមាត្រ',
        text: 'ចតុកោណស្មើ (រុំ) មួយមានជ្រុង a = 7.5cm។ គណនាបរិមាត្រចតុកោណស្មើនោះ៖',
        options: [ '15 cm', '56.25 cm', '22.5 cm', '30 cm' ],
        correctAnswerIndex: 3,
        explanation: 'P = 4 × a = 4 × 7.5 = 30 cm។'
      },
      {
        id: 'm6_q13',
        subjectId: 'math',
        category: 'មេរៀនទី៦៖ បរិមាត្រ',
        text: 'ចតុកោណពាយមួយមានជ្រុងទាំងបួនប្រវែង 5cm, 7cm, 8cm, 10cm។ គណនាបរិមាត្រចតុកោណពាយនោះ៖',
        options: [ '30 cm', '28 cm', '35 cm', '25 cm' ],
        correctAnswerIndex: 0,
        explanation: 'P = 5 + 7 + 8 + 10 = 30 cm។'
      },
      {
        id: 'm6_q14',
        subjectId: 'math',
        category: 'មេរៀនទី៦៖ បរិមាត្រ',
        text: 'រង្វង់មួយមានបរិមាត្រ P = 62.8 cm (យក π ≈ 3.14)។ គណនាប្រវែងអង្កត់ផ្ចិត D ៖',
        options: [ '10 cm', '20 cm', '30 cm', '40 cm' ],
        correctAnswerIndex: 1,
        explanation: 'D = P / π = 62.8 / 3.14 = 20 cm។'
      },
      {
        id: 'm6_q15',
        subjectId: 'math',
        category: 'មេរៀនទី៦៖ បរិមាត្រ',
        text: 'តាមប្រធានខាងលើ តើកាំ R នៃរង្វង់នោះស្មើនឹងប៉ុន្មាន cm?',
        options: [ '5 cm', '15 cm', '10 cm', '20 cm' ],
        correctAnswerIndex: 2,
        explanation: 'R = D / 2 = 20 / 2 = 10 cm។'
      },
      {
        id: 'm6_q16',
        subjectId: 'math',
        category: 'មេរៀនទី៦៖ បរិមាត្រ',
        text: 'ដីស្រែការេមួយមានបរិមាត្រ 160m។ តើជ្រុងដីស្រែនោះមានប្រវែងប៉ុន្មានម៉ែត្រ?',
        options: [ '20 m', '400 m', '80 m', '40 m' ],
        correctAnswerIndex: 3,
        explanation: 'a = P / 4 = 160 / 4 = 40 m។'
      },
      {
        id: 'm6_q17',
        subjectId: 'math',
        category: 'មេរៀនទី៦៖ បរិមាត្រ',
        text: 'ដីចតុកោណកែងមួយមានបរិមាត្រ 120m និងបណ្តោយ 40m។ តើទទឹងដីនោះមានប្រវែងប៉ុន្មានម៉ែត្រ?',
        options: [ '20 m', '30 m', '40 m', '10 m' ],
        correctAnswerIndex: 0,
        explanation: 'កន្លះបរិមាត្រ = 120 / 2 = 60m ➔ ទទឹង = 60 - 40 = 20 m។'
      },
      {
        id: 'm6_q18',
        subjectId: 'math',
        category: 'មេរៀនទី៦៖ បរិមាត្រ',
        text: 'ពហុកោណនិយ័តមាន ៦ ជ្រុងស្មើគ្នា (ឆកោណនិយ័ត) ដែលជ្រុងនីមួយៗប្រវែង 8cm។ គណនាបរិមាត្រ៖',
        options: [ '24 cm', '48 cm', '36 cm', '64 cm' ],
        correctAnswerIndex: 1,
        explanation: 'P = 6 × 8 = 48 cm។'
      },
      {
        id: 'm6_q19',
        subjectId: 'math',
        category: 'មេរៀនទី៦៖ បរិមាត្រ',
        text: 'កង់កុមារមួយមានកាំ R = 20 cm (យក π ≈ 3.14)។ គណនាបរិមាត្រកង់៖',
        options: [ '62.8 cm', '314 cm', '125.6 cm', '200 cm' ],
        correctAnswerIndex: 2,
        explanation: 'P = 2 × 3.14 × 20 = 125.6 cm។'
      },
      {
        id: 'm6_q20',
        subjectId: 'math',
        category: 'មេរៀនទី៦៖ បរិមាត្រ',
        text: 'កង់ដែលមានបរិមាត្រ 125.6 cm វិលបាន 500 ជុំ។ តើវាជិះបានចម្ងាយប៉ុន្មានម៉ែត្រ (m)?',
        options: [ '62800 m', '6280 m', '62.8 m', '628 m' ],
        correctAnswerIndex: 3,
        explanation: 'ចម្ងាយ = 125.6cm × 500 = 62 800 cm = 628 m។'
      }
    ]
  },

  // =========================================================================
  // វិញ្ញាសា មេរៀនទី ៧ ៖ ផ្ទៃក្រឡា និងឯកតាផ្ទៃដី (២០ សំណួរ QCM)
  // =========================================================================
  {
    id: 'math-lesson-7-exam',
    subjectId: 'math',
    title: 'វិញ្ញាសាមេរៀនទី ៧ ៖ ផ្ទៃក្រឡា និងឯកតាផ្ទៃដី (២០ សំណួរ QCM)',
    description: 'សំណួរ QCM ទាំង ២០ សម្រាប់ការប្រឡងតេស្តសមត្ថភាពមេរៀនទី៧៖ ផ្ទៃក្រឡារូបផ្សេងៗ, រង្វង់, ចតុកោណពាយ និងការបំប្លែងឯកតាផ្ទៃដី',
    durationMinutes: 40,
    totalPoints: 20,
    yearOrType: 'វិញ្ញាសាតាមមេរៀន',
    questions: [
      {
        id: 'm7_q1',
        subjectId: 'math',
        category: 'មេរៀនទី៧៖ ផ្ទៃក្រឡា',
        text: 'រូបមន្តផ្ទៃក្រឡាចតុកោណកែង (S) គឺ៖',
        options: [ 'S = a × b', 'S = × 2', 'S = a²', 'S = / 2' ],
        correctAnswerIndex: 0,
        explanation: 'S = បណ្តោយ × ទទឹង (a × b)។'
      },
      {
        id: 'm7_q2',
        subjectId: 'math',
        category: 'មេរៀនទី៧៖ ផ្ទៃក្រឡា',
        text: 'ដីស្រែចតុកោណកែងមួយមានបណ្តោយ 40m និងទទឹង 25m។ គណនាផ្ទៃក្រឡាដីស្រែនោះ៖',
        options: [ '130 m²', '1000 m²', '500 m²', '65 m²' ],
        correctAnswerIndex: 1,
        explanation: 'S = 40m × 25m = 1000 m²។'
      },
      {
        id: 'm7_q3',
        subjectId: 'math',
        category: 'មេរៀនទី៧៖ ផ្ទៃក្រឡា',
        text: 'រូបមន្តផ្ទៃក្រឡាត្រីកោណ (S) ដែលមានបាត b និងកម្ពស់ h គឺ៖',
        options: [ 'S = b × h', 'S = / 2', 'S = / 2', 'S = b² × h' ],
        correctAnswerIndex: 2,
        explanation: 'ផ្ទៃក្រឡាត្រីកោណ S = (បាត × កម្ពស់) / 2។'
      },
      {
        id: 'm7_q4',
        subjectId: 'math',
        category: 'មេរៀនទី៧៖ ផ្ទៃក្រឡា',
        text: 'ត្រីកោណមួយមានបាតប្រវែង 12cm និងកម្ពស់ 8cm។ គណនាផ្ទៃក្រឡាត្រីកោណនោះ៖',
        options: [ '96 cm²', '20 cm²', '24 cm²', '48 cm²' ],
        correctAnswerIndex: 3,
        explanation: 'S = (12 × 8) / 2 = 96 / 2 = 48 cm²។'
      },
      {
        id: 'm7_q5',
        subjectId: 'math',
        category: 'មេរៀនទី៧៖ ផ្ទៃក្រឡា',
        text: 'រូបមន្តផ្ទៃក្រឡាចតុកោណពាយ (S) ដែលមានបាតតូច a, បាតធំ b និងកម្ពស់ h គឺ៖',
        options: [
          'S = [(a + b) × h] / 2',
          'S = (a + b) × h',
          'S = (a × b × h) / 2',
          'S = (a + b + h) / 2'
        ],
        correctAnswerIndex: 0,
        explanation: 'ផ្ទៃក្រឡាចតុកោណពាយ S = [(បាតតូច + បាតធំ) × កម្ពស់] / 2។'
      },
      {
        id: 'm7_q6',
        subjectId: 'math',
        category: 'មេរៀនទី៧៖ ផ្ទៃក្រឡា',
        text: 'ចតុកោណពាយមួយមានបាតតូច 2m, បាតធំ 5m និងកម្ពស់ 3m។ គណនាផ្ទៃក្រឡា៖',
        options: [ '21 m²', '10.5 m²', '7 m²', '15 m²' ],
        correctAnswerIndex: 1,
        explanation: 'S = [(2 + 5) × 3] / 2 = (7 × 3) / 2 = 21 / 2 = 10.5 m²។'
      },
      {
        id: 'm7_q7',
        subjectId: 'math',
        category: 'មេរៀនទី៧៖ ផ្ទៃក្រឡា',
        text: 'រូបមន្តផ្ទៃក្រឡារង្វង់ (S) ដែលមានកាំ R គឺ៖ (យក π ≈ 3.14)',
        options: [ 'S = 2 × π × R', 'S = π × D', 'S = π × R²', 'S = / 2' ],
        correctAnswerIndex: 2,
        explanation: 'ផ្ទៃក្រឡារង្វង់ S = π × R² (ឬ 3.14 × R × R)។'
      },
      {
        id: 'm7_q8',
        subjectId: 'math',
        category: 'មេរៀនទី៧៖ ផ្ទៃក្រឡា',
        text: 'រង្វង់មួយមានកាំ R = 10 cm (យក π ≈ 3.14)។ គណនាផ្ទៃក្រឡារង្វង់នោះ៖',
        options: [ '31.4 cm²', '62.8 cm²', '100 cm²', '314 cm²' ],
        correctAnswerIndex: 3,
        explanation: 'S = 3.14 × 10² = 3.14 × 100 = 314 cm²។'
      },
      {
        id: 'm7_q9',
        subjectId: 'math',
        category: 'មេរៀនទី៧៖ ផ្ទៃក្រឡា',
        text: 'តើ 1 ហិចតា (ha) ស្មើនឹងប៉ុន្មានអា (a)?',
        options: [ '100 a', '10 a', '1000 a', '10 000 a' ],
        correctAnswerIndex: 0,
        explanation: '1 ha = 100 a = 10 000 m²។'
      },
      {
        id: 'm7_q10',
        subjectId: 'math',
        category: 'មេរៀនទី៧៖ ផ្ទៃក្រឡា',
        text: 'តើ 1 ហិចតា (ha) ស្មើនឹងប៉ុន្មានម៉ែត្រការ៉េ (m²)?',
        options: [ '100 m²', '10 000 m²', '1000 m²', '100 000 m²' ],
        correctAnswerIndex: 1,
        explanation: '1 ha = 10 000 m²។'
      },
      {
        id: 'm7_q11',
        subjectId: 'math',
        category: 'មេរៀនទី៧៖ ផ្ទៃក្រឡា',
        text: 'ដីមួយកន្លែងមានផ្ទៃក្រឡា 2.5 ha។ តើផ្ទៃដីនោះស្មើនឹងប៉ុន្មានអា (a)?',
        options: [ '25 a', '2500 a', '250 a', '25 000 a' ],
        correctAnswerIndex: 2,
        explanation: '2.5 × 100 = 250 a។'
      },
      {
        id: 'm7_q12',
        subjectId: 'math',
        category: 'មេរៀនទី៧៖ ផ្ទៃក្រឡា',
        text: 'ដីមួយកន្លែងមានផ្ទៃក្រឡា 2.5 ha។ តើផ្ទៃដីនោះស្មើនឹងប៉ុន្មាន m²?',
        options: [ '2500 m²', '250 m²', '250 000 m²', '25 000 m²' ],
        correctAnswerIndex: 3,
        explanation: '2.5 × 10 000 = 25 000 m²។'
      },
      {
        id: 'm7_q13',
        subjectId: 'math',
        category: 'មេរៀនទី៧៖ ផ្ទៃក្រឡា',
        text: 'ប្រوازيឡូក្រាមមួយមានបាត b = 15cm និងកម្ពស់ h = 8cm। គណនាផ្ទៃក្រឡា៖',
        options: [ '120 cm²', '60 cm²', '23 cm²', '46 cm²' ],
        correctAnswerIndex: 0,
        explanation: 'ផ្ទៃក្រឡាប្រوازيឡូក្រាម S = b × h = 15 × 8 = 120 cm²។'
      },
      {
        id: 'm7_q14',
        subjectId: 'math',
        category: 'មេរៀនទី៧៖ ផ្ទៃក្រឡា',
        text: 'ចតុកោណស្មើ (រុំ) មួយមានអង្កត់ទ្រូង d₁ = 10cm និង d₂ = 8cm। គណនាផ្ទៃក្រឡា៖',
        options: [ '80 cm²', '40 cm²', '18 cm²', '36 cm²' ],
        correctAnswerIndex: 1,
        explanation: 'ផ្ទៃក្រឡាចតុកោណស្មើ S = (d₁ × d₂) / 2 = (10 × 8) / 2 = 40 cm²។'
      },
      {
        id: 'm7_q15',
        subjectId: 'math',
        category: 'មេរៀនទី៧៖ ផ្ទៃក្រឡា',
        text: 'កន្លះរង្វង់មួយមានកាំ R = 4cm (យក π ≈ 3.14)। គណនាផ្ទៃក្រឡាកន្លះរង្វង់នោះ៖',
        options: [ '50.24 cm²', '12.56 cm²', '25.12 cm²', '100.48 cm²' ],
        correctAnswerIndex: 2,
        explanation: 'S = (π × R²) / 2 = (3.14 × 16) / 2 = 50.24 / 2 = 25.12 cm²។'
      },
      {
        id: 'm7_q16',
        subjectId: 'math',
        category: 'មេរៀនទី៧៖ ផ្ទៃក្រឡា',
        text: 'បន្ទប់មួយរាងចតុកោណកែងមានបណ្តោយ 6m និងទទឹង 4m។ គេក្រាលការ៉ូការេដែលមានជ្រុង 40cm (0.4m)។ តើត្រូវប្រើការ៉ូប៉ុន្មានដុំ?',
        options: [ '250 ដុំ', '200 ដុំ', '1500 ដុំ', '150 ដុំ' ],
        correctAnswerIndex: 3,
        explanation: 'ផ្ទៃបន្ទប់ = 24m², ផ្ទៃការ៉ូ ១ ដុំ = 0.4 × 0.4 = 0.16m² ➔ ចំនួនការ៉ូ = 24 / 0.16 = 150 ដុំ។'
      },
      {
        id: 'm7_q17',
        subjectId: 'math',
        category: 'មេរៀនទី៧៖ ផ្ទៃក្រឡា',
        text: 'ដីស្រែមួយមានផ្ទៃក្រឡា 15 000 m²។ បំប្លែងជាហិចតា (ha) ៖',
        options: [ '1.5 ha', '15 ha', '150 ha', '0.15 ha' ],
        correctAnswerIndex: 0,
        explanation: '15 000 / 10 000 = 1.5 ha។'
      },
      {
        id: 'm7_q18',
        subjectId: 'math',
        category: 'មេរៀនទី៧៖ ផ្ទៃក្រឡា',
        text: 'ការេមួយមានផ្ទៃក្រឡា 81 cm²។ តើជ្រុងការេនោះមានប្រវែងប៉ុន្មាន cm?',
        options: [ '8 cm', '9 cm', '18 cm', '20.25 cm' ],
        correctAnswerIndex: 1,
        explanation: 'a² = 81 ➔ a = 9 cm (ព្រោះ 9 × 9 = 81)។'
      },
      {
        id: 'm7_q19',
        subjectId: 'math',
        category: 'មេរៀនទី៧៖ ផ្ទៃក្រឡា',
        text: 'រង្វង់មួយមានអង្កត់ផ្ចិត D = 20 cm (កាំ R = 10 cm, π ≈ 3.14)។ គណនាផ្ទៃក្រឡា៖',
        options: [ '1256 cm²', '628 cm²', '314 cm²', '100 cm²' ],
        correctAnswerIndex: 2,
        explanation: 'S = 3.14 × 10² = 314 cm²។'
      },
      {
        id: 'm7_q20',
        subjectId: 'math',
        category: 'មេរៀនទី៧៖ ផ្ទៃក្រឡា',
        text: 'ដីមួយកន្លែងរាងចតុកោណពាយ មានបាតតូច 30m, បាតធំ 50m និងកម្ពស់ 20m។ គណនាផ្ទៃដីជាអា (a) ៖',
        options: [ '800 a', '0.8 a', '80 a', '8 a' ],
        correctAnswerIndex: 3,
        explanation: 'S = [(30 + 50) × 20] / 2 = 800 m² = 8 a (ព្រោះ 1 a = 100 m²)។'
      }
    ]
  },

  // =========================================================================
  // វិញ្ញាសា មេរៀនទី ៨ ៖ វិធីគុណ និងវិធីចែកចំនួនទសភាគ (២០ សំណួរ QCM)
  // =========================================================================
  {
    id: 'math-lesson-8-exam',
    subjectId: 'math',
    title: 'វិញ្ញាសាមេរៀនទី ៨ ៖ វិធីគុណ និងវិធីចែកចំនួនទសភាគ (២០ សំណួរ QCM)',
    description: 'សំណួរ QCM ទាំង ២០ សម្រាប់ការប្រឡងតេស្តសមត្ថភាពមេរៀនទី៨៖ វិធីគុណទសភាគ, វិធីចែកទសភាគ និងចំណោទគណនា',
    durationMinutes: 40,
    totalPoints: 20,
    yearOrType: 'វិញ្ញាសាតាមមេរៀន',
    questions: [
      {
        id: 'm8_q1',
        subjectId: 'math',
        category: 'មេរៀនទី៨៖ គុណចែកទសភាគ',
        text: 'គណនា 2.5 × 4 = ?',
        options: [ '10 ឬ 10.0', '10.0', '10', '1.0' ],
        correctAnswerIndex: 0,
        explanation: '2.5 × 4 = 10.0 = 10។'
      },
      {
        id: 'm8_q2',
        subjectId: 'math',
        category: 'មេរៀនទី៨៖ គុណចែកទសភាគ',
        text: 'គណនា 0.15 × 0.3 = ?',
        options: [ '0.45', '0.045', '4.5', '0.0045' ],
        correctAnswerIndex: 1,
        explanation: '15 × 3 = 45 មាន 3 ខ្ទង់ទសភាគ (2 + 1 = 3) ➔ 0.045។'
      },
      {
        id: 'm8_q3',
        subjectId: 'math',
        category: 'មេរៀនទី៨៖ គុណចែកទសភាគ',
        text: 'គណនា 12.4 × 100 = ?',
        options: [ '124', '12400', '1240', '1.24' ],
        correctAnswerIndex: 2,
        explanation: 'គុណនឹង 100 ត្រូវរំកិលសញ្ញាចុចទសភាគទៅស្តាំ 2 ខ្ទង់ ➔ 1240។'
      },
      {
        id: 'm8_q4',
        subjectId: 'math',
        category: 'មេរៀនទី៨៖ គុណចែកទសភាគ',
        text: 'គណនា 15.6 ÷ 3 = ?',
        options: [ '5.1', '52', '0.52', '5.2' ],
        correctAnswerIndex: 3,
        explanation: '15.6 ÷ 3 = 5.2។'
      },
      {
        id: 'm8_q5',
        subjectId: 'math',
        category: 'មេរៀនទី៨៖ គុណចែកទសភាគ',
        text: 'គណនា 4.5 ÷ 0.5 = ?',
        options: [ '9', '0.9', '90', '0.09' ],
        correctAnswerIndex: 0,
        explanation: 'គុណភាគយកនិងភាគបែងនឹង 10 ➔ 45 ÷ 5 = 9។'
      },
      {
        id: 'm8_q6',
        subjectId: 'math',
        category: 'មេរៀនទី៨៖ គុណចែកទសភាគ',
        text: 'គណនា 32.5 ÷ 100 = ?',
        options: [ '3.25', '0.325', '0.0325', '325' ],
        correctAnswerIndex: 1,
        explanation: 'ចែកនឹង 100 ត្រូវរំកិលសញ្ញាចុចទៅឆ្វេង 2 ខ្ទង់ ➔ 0.325។'
      },
      {
        id: 'm8_q7',
        subjectId: 'math',
        category: 'មេរៀនទី៨៖ គុណចែកទសភាគ',
        text: 'សៀវភៅមួយក្បាលថ្លៃ 2.50$ (២ដុល្លារ ហាសិបសេន)។ តើសៀវភៅ 8 ក្បាលថ្លៃប៉ុន្មានដុល្លារ?',
        options: [ '16$', '24$', '20$', '18$' ],
        correctAnswerIndex: 2,
        explanation: '2.50$ × 8 = 20.00$ = 20$។'
      },
      {
        id: 'm8_q8',
        subjectId: 'math',
        category: 'មេរៀនទី៨៖ គុណចែកទសភាគ',
        text: 'ខ្សែរប្រវែង 18.6m ត្រូវកាត់ជា 6 កំណាត់ស្មើៗគ្នា។ តើមួយកំណាត់ៗប្រវែងប៉ុន្មានម៉ែត្រ?',
        options: [ '31 m', '3.2 m', '3.01 m', '3.1 m' ],
        correctAnswerIndex: 3,
        explanation: '18.6 ÷ 6 = 3.1 m។'
      },
      {
        id: 'm8_q9',
        subjectId: 'math',
        category: 'មេរៀនទី៨៖ គុណចែកទសភាគ',
        text: 'គណនា 1.25 × 0.8 = ?',
        options: [ '1 ឬ 1.000', '1.000', '1', '10' ],
        correctAnswerIndex: 0,
        explanation: '125 × 8 = 1000 មាន 3 ខ្ទង់ទសភាគ ➔ 1.000 = 1។'
      },
      {
        id: 'm8_q10',
        subjectId: 'math',
        category: 'មេរៀនទី៨៖ គុណចែកទសភាគ',
        text: 'គណនា 0.72 ÷ 0.09 = ?',
        options: [ '0.8', '8', '80', '0.08' ],
        correctAnswerIndex: 1,
        explanation: '72 ÷ 9 = 8 (គុណទាំងពីរនឹង 100)។'
      },
      {
        id: 'm8_q11',
        subjectId: 'math',
        category: 'មេរៀនទី៨៖ គុណចែកទសភាគ',
        text: 'គណនា 3.14 × 20 = ?',
        options: [ '6.28', '628', '62.8', '628.0' ],
        correctAnswerIndex: 2,
        explanation: '3.14 × 20 = 62.80 = 62.8។'
      },
      {
        id: 'm8_q12',
        subjectId: 'math',
        category: 'មេរៀនទី៨៖ គុណចែកទសភាគ',
        text: 'ប្រេង 15.5 លីត្រ ច្រកក្នុងដប 0.5 លីត្រ។ តើគេច្រកបានប៉ុន្មានដប?',
        options: [ '30 ដប', '15.5 ដប', '32 ដប', '31 ដប' ],
        correctAnswerIndex: 3,
        explanation: '15.5 ÷ 0.5 = 155 ÷ 5 = 31 ដប។'
      },
      {
        id: 'm8_q13',
        subjectId: 'math',
        category: 'មេរៀនទី៨៖ គុណចែកទសភាគ',
        text: 'គណនា 0.04 × 0.05 = ?',
        options: [ '0.002', '0.02', '0.2', '0.0002' ],
        correctAnswerIndex: 0,
        explanation: '4 × 5 = 20 មាន 4 ខ្ទង់ទសភាគ ➔ 0.0020 = 0.002។'
      },
      {
        id: 'm8_q14',
        subjectId: 'math',
        category: 'មេរៀនទី៨៖ គុណចែកទសភាគ',
        text: 'គណនា 100 ÷ 0.25 = ?',
        options: [ '25', '400', '40', '4000' ],
        correctAnswerIndex: 1,
        explanation: '100 ÷ (1/4) = 100 × 4 = 400។'
      },
      {
        id: 'm8_q15',
        subjectId: 'math',
        category: 'មេរៀនទី៨៖ គុណចែកទសភាគ',
        text: 'ដីមួយកន្លែងរាងចតុកោណកែងមានបណ្តោយ 12.5m និងទទឹង 8.4m។ គណនាផ្ទៃក្រឡា៖',
        options: [ '1050 m²', '10.5 m²', '105 m²', '100 m²' ],
        correctAnswerIndex: 2,
        explanation: '12.5 × 8.4 = 105.00 = 105 m²។'
      },
      {
        id: 'm8_q16',
        subjectId: 'math',
        category: 'មេរៀនទី៨៖ គុណចែកទសភាគ',
        text: 'គណនា 2.4 ÷ 0.12 = ?',
        options: [ '2', '0.2', '200', '20' ],
        correctAnswerIndex: 3,
        explanation: '240 ÷ 12 = 20។'
      },
      {
        id: 'm8_q17',
        subjectId: 'math',
        category: 'មេរៀនទី៨៖ គុណចែកទសភាគ',
        text: 'តើការគុណចំនួនទសភាគនឹង 0.1 ស្មើនឹងការចែកចំនួននោះនឹងចំនួនប៉ុន្មាន?',
        options: [ 'ចែកនឹង 10', 'ចែកនឹង 100', 'គុណនឹង 10', 'ចែកនឹង 1' ],
        correctAnswerIndex: 0,
        explanation: 'គុណនឹង 0.1 (1/10) គឺស្មើនឹងការចែកនឹង 10។'
      },
      {
        id: 'm8_q18',
        subjectId: 'math',
        category: 'មេរៀនទី៨៖ គុណចែកទសភាគ',
        text: 'តើការចែកចំនួនទសភាគនឹង 0.5 ស្មើនឹងការគុណចំនួននោះនឹងចំនួនប៉ុន្មាន?',
        options: [ 'គុណនឹង 5', 'គុណនឹង 2', 'គុណនឹង 10', 'ចែកនឹង 2' ],
        correctAnswerIndex: 1,
        explanation: '÷ (1/2) = × 2។'
      },
      {
        id: 'm8_q19',
        subjectId: 'math',
        category: 'មេរៀនទី៨៖ គុណចែកទសភាគ',
        text: 'គណនា 8.88 ÷ 0.4 = ?',
        options: [ '222', '2.22', '22.2', '0.222' ],
        correctAnswerIndex: 2,
        explanation: '88.8 ÷ 4 = 22.2។'
      },
      {
        id: 'm8_q20',
        subjectId: 'math',
        category: 'មេរៀនទី៨៖ គុណចែកទសភាគ',
        text: 'អង្ករ 3 បាវ ទម្ងន់សរុប 142.5 kg។ តើអង្ករ ១ បាវ ទម្ងន់មធ្យមប៉ុន្មាន kg?',
        options: [ '45.5 kg', '46.5 kg', '48.5 kg', '47.5 kg' ],
        correctAnswerIndex: 3,
        explanation: '142.5 ÷ 3 = 47.5 kg។'
      }
    ]
  },

  // =========================================================================
  // វិញ្ញាសា មេរៀនទី ៩ ៖ ត.ច.រ និង ព.គុ.ត (២០ សំណួរ QCM)
  // =========================================================================
  {
    id: 'math-lesson-9-exam',
    subjectId: 'math',
    title: 'វិញ្ញាសាមេរៀនទី ៩ ៖ ត.ច.រ និង ព.គុ.ត (២០ សំណួរ QCM)',
    description: 'សំណួរ QCM ទាំង ២០ សម្រាប់ការប្រឡងតេស្តសមត្ថភាពមេរៀនទី៩៖ ចំនួនបឋម, ការបំបែកជាកត្តាបឋម, ត.ច.រ (GCD) និង ព.គុ.ត (LCM)',
    durationMinutes: 40,
    totalPoints: 20,
    yearOrType: 'វិញ្ញាសាតាមមេរៀន',
    questions: [
      {
        id: 'm9_q1',
        subjectId: 'math',
        category: 'មេរៀនទី៩៖ ត.ច.រ និង ព.គុ.ត',
        text: 'តើអ្វីជា «ចំនួនបឋម» (Prime Number)?',
        options: [
          'ជាចំនួនដែលមានតួចែកតែពីរគត់ គឺ 1 និងខ្លួនវា',
          'ជាចំនួនគូទាំងអស់',
          'ជាចំនួនដែលចែកដាច់នឹង 2',
          'ជាចំនួនដែលមានតួចែកច្រើនជាងពីរ'
        ],
        correctAnswerIndex: 0,
        explanation: 'ចំនួនបឋមគឺជាចំនួនគត់វិជ្ជមាន > 1 ដែលមានតួចែកតែពីរគត់ គឺ 1 និងខ្លួនវា។'
      },
      {
        id: 'm9_q2',
        subjectId: 'math',
        category: 'មេរៀនទី៩៖ ត.ច.រ និង ព.គុ.ត',
        text: 'តើចំនួនណាជាចំនួនបឋមក្នុងចំណោមចំនួនខាងក្រោម?',
        options: [ '9', '17', '15', '21' ],
        correctAnswerIndex: 1,
        explanation: '17 មានតួចែកតែ 1 និង 17 ប៉ុណ្ណោះ ដូច្នេះវាជាចំនួនបឋម។'
      },
      {
        id: 'm9_q3',
        subjectId: 'math',
        category: 'មេរៀនទី៩៖ ត.ច.រ និង ព.គុ.ត',
        text: 'បំបែកចំនួន 24 ជាផលគុណកត្តាបឋម ៖',
        options: [ '2 × 12', '2² × 6', '2³ × 3', '4 × 6' ],
        correctAnswerIndex: 2,
        explanation: '24 = 8 × 3 = 2³ × 3 (ដែល 2 និង 3 ជាកត្តាបឋម)។'
      },
      {
        id: 'm9_q4',
        subjectId: 'math',
        category: 'មេរៀនទី៩៖ ត.ច.រ និង ព.គុ.ត',
        text: 'រកតួចែករួមធំបំផុត (ត.ច.រ) នៃចំនួន 18 និង 24 ៖',
        options: [ '3', '72', '12', '6' ],
        correctAnswerIndex: 3,
        explanation: '18 = 2 × 3², 24 = 2³ × 3 ➔ ត.ច.រ (18, 24) = 2 × 3 = 6។'
      },
      {
        id: 'm9_q5',
        subjectId: 'math',
        category: 'មេរៀនទី៩៖ ត.ច.រ និង ព.គុ.ត',
        text: 'រកពហុគុណរួមតូចបំផុត (ព.គុ.ត) នៃចំនួន 4 និង 6 ៖',
        options: [ '12', '2', '24', '48' ],
        correctAnswerIndex: 0,
        explanation: '4 = 2², 6 = 2 × 3 ➔ ព.គុ.ត (4, 6) = 2² × 3 = 12។'
      },
      {
        id: 'm9_q6',
        subjectId: 'math',
        category: 'មេរៀនទី៩៖ ត.ច.រ និង ព.គុ.ត',
        text: 'រកតួចែករួមធំបំផុត (ត.ច.រ) នៃចំនួន 12, 18 និង 30 ៖',
        options: [ '2', '6', '3', '60' ],
        correctAnswerIndex: 1,
        explanation: '12 = 2² × 3, 18 = 2 × 3², 30 = 2 × 3 × 5 ➔ ត.ច.រ = 2 × 3 = 6។'
      },
      {
        id: 'm9_q7',
        subjectId: 'math',
        category: 'មេរៀនទី៩៖ ត.ច.រ និង ព.គុ.ត',
        text: 'រកពហុគុណរួមតូចបំផុត (ព.គុ.ត) នៃចំនួន 8 និង 12 ៖',
        options: [ '4', '48', '24', '96' ],
        correctAnswerIndex: 2,
        explanation: '8 = 2³, 12 = 2² × 3 ➔ ព.គុ.ត = 2³ × 3 = 24។'
      },
      {
        id: 'm9_q8',
        subjectId: 'math',
        category: 'មេរៀនទី៩៖ ត.ច.រ និង ព.គុ.ត',
        text: 'តើចំនួនបឋមតូចជាងគេបង្អស់គឺចំនួនណា?',
        options: [ '0', '1', '3', '2' ],
        correctAnswerIndex: 3,
        explanation: '2 ជាចំនួនបឋមតូចជាងគេ និងជាចំនួនបឋមគូតែមួយគត់។'
      },
      {
        id: 'm9_q9',
        subjectId: 'math',
        category: 'មេរៀនទី៩៖ ត.ច.រ និង ព.គុ.ត',
        text: 'បំបែកចំនួន 60 ជាផលគុណកត្តាបឋម ៖',
        options: [ '2² × 3 × 5', '2 × 30', '4 × 15', '2³ × 5' ],
        correctAnswerIndex: 0,
        explanation: '60 = 4 × 15 = 2² × 3 × 5។'
      },
      {
        id: 'm9_q10',
        subjectId: 'math',
        category: 'មេរៀនទី៩៖ ត.ច.រ និង ព.គុ.ត',
        text: 'រក ត.ច.រ នៃចំនួន 15 និង 25 ៖',
        options: [ '3', '5', '15', '75' ],
        correctAnswerIndex: 1,
        explanation: '15 = 3 × 5, 25 = 5² ➔ ត.ច.រ = 5។'
      },
      {
        id: 'm9_q11',
        subjectId: 'math',
        category: 'មេរៀនទី៩៖ ត.ច.រ និង ព.គុ.ត',
        text: 'រក ព.គុ.ត នៃចំនួន 15 និង 25 ៖',
        options: [ '5', '25', '75', '150' ],
        correctAnswerIndex: 2,
        explanation: 'ព.គុ.ត = 3 × 5² = 3 × 25 = 75។'
      },
      {
        id: 'm9_q12',
        subjectId: 'math',
        category: 'មេរៀនទី៩៖ ត.ច.រ និង ព.គុ.ត',
        text: 'គ្រូបង្រៀនម្នាក់មានប៊ិក 24 ដើម និងសៀវភៅ 36 ក្បាល។ គាត់ចង់ចែកកាដូដល់សិស្សឲ្យស្មើៗគ្នាដោយមិនឲ្យសល់។ តើគាត់អាចចែកបានច្រើនបំផុតប៉ុន្មានក្រុម?',
        options: [ '6 ក្រុម', '24 ក្រុម', '18 ក្រុម', '12 ក្រុម' ],
        correctAnswerIndex: 3,
        explanation: 'រក ត.ច.រ (24, 36) = 12 ក្រុម។'
      },
      {
        id: 'm9_q13',
        subjectId: 'math',
        category: 'មេរៀនទី៩៖ ត.ច.រ និង ព.គុ.ត',
        text: 'ឡានក្រុង A ចេញរៀងរាល់ 10 នាទី, ឡានក្រុង B ចេញរៀងរាល់ 15 នាទី។ បើវាចេញដំណាលគ្នានៅម៉ោង 7:00 តើនៅម៉ោងប៉ុន្មានវាចេញដំណាលគ្នាជាថ្មី?',
        options: [ '7:30', '7:20', '7:15', '8:00' ],
        correctAnswerIndex: 0,
        explanation: 'រក ព.គុ.ត (10, 15) = 30 នាទី ➔ 7:00 + 30mn = 7:30។'
      },
      {
        id: 'm9_q14',
        subjectId: 'math',
        category: 'មេរៀនទី៩៖ ត.ច.រ និង ព.គុ.ត',
        text: 'តើចំនួនណាជាចំនួនបដិសម (Composite number)?',
        options: [ '2', '9', '5', '3' ],
        correctAnswerIndex: 1,
        explanation: '9 មានតួចែក 1, 3, 9 (ច្រើនជាង ២) ដូច្នេះវាជាចំនួនបដិសម។'
      },
      {
        id: 'm9_q15',
        subjectId: 'math',
        category: 'មេរៀនទី៩៖ ត.ច.រ និង ព.គុ.ត',
        text: 'បើពីរចំនួន a និង b ជាចំនួនបឋមរវាងគ្នា (ត.ច.រ = 1) តើ ព.គុ.ត នៃ a និង b ស្មើនឹងអ្វី?',
        options: [ 'a + b', 'a / b', 'a × b', '1' ],
        correctAnswerIndex: 2,
        explanation: 'បើ ត.ច.រ = 1 នោះ ព.គុ.ត (a, b) = a × b។'
      },
      {
        id: 'm9_q16',
        subjectId: 'math',
        category: 'មេរៀនទី៩៖ ត.ច.រ និង ព.គុ.ត',
        text: 'រក ត.ច.រ (7, 11) ៖',
        options: [ '77', '7', '11', '1' ],
        correctAnswerIndex: 3,
        explanation: '7 និង 11 ជាចំនួនបឋម ដូច្នេះ ត.ច.រ = 1។'
      },
      {
        id: 'm9_q17',
        subjectId: 'math',
        category: 'មេរៀនទី៩៖ ត.ច.រ និង ព.គុ.ត',
        text: 'រក ព.គុ.ត (7, 11) ៖',
        options: [ '77', '18', '1', '154' ],
        correctAnswerIndex: 0,
        explanation: 'ព.គុ.ត = 7 × 11 = 77។'
      },
      {
        id: 'm9_q18',
        subjectId: 'math',
        category: 'មេរៀនទី៩៖ ត.ច.រ និង ព.គុ.ត',
        text: 'តើតួចែកទាំងអស់នៃចំនួន 12 មានប៉ុន្មាន?',
        options: [ '1, 2, 3, 6, 12', '1, 2, 3, 4, 6, 12', '2, 3, 4, 6', '12, 24, 36' ],
        correctAnswerIndex: 1,
        explanation: 'តួចែកនៃ 12 គឺ 1, 2, 3, 4, 6, 12 (មាន 6 តួ)។'
      },
      {
        id: 'm9_q19',
        subjectId: 'math',
        category: 'មេរៀនទី៩៖ ត.ច.រ និង ព.គុ.ត',
        text: 'បំបែកចំនួន 100 ជាផលគុណកត្តាបឋម ៖',
        options: [ '4 × 25', '10 × 10', '2² × 5²', '2 × 50' ],
        correctAnswerIndex: 2,
        explanation: '100 = 4 × 25 = 2² × 5²។'
      },
      {
        id: 'm9_q20',
        subjectId: 'math',
        category: 'មេរៀនទី៩៖ ត.ច.រ និង ព.គុ.ត',
        text: 'រក ព.គុ.ត (6, 8, 12) ៖',
        options: [ '12', '72', '48', '24' ],
        correctAnswerIndex: 3,
        explanation: '6 = 2×3, 8 = 2³, 12 = 2²×3 ➔ ព.គុ.ត = 2³ × 3 = 24។'
      }
    ]
  },

  // =========================================================================
  // វិញ្ញាសា មេរៀនទី ១០ ៖ វិធីបូក និងវិធីដកប្រភាគ (២០ សំណួរ QCM)
  // =========================================================================
  {
    id: 'math-lesson-10-exam',
    subjectId: 'math',
    title: 'វិញ្ញាសាមេរៀនទី ១០ ៖ វិធីបូក និងវិធីដកប្រភាគ (២០ សំណួរ QCM)',
    description: 'សំណួរ QCM ទាំង ២០ សម្រាប់ការប្រឡងតេស្តសមត្ថភាពមេរៀនទី១០៖ តម្រូវភាគបែងរួម, វិធីបូកដកប្រភាគ និងការសម្រួលប្រភាគ',
    durationMinutes: 40,
    totalPoints: 20,
    yearOrType: 'វិញ្ញាសាតាមមេរៀន',
    questions: [
      {
        id: 'm10_q1',
        subjectId: 'math',
        category: 'មេរៀនទី១០៖ បូកដកប្រភាគ',
        text: 'គណនាផលបូកប្រភាគ៖ 2/5 + 3/4 = ?',
        options: [ '23/20 ឬ 1', '5/9', '8/20', '15/20' ],
        correctAnswerIndex: 0,
        explanation: 'ភាគបែងរួម = 20 ➔ 8/20 + 15/20 = 23/20 = 1 3/20។'
      },
      {
        id: 'm10_q2',
        subjectId: 'math',
        category: 'មេរៀនទី១០៖ បូកដកប្រភាគ',
        text: 'គណនាផលបូកប្រភាគ៖ 1/3 + 1/6 = ?',
        options: [ '2/9', '3/6 ឬ 1/2', '2/6', '1/18' ],
        correctAnswerIndex: 1,
        explanation: '2/6 + 1/6 = 3/6 = 1/2។'
      },
      {
        id: 'm10_q3',
        subjectId: 'math',
        category: 'មេរៀនទី១០៖ បូកដកប្រភាគ',
        text: 'គណនាផលដកប្រភាគ៖ 5/6 - 1/4 = ?',
        options: [ '4/2', '4/12', '7/12', '1/2' ],
        correctAnswerIndex: 2,
        explanation: 'ភាគបែងរួម 12 ➔ 10/12 - 3/12 = 7/12។'
      },
      {
        id: 'm10_q4',
        subjectId: 'math',
        category: 'មេរៀនទី១០៖ បូកដកប្រភាគ',
        text: 'គណនាផលដកប្រភាគ៖ 3/4 - 1/2 = ?',
        options: [ '2/2', '1/2', '2/4', '1/4' ],
        correctAnswerIndex: 3,
        explanation: '3/4 - 2/4 = 1/4។'
      },
      {
        id: 'm10_q5',
        subjectId: 'math',
        category: 'មេរៀនទី១០៖ បូកដកប្រភាគ',
        text: 'គណនា 1 - 2/5 = ?',
        options: [ '3/5', '1/5', '2/5', '4/5' ],
        correctAnswerIndex: 0,
        explanation: '5/5 - 2/5 = 3/5។'
      },
      {
        id: 'm10_q6',
        subjectId: 'math',
        category: 'មេរៀនទី១០៖ បូកដកប្រភាគ',
        text: 'គណនាផលបូក 1/2 + 2/3 + 1/4 = ?',
        options: [ '4/9', '17/12 ឬ 1', '11/12', '15/12' ],
        correctAnswerIndex: 1,
        explanation: 'ភាគបែងរួម 12 ➔ 6/12 + 8/12 + 3/12 = 17/12 = 1 5/12។'
      },
      {
        id: 'm10_q7',
        subjectId: 'math',
        category: 'មេរៀនទី១០៖ បូកដកប្រភាគ',
        text: 'សម្រួលប្រភាគ 12/18 ឲ្យទៅជាប្រភាគសម្រួលមិនបាន៖',
        options: [ '6/9', '4/6', '2/3', '3/4' ],
        correctAnswerIndex: 2,
        explanation: 'ចែកភាគយកនិងភាគបែងនឹង 6 ➔ 2/3។'
      },
      {
        id: 'm10_q8',
        subjectId: 'math',
        category: 'មេរៀនទី១០៖ បូកដកប្រភាគ',
        text: 'សុខញ៉ាំនំអស់ 1/4, សៅញ៉ាំអស់ 2/5។ តើអ្នកទាំងពីរញ៉ាំនំអស់សរុបប្រភាគប៉ុន្មាន?',
        options: [ '3/9', '7/20', '3/20', '13/20' ],
        correctAnswerIndex: 3,
        explanation: '1/4 + 2/5 = 5/20 + 8/20 = 13/20 នៃនំ។'
      },
      {
        id: 'm10_q9',
        subjectId: 'math',
        category: 'មេរៀនទី១០៖ បូកដកប្រភាគ',
        text: 'តាមប្រធានខាងលើ តើនៅសល់នំប្រភាគប៉ុន្មាន?',
        options: [ '7/20', '13/20', '1/20', '5/20' ],
        correctAnswerIndex: 0,
        explanation: '1 - 13/20 = 20/20 - 13/20 = 7/20 នៃនំ។'
      },
      {
        id: 'm10_q10',
        subjectId: 'math',
        category: 'មេរៀនទី១០៖ បូកដកប្រភាគ',
        text: 'គណនា 2/7 + 4/7 = ?',
        options: [ '6/14', '6/7', '8/7', '2/7' ],
        correctAnswerIndex: 1,
        explanation: 'ភាគបែងដូចគ្នា ➔ (2 + 4)/7 = 6/7។'
      },
      {
        id: 'm10_q11',
        subjectId: 'math',
        category: 'មេរៀនទី១០៖ បូកដកប្រភាគ',
        text: 'គណនា 7/9 - 4/9 = ?',
        options: [ '11/9', '3/0', '3/9 ឬ 1/3', '3/18' ],
        correctAnswerIndex: 2,
        explanation: '(7 - 4)/9 = 3/9 = 1/3។'
      },
      {
        id: 'm10_q12',
        subjectId: 'math',
        category: 'មេរៀនទី១០៖ បូកដកប្រភាគ',
        text: 'ដើម្បីបូក ឬដកប្រភាគដែលមានភាគបែងខុសគ្នា តើត្រូវធ្វើដូចម្តេចជាមុន?',
        options: [
          'បូកភាគយកនិងភាគបែងបញ្ចូលគ្នា',
          'បកប្រែជាចំនួនទសភាគ',
          'គុណភាគយកនឹងភាគយក',
          'តម្រូវភាគបែងរួម'
        ],
        correctAnswerIndex: 3,
        explanation: 'ត្រូវតម្រូវភាគបែងរួមជាមុនសិន ដោយរក ព.គុ.ត នៃភាគបែង។'
      },
      {
        id: 'm10_q13',
        subjectId: 'math',
        category: 'មេរៀនទី១០៖ បូកដកប្រភាគ',
        text: 'គណនា 3/8 + 1/4 = ?',
        options: [ '5/8', '4/12', '4/8', '3/32' ],
        correctAnswerIndex: 0,
        explanation: '3/8 + 2/8 = 5/8។'
      },
      {
        id: 'm10_q14',
        subjectId: 'math',
        category: 'មេរៀនទី១០៖ បូកដកប្រភាគ',
        text: 'គណនា 5/6 - 1/2 = ?',
        options: [ '4/4', '2/6 ឬ 1/3', '4/6', '1/6' ],
        correctAnswerIndex: 1,
        explanation: '5/6 - 3/6 = 2/6 = 1/3។'
      },
      {
        id: 'm10_q15',
        subjectId: 'math',
        category: 'មេរៀនទី១០៖ បូកដកប្រភាគ',
        text: 'ប្រភាគណាស្មើនឹង 1 ?',
        options: [ '3/4', '0/5', '5/5', '5/1' ],
        correctAnswerIndex: 2,
        explanation: 'ប្រភាគដែលមានភាគយកស្មើភាគបែង (5/5) ស្មើនឹង 1។'
      },
      {
        id: 'm10_q16',
        subjectId: 'math',
        category: 'មេរៀនទី១០៖ បូកដកប្រភាគ',
        text: 'គណនា 2 - 3/4 = ?',
        options: [ '1/4', '3/4', '1/2', '5/4 ឬ 1' ],
        correctAnswerIndex: 3,
        explanation: '8/4 - 3/4 = 5/4 = 1 1/4។'
      },
      {
        id: 'm10_q17',
        subjectId: 'math',
        category: 'មេរៀនទី១០៖ បូកដកប្រភាគ',
        text: 'គណនា 1/5 + 2/3 = ?',
        options: [ '13/15', '3/8', '3/15', '7/15' ],
        correctAnswerIndex: 0,
        explanation: '3/15 + 10/15 = 13/15។'
      },
      {
        id: 'm10_q18',
        subjectId: 'math',
        category: 'មេរៀនទី១០៖ បូកដកប្រភាគ',
        text: 'គណនា 4/5 - 2/3 = ?',
        options: [ '2/2', '2/15', '2/5', '6/15' ],
        correctAnswerIndex: 1,
        explanation: '12/15 - 10/15 = 2/15។'
      },
      {
        id: 'm10_q19',
        subjectId: 'math',
        category: 'មេរៀនទី១០៖ បូកដកប្រភាគ',
        text: 'ប្រភាគសម្រួលមិនបានក្នុងចំណោមប្រភាគខាងក្រោមគឺ៖',
        options: [ '4/8', '6/9', '5/12', '10/15' ],
        correctAnswerIndex: 2,
        explanation: '5/12 គ្មានតួចែករួមក្រៅពី 1 ទេ ដូច្នេះវាសម្រួលមិនបានឡើយ។'
      },
      {
        id: 'm10_q20',
        subjectId: 'math',
        category: 'មេរៀនទី១០៖ បូកដកប្រភាគ',
        text: 'គណនា 7/10 - 2/5 + 1/2 = ?',
        options: [ '4/5', '8/10', '3/10', '4/5 ឬ 8/10' ],
        correctAnswerIndex: 3,
        explanation: '7/10 - 4/10 + 5/10 = 8/10 = 4/5។'
      }
    ]
  }
];
