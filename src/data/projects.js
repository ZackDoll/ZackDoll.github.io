export const projects = [
  {
    id: 1,
    slug: 'asl-translator',
    title: 'ASL Translator',
    subtitle: 'real-time american sign language translation using computer vision and deep learning',
    cardSubtitle: 'Real-time sign language translation system combining MediaPipe hand tracking with LSTM neural networks, trained on merged datasets for improved accuracy',
    icon: '/images/ASLHands.png',
    tags: ['LSTM/Dense', 'Kaggle', 'MediaPipe', 'TensorFlow'],
    links: [
      { label: 'View on GitHub →', href: 'https://github.com/ZackDoll/SignLanguageCV' },
      { label: 'Website →', href: 'https://asl-translator.duckdns.org' },
    ],
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'This project combines computer vision and machine learning to translate American Sign Language in real-time. Using your webcam, the system captures hand gestures and translates them into English text, making communication more accessible.',
        ],
      },
      {
        heading: 'Technical Approach',
        paragraphs: [
          'The system uses MediaPipe for hand tracking and keypoint extraction, followed by an LSTM neural network for sequence classification. By combining the ASL Citizen dataset with the MSASL dataset, I achieved significantly improved accuracy across a wide range of signs.',
        ],
        list: [
          'MediaPipe Holistic for hand, pose, and face landmark detection',
          'LSTM architecture for temporal sequence modeling',
          'Custom data preprocessing pipeline combining multiple datasets',
          'Real-time inference optimization for smooth webcam interaction',
        ],
      },
      {
        heading: 'Key Features',
        list: [
          'Real-time gesture recognition from webcam feed',
          'Support for dynamic signs (signs with movement)',
          'High accuracy through multi-dataset training',
          'Lightweight model suitable for local execution',
        ],
      },
      {
        heading: 'Challenges & Solutions',
        paragraphs: [
          'One major challenge was dealing with data sparsity in individual datasets. I solved this by developing a pipeline to combine and normalize data from multiple sources, significantly increasing the training set size and diversity.',
        ],
      },
      {
        heading: 'Results & Lessons',
        paragraphs: [
          'After a month of tuning I reached roughly 75% accuracy on common signs at about 15 fps on a laptop. Merging ASL Citizen with MSASL gave 25,000+ samples across 1,000 classes, and getting real-time speed meant fewer LSTM units, quantized weights and a sliding window to detect sign boundaries.',
          'The biggest lesson: dataset quality matters far more than model complexity. Cleaning and merging data beat every architecture change I tried.',
        ],
      },
      {
        heading: 'Future Additions',
        list: [
          'Expand vocabulary to include more words, and understand sentence structure',
          'Website is in development',
          'Rearrange data inputs for higher accuracy',
          'Develop a mobile app',
          'Implement user feedback loop for continuous learning',
          'Always looking for more data',
        ],
      },
    ],
    gallery: [
      { src: '/images/ASLTest.gif', alt: 'ASL Detection Demo' },
    ],
    tech: ['LSTM/Dense', 'Kaggle', 'MediaPipe', 'TensorFlow'],
  },
  {
    id: 2,
    slug: 'mlb-predictor',
    title: 'MLB Pitch Predictor',
    subtitle: 'machine learning system predicting pitch types with 85% accuracy',
    cardSubtitle: 'Full-stack web application using machine learning to predict pitch types with 85% accuracy, trained on 12+ million historical pitches from StatCast',
    icon: '/images/MLBIcon.png',
    tags: ['Sci-kit Learn', 'Node.js', 'React', 'StatCast API'],
    links: [
      { label: 'Live Demo →', href: 'https://pitch-predictor.onrender.com' },
      { label: 'View on Github →', href: 'https://github.com/ZackDoll/PitchingStats' },
    ],
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'An advanced machine learning system that analyzes real-time game conditions to predict the next pitch type in MLB games. Trained on over 12 million historical pitches from StatCast, achieving 85% accuracy.',
        ],
      },
      {
        heading: 'Data Pipeline',
        paragraphs: [
          "The project required processing massive amounts of baseball data from StatCast's API. I built a comprehensive data pipeline to clean, normalize, and feature-engineer the raw pitch data.",
        ],
        list: [
          'Processed 12+ million pitches from StatCast database',
          'Feature engineering: count, score, base runners, batter tendencies',
          'Real-time API integration for live game predictions',
          'Efficient data storage and retrieval system',
        ],
      },
      {
        heading: 'Machine Learning Model',
        list: [
          'Random Forest classifier with custom hyperparameter tuning',
          'Feature importance analysis to understand pitcher behavior',
          'Context-aware predictions based on game situation',
          '85% accuracy on test set, validated across multiple seasons',
        ],
      },
      {
        heading: 'Web Application',
        paragraphs: [
          'Built a full-stack web application with React frontend and Node.js backend, allowing users to explore predictions and visualize pitcher tendencies in real-time.',
        ],
      },
      {
        heading: 'Insights & Lessons',
        list: [
          'Count (balls and strikes) was the strongest predictor, followed by the previous pitch, individual pitcher tendencies and base runners',
          'Weather and time of day had almost no predictive value, despite the time spent collecting them',
          'Accuracy reached 90%+ on predictable pitchers but dropped for rookies, playoff games and rare pitches like knuckleballs',
        ],
        paragraphs: [
          'Feature engineering was where the gains came from. The jump from 60% to 85% accuracy came from understanding the domain well enough to build meaningful features, not from a fancier algorithm.',
        ],
      },
    ],
    gallery: [
      { src: '/images/sampleInput.png', alt: 'Prediction Input Interface' },
      { src: '/images/sampleGameState.png', alt: 'Data Visualization on Website View' },
    ],
    tech: ['Sci-kit Learn', 'Node.js', 'React', 'StatCast API'],
  },
  {
    id: 3,
    slug: 'discord-bot',
    title: 'Discord Bot',
    subtitle: 'automated patch note summarization for 500+ hypixel skyblock players',
    cardSubtitle: 'Automated Discord bot serving 500+ Hypixel SkyBlock players by scraping game forums, summarizing patch notes with ChatGPT, and delivering clean updates',
    icon: '/images/discordLogo.png',
    tags: ['Web Scraping', 'ChatGPT', 'Discord.py', 'AWS'],
    links: [
      { label: 'Invite Bot →', href: 'https://top.gg/bot/1405336511003623455' },
      { label: 'View on Github →', href: 'https://github.com/ZackDoll/DollySkyblockBot' },
    ],
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'Automated Discord bot that monitors Hypixel SkyBlock forums for patch notes, scrapes them, summarizes using ChatGPT, and delivers clean updates to 500+ subscribed players. Eliminates the need for manual summarization in community servers.',
        ],
      },
      {
        heading: 'Web Scraping Implementation',
        paragraphs: [
          'Built a robust scraping system using ScrapingAnt to bypass Cloudflare protection on the Hypixel forums. The bot checks every 10 minutes for new posts and handles both pinned and regular patch notes separately.',
        ],
        list: [
          'ScrapingAnt API integration for reliable Cloudflare bypass',
          'BeautifulSoup for HTML parsing and content extraction',
          'Separate tracking for sticky (pinned) and regular posts',
          'File-based persistence to avoid duplicate notifications',
        ],
      },
      {
        heading: 'AI Summarization',
        paragraphs: [
          'Developed a highly detailed prompt that ensures every change is captured. The AI processes lengthy patch notes (often 3000+ words) and condenses them into organized, readable summaries.',
        ],
        list: [
          '20+ line rule-based prompt for completeness',
          'Categorizes changes: new features, balance updates, bug fixes',
          'Formats numerical changes as before → after comparisons',
          "Automatic message splitting for Discord's 2000 character limit",
        ],
      },
      {
        heading: 'Discord Integration',
        paragraphs: [
          'Simple but effective subscription system using text file storage. Users can subscribe/unsubscribe with commands and receive DMs when patches drop.',
        ],
        list: [
          '!subscribe and !unsubscribe commands',
          'File-based subscriber management (no database overhead)',
          'Direct message notifications to all subscribers',
          'Runs 24/7 with automated scanning',
        ],
      },
      {
        heading: 'Reliability & Error Handling',
        paragraphs: [
          'Production-ready with comprehensive error handling. The bot gracefully handles API failures, forum changes, and network issues without crashing.',
        ],
        list: [
          'Try-catch blocks around all scraping operations',
          'Graceful degradation on failures (wait and retry)',
          'Environment variable security with python-dotenv',
          'Link persistence across restarts',
        ],
      },
      {
        heading: 'Results & Lessons',
        paragraphs: [
          'The bot serves 500+ subscribers across multiple Discord servers, posting summaries within minutes of a patch and only when there is actually a patch.',
        ],
        list: [
          'Prompt engineering is iterative: the final prompt is 20+ lines of explicit rules, which stopped the model skipping changes or adding commentary',
          'File-based storage was enough at this scale, so no database was needed',
          'Error handling cannot be an afterthought: the first version crashed whenever the scraping API was down',
          'Test with real data: production surfaced edge cases like 2000+ character summaries that local testing missed',
        ],
      },
    ],
    gallery: [
      { src: '/images/exampleForumPost.png', alt: 'Example Forum Post' },
      { src: '/images/exampleMessage.png', alt: 'Example Bot Message' },
    ],
    tech: ['Python', 'BeautifulSoup', 'ChatGPT API', 'Discord.py'],
  },
  {
    id: 4,
    slug: 'chess-gpt',
    title: 'Chess GPT',
    subtitle: 'training language models to play chess using reinforcement learning',
    cardSubtitle: 'AI chess coach trained with reinforcement learning using GRPO and LoRA, providing human-like move analysis and educational explanations in natural language',
    icon: '/images/chessIcon.png',
    tags: ['Stockfish', 'LLM', 'GRPO', 'LoRA'],
    links: [
      { label: 'View on GitHub →', href: 'https://github.com/ZackDoll/ChessGPT' },
    ],
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'An experimental project exploring whether language models can learn to play chess through reinforcement learning. Using GRPO (Group Relative Policy Optimization), the model learns chess strategy by playing games against itself and traditional chess engines.',
        ],
      },
      {
        heading: 'Technical Approach',
        paragraphs: [
          'The project treats chess as a sequence generation problem, where the model generates moves in algebraic notation. By training with reinforcement learning, the model learns which move sequences lead to winning positions.',
        ],
        list: [
          'Language model architecture for move generation',
          'GRPO optimization for policy improvement',
          'Self-play training pipeline',
          'Integration with traditional chess engines for evaluation',
        ],
      },
      {
        heading: 'Reinforcement Learning Pipeline',
        paragraphs: [
          'The training process involves the model playing thousands of games, receiving rewards based on game outcomes. The GRPO algorithm helps the model learn from both successful and unsuccessful strategies.',
        ],
        list: [
          'Self-play game generation',
          'Reward shaping based on game results and position evaluation',
          'Policy gradient optimization with baseline',
          'Periodic evaluation against Stockfish',
        ],
      },
      {
        heading: 'Challenges',
        paragraphs: [
          'Training language models to play chess presents unique challenges compared to traditional approaches. The model needs to understand both chess notation and strategic concepts, while avoiding illegal moves.',
        ],
        list: [
          'Ensuring legal move generation',
          'Balancing exploration vs exploitation',
          'Computational cost of training through self-play',
          'Encoding board state effectively for the language model',
        ],
      },
      {
        heading: 'Results & Insights',
        paragraphs: [
          "The model successfully learns basic chess principles and can play coherent games. While it doesn't match the strength of traditional chess engines, it demonstrates that language models can grasp complex game rules and strategy through reinforcement learning.",
        ],
        list: [
          'Learns opening principles and basic tactics',
          'Generates legal moves consistently after training',
          'Shows understanding of positional concepts',
          'Validates potential for LLMs in strategic decision-making',
        ],
      },
    ],
    gallery: [
      { src: '/images/BoardScanTest.png', alt: 'Chess Board Scanning Test' },
      { src: '/images/scannedBoard.png', alt: 'Scanned Board State' },
    ],
    tech: ['Python', 'Reinforcement Learning', 'GPT', 'Chess Engine'],
  },
  {
    id: 5,
    slug: 'tree-requisites',
    title: 'TreeRequisites',
    subtitle: "interactive hexgrid visualization of university course prerequisites, built to make scheduling less of a nightmare for transfer students",
    cardSubtitle: "Interactive hexgrid visualization of university course prerequisites, helping transfer students navigate UCLA's class scheduling with OR nodes, drag-and-drop, and per-node comment threads",
    icon: '/images/treereq_logo.png',
    tags: ['TypeScript', 'React', 'Graph Theory', 'Docker'],
    links: [
      { label: 'Website →', href: 'https://treerequisites.com' },
    ],
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          "Scheduling classes is genuinely hard, especially as a transfer student. UCLA's prerequisite information is scattered, outdated, and buried. The official guides often don't even match the current curriculum. TreeRequisites was built to fix that. It stores course and major data from universities and visualizes prerequisite chains in an interactive hexgrid, so incoming students can clearly see which classes to take and in which order. The name is a pun on prerequisites and trees, because every good project deserves a good name.",
        ],
      },
      {
        heading: 'Technical Approach',
        paragraphs: [
          'The frontend is React in TypeScript, using react-hexgrid as a base for the hexagonal grid layout, react-router for page organization, axios and React Query for data fetching, and Zod schemas to enforce runtime type safety on all graph data coming from the backend. The backend is Golang with a Postgres database, using a recursive SQL query to backpropagate the full prerequisite tree from any given major’s leaf nodes.',
        ],
        list: [
          "Recursive SQL query starting from leaf nodes to backpropagate the full prerequisite graph",
          'Modified BFS depth algorithm (adapted from CS 180) to assign each node a tree depth and space nodes at 3× depth intervals',
          'Union-find algorithm to merge user-added elective nodes into the existing graph at the correct position',
          'Zod schema validation on all graph data to catch runtime type mismatches before they cause silent failures',
          'Custom mouse-to-hexagon coordinate mapping that converts screen-space mouse position to the nearest hexagon in grid space',
        ],
      },
      {
        heading: 'Key Features',
        list: [
          'Interactive hexgrid that renders the full prerequisite tree for any selected school and major',
          'Drag-and-drop node repositioning with a ghost hexagon outline that follows the cursor and snaps to the nearest grid position on release',
          'OR nodes for equivalent courses: classes like Stats that exist under multiple course codes (ECE 131A, MATH 170E, MATH 100A, etc.) are grouped into a single node where the user can pick their preferred option',
          'Node detail panel showing course ID, code, title, description, and a per-node comment thread; comments are scoped to each specific course, and OR nodes maintain separate comment streams per selection',
          'Hover preview panel for quick course info without opening the full detail panel',
          'Add, delete, and re-add nodes; attach elective courses that merge into the graph via union-find',
        ],
      },
      {
        heading: 'Challenges & Solutions',
        paragraphs: [
          'The OR nodes were by far the hardest part of the project. Representing a class that exists under five different course codes sounds simple until you start thinking through the edge cases: what if different options within an OR node have different prerequisites? What if switching selections introduces a node that doesn’t exist yet in the graph? Should the node move if its new prerequisites are positioned far away? We went through roughly ten iterations of the OR node implementation before landing on something that felt right, and even then there are edge cases we didn’t fully resolve.',
          "The other major challenge was data. UCLA, like most universities, doesn't expose prerequisite data through any easily accessible API. The data is either behind gated institutional systems or requires manual scraping. We never found a clean automated solution and ended up relying on direct outreach to IT departments for data access.",
          "On the frontend, getting drag-and-drop to feel natural required solving a coordinate space mismatch: the mouse position in screen space didn't map cleanly to the hexagon grid. The fix was to track the origin position of the grid and compute the distance from origin to determine which hexagon the cursor was nearest to, rather than trying to do a direct pixel-to-hex conversion.",
        ],
      },
      {
        heading: 'Future Improvements',
        list: [
          'Expand the dataset: data is currently the weakest part of the project and the biggest barrier to real usefulness',
          'Improve the tree layout algorithm to handle outlier graph shapes that produce awkward spacing',
          'Fix responsive layout and touch controls for mobile viewports',
          'Evolve the app into a full course planner, surfacing when to take classes, identifying the latest point certain courses can be taken, and reducing the scheduling burden on the user',
        ],
      },
    ],
    gallery: [
      { src: '/images/treereq_home.png', alt: 'Home Screen' },
      { src: '/images/treereq_graph.png', alt: 'Prerequisite Graph' },
      { src: '/images/treereq_node_display.png', alt: 'Node Detail Panel' },
      { src: '/images/treereq_orgate.png', alt: 'OR Gate Node' },
      { src: '/images/treereq_hovernode.png', alt: 'Node Hover Preview' },
      { src: '/images/treereq_logo.png', alt: 'TreeRequisites Logo' },
    ],
    tech: ['TypeScript', 'React', 'Graph Theory', 'Docker', 'Golang', 'PostgreSQL', 'React Query', 'Zod'],
  },
  {
    id: 6,
    slug: 'vynel',
    title: 'Vynel',
    subtitle: 'tinder-style music discovery app that builds a personalized queue from iTunes, Apple Music charts, and your liked artists',
    cardSubtitle: 'Tinder-style music discovery app that builds a personalized 30-card queue from iTunes, Apple Music charts, and liked-artist seeds, with 30-second previews and Last.fm-powered similar track seeding',
    icon: '/images/Vynel_Logo.png',
    tags: ['React Native', 'MusicKit API', 'Node.js', 'Recommendation ML'],
    links: [
      { label: 'App Store — Coming Soon', href: null },
    ],
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'Vynel is a mobile music discovery app built around a simple idea: swipe right to like a track, swipe left to skip it. The app builds a personalized 30-card queue by blending iTunes Search results, Apple Music chart data, and tracks from artists the user has already liked, weighting each source dynamically based on listening history. Liked songs feed into listening stats and playlist management screens. It targets casual music fans who want a low-friction way to discover tracks across any genre, without the algorithm opacity of major streaming platforms.',
        ],
      },
      {
        heading: 'Technical Approach',
        paragraphs: [
          'The frontend is Expo/React Native in TypeScript, using react-native-reanimated for GPU-accelerated card animations running on the UI thread, and react-native-gesture-handler for low-level swipe recognition. The backend is Fastify with Drizzle ORM on PostgreSQL, deployed on Railway. All music operations route through a service adapter interface with three concrete implementations: a guest adapter backed by AsyncStorage, a Vynel account adapter hitting the backend, and an Apple Music adapter that dual-writes to both Apple’s library and the Vynel backend.',
        ],
        list: [
          'Queue budget system allocating 30 cards across three sources: 50% iTunes popular, 20% liked-artist seeds, 30% Apple Music charts',
          'Parallel fetches across all selected genres simultaneously, flattened and deduplicated against a Set of every track ID the user has ever swiped',
          'Last.fm track.getSimilar powering "Discover Similar," resolving metadata-only Last.fm results to full iTunes track objects with preview URLs',
          'Module-level distributed lock (sequence counter + song ID claim + active player reference) preventing concurrent audio players across async boundaries',
          'JWT auth with Fastify middleware, bcrypt password hashing, and per-route ownership assertions to prevent cross-user data access',
          'RevenueCat webhook integration mapping subscription lifecycle events to backend subscription state',
        ],
      },
      {
        heading: 'Key Features',
        list: [
          'Swipe card deck with pan gesture, card rotation, LIKE/NOPE overlays, and spring snap-back; swipe threshold at 35% of screen width',
          '30-second audio previews via iTunes preview URLs, with autoplay on the top card, play/pause toggle, and a seekable progress bar',
          "Multi-source discovery queue blending iTunes popular, Apple Music charts, and artist seeds from the user's like history",
          '"Discover Similar" mode that seeds the queue from any liked track using Last.fm’s similar track data',
          'Genre filter supporting a single genre or a blend mode with up to 5 genres weighted together',
          'Playlist management screen with per-track deletion and a "More by Artist" shortcut back into Discover',
          'Listening stats including total swipes, like rate, per-genre breakdown, and a recent activity feed',
          'Freemium swipe caps: Guest 10/day, Free 20/day, Pro unlimited, with midnight reset',
          'Undo last swipe, reversing UI state, stats context, and adapter state simultaneously',
          'Full i18n across 10+ languages with locale detected synchronously before first render to avoid a remount',
        ],
      },
      {
        heading: 'Challenges & Solutions',
        paragraphs: [
          'The hardest problem was preventing concurrent audio players across an async boundary. The swipe card stack can trigger autoPlay() on multiple cards in rapid succession: the user swipes quickly, a song fetch resolves and replaces the deck, or the component mounts twice under React strict mode. Each autoPlay() call has a single async step (ensureAudioMode, a singleton promise that configures the iOS audio session). Without guards, two concurrent calls could both pass the "is there an active sound?" check, both await the same promise, and both create players, resulting in two simultaneous audio streams.',
          'The solution uses three module-level variables as a distributed lock that works across the async boundary: a monotonically incrementing sequence counter, a song ID claim, and the active player reference. Each autoPlay() call snapshots both the sequence number and its song ID before the await, then checks both again after. A second check runs after player creation but before play(), catching a subtler race where two calls both clear the active player, both await, but the first one creates and starts a player before the second one resumes. The ensureAudioMode singleton closes the final concurrency window by ensuring only one setAudioModeAsync call is ever in flight.',
          'A companion bug caused double fetches on mount: seededGenres was in the fetch effect’s dependency array, so one fetch fired on mount and a second when AsyncStorage hydrated. Moving seededGenres into a ref eliminated the re-trigger without resorting to useCallback gymnastics.',
        ],
      },
      {
        heading: 'Future Improvements',
        list: [
          'Complete MusicKit entitlement provisioning to activate full Apple Music library sync',
          'Wire up Google Sign In on the native module side (route and backend handler already exist)',
          "Move swipe cap enforcement server-side; the backend route exists but isn't connected to the cap logic yet",
          'Implement the mood selection UI (DiscoveryContext and backend schema already track moods)',
          'Full Android build and end-to-end testing pass',
          'Refine the queue slot budget based on real user engagement data post-launch',
        ],
      },
    ],
    gallery: [
      { src: '/images/discover_screen.png', alt: 'Discover Screen' },
      { src: '/images/swipe_no.png', alt: 'No Swipe' },
      { src: '/images/swipe_yes.png', alt: 'Yes Swipe' },
      { src: '/images/playlist_screen.png', alt: 'Playlist Screen' },
      { src: '/images/genre_screen.png', alt: 'Genre Screen' },
      { src: '/images/stats_screen.png', alt: 'Stats Screen' },
      { src: '/images/Vynel_Logo.png', alt: 'Vynel Logo' },
    ],
    tech: ['React Native', 'Expo', 'TypeScript', 'MusicKit API', 'Fastify', 'Node.js', 'PostgreSQL', 'Drizzle ORM', 'Last.fm API', 'RevenueCat', 'Railway', 'iTunes Search API'],
  },
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
