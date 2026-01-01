# Context Documentation

This folder contains architectural guidance for migrating the Clover/PocketPro golf app into a modern monorepo setup.

## Files

1. **01_PROJECT_OVERVIEW.md** - High-level goals and current system state
2. **02_MONOREPO_ARCHITECTURE.md** - Target architecture and dev orchestration
3. **03_VITE_MIGRATION_PLAN.md** - CRA to Vite migration steps
4. **04_BACKEND_RUNTIME_AND_ENV.md** - Django backend setup and configuration
5. **05_FRONTEND_API_LAYER_STANDARD.md** - API client architecture
6. **06_DESIGN_TOKENS_CSS_ARCHITECTURE.md** - Token-based design system
7. **07_COMPONENT_CONSOLIDATION_PLAN.md** - UI component refactoring strategy
8. **08_RUNBOOK_COMMANDS.md** - Common commands and workflows

## Usage

These documents serve as context for AI coding assistants (Copilot, etc.) and human developers to:
- Understand the migration path from CRA to Vite
- Implement monorepo structure with frontend + backend
- Standardize API layer and component architecture
- Establish design token system

## Implementation

Use the provided agent prompts to implement changes incrementally. Each prompt targets a specific area of the migration.
