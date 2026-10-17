# Contributing to MicroCampus Enterprise Hub

Thank you for your interest in contributing to **MicroCampus**! This document provides guidelines and workflows for contributing to our enterprise multi-tier campus management platform.

---

## 🏛️ Development Workflow

1. **Fork & Branch**:
   - Create a feature or chore branch off `main`:
     ```bash
     git checkout -b feature/your-feature-name
     ```

2. **Code Standards**:
   - Backend: Java 17+, Spring Boot microservices conventions, Maven build verification.
   - Frontend: Modern component structure, strict typing, clean state isolation.
   - Database: Flyway/Liquibase schema migrations with idempotent SQL.

3. **Commit Conventions**:
   - We follow [Conventional Commits](https://www.conventionalcommits.org/):
     - `feat:` New capability or endpoint
     - `fix:` Bug fix
     - `docs:` Documentation improvements
     - `perf:` Performance optimizations
     - `test:` Unit/integration tests

4. **Pull Requests**:
   - Ensure all automated builds pass before requesting review.
   - Keep pull requests focused and atomic.
   - Provide clear PR descriptions outlining changes and testing notes.

---

## 🛡️ License
By contributing to MicroCampus, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
