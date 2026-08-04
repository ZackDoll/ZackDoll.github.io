export const blogPosts = [
  {
    id: 4,
    slug: 'vynel-product-proposal',
    title: 'Introducing Vynel: Tinder for Music Discovery',
    date: '2025-02-02',
    excerpt: 'Product introduction and development journey of Vynel, a web app that helps users discover new music through a swipe-based interface.',
    tags: ['Spotify', 'Web App', 'React', 'App Overview'],
    readTime: '6 min read',
  },
  {
    id: 3,
    slug: 'asl-translator',
    title: 'Building an ASL translator with computer vision',
    date: '2025-11-15',
    excerpt: 'How I combined MediaPipe and LSTMs to create a real-time sign language translator, and the challenges I faced with dataset integration.',
    tags: ['Machine Learning', 'Computer Vision', 'Python'],
    readTime: '5 min read',
  },
  {
    id: 2,
    slug: 'mlb-predictor',
    title: 'Predicting MLB Pitches with 85% Accuracy',
    date: '2025-08-11',
    excerpt: 'Breaking down the machine learning pipeline behind my pitch predictor, from StatCast data processing to feature engineering.',
    tags: ['Machine Learning', 'Data Science', 'React'],
    readTime: '7 min read',
  },
  {
    id: 1,
    slug: 'discord-bot',
    title: 'Automating Discord Communities with AI',
    date: '2025-01-05',
    excerpt: "How I used ChatGPT and web scraping to build a bot that keeps 500+ users updated on game patches without the noise.",
    tags: ['AI', 'Web Scraping', 'Discord', 'AWS'],
    readTime: '4 min read',
  },
];

export function getPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug);
}
