# Contributing to DentWise AI

Thank you for your interest in contributing to DentWise AI! This guide explains how to join the project as a contributor and submit your work.

---

## For the Repository Owner: Adding a Collaborator

If you are the repository owner and want to give a friend **direct push access** (so they can work on the repo together with you as a group project):

1. Go to the repository on GitHub: `https://github.com/pegasus-x/dentwise-ai`
2. Click **Settings** → **Collaborators and teams** (under "Access")
3. Click **Add people**
4. Enter your friend's GitHub username or email address
5. Select a role (e.g., **Write** for a contributor)
6. Click **Add [username] to this repository**
7. Your friend will receive an email invitation — they must **accept** it to gain access

---

## For Contributors: Fork & Pull Request Workflow

If you do not have direct push access, you can contribute by forking the repository:

### 1. Fork the Repository

1. Go to `https://github.com/pegasus-x/dentwise-ai`
2. Click the **Fork** button (top-right corner)
3. This creates a copy of the repo under your own GitHub account

### 2. Clone Your Fork Locally

```bash
git clone https://github.com/<your-username>/dentwise-ai.git
cd dentwise-ai
```

### 3. Set Up the Project

Install dependencies and configure your environment:

```bash
npm install
```

Copy the environment variables template (if applicable) and fill in the required values:

```bash
cp .env.example .env.local
```

### 4. Create a Feature Branch

Always work on a dedicated branch — never commit directly to `main`:

```bash
git checkout -b feature/your-feature-name
```

### 5. Make Your Changes

Run the development server to preview your changes:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### 6. Lint and Check Your Code

Before committing, make sure your code passes the linter:

```bash
npm run lint
```

### 7. Commit and Push

```bash
git add .
git commit -m "feat: describe your change"
git push origin feature/your-feature-name
```

### 8. Open a Pull Request

1. Go to your fork on GitHub
2. Click **Compare & pull request**
3. Set the base repository to `pegasus-x/dentwise-ai` and base branch to `main`
4. Describe what you changed and why
5. Click **Create pull request**

The repository owner will review your PR and merge it when it is ready.

---

## Keeping Your Fork Up to Date

To stay in sync with the main repository:

```bash
# Add the upstream remote once
git remote add upstream https://github.com/pegasus-x/dentwise-ai.git

# Pull the latest changes from upstream
git fetch upstream
git checkout main
git merge upstream/main
```

---

## Code Style

This project uses [Biome](https://biomejs.dev/) for linting and formatting. Run `npm run lint` before every commit to ensure your code meets the project's style guidelines.

---

## Questions?

Open an [issue](https://github.com/pegasus-x/dentwise-ai/issues) or start a discussion if you have any questions.
