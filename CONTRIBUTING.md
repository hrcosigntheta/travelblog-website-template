# Contributing to Philippine Travel Blog Template

Thank you for your interest in contributing! We welcome contributions from the community to help improve this template for everyone.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct (standard Open Source contributor covenant).

## How to Contribute

### Reporting Bugs

- Check the [Issues](https://github.com/MasuRii/travelblog-website-template/issues) to see if the bug has already been reported.
- If not, open a new issue with a clear title, description of the problem, and steps to reproduce.

### Suggesting Features

- Open a new issue and describe the feature you'd like to see, along with why it would be useful for travel bloggers.

### Pull Requests

1.  **Fork** the repository.
2.  **Clone** your fork: `git clone https://github.com/your-username/travelblog-website-template.git`
3.  **Create a branch** for your feature or fix: `git checkout -b feature/amazing-feature`
4.  **Install dependencies**: `bun install`
5.  **Make your changes**.
6.  **Ensure tests pass**: `bun run test:run` and `bun run data:validate:all`.
7.  **Follow the commit style**: Use conventional commits (e.g., `feat(ui): add new card component`).
8.  **Push** to your fork and **open a Pull Request**.

## Development Workflow

- **Branch Naming**: Use `feature/`, `fix/`, or `docs/` prefixes.
- **Code Style**: The project uses ESLint and Prettier. Running `bun run format` will handle most styling issues.
- **Testing**: We use Vitest for unit tests and Playwright for E2E tests. Add tests for any new features.
- **Data Integrity**: If you modify destination or adventure data, run `bun run data:validate:all` to ensure no links are broken.

## Repository Structure

Refer to [Project Structure Documentation](docs/architecture/PROJECT_STRUCTURE.md) for an overview of how the codebase is organized.

## Documentation

Update relevant documentation in the `docs/` folder if your changes affect project setup, configuration, or architecture.

---

Happy coding! 🌴
