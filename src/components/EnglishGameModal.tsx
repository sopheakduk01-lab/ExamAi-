import React, { useState, useEffect, useRef } from 'react';
import { getSafeAudioContext } from '../utils/audioSynthesizer';
import {
  X,
  BookOpen,
  Boxes,
  Cat,
  HelpCircle,
  Volume2,
  RotateCcw,
  Star,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Trophy,
  Eraser,
  Check,
  Search,
  Sparkles,
  ArrowRight,
  ListCheck
} from 'lucide-react';

interface EnglishGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialUnitIndex?: number;
}

// 15 Units Metadata for Grade 6 MoEYS English
const UNITS_META = [
  { id: 0, titleEn: "Unit 1: Actions & Activities", titleKm: "មេរៀនទី១៖ សកម្មភាពកំពុងធ្វើ (Present Continuous)" },
  { id: 1, titleEn: "Unit 2: Prepositions of Place", titleKm: "មេរៀនទី២៖ ធៀបលំហ និងទីតាំង (Prepositions)" },
  { id: 2, titleEn: "Unit 3: Daily Routines & Time", titleKm: "មេរៀនទី៣៖ ទម្លាប់ប្រចាំថ្ងៃ និងម៉ោង (Daily Routines)" },
  { id: 3, titleEn: "Unit 4: Occupations & Jobs", titleKm: "មេរៀនទី៤៖ មុខរបរ និងកន្លែងធ្វើការ (Jobs & Professions)" },
  { id: 4, titleEn: "Unit 5: Food & Drinks", titleKm: "មេរៀនទី៥៖ អាហារ និងភេសជ្ជៈ (Food & Drinks)" },
  { id: 5, titleEn: "Unit 6: Animals & Wild Life", titleKm: "មេរៀនទី៦៖ សត្វ និងជម្រក (Animals & Habitats)" },
  { id: 6, titleEn: "Unit 7: Places in Town & Directions", titleKm: "មេរៀនទី៧៖ ទីកន្លែង និងការប្រាប់ផ្លូវ (Places & Directions)" },
  { id: 7, titleEn: "Unit 8: Weather & Seasons", titleKm: "មេរៀនទី៨៖ អាកាសធាតុ និងរដូវ (Weather & Seasons)" },
  { id: 8, titleEn: "Unit 9: Health & Illnesses", titleKm: "មេរៀនទី៩៖ សុខភាព និងជំងឺ (Health & Illnesses)" },
  { id: 9, titleEn: "Unit 10: Clothes & Shopping", titleKm: "មេរៀនទី១០៖ សម្លៀកបំពាក់ និងការទិញទំនិញ (Clothes & Shopping)" },
  { id: 10, titleEn: "Unit 11: School Subjects & Hobbies", titleKm: "មេរៀនទី១១៖ មុខវិជ្ជា និងចំណង់ចំណូលចិត្ត (Subjects & Hobbies)" },
  { id: 11, titleEn: "Unit 12: Past Events & History", titleKm: "មេរៀនទី១២៖ ព្រឹត្តិការណ៍អតីតកាល (Past Simple)" },
  { id: 12, titleEn: "Unit 13: Sports & Recreation", titleKm: "មេរៀនទី១៣៖ កីឡា និងការកម្សាន្ត (Sports & Recreation)" },
  { id: 13, titleEn: "Unit 14: Days, Months & Calendar", titleKm: "មេរៀនទី១៤៖ ថ្ងៃ ខែ និងកាលបរិច្ឆេទ (Calendar & Dates)" },
  { id: 14, titleEn: "Unit 15: Future Plans & Travel", titleKm: "មេរៀនទី១៥៖ ផែនការអនាគត (Future Plans & Travel)" }
];

// Preposition Cat Tasks (15 Positions)
const ROOM_TASKS = [
  { textEn: "Put the cat NEXT TO the lamp.", textKm: "ដាក់ឆ្មា នៅជិត/ក្បែរ ចង្កៀង", targetZone: "lamp-next" },
  { textEn: "Put the cat ON the bed.", textKm: "ដាក់ឆ្មា នៅលើ គ្រែគេង", targetZone: "bed-on" },
  { textEn: "Put the cat UNDER the table.", textKm: "ដាក់ឆ្មា នៅក្រោម តុ", targetZone: "table-under" },
  { textEn: "Put the cat IN the box.", textKm: "ដាក់ឆ្មា នៅក្នុង ប្រអប់កាតុង", targetZone: "box-in" },
  { textEn: "Put the cat ON the rug.", textKm: "ដាក់ឆ្មា នៅលើ កំរាលព្រំ", targetZone: "rug-on" },
  { textEn: "Put the cat UNDER the window.", textKm: "ដាក់ឆ្មា នៅក្រោម បង្អួច", targetZone: "window-under" },
  { textEn: "Put the cat BEHIND the plant.", textKm: "ដាក់ឆ្មា នៅពីក្រោយ ដើមឈើលម្អ", targetZone: "plant-behind" },
  { textEn: "Put the cat ON TOP OF the wardrobe.", textKm: "ដាក់ឆ្មា នៅលើ ទូខោអាវ", targetZone: "wardrobe-on" },
  { textEn: "Put the cat IN FRONT OF the chair.", textKm: "ដាក់ឆ្មា នៅខាងមុខ កៅអី", targetZone: "chair-front" },
  { textEn: "Put the cat NEXT TO the bookshelf.", textKm: "ដាក់ឆ្មា នៅក្បែរ ទូសៀវភៅ", targetZone: "bookshelf-next" },
  { textEn: "Put the cat ON the chair.", textKm: "ដាក់ឆ្មា នៅលើ កៅអី", targetZone: "chair-on" },
  { textEn: "Put the cat UNDER the bed.", textKm: "ដាក់ឆ្មា នៅក្រោម គ្រែគេង", targetZone: "bed-under" },
  { textEn: "Put the cat ON the desk.", textKm: "ដាក់ឆ្មា នៅលើ តុរៀន", targetZone: "desk-on" },
  { textEn: "Put the cat BEHIND the door.", textKm: "ដាក់ឆ្មា នៅពីក្រោយ ទ្វារ", targetZone: "door-behind" },
  { textEn: "Put the cat NEXT TO the bed.", textKm: "ដាក់ឆ្មា នៅក្បែរ គ្រែគេង", targetZone: "bed-next" }
];

// Content Generator for 15 Units
function getUnitContent(unitId: number) {
  const dataset: Record<number, { vocab: any[]; builder: any[]; quiz: any[] }> = {
    // Unit 1: Actions & Activities
    0: {
      vocab: [
        { word: "is playing football", km: "កំពុងលេងបាល់ទាត់", icon: "⚽", ipa: "/ɪz ˈpleɪɪŋ ˈfʊtbɔːl/", example: "Dara is playing football with friends." },
        { word: "is reading a book", km: "កំពុងអានសៀវភៅ", icon: "📚", ipa: "/ɪz ˈriːdɪŋ ə bʊk/", example: "Bopha is reading a storybook." },
        { word: "is cooking dinner", km: "កំពុងធ្វើម្ហូប", icon: "🍳", ipa: "/ɪz ˈkʊkɪŋ ˈdɪnər/", example: "My mother is cooking dinner." },
        { word: "is riding a bicycle", km: "កំពុងជិះកង់", icon: "🚲", ipa: "/ɪz ˈraɪdɪŋ ə ˈbaɪsɪkl/", example: "Sokha is riding a bicycle to school." },
        { word: "is drawing a picture", km: "កំពុងគូររូប", icon: "🎨", ipa: "/ɪz ˈdrɔːɪŋ ə ˈpɪktʃər/", example: "They are drawing a picture." },
        { word: "is studying English", km: "កំពុងរៀនភាសាអង់គ្លេស", icon: "📝", ipa: "/ɪz ˈstʌdiɪŋ ˈɪŋɡlɪʃ/", example: "We are studying English." },
        { word: "is drinking water", km: "កំពុងផឹកទឹក", icon: "💧", ipa: "/ɪz ˈdrɪŋkɪŋ ˈwɔːtər/", example: "He is drinking water." },
        { word: "is listening to music", km: "កំពុងស្តាប់តន្ត្រី", icon: "🎧", ipa: "/ɪz ˈlɪsnɪŋ tuː ˈmjuːzɪk/", example: "She is listening to music." },
        { word: "is washing dishes", km: "កំពុងលាងចាន", icon: "🍽️", ipa: "/ɪz ˈwɒʃɪŋ ˈdɪʃɪz/", example: "He is washing the dishes." },
        { word: "is running in park", km: "កំពុងរត់ក្នុងសួន", icon: "🏃", ipa: "/ɪz ˈrʌnɪŋ ɪn pɑːrk/", example: "They are running in the park." },
        { word: "is swimming in pool", km: "កំពុងហែលទឹក", icon: "🏊", ipa: "/ɪz ˈswɪmɪŋ ɪn puːl/", example: "Sok is swimming in the pool." },
        { word: "is dancing together", km: "កំពុងរាំជាមួយគ្នា", icon: "💃", ipa: "/ɪz ˈdɑːnsɪŋ/", example: "Girls are dancing together." },
        { word: "is watching TV", km: "កំពុងមើលទូរទស្សន៍", icon: "📺", ipa: "/ɪz ˈwɒtʃɪŋ ˌtiːˈviː/", example: "Grandfather is watching TV." },
        { word: "is sleeping on bed", km: "កំពុងគេងលើគ្រែ", icon: "🛌", ipa: "/ɪz ˈsliːpɪŋ ɒn bɛd/", example: "The baby is sleeping on the bed." },
        { word: "is writing a lesson", km: "កំពុងសរសេរមេរៀន", icon: "✍️", ipa: "/ɪz ˈraɪtɪŋ ə ˈlɛsn/", example: "Student is writing a lesson." }
      ],
      builder: [
        { target: ["She", "is", "reading", "a book."], km: "នាងកំពុងអានសៀវភៅ។", icon: "📚" },
        { target: ["They", "are", "playing", "football."], km: "ពួកគាត់កំពុងលេងបាល់ទាត់។", icon: "⚽" },
        { target: ["My mother", "is", "cooking", "dinner."], km: "ម្តាយរបស់ខ្ញុំកំពុងធ្វើម្ហូប។", icon: "🍳" },
        { target: ["Sokha", "is", "riding", "a bicycle."], km: "សុខាកំពុងជិះកង់។", icon: "🚲" },
        { target: ["He", "is", "drinking", "fresh water."], km: "គាត់កំពុងផឹកទឹកបរិសុទ្ធ។", icon: "💧" },
        { target: ["We", "are", "studying", "English."], km: "ពួកយើងកំពុងរៀនភាសាអង់គ្លេស។", icon: "📝" },
        { target: ["They", "are", "drawing", "a picture."], km: "ពួកគាត់កំពុងគូររូប។", icon: "🎨" },
        { target: ["She", "is", "listening to", "music."], km: "នាងកំពុងស្តាប់តន្ត្រី។", icon: "🎧" },
        { target: ["Dara", "is", "washing", "the dishes."], km: "ដារាកំពុងលាងចាន។", icon: "🍽️" },
        { target: ["The boys", "are", "running", "fast."], km: "ក្មេងប្រុសៗកំពុងរត់លឿន។", icon: "🏃" },
        { target: ["Sok", "is", "swimming", "in pool."], km: "សុខកំពុងហែលទឹកក្នុងអាង។", icon: "🏊" },
        { target: ["Girls", "are", "dancing", "together."], km: "ក្មេងស្រីៗកំពុងរាំជាមួយគ្នា។", icon: "💃" },
        { target: ["Grandfather", "is", "watching", "TV."], km: "លោកតាមើលទូរទស្សន៍។", icon: "📺" },
        { target: ["The baby", "is", "sleeping", "now."], km: "ទារកកំពុងគេងឥឡូវនេះ។", icon: "🛌" },
        { target: ["I", "am", "writing", "my lesson."], km: "ខ្ញុំកំពុងសរសេរមេរៀនរបស់ខ្ញុំ។", icon: "✍️" }
      ],
      quiz: [
        { q: "Sokha _______ reading a book right now.", choices: ["is", "are", "am"], ans: 0 },
        { q: "They _______ playing football in the school yard.", choices: ["is", "are", "am"], ans: 1 },
        { q: "What is 'is cooking' in Khmer?", choices: ["កំពុងអាន", "កំពុងធ្វើម្ហូប", "កំពុងជិះកង់"], ans: 1 },
        { q: "I _______ studying English today.", choices: ["am", "is", "are"], ans: 0 },
        { q: "She _______ riding her new bicycle.", choices: ["is", "are", "am"], ans: 0 },
        { q: "What is he doing? He is _______ water.", choices: ["drinking", "eating", "sleeping"], ans: 0 },
        { q: "My mother is _______ dinner in the kitchen.", choices: ["cooking", "playing", "flying"], ans: 0 },
        { q: "The children are _______ to music.", choices: ["listening", "reading", "cooking"], ans: 0 },
        { q: "Grandfather is _______ TV.", choices: ["watching", "eating", "riding"], ans: 0 },
        { q: "Dara is _______ the dishes.", choices: ["washing", "flying", "jumping"], ans: 0 },
        { q: "Sok is _______ in the pool.", choices: ["swimming", "drawing", "writing"], ans: 0 },
        { q: "The baby is _______ on the bed.", choices: ["sleeping", "cooking", "driving"], ans: 0 },
        { q: "They are _______ pictures in art class.", choices: ["drawing", "drinking", "swimming"], ans: 0 },
        { q: "We are _______ our English lesson.", choices: ["writing", "eating", "cooking"], ans: 0 },
        { q: "She is _______ happily with her friends.", choices: ["dancing", "washing", "drinking"], ans: 0 }
      ]
    },
    // Unit 2: Prepositions of Place
    1: {
      vocab: [
        { word: "next to", km: "នៅជិត / នៅក្បែរ", icon: "🔜", ipa: "/nɛkst tuː/", example: "The cat is next to the lamp." },
        { word: "on top of", km: "នៅលើ / នៅលើកំពូល", icon: "🔝", ipa: "/ɒn tɒp ɒv/", example: "The book is on top of the desk." },
        { word: "under", km: "នៅខាងក្រោម", icon: "⬇️", ipa: "/ˈʌndər/", example: "The shoes are under the bed." },
        { word: "in front of", km: "នៅខាងមុខ", icon: "▶️", ipa: "/ɪn frʌnt ɒv/", example: "The dog is in front of the house." },
        { word: "behind", km: "នៅខាងក្រោយ", icon: "🔙", ipa: "/bɪˈhaɪnd/", example: "The ball is behind the chair." },
        { word: "in the box", km: "នៅក្នុងប្រអប់", icon: "📥", ipa: "/ɪn ðə bɒks/", example: "The toy is in the box." },
        { word: "on the rug", km: "នៅលើកំរាលព្រំ", icon: "🌸", ipa: "/ɒn ðə rʌɡ/", example: "The cat sits on the rug." },
        { word: "under window", km: "នៅក្រោមបង្អួច", icon: "🪟", ipa: "/ˈʌndər ˈwɪndəʊ/", example: "The table is under the window." },
        { word: "behind plant", km: "នៅពីក្រោយដើមឈើ", icon: "🪴", ipa: "/bɪˈhaɪnd plɑːnt/", example: "The cat is behind the plant." },
        { word: "on wardrobe", km: "នៅលើទូខោអាវ", icon: "🚪", ipa: "/ɒn ˈwɔːdrəʊb/", example: "The box is on top of wardrobe." },
        { word: "next to bookshelf", km: "នៅក្បែរទូសៀវភៅ", icon: "📚", ipa: "/nɛkst tuː ˈbʊkʃɛlf/", example: "He stands next to bookshelf." },
        { word: "on the chair", km: "នៅលើកៅអី", icon: "🪑", ipa: "/ɒn ðə tʃɛər/", example: "The cat sleeps on the chair." },
        { word: "under the bed", km: "នៅក្រោមគ្រែគេង", icon: "🛌", ipa: "/ˈʌndər ðə bɛd/", example: "The shoes are under the bed." },
        { word: "on the desk", km: "នៅលើតុរៀន", icon: "💻", ipa: "/ɒn ðə dɛsk/", example: "The laptop is on the desk." },
        { word: "behind the door", km: "នៅពីក្រោយទ្វារ", icon: "🚪", ipa: "/bɪˈhaɪnd ðə dɔːr/", example: "Hiding behind the door." }
      ],
      builder: [
        { target: ["The cat", "is", "next to", "the lamp."], km: "ឆ្មាគឺនៅក្បែរចង្កៀង។", icon: "💡" },
        { target: ["The book", "is", "on", "the table."], km: "សៀវភៅគឺនៅលើតុ។", icon: "📖" },
        { target: ["The dog", "is", "under", "the bed."], km: "ឆ្កែគឺនៅក្រោមគ្រែ។", icon: "🐕" },
        { target: ["The toy", "is", "in", "the box."], km: "ប្រដាប់ក្មេងលេងគឺនៅក្នុងប្រអប់។", icon: "📦" },
        { target: ["The cat", "sits", "on", "the rug."], km: "ឆ្មាអង្គុយនៅលើកំរាលព្រំ។", icon: "🌸" },
        { target: ["The chair", "is", "under", "the window."], km: "កៅអីគឺនៅក្រោមបង្អួច។", icon: "🪟" },
        { target: ["The cat", "is hiding", "behind", "the plant."], km: "ឆ្មាកំពុងពួននៅក្រោយដើមឈើ។", icon: "🪴" },
        { target: ["The box", "is", "on top of", "the wardrobe."], km: "ប្រអប់គឺនៅលើទូខោអាវ។", icon: "🚪" },
        { target: ["He", "stands", "in front of", "the chair."], km: "គាត់ឈរនៅខាងមុខកៅអី។", icon: "🪑" },
        { target: ["She", "is", "next to", "the bookshelf."], km: "នាងនៅក្បែរទូសៀវភៅ។", icon: "📚" },
        { target: ["The cat", "is sleeping", "on", "the chair."], km: "ឆ្មាកំពុងគេងនៅលើកៅអី។", icon: "🪑" },
        { target: ["The shoes", "are", "under", "the bed."], km: "ស្បែកជើងគឺនៅក្រោមគ្រែ។", icon: "👟" },
        { target: ["The laptop", "is", "on", "the desk."], km: "កុំព្យូទ័រគឺនៅលើតុរៀន។", icon: "💻" },
        { target: ["Dara", "is hiding", "behind", "the door."], km: "ដារាកំពុងពួននៅក្រោយទ្វារ។", icon: "🚪" },
        { target: ["The lamp", "is", "next to", "the bed."], km: "ចង្កៀងគឺនៅក្បែរគ្រែគេង។", icon: "💡" }
      ],
      quiz: [
        { q: "The book is _______ the desk.", choices: ["on", "under", "in"], ans: 0 },
        { q: "The cat is sleeping _______ the bed.", choices: ["under", "between", "behind"], ans: 0 },
        { q: "What is 'next to' in Khmer?", choices: ["នៅក្នុង", "នៅជិត/ក្បែរ", "នៅខាងក្រោយ"], ans: 1 },
        { q: "The toy is _______ the cardboard box.", choices: ["in", "under", "between"], ans: 0 },
        { q: "The cat sits _______ the pink rug.", choices: ["on", "in", "under"], ans: 0 },
        { q: "The table is _______ the window.", choices: ["under", "on", "in"], ans: 0 },
        { q: "The ball rolled _______ the door.", choices: ["behind", "on", "in"], ans: 0 },
        { q: "The laptop is on top _______ the desk.", choices: ["of", "in", "to"], ans: 0 },
        { q: "Standing _______ front of the school.", choices: ["in", "on", "under"], ans: 0 },
        { q: "The shoes are _______ the bed.", choices: ["under", "in", "on"], ans: 0 },
        { q: "Put the lamp next _______ the bed.", choices: ["to", "in", "on"], ans: 0 },
        { q: "The plant is _______ the window.", choices: ["next to", "under", "in"], ans: 0 },
        { q: "Hiding _______ the wardrobe.", choices: ["behind", "on", "in"], ans: 0 },
        { q: "The clock is _______ the wall.", choices: ["on", "in", "under"], ans: 0 },
        { q: "The cat is _______ the chair.", choices: ["on", "in", "under"], ans: 0 }
      ]
    },
    // Unit 3: Daily Routines
    2: {
      vocab: [
        { word: "wake up", km: "ភ្ញាក់ពីគេង", icon: "⏰", ipa: "/weɪk ʌp/", example: "I wake up at 6:00 AM." },
        { word: "brush teeth", km: "ដុសធ្មេញ", icon: "🪥", ipa: "/brʌʃ tiːθ/", example: "I brush my teeth every morning." },
        { word: "wash face", km: "លុបមុខ", icon: "🧼", ipa: "/wɒʃ feɪs/", example: "She washes her face." },
        { word: "eat breakfast", km: "ញ៉ាំអាហារពេលព្រឹក", icon: "🍳", ipa: "/iːt ˈbrɛkfəst/", example: "We eat breakfast together." },
        { word: "go to school", km: "ទៅសាលារៀន", icon: "🏫", ipa: "/ɡəʊ tuː skuːl/", example: "They go to school by bus." },
        { word: "study lesson", km: "រៀនសូត្រមេរៀន", icon: "📖", ipa: "/ˈstʌdi ˈlɛsn/", example: "Students study lessons." },
        { word: "eat lunch", km: "ញ៉ាំអាហារពេលថ្ងៃ", icon: "🍱", ipa: "/iːt lʌntʃ/", example: "We eat lunch at 12:00 PM." },
        { word: "play with friends", km: "លេងជាមួយមិត្តភក្តិ", icon: "⚽", ipa: "/pleɪ wɪð frɛndz/", example: "Play with friends in yard." },
        { word: "go home", km: "ត្រឡប់ទៅផ្ទះ", icon: "🏠", ipa: "/ɡəʊ həʊm/", example: "Go home at 4:30 PM." },
        { word: "do homework", km: "ធ្វើកិច្ចការផ្ទះ", icon: "✍️", ipa: "/duː ˈhəʊmwɜːk/", example: "I do homework at night." },
        { word: "cook dinner", km: "ធ្វើអាហារពេលល្ងាច", icon: "🍲", ipa: "/kʊk ˈdɪnər/", example: "Cook dinner together." },
        { word: "take a shower", km: "ងូតទឹក", icon: "🚿", ipa: "/teɪk ə ˈʃaʊər/", example: "Take a clean shower." },
        { word: "watch news", km: "មើលព័ត៌មាន", icon: "📺", ipa: "/wɒtʃ njuːz/", example: "Watch news on TV." },
        { word: "read storybook", km: "អានសៀវភៅរឿង", icon: "📚", ipa: "/riːd ˈstɔːribʊk/", example: "Read a storybook." },
        { word: "go to sleep", km: "ចូលគេង", icon: "🌙", ipa: "/ɡəʊ tuː sliːp/", example: "Go to sleep at 9:00 PM." }
      ],
      builder: [
        { target: ["I", "wake up", "at", "6:00 AM."], km: "ខ្ញុំភ្ញាក់ពីគេងនៅម៉ោង ៦ ព្រឹក។", icon: "⏰" },
        { target: ["I", "brush my teeth", "every day."], km: "ខ្ញុំដុសធ្មេញរៀងរាល់ថ្ងៃ។", icon: "🪥" },
        { target: ["She", "washes her face", "with water."], km: "នាងលុបមុខជាមួយទឹក។", icon: "🧼" },
        { target: ["We", "eat breakfast", "together."], km: "ពួកយើងញ៉ាំអាហារពេលព្រឹកជាមួយគ្នា។", icon: "🍳" },
        { target: ["They", "go to school", "by bus."], km: "ពួកគាត់ទៅសាលារៀនដោយឡានក្រុង។", icon: "🏫" },
        { target: ["Students", "study lessons", "in class."], km: "សិស្សរៀនមេរៀនក្នុងថ្នាក់។", icon: "📖" },
        { target: ["We", "eat lunch", "at noon."], km: "ពួកយើងញ៉ាំអាហារថ្ងៃត្រង់នៅពេលថ្ងៃ។", icon: "🍱" },
        { target: ["I", "play with friends", "after school."], km: "ខ្ញុំលេងជាមួយមិត្តភក្តិក្រោយចេញពីរៀន។", icon: "⚽" },
        { target: ["They", "go home", "at 4:30 PM."], km: "ពួកគាត់ត្រឡប់ទៅផ្ទះនៅម៉ោង ៤:៣០។", icon: "🏠" },
        { target: ["I", "do my homework", "at night."], km: "ខ្ញុំធ្វើកិច្ចការផ្ទះនៅពេលយប់។", icon: "✍️" },
        { target: ["My mother", "cooks dinner", "happily."], km: "ម្តាយខ្ញុំធ្វើអាហារល្ងាចដោយសប្បាយចិត្ត។", icon: "🍲" },
        { target: ["I", "take a shower", "every day."], km: "ខ្ញុំងូតទឹកជារៀងរាល់ថ្ងៃ។", icon: "🚿" },
        { target: ["Grandfather", "watches news", "on TV."], km: "លោកតាមើលព័ត៌មានលើទូរទស្សន៍។", icon: "📺" },
        { target: ["Bopha", "reads a storybook", "before bed."], km: "បុប្ផាអានសៀវភៅរឿងមុនពេលគេង។", icon: "📚" },
        { target: ["I", "go to sleep", "at 9:00 PM."], km: "ខ្ញុំចូលគេងនៅម៉ោង ៩ យប់។", icon: "🌙" }
      ],
      quiz: [
        { q: "I _______ my teeth every morning.", choices: ["brush", "wash", "eat"], ans: 0 },
        { q: "What meal do you eat in the morning?", choices: ["Dinner", "Lunch", "Breakfast"], ans: 2 },
        { q: "I go to sleep at _______.", choices: ["9:00 PM", "7:00 AM", "12:00 PM"], ans: 0 },
        { q: "I wake _______ at 6:00 AM.", choices: ["up", "on", "in"], ans: 0 },
        { q: "They go _______ school by bicycle.", choices: ["to", "in", "on"], ans: 0 },
        { q: "We eat _______ at 12:00 PM noon.", choices: ["lunch", "breakfast", "dinner"], ans: 0 },
        { q: "I do my _______ at night.", choices: ["homework", "shower", "bed"], ans: 0 },
        { q: "She washes her _______ with soap.", choices: ["face", "teeth", "books"], ans: 0 },
        { q: "Take a _______ every evening.", choices: ["shower", "homework", "lesson"], ans: 0 },
        { q: "We eat _______ in the evening.", choices: ["dinner", "breakfast", "lunch"], ans: 0 },
        { q: "They go _______ at 4:30 PM.", choices: ["home", "school", "class"], ans: 0 },
        { q: "Read a _______ before going to sleep.", choices: ["storybook", "bed", "shower"], ans: 0 },
        { q: "Watch news on _______.", choices: ["TV", "bed", "teeth"], ans: 0 },
        { q: "Study English _______ in the morning.", choices: ["lesson", "shower", "teeth"], ans: 0 },
        { q: "Play with _______ after class.", choices: ["friends", "homework", "bed"], ans: 0 }
      ]
    }
  };

  if (dataset[unitId]) return dataset[unitId];

  // Specific thematic definitions for Units 4 through 15
  const topicSpecs: Record<number, { words: { w: string; k: string; ic?: string; icon?: string; ip?: string; ipa?: string; ex?: string; example?: string }[] }> = {
    3: { // Unit 4: Occupations
      words: [
        { w: "doctor", k: "គ្រូពេទ្យ", ic: "👨‍⚕️", ip: "/ˈdɒktər/", ex: "Doctor works in hospital." },
        { w: "teacher", k: "គ្រូបង្រៀន", ic: "👩‍🏫", ip: "/ˈtiːtʃər/", ex: "Teacher teaches students." },
        { w: "farmer", k: "កសិករ", ic: "🌾", ip: "/ˈfɑːrmər/", ex: "Farmer grows rice." },
        { w: "nurse", k: "គិលានុបដ្ឋាយិកា", ic: "👩‍⚕️", ip: "/nɜːrs/", ex: "Nurse helps sick people." },
        { w: "police officer", k: "នគរបាល", ic: "👮‍♂️", ip: "/pəˈliːs ˈɒfɪsər/", ex: "Police officer protects town." },
        { w: "chef", k: "ចុងភៅ", ic: "🧑‍🍳", ip: "/ʃɛf/", ex: "Chef cooks food." },
        { w: "driver", k: "អ្នកបើកបរ", ic: "🚗", ip: "/ˈdraɪvər/", ex: "Drives a bus." },
        { w: "pilot", k: "អ្នកបើកបរយន្តហោះ", ic: "✈️", ip: "/ˈpaɪlət/", ex: "Flies an airplane." },
        { w: "firefighter", k: "អ្នកពន្លត់អគ្គីភ័យ", ic: "👨‍🚒", ip: "/ˈfaɪərˌfaɪtər/", ex: "Puts out fires." },
        { w: "painter", k: "ជាងគំនូរ", ic: "🎨", ip: "/ˈpeɪntər/", ex: "Paints pictures." },
        { w: "singer", k: "អ្នកចម្រៀង", ic: "🎤", ip: "/ˈsɪŋər/", ex: "Sings songs." },
        { w: "dentist", k: "គ្រូពេទ្យធ្មេញ", ic: "🦷", ip: "/ˈdɛntɪst/", ex: "Checks your teeth." },
        { w: "waiter", k: "អ្នករត់តុ", ic: "🤵", ip: "/ˈweɪtər/", ex: "Serves food in restaurant." },
        { w: "mechanic", k: "ជាងជួសជុល", ic: "🔧", ip: "/mɪˈkænɪk/", ex: "Fixes vehicles." },
        { w: "fisherman", k: "អ្នកនេសាទ", ic: "🎣", ip: "/ˈfɪʃərmən/", ex: "Catches fresh fish." }
      ]
    },
    4: { // Unit 5: Food & Drinks
      words: [
        { w: "fried chicken", k: "មាន់បំពង", ic: "🍗", ip: "/fraɪd ˈtʃɪkɪn/", ex: "Eats fried chicken." },
        { w: "rice and soup", k: "បាយ និងស៊ុប", ic: "🍲", ip: "/raɪs ænd suːp/", ex: "Eats rice and soup." },
        { w: "orange juice", k: "ទឹកក្រូចស្រស់", ic: "🍊", ip: "/ˈɒrɪndʒ dʒuːs/", ex: "Drinks orange juice." },
        { w: "fresh milk", k: "ទឹកដោះគោស្រស់", ic: "🥛", ip: "/frɛʃ mɪlk/", ex: "Drinks fresh milk." },
        { w: "red apples", k: "ផ្លែប៉ោមក្រហម", ic: "🍎", ip: "/rɛd ˈæplz/", ex: "Sweet red apples." },
        { w: "yellow bananas", k: "ផ្លែចេកទុំ", ic: "🍌", ip: "/ˈjɛləʊ bəˈnɑːnəz/", ex: "Monkeys like bananas." },
        { w: "fried noodles", k: "មីឆា / គុយទាវឆា", ic: "🍜", ip: "/fraɪd ˈnuːdlz/", ex: "Eats fried noodles." },
        { w: "pure water", k: "ទឹកបរិសុទ្ធ", ic: "💧", ip: "/pjʊər ˈwɔːtər/", ex: "Drinks pure water." },
        { w: "white bread", k: "នំបុ័ង", ic: "🍞", ip: "/waɪt brɛd/", ex: "Eats white bread." },
        { w: "sweet cake", k: "នំខេក", ic: "🍰", ip: "/swiːt keɪk/", ex: "Birthday sweet cake." },
        { w: "hot coffee", k: "កាហ្វេក្តៅ", ic: "☕", ip: "/hɒt ˈkɒfi/", ex: "Father drinks coffee." },
        { w: "green tea", k: "តែបៃតង", ic: "🍵", ip: "/ɡriːn tiː/", ex: "Drinks green tea." },
        { w: "ice cream", k: "ការ៉ែម", ic: "🍦", ip: "/aɪs kriːm/", ex: "Sweet ice cream." },
        { w: "fresh fish", k: "ត្រីស្រស់", ic: "🐟", ip: "/frɛʃ fɪʃ/", ex: "Cooks fresh fish." },
        { w: "beef steak", k: "សាច់គោអាំង", ic: "🥩", ip: "/biːf steɪk/", ex: "Delicious beef steak." }
      ]
    },
    5: { // Unit 6: Animals
      words: [
        { w: "elephant", k: "ដំរី", ic: "🐘", ip: "/ˈɛlɪfənt/", ex: "Big Asian elephant." },
        { w: "tiger", k: "ខ្លា", ic: "🐅", ip: "/ˈtaɪɡər/", ex: "Fierce tiger in jungle." },
        { w: "monkey", k: "ស្វា", ic: "🐒", ip: "/ˈmʌŋki/", ex: "Playful monkey on tree." },
        { w: "bird", k: "សត្វស្លាប", ic: "🐦", ip: "/bɜːrd/", ex: "Bird sings in morning." },
        { w: "fish", k: "ត្រី", ic: "🐟", ip: "/fɪʃ/", ex: "Fish swims in water." },
        { w: "crocodile", k: "ក្រពើ", ic: "🐊", ip: "/ˈkrɒkədaɪl/", ex: "Crocodile in river." },
        { w: "lion", k: "សត្វតោ", ic: "🦁", ip: "/ˈlaɪən/", ex: "King of the jungle." },
        { w: "rabbit", k: "ទន្សាយ", ic: "🐇", ip: "/ˈræbɪt/", ex: "White rabbit hops." },
        { w: "snake", k: "ពស់", ic: "🐍", ip: "/sneɪk/", ex: "Long snake in grass." },
        { w: "bear", k: "ខ្លាឃ្មុំ", ic: "🐻", ip: "/bɛər/", ex: "Big brown bear." },
        { w: "cow", k: "គោ", ic: "🐄", ip: "/kaʊ/", ex: "Cow eats grass." },
        { w: "horse", k: "សេះ", ic: "🐎", ip: "/hɔːrs/", ex: "Horse runs fast." },
        { w: "dog", k: "ឆ្កែ", ic: "🐕", ip: "/dɒɡ/", ex: "Loyal pet dog." },
        { w: "cat", k: "ឆ្មា", ic: "🐈", ip: "/kæt/", ex: "Cute little cat." },
        { w: "duck", k: "ទា", ic: "🦆", ip: "/dʌk/", ex: "Duck swims in pond." }
      ]
    },
    6: { // Unit 7: Places & Directions
      words: [
        { w: "hospital", k: "មន្ទីរពេទ្យ", ic: "🏥", ip: "/ˈhɒspɪtl/", ex: "Doctors in hospital." },
        { w: "school", k: "សាលារៀន", ic: "🏫", ip: "/skuːl/", ex: "Students at school." },
        { w: "market", k: "ផ្សារ", ic: "🛒", ip: "/ˈmɑːrkɪt/", ex: "Buy food at market." },
        { w: "bank", k: "ធនាគារ", ic: "🏦", ip: "/bæŋk/", ex: "Keep money at bank." },
        { w: "pagoda", k: "វត្តអារាម", ic: "🛕", ip: "/pəˈɡəʊdə/", ex: "Monks in pagoda." },
        { w: "turn left", k: "បទឆ្វេង", ic: "⬅️", ip: "/tɜːrn lɛft/", ex: "Turn left at corner." },
        { w: "turn right", k: "បទស្តាំ", ic: "➡️", ip: "/tɜːrn raɪt/", ex: "Turn right after market." },
        { w: "go straight", k: "ទៅត្រង់", ic: "⬆️", ip: "/ɡəʊ streɪt/", ex: "Go straight ahead." },
        { w: "park", k: "សួនច្បារ", ic: "🏞️", ip: "/pɑːrk/", ex: "Play in green park." },
        { w: "library", k: "បណ្ណាល័យ", ic: "📚", ip: "/ˈlaɪbrəri/", ex: "Read books in library." },
        { w: "restaurant", k: "ភោជនីយដ្ឋាន", ic: "🍽️", ip: "/ˈrɛstrɒnt/", ex: "Eat at restaurant." },
        { w: "post office", k: "ប្រៃសណីយ៍", ic: "📮", ip: "/pəʊst ˈɒfɪs/", ex: "Send letter at post office." },
        { w: "bus station", k: "ស្ថានីយឡានក្រុង", ic: "🚌", ip: "/bʌs ˈsteɪʃn/", ex: "Catch bus at station." },
        { w: "bridge", k: "ស្ពាន", ic: "🌉", ip: "/brɪdʒ/", ex: "Cross the bridge." },
        { w: "airport", k: "ព្រលានយន្តហោះ", ic: "🛫", ip: "/ˈɛərpɔːrt/", ex: "Fly from airport." }
      ]
    },
    7: { // Unit 8: Weather & Seasons
      words: [
        { w: "sunny day", k: "ថ្ងៃមានពន្លឺថ្ងៃក្តៅ", ic: "☀️", ip: "/ˈsʌni deɪ/", ex: "Bright sunny day." },
        { w: "rainy weather", k: "អាកាសធាតុភ្លៀង", ic: "🌧️", ip: "/ˈreɪni ˈwɛðər/", ex: "Take umbrella in rainy weather." },
        { w: "cold wind", k: "ខ្យល់ត្រជាក់", ic: "🌬️", ip: "/kəʊld wɪnd/", ex: "Wear coat in cold wind." },
        { w: "hot season", k: "រដូវក្តៅ", ic: "🌡️", ip: "/hɒt ˈsiːzn/", ex: "Drink water in hot season." },
        { w: "dry season", k: "រដូវប្រាំង", ic: "🌵", ip: "/draɪ ˈsiːzn/", ex: "Dry season in Cambodia." },
        { w: "wet season", k: "រដូវវស្សា", ic: "⛈️", ip: "/wɛt ˈsiːzn/", ex: "Rains in wet season." },
        { w: "cloudy sky", k: "មេឃមានពពកច្រើន", ic: "☁️", ip: "/ˈklaʊdi skaɪ/", ex: "Cloudy sky today." },
        { w: "stormy night", k: "យប់មានព្យុះ", ic: "🌩️", ip: "/ˈstɔːrmi naɪt/", ex: "Thunder on stormy night." },
        { w: "cool breeze", k: "ខ្យល់រំភើយត្រជាក់", ic: "🍃", ip: "/kuːl briːz/", ex: "Enjoy cool breeze." },
        { w: "rainbow", k: "ឥន្ទធនូ", ic: "🌈", ip: "/ˈreɪnbəʊ/", ex: "Beautiful rainbow after rain." },
        { w: "umbrella", k: "ឆ័ត្រ", ic: "☂️", ip: "/ʌmˈbrɛlə/", ex: "Hold umbrella." },
        { w: "raincoat", k: "អាវភ្លៀង", ic: "🧥", ip: "/ˈreɪnkəʊt/", ex: "Wear raincoat." },
        { w: "sunhat", k: "មួកបាំងថ្ងៃ", ic: "👒", ip: "/ˈsʌnhæt/", ex: "Wear sunhat." },
        { w: "sunglasses", k: "វ៉ែនតាកាពារពន្លឺថ្ងៃ", ic: "🕶️", ip: "/ˈsʌnˌɡlæsɪz/", ex: "Wear sunglasses." },
        { w: "windy day", k: "ថ្ងៃមានខ្យល់ខ្លាំង", ic: "💨", ip: "/ˈwɪndi deɪ/", ex: "Fly kites on windy day." }
      ]
    },
    8: { // Unit 9: Health & Illnesses
      words: [
        { w: "headache", k: "ឈឺក្បាល", icon: "🤕", ipa: "/ˈhɛdeɪk/", example: "I have a headache." },
        { w: "fever", k: "គ្រុនក្តៅ", icon: "🤒", ipa: "/ˈfiːvər/", example: "High fever today." },
        { w: "stomachache", k: "ឈឺពោះ", icon: "🤢", ipa: "/ˈstʌmək-eɪk/", example: "Eating bad food causes stomachache." },
        { w: "cough", k: "ក្អក", icon: "😷", ipa: "/kɒf/", example: "Drink warm tea for cough." },
        { w: "sore throat", k: "ឈឺបំពង់ក", icon: "🗣️", ipa: "/sɔːr θrəʊt/", example: "Sore throat needs rest." },
        { w: "toothache", k: "ឈឺធ្មេញ", icon: "🦷", ipa: "/ˈtuːθeɪk/", example: "Visit dentist for toothache." },
        { w: "cold", k: "ផ្តាសាយ", icon: "🤧", ipa: "/kəʊld/", example: "Common cold in rainy weather." },
        { w: "medicine", k: "ថ្នាំពេទ្យ", icon: "💊", ipa: "/ˈmɛdsn/", example: "Take medicine after meal." },
        { w: "doctor check", k: "ពិនិត្យសុខភាព", icon: "🩺", ipa: "/ˈdɒktər tʃɛk/", example: "Doctor checks patient." },
        { w: "rest in bed", k: "សម្រាកលើគ្រែ", icon: "🛌", ipa: "/rɛst ɪn bɛd/", example: "Rest in bed when sick." },
        { w: "drink water", k: "ផឹកទឹកឱ្យបានច្រើន", icon: "🥤", ipa: "/drɪŋk ˈwɔːtər/", example: "Drink plenty of warm water." },
        { w: "healthy food", k: "អាហារមានជីវជាតិ", icon: "🥗", ipa: "/ˈhɛlθi fuːd/", example: "Eat healthy food daily." },
        { w: "wash hands", k: "លាងដៃជាមួយសាប៊ូ", icon: "🧼", ipa: "/wɒʃ hændz/", example: "Wash hands before eating." },
        { w: "hospital room", k: "បន្ទប់ជំងឺ", icon: "🏥", ipa: "/ˈhɒspɪtl ruːm/", example: "Patient in hospital room." },
        { w: "exercise", k: "ហាត់ប្រាណ", icon: "🏃", ipa: "/ˈɛksərsaɪz/", example: "Daily exercise keeps healthy." }
      ]
    },
    9: { // Unit 10: Clothes & Shopping
      words: [
        { w: "shirt", k: "អាវស Pass", icon: "👔", ipa: "/ʃɜːrt/", example: "White shirt for school." },
        { w: "trousers / pants", k: "ខោវែង", icon: "👖", ipa: "/ˈtraʊzərz/", example: "Blue jeans trousers." },
        { w: "skirt", k: "សំពត់", icon: "👗", ipa: "/skɜːrt/", example: "Girls wear navy skirt." },
        { w: "shoes", k: "ស្បែកជើង", icon: "👟", ipa: "/ʃuːz/", example: "Black leather shoes." },
        { w: "hat", k: "មួក", icon: "🧢", ipa: "/hæt/", example: "Wear hat in sun." },
        { w: "socks", k: "ស្រោមជើង", icon: "🧦", ipa: "/sɒks/", example: "Clean white socks." },
        { w: "jacket", k: "អាវរងា / អាវក្រៅ", icon: "🧥", ipa: "/ˈdʒækɪt/", example: "Warm winter jacket." },
        { w: "dress", k: "រ៉ូប", icon: "👗", ipa: "/drɛs/", example: "Pretty pink dress." },
        { w: "belt", k: "ខ្សែក្រវាត់", icon: "🎗️", ipa: "/bɛlt/", example: "Black leather belt." },
        { w: "t-shirt", k: "អាវយឺត", icon: "👕", ipa: "/ˈtiː ʃɜːrt/", example: "Casual cotton t-shirt." },
        { w: "how much", k: "តម្លៃប៉ុន្មាន?", icon: "🏷️", ipa: "/haʊ mʌtʃ/", example: "How much is this shirt?" },
        { w: "buy clothes", k: "ទិញសម្លៀកបំពាក់", icon: "🛍️", ipa: "/baɪ kləʊðz/", example: "Buy clothes at market." },
        { w: "cheap price", k: "តម្លៃថោកសមរម្យ", icon: "🪙", ipa: "/tʃiːp praɪs/", example: "Cheap price today." },
        { w: "expensive", k: "ថ្លៃ", icon: "💎", ipa: "/ɪkˈspɛnsɪv/", example: "Expensive silk dress." },
        { w: "change money", k: "អាប់ប្រាក់", icon: "💵", ipa: "/tʃeɪndʒ ˈmʌni/", example: "Get change money back." }
      ]
    },
    10: { // Unit 11: School Subjects & Hobbies
      words: [
        { w: "Mathematics", k: "គណិតវិទ្យា", icon: "📐", ipa: "/ˌmæθəˈmætɪks/", example: "Solve math numbers." },
        { w: "Science", k: "វិទ្យាសាស្ត្រ", icon: "🔬", ipa: "/ˈsaɪəns/", example: "Learn science experiments." },
        { w: "Khmer Literature", k: "អក្សរសាស្ត្រខ្មែរ", icon: "📖", ipa: "/ˈkmɛər ˈlɪtrətʃər/", example: "Study Khmer literature." },
        { w: "English Language", k: "ភាសាអង់គ្លេស", icon: "🔤", ipa: "/ˈɪŋɡlɪʃ ˈlæŋɡwɪdʒ/", example: "Speak English fluently." },
        { w: "Social Studies", k: "សិក្សាសង្គម", icon: "🌍", ipa: "/ˈsəʊʃl ˈstʌdiz/", example: "Learn history and geography." },
        { w: "Physical Education", k: "កាយអប់រំ", icon: "⚽", ipa: "/ˈfɪzɪkl ˌɛdʒuˈkeɪʃn/", example: "Play sports in PE." },
        { w: "Art and Music", k: "សិល្បៈ និងតន្ត្រី", icon: "🎨", ipa: "/ɑːrt ænd ˈmjuːzɪk/", example: "Draw and sing." },
        { w: "reading books", k: "ការអានសៀវភៅ", icon: "📚", ipa: "/ˈriːdɪŋ bʊks/", example: "My hobby is reading books." },
        { w: "playing guitar", k: "ការលេងហ្គីតា", icon: "🎸", ipa: "/ˈpleɪɪŋ ɡɪˈtɑːr/", example: "He loves playing guitar." },
        { w: "drawing pictures", k: "ការគូររូបភាព", icon: "🖍️", ipa: "/ˈdrɔːɪŋ ˈpɪktʃərz/", example: "Enjoy drawing pictures." },
        { w: "swimming hobby", k: "ការហែលទឹក", icon: "🏊", ipa: "/ˈswɪmɪŋ ˈhɒbi/", example: "Swimming in summer." },
        { w: "gardening", k: "ការធ្វើសួនដំណាំ", icon: "🪴", ipa: "/ˈɡɑːrdnɪŋ/", example: "Grandmother loves gardening." },
        { w: "cooking food", k: "ការធ្វើម្ហូប", icon: "🍳", ipa: "/ˈkʊkɪŋ fuːd/", example: "Cooking with family." },
        { w: "watching movies", k: "ការទស្សនាភាពយន្ត", icon: "🎬", ipa: "/ˈwɒtʃɪŋ ˈmuːviz/", example: "Watching movies together." },
        { w: "playing chess", k: "ការលេងអុក", icon: "♟️", ipa: "/ˈpleɪɪŋ tʃɛs/", example: "Play chess with friends." }
      ]
    },
    11: { // Unit 12: Past Events
      words: [
        { w: "visited Angkor Wat", k: "បានទៅទស្សនាប្រាសាទអង្គរវត្ត", icon: "🛕", ipa: "/ˈvɪzɪtɪd ˈæŋkɔːr wɒt/", example: "We visited Angkor Wat last year." },
        { w: "played football", k: "បានលេងបាល់ទាត់", icon: "⚽", ipa: "/pleɪd ˈfʊtbɔːl/", example: "They played football yesterday." },
        { w: "went to Phnom Penh", k: "បានទៅភ្នំពេញ", icon: "🏙️", ipa: "/wɛnt tuː pəˈnɒm pɛn/", example: "Sokha went to Phnom Penh." },
        { w: "cooked delicious food", k: "បានធ្វើម្ហូបឆ្ងាញ់", icon: "🍲", ipa: "/kʊkt dɪˈlɪʃəs fuːd/", example: "Mother cooked delicious soup." },
        { w: "studied hard", k: "បានខិតខំរៀន", icon: "📝", ipa: "/ˈstʌdɪd hɑːrd/", example: "Studied hard for exam." },
        { w: "bought new shoes", k: "បានទិញស្បែកជើងថ្មី", icon: "👟", ipa: "/bɔːt njuː ʃuːz/", example: "Bought new shoes yesterday." },
        { w: "met old friends", k: "បានជួបមិត្តភក្តិចាស់ៗ", icon: "🤝", ipa: "/mɛt əʊld frɛndz/", example: "Met old friends in Siem Reap." },
        { w: "cleaned the house", k: "បានសម្អាតផ្ទះ", icon: "🧹", ipa: "/kliːnd ðə haʊs/", example: "Cleaned the house on Sunday." },
        { w: "watched movie", k: "បានមើលភាពយន្ត", icon: "🎬", ipa: "/wɒtʃt ˈmuːvi/", example: "Watched an Khmer movie." },
        { w: "ate fresh fruits", k: "បានញ៉ាំផ្លែឈើស្រស់", icon: "🍉", ipa: "/eɪt frɛʃ fruːts/", example: "Ate sweet mangoes." },
        { w: "swam in river", k: "បានហែលទឹកទន្លេ", icon: "🏊", ipa: "/swæm ɪn ˈrɪvər/", example: "Swam in Mekong river." },
        { w: "slept early", k: "បានចូលគេងលឿន", icon: "🌙", ipa: "/slɛpt ˈɜːrli/", example: "Slept early last night." },
        { w: "wrote a letter", k: "បានសរសេរសំបុត្រ", icon: "✉️", ipa: "/rəʊt ə ˈlɛtər/", example: "Wrote a letter to friend." },
        { w: "sang a beautiful song", k: "បានច្រៀងចម្រៀងពិរោះ", icon: "🎤", ipa: "/sæŋ ə ˈsɒŋ/", example: "Sang song at party." },
        { w: "helped parents", k: "បានជួយឪពុកម្តាយ", icon: "❤️", ipa: "/hɛlpt ˈpɛərənts/", example: "Helped parents at farm." }
      ]
    },
    12: { // Unit 13: Sports & Recreation
      words: [
        { w: "football match", k: "ការប្រកួតបាល់ទាត់", icon: "⚽", ipa: "/ˈfʊtbɔːl mætʃ/", example: "Exiting football match." },
        { w: "volleyball court", k: "តារាងបាល់ទះ", icon: "🏐", ipa: "/ˈvɒlibɔːl kɔːrt/", example: "Play volleyball in evening." },
        { w: "badminton racket", k: "រ៉ាកែតវាយសី", icon: "🏸", ipa: "/ˈbædmɪntən ˈrækɪt/", example: "Play badminton with sister." },
        { w: "swimming pool", k: "អាងហែលទឹក", icon: "🏊", ipa: "/ˈswɪmɪŋ puːl/", example: "Swim in large pool." },
        { w: "running race", k: "ការរត់ប្រណាំង", icon: "🏃", ipa: "/ˈrʌnɪŋ reɪs/", example: "Won the running race." },
        { w: "cycling bicycle", k: "ការជិះកង់កម្សាន្ត", icon: "🚴", ipa: "/ˈsaɪklɪŋ ˈbaɪsɪkl/", example: "Cycling in national park." },
        { w: "basketball game", k: "ហ្គេមបាល់បោះ", icon: "🏀", ipa: "/ˈbɑːskɪtbɔːl ɡeɪm/", example: "Tall students play basketball." },
        { w: "table tennis", k: "វាយកូនឃ្លីលើតុ", icon: "🏓", ipa: "/ˈteɪbl ˈtɛnɪs/", example: "Table tennis in school gym." },
        { w: "jumping rope", k: "ការលោតខ្សែពួរ", icon: "🪢", ipa: "/ˈdʒʌmpɪŋ rəʊp/", example: "Girls jumping rope." },
        { w: "flying kites", k: "ការបង្ហោះខ្លែង", icon: "🪁", ipa: "/ˈflaɪɪŋ kaɪts/", example: "Flying kites in windy season." },
        { w: "hiking mountain", k: "ការដើរកម្សាន្តលើភ្នំ", icon: "🏔️", ipa: "/ˈhaɪkɪŋ ˈmaʊntən/", example: "Hiking Bokor mountain." },
        { w: "picnic in park", k: "ការពិកនិកក្នុងសួន", icon: "🧺", ipa: "/ˈpɪknɪk ɪn pɑːrk/", example: "Family picnic weekend." },
        { w: "skateboarding", k: "ការជិះក្តារស្កេត", icon: "🛹", ipa: "/ˈskeɪtbɔːrdɪŋ/", example: "Fun skateboarding." },
        { w: "martial arts (Kun Khmer)", k: "គុនខ្មែរ / ក្បាច់គុន", icon: "🥊", ipa: "/kʊn kmɛər/", example: "Practice Kun Khmer sport." },
        { w: "winning medal", k: "ទទួលបានមេដាយ", icon: "🥇", ipa: "/ˈwɪnɪŋ ˈmɛdl/", example: "Gold medal winner!" }
      ]
    },
    13: { // Unit 14: Days & Calendar
      words: [
        { w: "Monday", k: "ថ្ងៃច័ន្ទ", icon: "📅", ipa: "/ˈmʌndeɪ/", example: "School starts on Monday." },
        { w: "Tuesday", k: "ថ្ងៃអង្គារ", icon: "📅", ipa: "/ˈtjuːzdeɪ/", example: "Math lesson on Tuesday." },
        { w: "Wednesday", k: "ថ្ងៃពុធ", icon: "📅", ipa: "/ˈwɛnzdeɪ/", example: "Science on Wednesday." },
        { w: "Thursday", k: "ថ្ងៃព្រហស្បតិ៍", icon: "📅", ipa: "/ˈθɜːrzdeɪ/", example: "English test Thursday." },
        { w: "Friday", k: "ថ្ងៃសុក្រ", icon: "📅", ipa: "/ˈfraɪdeɪ/", example: "Friday evening rest." },
        { w: "Saturday", k: "ថ្ងៃសៅរ៍", icon: "🎈", ipa: "/ˈsætərdeɪ/", example: "Saturday holiday." },
        { w: "Sunday", k: "ថ្ងៃអាទិត្យ", icon: "☀️", ipa: "/ˈsʌndeɪ/", example: "Family Sunday trip." },
        { w: "January", k: "ខែមករា", icon: "🗓️", ipa: "/ˈdʒænjuəri/", example: "First month January." },
        { w: "April (Khmer New Year)", k: "ខែមេសា (បុណ្យចូលឆ្នាំខ្មែរ)", icon: "🌸", ipa: "/ˈeɪprəl/", example: "Khmer New Year in April." },
        { w: "November (Water Festival)", k: "ខែវិច្ឆិកា (បុណ្យអុំទូក)", icon: "🚣", ipa: "/nəʊˈvɛmbər/", example: "Water festival November." },
        { w: "December", k: "ខែធ្នូ", icon: "🎄", ipa: "/dɪˈsɛmbər/", example: "Cool month December." },
        { w: "birthday celebration", k: "ពិធីខួបកំណើត", icon: "🎂", ipa: "/ˈbɜːrθdeɪ ˌsɛlɪˈbreɪʃn/", example: "Birthday party cake." },
        { w: "today", k: "ថ្ងៃនេះ", icon: "👇", ipa: "/təˈdeɪ/", example: "Today is sunny." },
        { w: "tomorrow", k: "ថ្ងៃស្អែក", icon: "👉", ipa: "/təˈmɒrəʊ/", example: "Tomorrow is holiday." },
        { w: "yesterday", k: "ម្សិលមិញ", icon: "👈", ipa: "/ˈjɛstərdeɪ/", example: "Yesterday we studied." }
      ]
    },
    14: { // Unit 15: Future Plans
      words: [
        { w: "going to visit Siem Reap", k: "នឹងទៅទស្សនាខេត្តសៀមរាប", icon: "🛕", ipa: "/ˈɡəʊɪŋ tuː ˈvɪzɪt/", example: "Going to visit Siem Reap next week." },
        { w: "travel by express bus", k: "ធ្វើដំណើរដោយឡានក្រុង", icon: "🚌", ipa: "/ˈtrævl baɪ bʌs/", example: "Travel by bus to Kampot." },
        { w: "fly in airplane", k: "ជិះយន្តហោះ", icon: "✈️", ipa: "/flaɪ ɪn ˈɛərpleɪn/", example: "Fly in airplane to Bangkok." },
        { w: "stay at hotel", k: "ស្នាក់នៅសណ្ឋាគារ", icon: "🏨", ipa: "/steɪ æt həʊˈtɛl/", example: "Stay at comfortable hotel." },
        { w: "take photos", k: "ថតរូបភាព", icon: "📷", ipa: "/teɪk ˈfəʊtəʊz/", example: "Take beautiful photos." },
        { w: "buy souvenirs", k: "ទិញកាដូអនុស្សាវរីយ៍", icon: "🎁", ipa: "/baɪ ˌsuːvəˈnɪərz/", example: "Buy Khmer souvenirs." },
        { w: "visit Kep beach", k: "ទៅលេងឆ្នេរសមុទ្រកែប", icon: "🏖️", ipa: "/ˈvɪzɪt biːtʃ/", example: "Swim at Kep beach." },
        { w: "eat seafood", k: "ញ៉ាំគ្រឿងសមុទ្រ", icon: "🦀", ipa: "/iːt ˈsiːfuːd/", example: "Eat fresh crab seafood." },
        { w: "climb Bokor mountain", k: "ឡើងភ្នំបូកគោ", icon: "⛰️", ipa: "/klaɪm ˈmaʊntən/", example: "Climb Bokor mountain." },
        { w: "meet relatives", k: "ជួបជុំសាច់ញាតិ", icon: "👨‍👩‍👧‍👦", ipa: "/miːt ˈrɛlətɪvz/", example: "Meet relatives in province." },
        { w: "study at high school", k: "រៀននៅវិទ្យាល័យ", icon: "🏫", ipa: "/ˈstʌdi æt haɪ skuːl/", example: "Will study grade 7 next year." },
        { w: "become a doctor", k: "ក្លាយជាគ្រូពេទ្យ", icon: "👨‍⚕️", ipa: "/bɪˈkʌm ə ˈdɒktər/", example: "Want to become a doctor." },
        { w: "speak English well", k: "និយាយភាសាអង់គ្លេសបានស្ទាត់", icon: "🗣️", ipa: "/spiːk ˈɪŋɡlɪʃ wɛl/", example: "Practice to speak English well." },
        { w: "next summer holiday", k: "វិស្សមកាលរដូវក្តៅខាងមុខ", icon: "☀️", ipa: "/nɛkst ˈsʌmər/", example: "Fun plans next summer." },
        { w: "happy future", k: "អនាគតដ៏រីករាយ", icon: "🌟", ipa: "/ˈhæpi ˈfjuːtʃər/", example: "Work hard for happy future." }
      ]
    }
  };

  const currentTopic = topicSpecs[unitId] || topicSpecs[3];

  const vocab = [];
  const builder = [];
  const quiz = [];

  for (let j = 0; j < 15; j++) {
    const wObj: any = currentTopic.words[j % currentTopic.words.length];
    const iconVal = wObj.icon || wObj.ic || "📖";
    const ipaVal = wObj.ipa || wObj.ip || "";
    const exampleVal = wObj.example || wObj.ex || "";

    vocab.push({
      word: wObj.w,
      km: wObj.k,
      icon: iconVal,
      ipa: ipaVal,
      example: exampleVal
    });

    builder.push({
      target: ["I", "want to", wObj.w, "in Cambodia."],
      km: `ខ្ញុំចង់ ${wObj.k} នៅក្នុងប្រទេសកម្ពុជា។`,
      icon: iconVal
    });

    quiz.push({
      q: `What is the correct English word for "${wObj.k}"?`,
      choices: [wObj.w, `Incorrect option A`, `Incorrect option B`],
      ans: 0
    });
  }

  return { vocab, builder, quiz };
}

export const EnglishGameModal: React.FC<EnglishGameModalProps> = ({
  isOpen,
  onClose,
  initialUnitIndex = 0
}) => {
  const [selectedUnitIndex, setSelectedUnitIndex] = useState<number>(initialUnitIndex);
  const [activeTab, setActiveTab] = useState<'vocab' | 'builder' | 'room' | 'quiz'>('vocab');
  const [score, setScore] = useState<number>(0);
  const [vocabSearch, setVocabSearch] = useState<string>('');

  // Sentence Builder State
  const [builderIndex, setBuilderIndex] = useState<number>(0);
  const [builderSelectedWords, setBuilderSelectedWords] = useState<string[]>([]);
  const [shuffledWords, setShuffledWords] = useState<{ word: string; id: number; disabled: boolean }[]>([]);

  // Preposition Room State
  const [roomIndex, setRoomIndex] = useState<number>(0);
  const [isCatSelected, setIsCatSelected] = useState<boolean>(false);
  const [catPos, setCatPos] = useState<{ left: string; bottom: string }>({ left: '42%', bottom: '8%' });
  const [showRoomHint, setShowRoomHint] = useState<boolean>(false);

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [quizScoreCount, setQuizScoreCount] = useState<number>(0);

  // Modal / Victory State
  const [isVictoryOpen, setIsVictoryOpen] = useState<boolean>(false);
  const [victoryMsg, setVictoryMsg] = useState<string>('អ្នកបានបញ្ចប់ការអនុវត្តសកម្មភាពនេះយ៉ាងជោគជ័យ!');

  // Audio Context & Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const currentUnitMeta = UNITS_META[selectedUnitIndex] || UNITS_META[0];
  const unitContent = getUnitContent(selectedUnitIndex);

  // Sync initial index
  useEffect(() => {
    setSelectedUnitIndex(initialUnitIndex);
  }, [initialUnitIndex]);

  // Reset indices when unit changes
  useEffect(() => {
    setBuilderIndex(0);
    setRoomIndex(0);
    setQuizAnswers({});
    setIsQuizSubmitted(false);
    setQuizScoreCount(0);
    setCatPos({ left: '42%', bottom: '8%' });
    setIsCatSelected(false);
  }, [selectedUnitIndex]);

  // Setup Shuffled Words when builderIndex changes
  useEffect(() => {
    if (unitContent.builder[builderIndex]) {
      const target = unitContent.builder[builderIndex].target;
      const scrambled = [...target]
        .sort(() => Math.random() - 0.5)
        .map((w, idx) => ({ word: w, id: idx, disabled: false }));
      setShuffledWords(scrambled);
      setBuilderSelectedWords([]);
    }
  }, [builderIndex, selectedUnitIndex]);

  // Speech Synth helper
  const speakText = (text: string) => {
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.85;
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  };

  // Sound Effects
  const playSound = (type: 'correct' | 'wrong' | 'victory') => {
    try {
      const ctx = getSafeAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      if (type === 'correct') {
        const freqs = [523.25, 659.25, 783.99, 1046.50];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.07);
          gain.gain.setValueAtTime(0.18, now + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.07);
          osc.stop(now + idx * 0.07 + 0.25);
        });
      } else if (type === 'wrong') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.28);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.28);

        // Vibrate phone
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          try {
            navigator.vibrate([150, 80, 150]);
          } catch (e) {
            // ignore
          }
        }
      } else if (type === 'victory') {
        triggerConfetti();
      }
    } catch (e) {
      // ignore
    }
  };

  // Confetti Animation
  const triggerConfetti = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces: { x: number; y: number; size: number; color: string; speedY: number; speedX: number }[] = [];
    const colors = ['#0284c7', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

    for (let i = 0; i < 110; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 4 + 2,
        speedX: Math.random() * 2 - 1
      });
    }

    let frame = 0;
    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        p.y += p.speedY;
        p.x += p.speedX;
      });

      frame++;
      if (frame < 120 && pieces.some((p) => p.y < canvas.height)) {
        requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    draw();
  };

  // Sentence Builder Handlers
  const handleSelectWord = (item: { word: string; id: number; disabled: boolean }) => {
    if (item.disabled) return;
    speakText(item.word);
    setBuilderSelectedWords((prev) => [...prev, item.word]);
    setShuffledWords((prev) =>
      prev.map((w) => (w.id === item.id ? { ...w, disabled: true } : w))
    );
  };

  const handleRemoveWord = (index: number) => {
    const wordToRemove = builderSelectedWords[index];
    setBuilderSelectedWords((prev) => prev.filter((_, i) => i !== index));

    // re-enable in bank
    setShuffledWords((prev) => {
      let found = false;
      return prev.map((w) => {
        if (!found && w.word === wordToRemove && w.disabled) {
          found = true;
          return { ...w, disabled: false };
        }
        return w;
      });
    });
  };

  const handleClearBuilder = () => {
    setBuilderSelectedWords([]);
    setShuffledWords((prev) => prev.map((w) => ({ ...w, disabled: false })));
  };

  const handleCheckBuilder = () => {
    const item = unitContent.builder[builderIndex];
    if (!item) return;
    const userSentence = builderSelectedWords.join(' ');
    const targetSentence = item.target.join(' ');

    if (userSentence === targetSentence) {
      playSound('correct');
      setScore((s) => s + 10);
      speakText(targetSentence);

      setTimeout(() => {
        if (builderIndex + 1 < unitContent.builder.length) {
          setBuilderIndex((idx) => idx + 1);
        } else {
          setVictoryMsg('អ្នកបានរៀបប្រយោគទាំងអស់ក្នុងមេរៀននេះយ៉ាងជោគជ័យ!');
          setIsVictoryOpen(true);
          playSound('victory');
          setBuilderIndex(0);
        }
      }, 900);
    } else {
      playSound('wrong');
    }
  };

  // Preposition Room Handlers
  const currentRoomTask = ROOM_TASKS[roomIndex];

  const handleZoneClick = (zoneId: string, zoneElemCoords?: { left: number; top: number; width: number; height: number }) => {
    setIsCatSelected(false);
    if (zoneId === currentRoomTask.targetZone) {
      playSound('correct');
      setScore((s) => s + 10);

      // position cat relative
      const zoneCoordsMap: Record<string, { left: string; bottom: string }> = {
        'lamp-next': { left: '72%', bottom: '18%' },
        'bed-on': { left: '22%', bottom: '26%' },
        'table-under': { left: '78%', bottom: '6%' },
        'box-in': { left: '5%', bottom: '10%' },
        'rug-on': { left: '46%', bottom: '7%' },
        'window-under': { left: '48%', bottom: '38%' },
        'plant-behind': { left: '88%', bottom: '22%' },
        'wardrobe-on': { left: '3%', bottom: '62%' },
        'chair-front': { left: '42%', bottom: '12%' },
        'bookshelf-next': { left: '82%', bottom: '52%' },
        'chair-on': { left: '42%', bottom: '22%' },
        'bed-under': { left: '22%', bottom: '6%' },
        'desk-on': { left: '78%', bottom: '38%' },
        'door-behind': { left: '32%', bottom: '30%' },
        'bed-next': { left: '32%', bottom: '18%' }
      };

      if (zoneCoordsMap[zoneId]) {
        setCatPos(zoneCoordsMap[zoneId]);
      }

      setTimeout(() => {
        if (roomIndex + 1 < ROOM_TASKS.length) {
          setRoomIndex((r) => r + 1);
          setCatPos({ left: '42%', bottom: '8%' });
        } else {
          setVictoryMsg('អ្នកបានបំពេញលំហាត់ទីតាំងធៀបលំហទាំងអស់យ៉ាងជោគជ័យ!');
          setIsVictoryOpen(true);
          playSound('victory');
          setRoomIndex(0);
        }
      }, 1000);
    } else {
      playSound('wrong');
      setCatPos({ left: '42%', bottom: '8%' });
    }
  };

  // Quiz Handlers
  const handleSelectQuizOption = (qIdx: number, cIdx: number) => {
    if (isQuizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: cIdx }));
  };

  const handleSubmitQuiz = () => {
    let count = 0;
    unitContent.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.ans) {
        count++;
      }
    });

    setIsQuizSubmitted(true);
    setQuizScoreCount(count);
    const gained = count * 10;
    setScore((s) => s + gained);

    if (count >= 10) {
      playSound('correct');
      playSound('victory');
      setVictoryMsg(`អ្នកបានឆ្លើយត្រូវ ${count}/${unitContent.quiz.length} សំណួរ (+${gained} ពិន្ទុ)!`);
      setIsVictoryOpen(true);
    } else {
      playSound('wrong');
    }
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setIsQuizSubmitted(false);
    setQuizScoreCount(0);
  };

  if (!isOpen) return null;

  // Filter Flashcards
  const filteredVocab = unitContent.vocab.filter(
    (v) =>
      v.word.toLowerCase().includes(vocabSearch.toLowerCase()) ||
      v.km.includes(vocabSearch)
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fade-in font-siemreap">
      {/* Canvas Confetti */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      />

      {/* Main Container */}
      <div className="bg-gradient-to-b from-sky-50 via-white to-sky-50 rounded-3xl w-full max-w-5xl shadow-2xl border-2 border-sky-300 overflow-hidden flex flex-col max-h-[95vh] my-auto">
        
        {/* Header Bar */}
        <div className="bg-white/90 backdrop-blur-md px-4 sm:px-6 py-3 border-b border-sky-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white text-xl shadow-md border border-sky-300">
              📖
            </div>
            <div>
              <h1 className="font-extrabold text-sm sm:text-lg text-sky-950 leading-tight flex items-center gap-2">
                <span>English Grade 6 (MoEYS)</span>
                <span className="bg-sky-100 text-sky-800 text-[11px] font-black px-2 py-0.5 rounded-full border border-sky-300">
                  ១៥ មេរៀន
                </span>
              </h1>
              <p className="text-xs text-sky-700 font-bold hidden sm:block">
                កម្មវិធីសិក្សាភាសាអង់គ្លេស ថ្នាក់ទី៦ ក្រសួងអប់រំ យុវជន និងកីឡា
              </p>
            </div>
          </div>

          {/* Unit Selector & Score */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 bg-sky-50 p-1.5 rounded-xl border border-sky-300">
              <span className="text-xs font-black text-sky-900 ml-1 flex items-center gap-1">
                <ListCheck className="w-3.5 h-3.5 text-sky-600" />
                ជ្រើសមេរៀន:
              </span>
              <select
                value={selectedUnitIndex}
                onChange={(e) => setSelectedUnitIndex(Number(e.target.value))}
                className="bg-white text-sky-950 font-black text-xs sm:text-sm rounded-lg px-2.5 py-1 outline-none cursor-pointer border border-sky-300 shadow-2xs"
              >
                {UNITS_META.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.titleEn}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-amber-100 text-amber-950 px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-1.5 border border-amber-300 shadow-2xs">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{score}</span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer border border-slate-200"
              title="បិទ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mode Navigation Tabs */}
        <div className="px-3 sm:px-6 py-2.5 bg-sky-100/60 border-b border-sky-200 flex justify-center gap-1.5 sm:gap-2 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('vocab')}
            className={`py-2 px-3 sm:px-4 rounded-xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
              activeTab === 'vocab'
                ? 'bg-sky-500 text-white border-2 border-sky-600 shadow-md scale-102'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-sky-50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>📚 ប័ណ្ណពាក្យ ({unitContent.vocab.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('builder')}
            className={`py-2 px-3 sm:px-4 rounded-xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
              activeTab === 'builder'
                ? 'bg-sky-500 text-white border-2 border-sky-600 shadow-md scale-102'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-sky-50'
            }`}
          >
            <Boxes className="w-4 h-4" />
            <span>🎮 រៀបប្រយោគ (15)</span>
          </button>

          <button
            onClick={() => setActiveTab('room')}
            className={`py-2 px-3 sm:px-4 rounded-xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
              activeTab === 'room'
                ? 'bg-sky-500 text-white border-2 border-sky-600 shadow-md scale-102'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-sky-50'
            }`}
          >
            <Cat className="w-4 h-4" />
            <span>🐱 ធៀបលំហ (15)</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`py-2 px-3 sm:px-4 rounded-xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
              activeTab === 'quiz'
                ? 'bg-sky-500 text-white border-2 border-sky-600 shadow-md scale-102'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-sky-50'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>📝 តេស្ត (15)</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-3 sm:p-6 overflow-y-auto flex-1">
          {/* ================= MODE 1: VOCABULARY ================= */}
          {activeTab === 'vocab' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sky-200 pb-3">
                <div>
                  <h2 className="text-lg sm:text-2xl font-black text-sky-950">
                    {currentUnitMeta.titleEn}
                  </h2>
                  <p className="text-xs sm:text-sm text-sky-700 font-bold">
                    {currentUnitMeta.titleKm} • ចុចលើប័ណ្ណនីមួយៗដើម្បីស្តាប់ការបញ្ចេញសំឡេង
                  </p>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-sky-500" />
                  <input
                    type="text"
                    value={vocabSearch}
                    onChange={(e) => setVocabSearch(e.target.value)}
                    placeholder="ស្វែងរកពាក្យ..."
                    className="w-full pl-9 pr-3 py-1.5 bg-sky-50 border border-sky-300 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {filteredVocab.map((v, idx) => (
                  <div
                    key={idx}
                    onClick={() => speakText(v.word)}
                    className="bg-white/90 hover:bg-sky-100/90 border-2 border-sky-200 hover:border-sky-400 rounded-2xl p-3 text-center transition-all duration-200 hover:-translate-y-1 shadow-xs cursor-pointer flex flex-col justify-between items-center group min-h-[140px]"
                  >
                    <div className="text-3xl sm:text-4xl my-1 group-hover:scale-110 transition-transform">
                      {v.icon}
                    </div>
                    <div>
                      <div className="font-extrabold text-xs sm:text-sm text-slate-800 leading-snug flex items-center justify-center gap-1">
                        <span>{v.word}</span>
                        <Volume2 className="w-3.5 h-3.5 text-sky-500 shrink-0 opacity-80 group-hover:opacity-100" />
                      </div>
                      <div className="text-[10px] text-sky-600 font-semibold mb-1 font-mono">
                        {v.ipa}
                      </div>
                      <div className="text-xs text-amber-900 font-black">
                        {v.km}
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-500 italic mt-1.5 font-medium bg-sky-50 p-1 rounded-lg w-full border border-sky-100 line-clamp-2">
                      "{v.example}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= MODE 2: SENTENCE BUILDER ================= */}
          {activeTab === 'builder' && (
            <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-md border-2 border-sky-200 text-center space-y-4">
              <div className="flex items-center justify-between bg-sky-50 p-3 rounded-2xl border border-sky-200">
                <span className="text-xs sm:text-sm font-extrabold text-sky-900 flex items-center gap-1">
                  <Boxes className="w-4 h-4 text-sky-600" />
                  🎮 ហ្គេមរៀបប្រយោគភាសាអង់គ្លេស
                </span>
                <span className="text-xs sm:text-sm font-black text-sky-700 bg-white px-2.5 py-0.5 rounded-full border border-sky-300">
                  {builderIndex + 1} / {unitContent.builder.length}
                </span>
              </div>

              <div className="my-3">
                <div className="text-5xl sm:text-6xl mb-2 animate-bounce">
                  {unitContent.builder[builderIndex]?.icon || '⚽'}
                </div>
                <h3 className="text-base sm:text-xl font-bold text-amber-900 italic">
                  ({unitContent.builder[builderIndex]?.km})
                </h3>
              </div>

              {/* Target Sentence Slots */}
              <div className="min-h-[65px] bg-slate-50 border-2 border-dashed border-sky-300 rounded-2xl p-3 flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto shadow-inner">
                {builderSelectedWords.length === 0 ? (
                  <span className="text-xs text-slate-400 font-bold">
                    ចុចលើពាក្យខាងក្រោមដើម្បីតម្រៀបប្រយោគ...
                  </span>
                ) : (
                  builderSelectedWords.map((word, idx) => (
                    <span
                      key={idx}
                      onClick={() => handleRemoveWord(idx)}
                      className="bg-amber-400 hover:bg-amber-500 text-amber-950 font-black px-3 py-1.5 rounded-xl text-xs sm:text-sm shadow-xs flex items-center gap-1 cursor-pointer active:scale-95 transition-all"
                    >
                      {word}
                      <X className="w-3.5 h-3.5 text-amber-900 opacity-70" />
                    </span>
                  ))
                )}
              </div>

              {/* Word Bank */}
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
                {shuffledWords.map((item) => (
                  <button
                    key={item.id}
                    disabled={item.disabled}
                    onClick={() => handleSelectWord(item)}
                    className={`px-3.5 py-2 rounded-xl border-2 font-extrabold text-xs sm:text-sm shadow-2xs transition-all cursor-pointer ${
                      item.disabled
                        ? 'bg-slate-100 text-slate-400 border-slate-200 opacity-40 cursor-not-allowed'
                        : 'bg-white hover:bg-sky-100 text-sky-950 border-sky-300 hover:border-sky-400 active:scale-95'
                    }`}
                  >
                    {item.word}
                  </button>
                ))}
              </div>

              {/* Control Buttons */}
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={handleClearBuilder}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-extrabold px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Eraser className="w-4 h-4" />
                  លុបឡើងវិញ
                </button>
                <button
                  onClick={handleCheckBuilder}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-6 py-2 rounded-xl text-xs sm:text-sm shadow-md flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                >
                  <Check className="w-4 h-4" />
                  ផ្ទៀងផ្ទាត់
                </button>
              </div>
            </div>
          )}

          {/* ================= MODE 3: PREPOSITION CAT ROOM ================= */}
          {activeTab === 'room' && (
            <div className="space-y-3">
              {/* Instruction Bar */}
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl p-3 sm:p-4 shadow-md text-center border-2 border-amber-300 relative">
                <div className="flex items-center justify-between text-[11px] sm:text-xs font-bold uppercase text-amber-100 mb-1">
                  <span className="flex items-center gap-1">
                    <Cat className="w-3.5 h-3.5" />
                    Preposition Room Game
                  </span>
                  <span className="font-black text-yellow-200 bg-amber-700/50 px-2 py-0.5 rounded-full">
                    {roomIndex + 1} / {ROOM_TASKS.length}
                  </span>
                </div>

                <div className="text-base sm:text-2xl font-black text-yellow-50 drop-shadow-xs">
                  {currentRoomTask.textEn.toUpperCase()}
                </div>
                <div className="text-xs sm:text-sm font-bold text-amber-100 italic mt-0.5">
                  ({currentRoomTask.textKm})
                </div>

                <div className="flex justify-center gap-2 mt-2.5">
                  <button
                    onClick={() => speakText(currentRoomTask.textEn)}
                    className="bg-white text-amber-900 font-extrabold px-3 py-1 rounded-xl text-xs flex items-center gap-1 shadow-xs cursor-pointer active:scale-95"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                    ស្តាប់
                  </button>
                  <button
                    onClick={() => {
                      setShowRoomHint(true);
                      setTimeout(() => setShowRoomHint(false), 2500);
                    }}
                    className="bg-amber-700 text-white font-extrabold px-3 py-1 rounded-xl text-xs flex items-center gap-1 shadow-xs cursor-pointer active:scale-95"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-yellow-300" />
                    ជំនួយ
                  </button>
                </div>
              </div>

              {/* Interactive Bedroom Scene Canvas */}
              <div className="relative w-full aspect-[16/9] bg-[#fffcf7] rounded-2xl shadow-lg border-2 border-amber-200 overflow-hidden select-none">
                {/* SVG Background Room */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 800 450"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="wGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fef3c7" />
                      <stop offset="100%" stopColor="#fde68a" />
                    </linearGradient>
                    <linearGradient id="fGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f3d5b5" />
                      <stop offset="100%" stopColor="#e7bc91" />
                    </linearGradient>
                  </defs>
                  <rect width="800" height="320" fill="url(#wGrad)" />
                  <rect y="320" width="800" height="130" fill="url(#fGrad)" />
                  <line x1="0" y1="365" x2="800" y2="365" stroke="#d4a373" strokeWidth="2" />
                </svg>

                {/* Furniture Visual Items */}
                <div className="absolute top-[8%] left-[45%] w-[18%] aspect-[4/3] bg-sky-200 rounded-t-full border-4 border-amber-700/60 shadow-inner flex items-center justify-center">
                  <span className="text-2xl">☁️</span>
                </div>
                <div className="absolute bottom-[20%] left-[16%] w-[26%] h-[30%] bg-amber-100 border-2 border-amber-400 rounded-2xl flex items-center justify-center shadow-md">
                  <span className="text-2xl">🛌</span>
                </div>
                <div className="absolute bottom-[16%] right-[8%] w-[22%] h-[24%] bg-amber-200 border-2 border-amber-400 rounded-xl shadow-md flex items-start justify-end p-2">
                  <span className="text-2xl">💡</span>
                </div>
                <div className="absolute top-[12%] left-[2%] w-[14%] h-[55%] bg-rose-200 border-2 border-rose-300 rounded-2xl flex flex-col items-center justify-between p-2">
                  <span className="text-[10px] sm:text-xs font-bold text-rose-800">🌸 Wardrobe</span>
                  <div className="w-1.5 h-6 bg-rose-400 rounded"></div>
                </div>
                <div className="absolute top-[10%] right-[6%] w-[18%] h-[12%] bg-amber-200 border-b-4 border-amber-400 flex items-end justify-around px-1">
                  <span className="text-xs">📚 Books</span>
                </div>
                <div className="absolute bottom-[20%] right-[2%] text-3xl">🪴</div>
                <div className="absolute bottom-[10%] left-[4%] w-[10%] h-[16%] bg-amber-300 border-2 border-amber-600 rounded-lg flex items-center justify-center text-xs font-black">
                  📦
                </div>
                <div className="absolute bottom-[8%] left-[50%] -translate-x-1/2 w-[30%] h-[12%] bg-pink-100 border-2 border-dashed border-pink-300 rounded-full flex items-center justify-center text-xs font-bold text-pink-500">
                  🌸 Rug
                </div>

                {/* Drop Zones */}
                {[
                  { id: 'lamp-next', style: 'bottom-[18%] right-[22%] w-[10%] h-[16%]' },
                  { id: 'bed-on', style: 'bottom-[24%] left-[20%] w-[16%] h-[16%]' },
                  { id: 'table-under', style: 'bottom-[6%] right-[10%] w-[16%] h-[14%]' },
                  { id: 'box-in', style: 'bottom-[10%] left-[4%] w-[10%] h-[16%]' },
                  { id: 'rug-on', style: 'bottom-[7%] left-[50%] -translate-x-1/2 w-[22%] h-[12%]' },
                  { id: 'window-under', style: 'top-[36%] left-[45%] w-[18%] h-[14%]' },
                  { id: 'plant-behind', style: 'bottom-[22%] right-[2%] w-[10%] h-[16%]' },
                  { id: 'wardrobe-on', style: 'top-[4%] left-[2%] w-[14%] h-[14%]' },
                  { id: 'chair-front', style: 'bottom-[12%] left-[40%] w-[12%] h-[14%]' },
                  { id: 'bookshelf-next', style: 'top-[22%] right-[6%] w-[12%] h-[14%]' },
                  { id: 'chair-on', style: 'bottom-[22%] left-[40%] w-[12%] h-[14%]' },
                  { id: 'bed-under', style: 'bottom-[6%] left-[18%] w-[18%] h-[14%]' },
                  { id: 'desk-on', style: 'bottom-[38%] right-[10%] w-[14%] h-[14%]' },
                  { id: 'door-behind', style: 'bottom-[30%] left-[32%] w-[10%] h-[16%]' },
                  { id: 'bed-next', style: 'bottom-[18%] left-[32%] w-[10%] h-[16%]' }
                ].map((zone) => {
                  const isTarget = currentRoomTask.targetZone === zone.id;
                  const isHinting = showRoomHint && isTarget;

                  return (
                    <div
                      key={zone.id}
                      onClick={() => handleZoneClick(zone.id)}
                      className={`absolute rounded-xl transition-all cursor-pointer ${zone.style} ${
                        isHinting
                          ? 'border-4 border-rose-500 bg-rose-500/30 animate-pulse'
                          : isCatSelected
                          ? 'border-2 border-dashed border-sky-500 bg-sky-500/20'
                          : 'hover:border-2 hover:border-amber-400 hover:bg-amber-400/20'
                      }`}
                    />
                  );
                })}

                {/* Draggable Cat */}
                <div
                  onClick={() => setIsCatSelected(!isCatSelected)}
                  style={{ left: catPos.left, bottom: catPos.bottom }}
                  className={`absolute w-[10%] aspect-square cursor-grab z-30 transition-all flex items-center justify-center ${
                    isCatSelected ? 'scale-125 ring-4 ring-amber-400 rounded-full' : ''
                  }`}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-md">
                    <circle cx="50" cy="50" r="35" fill="#f59e0b" />
                    <polygon points="30,25 20,5 40,20" fill="#f59e0b" />
                    <polygon points="70,25 80,5 60,20" fill="#f59e0b" />
                    <circle cx="38" cy="45" r="5" fill="#1e293b" />
                    <circle cx="62" cy="45" r="5" fill="#1e293b" />
                    <polygon points="50,52 47,48 53,48" fill="#e11d48" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* ================= MODE 4: QUIZ ================= */}
          {activeTab === 'quiz' && (
            <div className="space-y-4">
              <div className="text-center bg-sky-50 p-4 rounded-2xl border border-sky-200">
                <span className="bg-amber-100 text-amber-950 text-xs font-bold px-3 py-1 rounded-full border border-amber-300">
                  🏆 Grade 6 Knowledge Quiz (១៥ សំណួរ)
                </span>
                <h2 className="text-lg sm:text-xl font-black text-slate-800 mt-2">
                  {currentUnitMeta.titleEn} - តេស្តស្ទង់សមត្ថភាព
                </h2>
                <p className="text-xs text-sky-700 font-semibold mt-1">
                  ជ្រើសរើសចម្លើយដែលត្រឹមត្រូវ រួចចុច "បញ្ជូនចម្លើយ" ដើម្បីផ្ទៀងផ្ទាត់
                </p>
              </div>

              {isQuizSubmitted && (
                <div className="p-3 rounded-2xl bg-sky-100 border-2 border-sky-300 text-center text-sm font-black text-sky-950">
                  📊 លទ្ធផលតេស្ត៖ អ្នកបានឆ្លើយត្រូវ {quizScoreCount}/{unitContent.quiz.length} សំណួរ (+{quizScoreCount * 10} ពិន្ទុ)!
                </div>
              )}

              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {unitContent.quiz.map((q, qIdx) => {
                  const userChoice = quizAnswers[qIdx];
                  const isAnswered = userChoice !== undefined;

                  return (
                    <div
                      key={qIdx}
                      className="bg-white p-3.5 rounded-2xl border border-sky-200 shadow-2xs space-y-2"
                    >
                      <div className="font-extrabold text-slate-800 text-xs sm:text-sm flex items-center justify-between">
                        <span>
                          {qIdx + 1}. {q.q}
                        </span>

                        {isQuizSubmitted && (
                          <span
                            className={`text-xs font-black px-2 py-0.5 rounded-full ${
                              userChoice === q.ans
                                ? 'text-emerald-700 bg-emerald-100 border border-emerald-300'
                                : 'text-rose-700 bg-rose-100 border border-rose-300'
                            }`}
                          >
                            {userChoice === q.ans ? '✓ ត្រឹមត្រូវ' : '✕ ខុស'}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {q.choices.map((choice: string, cIdx: number) => {
                          const isSelected = userChoice === cIdx;
                          const isCorrect = cIdx === q.ans;

                          let btnStyle = 'bg-slate-50 border-slate-200 hover:bg-sky-50 text-slate-700';

                          if (isSelected) {
                            btnStyle = 'bg-sky-500 text-white border-sky-600 font-bold';
                          }

                          if (isQuizSubmitted) {
                            if (isCorrect) {
                              btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                            } else if (isSelected && !isCorrect) {
                              btnStyle = 'bg-rose-100 border-rose-500 text-rose-950';
                            } else {
                              btnStyle = 'bg-slate-50 border-slate-200 text-slate-400';
                            }
                          }

                          return (
                            <button
                              key={cIdx}
                              disabled={isQuizSubmitted}
                              onClick={() => handleSelectQuizOption(qIdx, cIdx)}
                              className={`p-2.5 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${btnStyle}`}
                            >
                              <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center shrink-0">
                                {isSelected && <div className="w-2 h-2 rounded-full bg-current" />}
                              </div>
                              <span>{choice}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center pt-2 flex justify-center gap-3">
                {!isQuizSubmitted ? (
                  <button
                    onClick={handleSubmitQuiz}
                    className="bg-sky-500 hover:bg-sky-600 text-white font-black px-8 py-2.5 rounded-2xl shadow-md transition-all text-xs sm:text-sm flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    បញ្ជូនចម្លើយ (Submit Quiz)
                  </button>
                ) : (
                  <button
                    onClick={handleResetQuiz}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-black px-6 py-2.5 rounded-2xl shadow-md transition-all text-xs sm:text-sm flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <RotateCcw className="w-4 h-4" />
                    ធ្វើតេស្តឡើងវិញ (Retake Quiz)
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Victory Modal Overlay */}
      {isVictoryOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl border-4 border-amber-300 animate-scale-in">
            <div className="text-6xl mb-2">🎉⭐🏆</div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-1">
              ធ្វើបានល្អណាស់! Excellent!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-4 font-bold">
              {victoryMsg}
            </p>

            <button
              onClick={() => setIsVictoryOpen(false)}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-black py-3 rounded-2xl shadow-lg transition-all text-sm cursor-pointer"
            >
              បន្តរៀនទៀត (Continue)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
