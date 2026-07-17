# Contributing to AI Business Agent

We follow a strict, disciplined workflow to ensure our SaaS platform scales securely and maintainably. Whether you are a human developer or an AI Agent, these rules apply.

## Branching Strategy
We use Trunk-Based Development.
- `main` is always production-ready.
- Create feature branches from `main` using the format: `type/issue-number-description`.
  - Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`.
  - Example: `feat/123-add-stripe-billing`

## Pull Request Guidelines
1. **Small, Focused PRs**: Do not combine multiple features into one PR. 
2. **Title**: Follow Conventional Commits (e.g., `feat(auth): add OAuth login`).
3. **Description**: 
   - What does this PR do?
   - Why is it necessary?
   - How was it tested?
4. **CI/CD**: All PRs must pass type checking (`tsc --noEmit`), linting (`eslint`), and unit tests.
5. **Reviewers**: At least one human review and one AI Code Review Agent review is required.

## Commit Message Standards
Use [Conventional Commits](https://www.conventionalcommits.org/).
- `feat:` A new feature.
- `fix:` A bug fix.
- `docs:` Documentation only changes.
- `style:` Changes that do not affect the meaning of the code (white-space, formatting).
- `refactor:` Code changes that neither fix a bug nor add a feature.
- `perf:` A code change that improves performance.
- `test:` Adding missing tests or correcting existing tests.

## Development Workflow
1. **Sync**: `git pull origin main`
2. **Branch**: `git checkout -b <branch-name>`
3. **Code**: Write code following our `docs/CODING_STANDARDS.md`.
4. **Test**: Run local tests and verify UI manually.
5. **Commit**: Commit frequently with clear messages.
6. **Push & PR**: Push your branch and open a PR against `main`.
