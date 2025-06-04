encodeclub-bootcamp/
│
├── README.md
├── .gitignore
├── package.json / foundry.toml / hardhat.config.js (depending on your stack)
│
├── contracts/              # All Solidity contracts
│   └── Example.sol
│
├── scripts/                # Deployment or utility scripts
│   └── deploy.js
│
├── test/                   # Test files (JavaScript, TypeScript or Solidity)
│   └── example.test.js
│
├── tasks/                  # Hardhat custom tasks (if applicable)
│
├── deployments/            # Deployment data per network
│   ├── localhost/
│   └── sepolia/
│
├── frontend/               # Optional: React/Vite frontend if included
│   ├── public/
│   ├── src/
│   └── vite.config.js
│
├── docs/                   # Notes, explanations, diagrams, research
│   └── week1-overview.md
│
└── assignments/            # Each week's assignments if separated
    ├── week1/
    ├── week2/
    └── final-project/