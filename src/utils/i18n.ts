import { Language, LanguageOption } from '../types/language';

export const languageOptions: LanguageOption[] = [
  {
    code: 'en',
    label: 'English',
    flag: '🇺🇸'
  },
  {
    code: 'ja',
    label: '日本語',
    flag: '🇯🇵'
  }
];

export const translations = {
  en: {
    title: 'AI Best Practice Search',
    description: 'Get the most reliable recommendations backed by AI-analyzed reviews',
    searchPlaceholder: 'Search for best practices...',
    home: 'Home',
    search: 'Search',
    favorites: 'Favorites',
    settings: 'Settings',
    help: 'Help',
    language: 'Language',
    confidence: '{value}% Confidence',
    noFavorites: 'No favorites yet',
    addToFavorites: 'Add to favorites',
    removeFromFavorites: 'Remove from favorites',
    reviews: 'reviews',
    votes: 'votes',
    citations: 'citations',
    sources: 'Sources'
  },
  ja: {
    title: 'AIベストプラクティス検索',
    description: 'AI分析によるレビューに基づく信頼性の高いレコメンデーション',
    searchPlaceholder: 'ベストプラクティスを検索...',
    home: 'ホーム',
    search: '検索',
    favorites: 'お気に入り',
    settings: '設定',
    help: 'ヘルプ',
    language: '言語',
    confidence: '信頼度 {value}%',
    noFavorites: 'お気に入りはまだありません',
    addToFavorites: 'お気に入りに追加',
    removeFromFavorites: 'お気に入りから削除',
    reviews: 'レビュー',
    votes: '票',
    citations: '引用',
    sources: '情報源'
  }
} as const;

export type TranslationKey = keyof typeof translations.en;