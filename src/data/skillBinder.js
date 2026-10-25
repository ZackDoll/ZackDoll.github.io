// Card data for the Skills section's binder. `type` picks the card's tint
// (see TYPE_TINT below); `level` is 'Core' (foil) or 'Fluent' (plain) —
// there's no 'Exploring' tier here, since nothing unproven is listed.
export const TYPE_TINT = {
  Language: '#5BC0F8',
  Framework: '#7DE0A0',
  Tool: '#C4B3FF',
  Certification: '#FDBA74',
};

export const SKILLS = [
  // Languages
  { name: 'Python', mono: 'Py', type: 'Language', level: 'Core', blurb: 'The backend of almost everything here — the ASL translator, the pitch predictor, and the GoProfiles MCP server.' },
  { name: 'JavaScript', mono: 'Js', type: 'Language', level: 'Fluent', blurb: 'The language under every web project in this portfolio, frontend and backend both.' },
  { name: 'TypeScript', mono: 'Ts', type: 'Language', level: 'Core', blurb: 'Types on top of JavaScript — used across TreeRequisites and Vynel to catch bugs before they ship.' },
  { name: 'Java', mono: 'Jv', type: 'Language', level: 'Fluent', blurb: 'Strong typing and the JVM, from UCLA coursework through side projects.' },
  { name: 'Swift', mono: 'Sw', type: 'Language', level: 'Fluent', blurb: 'Native iOS development — the groundwork for Vynel’s mobile build.' },
  { name: 'PHP', mono: 'Ph', type: 'Language', level: 'Fluent', blurb: 'Server-side scripting for web backends.' },
  { name: 'Go', mono: 'Go', type: 'Language', level: 'Core', blurb: 'Powers TreeRequisites’ backend — a concurrent scraping pipeline over a Postgres database on Oracle Cloud.' },
  { name: 'SQL', mono: 'Sq', type: 'Language', level: 'Fluent', blurb: 'Querying and modeling relational data, from course prerequisite graphs to pitch-by-pitch StatCast records.' },
  { name: 'C++', mono: 'C+', type: 'Language', level: 'Fluent', blurb: 'Performance-minded programming from Data Structures and Algorithms coursework.' },
  { name: 'HTML/CSS', mono: 'Ht', type: 'Language', level: 'Fluent', blurb: 'Structure and styling for every interface in this portfolio, including the one you’re looking at.' },

  // Frameworks & Libraries
  { name: 'React', mono: 'Re', type: 'Framework', level: 'Core', blurb: 'The interface layer behind Vynel, the pitch predictor dashboard, and this site itself.' },
  { name: 'Node.js', mono: 'No', type: 'Framework', level: 'Core', blurb: 'JavaScript on the server — the backend for the pitch predictor’s web app.' },
  { name: 'Express.js', mono: 'Ex', type: 'Framework', level: 'Fluent', blurb: 'Routing and middleware for Node backends.' },
  { name: 'PyTorch', mono: 'Pt', type: 'Framework', level: 'Core', blurb: 'Deep learning framework behind the ASL translator’s LSTM models and the ChessGPT move-prediction work.' },
  { name: 'TensorFlow', mono: 'Tf', type: 'Framework', level: 'Fluent', blurb: 'A second deep learning toolkit used alongside PyTorch for real-time inference work.' },
  { name: 'Scikit-learn', mono: 'Sk', type: 'Framework', level: 'Fluent', blurb: 'Classical ML modeling — the Random Forest classifier behind the 85%-accurate pitch predictor.' },
  { name: 'OpenCV', mono: 'Cv', type: 'Framework', level: 'Fluent', blurb: 'Computer vision tooling that feeds hand-tracking data into the ASL translator.' },

  // Developer Tools
  { name: 'Git', mono: 'Gt', type: 'Tool', level: 'Fluent', blurb: 'Version control for every project in this portfolio, solo and team alike.' },
  { name: 'AWS', mono: 'Aw', type: 'Tool', level: 'Core', blurb: 'Cloud infrastructure, including ECS deployment with custom task and security group configuration at GoLinks.' },
  { name: 'Docker', mono: 'Dk', type: 'Tool', level: 'Fluent', blurb: 'Containerizing services for consistent builds and deploys.' },
  { name: 'MongoDB', mono: 'Mo', type: 'Tool', level: 'Fluent', blurb: 'Document storage for projects that don’t need a relational schema.' },
  { name: 'PostgreSQL', mono: 'Pg', type: 'Tool', level: 'Core', blurb: 'The relational backbone of TreeRequisites and Vynel, queried through raw SQL and Drizzle ORM alike.' },
  { name: 'Linux', mono: 'Lx', type: 'Tool', level: 'Fluent', blurb: 'The environment every one of these projects actually ships and runs on.' },

  // Certifications
  { name: 'Google Data Analytics Certificate', short: 'Google Data Analytics', mono: 'Da', type: 'Certification', level: 'Fluent', blurb: 'Google’s professional certificate covering the full data analysis process, start to finish.' },
  { name: 'Supervised ML (Regression & Classification)', short: 'Supervised ML', mono: 'Ml', type: 'Certification', level: 'Fluent', blurb: 'Andrew Ng’s foundational course on supervised learning — regression and classification from first principles.' },
];
