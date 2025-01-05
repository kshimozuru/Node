export const headlines = [
  'Your desires, decoded by AI.',
  'Where AI meets your needs.',
  'Let AI find your perfect match.',
  'AI-powered discovery for you.',
  'Seeking made smarter.'
];

export function getRandomHeadline(): string {
  const randomIndex = Math.floor(Math.random() * headlines.length);
  return headlines[randomIndex];
}