import type { Language } from '../types/language';

interface Question {
  id: string;
  text: Record<Language, string>;
  options: {
    id: string;
    text: Record<Language, string>;
    filters: Record<string, string[]>;
  }[];
}

export const refinementQuestions: Record<string, Question[]> = {
  headphones: [
    {
      id: 'usage',
      text: {
        en: 'How do you plan to use these headphones?',
        ja: 'ヘッドホンの主な使用目的は？',
        fr: 'Comment comptez-vous utiliser ce casque ?'
      },
      options: [
        {
          id: 'commuting',
          text: {
            en: 'Daily commute',
            ja: '通勤・通学',
            fr: 'Transport quotidien'
          },
          filters: {
            features: ['anc'],
            connection: ['wireless']
          }
        },
        {
          id: 'work',
          text: {
            en: 'Work from home',
            ja: 'リモートワーク',
            fr: 'Travail à domicile'
          },
          filters: {
            features: ['anc', 'multipoint']
          }
        },
        {
          id: 'sports',
          text: {
            en: 'Sports & Exercise',
            ja: 'スポーツ・運動',
            fr: 'Sport et exercice'
          },
          filters: {
            features: ['waterproof'],
            connection: ['wireless']
          }
        }
      ]
    },
    {
      id: 'priority',
      text: {
        en: 'What matters most to you?',
        ja: '最も重視する点は？',
        fr: 'Qu\'est-ce qui compte le plus pour vous ?'
      },
      options: [
        {
          id: 'sound',
          text: {
            en: 'Sound quality',
            ja: '音質',
            fr: 'Qualité sonore'
          },
          filters: {
            price: ['premium']
          }
        },
        {
          id: 'comfort',
          text: {
            en: 'Comfort for long sessions',
            ja: '長時間の装着感',
            fr: 'Confort longue durée'
          },
          filters: {
            features: ['anc']
          }
        },
        {
          id: 'value',
          text: {
            en: 'Value for money',
            ja: 'コスパ',
            fr: 'Rapport qualité-prix'
          },
          filters: {
            price: ['budget', 'mid']
          }
        }
      ]
    }
  ],
  smartphones: [
    {
      id: 'usage',
      text: {
        en: 'What will you primarily use this phone for?',
        ja: 'スマートフォンの主な用途は？',
        fr: 'Quelle sera l\'utilisation principale de ce téléphone ?'
      },
      options: [
        {
          id: 'photography',
          text: {
            en: 'Photography & Video',
            ja: '写真・動画撮影',
            fr: 'Photo et vidéo'
          },
          filters: {
            features: ['pro_camera']
          }
        },
        {
          id: 'gaming',
          text: {
            en: 'Mobile Gaming',
            ja: 'モバイルゲーム',
            fr: 'Jeux mobiles'
          },
          filters: {
            features: ['high_performance']
          }
        },
        {
          id: 'business',
          text: {
            en: 'Business & Productivity',
            ja: 'ビジネス・生産性',
            fr: 'Entreprise et productivité'
          },
          filters: {
            features: ['security']
          }
        }
      ]
    }
  ]
};