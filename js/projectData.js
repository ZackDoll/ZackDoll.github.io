const projectData = {
    asl: {
        title: "ASL Translator",
        subtitle: "Real-time American Sign Language translation using computer vision and deep learning",
        tags: ["LSTM/Dense", "Kaggle", "MediaPipe", "TensorFlow"],
        links: [
            { text: "View on GitHub", url: "https://github.com/ZackDoll/SignLanguageCV" }
        ],
        sections: [
            {
                title: "Overview",
                content: `This project combines computer vision and machine learning to translate American Sign Language 
                in real-time. Using your webcam, the system captures hand gestures and translates them into English text, 
                making communication more accessible.`
            },
            {
                title: "Technical Approach",
                content: `The system uses MediaPipe for hand tracking and keypoint extraction, followed by an LSTM neural 
                network for sequence classification. By combining the ASL Citizen dataset with the MSASL dataset, I achieved 
                significantly improved accuracy across a wide range of signs.`,
                bullets: [
                    "MediaPipe Holistic for hand, pose, and face landmark detection",
                    "LSTM architecture for temporal sequence modeling",
                    "Custom data preprocessing pipeline combining multiple datasets",
                    "Real-time inference optimization for smooth webcam interaction"
                ]
            },
            {
                title: "Key Features",
                bullets: [
                    "Real-time gesture recognition from webcam feed",
                    "Support for dynamic signs (signs with movement)",
                    "High accuracy through multi-dataset training",
                    "Lightweight model suitable for local execution"
                ]
            },
            {
                title: "Challenges & Solutions",
                content: `One major challenge was dealing with data sparsity in individual datasets. I solved this by 
                developing a pipeline to combine and normalize data from multiple sources, significantly increasing the 
                training set size and diversity.`
            },
            {
                title: "Future Additions",
                bullets:[
                    "Expand vocabulary to include more words, and understand sentence structure",
                    "Website is in development",
                    "Rearrange data inputs for higher accuracy",
                    "Develop a mobile app",
                    "Implement user feedback loop for continuous learning",
                    "Always looking for more data"
            ]
            }
        ],
        images: [

            {src: "ASLTest.gif", alt: "ASL Detection Demo" },
        ]
    },
    mlb: {
        title: "MLB Pitch Predictor",
        subtitle: "Machine learning system predicting pitch types with 85% accuracy",
        tags: ["Sci-kit Learn", "Node.js", "React", "StatCast API"],
        links: [
            { text: "Live Demo", url: "https://pitch-predictor.onrender.com" },
            { text: "View on Github", url: "https://github.com/ZackDoll/PitchingStats" }
        ],
        sections: [
            {
                title: "Overview",
                content: `An advanced machine learning system that analyzes real-time game conditions to predict the next 
                pitch type in MLB games. Trained on over 12 million historical pitches from StatCast, achieving 85% accuracy.`
            },
            {
                title: "Data Pipeline",
                content: `The project required processing massive amounts of baseball data from StatCast's API. I built a 
                comprehensive data pipeline to clean, normalize, and feature-engineer the raw pitch data.`,
                bullets: [
                    "Processed 12+ million pitches from StatCast database",
                    "Feature engineering: count, score, base runners, batter tendencies",
                    "Real-time API integration for live game predictions",
                    "Efficient data storage and retrieval system"
                ]
            },
            {
                title: "Machine Learning Model",
                bullets: [
                    "Random Forest classifier with custom hyperparameter tuning",
                    "Feature importance analysis to understand pitcher behavior",
                    "Context-aware predictions based on game situation",
                    "85% accuracy on test set, validated across multiple seasons"
                ]
            },
            {
                title: "Web Application",
                content: `Built a full-stack web application with React frontend and Node.js backend, allowing users to 
                explore predictions and visualize pitcher tendencies in real-time.`
            }
        ],
        images: [
            {src: "sampleInput.png", alt: "Prediction Input Interface" },
            {src: "sampleGameState.png", alt: "Data Visualization on Website View" }
        ]
    },
    scraper: {
        title: "Forum Patch Note Scraper",
        subtitle: "Automated Discord bot for game patch note monitoring and summarization",
        tags: ["Web Scraping", "ChatGPT", "Discord.py",  "AWS"],
        links: [
            { text: "View on GitHub", url: "https://github.com/ZackDoll/DollySkyblockBot" },
            { text: "Discord Bot Invite", url: "https://top.gg/bot/1405336511003623455"}
        ],
        sections: [
            {
                title: "Overview",
                content: `A Discord bot that automatically monitors game forums for patch notes, uses ChatGPT to generate 
                concise summaries, and distributes them to subscribers. Keeps gaming communities informed without information 
                overload.`
            },
            {
                title: "Technical Implementation",
                bullets: [
                    "Automated web scraping with ScrapingAnt to bypass rate limits",
                    "ChatGPT integration for intelligent content summarization",
                    "Discord.py for bot functionality and user management",
                    "Scheduled checks for new forum posts",
                    "Subscriber management system with custom notification preferences",
                    "Deployed on AWS Ubuntu EC2 for 24/7 uptime"
                ]
            },
            {
                title: "Key Features",
                bullets: [
                    "Real-time monitoring of multiple forum threads",
                    "AI-powered summarization highlighting key changes",
                    "User subscription system with role-based notifications",
                    "Handles API rate limiting and error recovery",
                    "Customizable summary length and detail level"
                ]
            },
            {
                title: "Evolution",
                content: `Initially used ScraperAPI and fake browser headers but migrated to ScrapingAnt for better reliability and rate limit handling. 
                Optimized ChatGPT prompts to produce more focused, relevant summaries that users actually want to read.
                Currently awaiting verificationt to be posted on discord bots lists.`
            }
        ],
        images: [
            {src: "exampleForumPost.png", alt: "Forum Post Example" },
            {src: "exampleMessage.png", alt: "Summary Example" }
        ]
    },
    chess: {
        title: "ChessGPT",
        subtitle: "AI chess tutor with human-like analysis and move recommendations",
        tags: ["Stockfish", "LLM", "GRPO", "LoRA", ],
        links: [
            { text: "View on GitHub", url: "https://github.com/ZackDoll/ChessGPT" }
        ],
        sections: [
            {
                title: "Overview",
                content: `An AI-powered chess tutor that doesn't just suggest moves, but explains them like a human coach would. 
                Uses a custom-trained language model with reinforcement learning to provide natural, educational analysis.`
            },
            {
                title: "Model Architecture",
                bullets: [
                    "Fine-tuned LLM using GRPO (Group Relative Policy Optimization)",
                    "LoRA (Low-Rank Adaptation) for efficient fine-tuning",
                    "Trained on chess commentary and analysis from top players",
                    "Reinforcement learning from chess engine feedback",
                    "Natural language generation for move explanations"
                ]
            },
            {
                title: "Features",
                bullets: [
                    "Real-time move suggestions with detailed reasoning",
                    "Multiple difficulty levels matching user skill",
                    "Explains tactical patterns and strategic concepts",
                    "Analyzes completed games with improvement suggestions",
                    "Conversational interface for asking follow-up questions"
                ]
            },
            {
                title: "Training Process",
                content: `The model was trained using GRPO to optimize for both move quality and explanation clarity. 
                LoRA allowed efficient fine-tuning without requiring massive computational resources, making the project 
                feasible on consumer hardware.`
            }
        ],
        images: [
            {src:"BoardScanTest.png" , alt: "Board Scanner" },
            {src:"dataInput.png" , alt: "Training Data" },
            {src:"scannedBoard.png" , alt: "Board Scanned" }
        ]
    }
};
