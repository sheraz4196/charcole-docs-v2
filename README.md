# Charcole Documentation

This directory contains comprehensive documentation for Charcole features and packages.

## Documentation Files

### Core Concepts

#### [Repositories](./repositories.md)

Learn what repositories mean in Charcole and why they are one of the most powerful parts of the architecture. Covers database abstraction, development without databases, and long-term flexibility.

### Swagger Documentation

#### [Swagger Overview](./swagger.md)

Main guide explaining what @charcole/swagger is, why it exists, and how it eliminates schema duplication. Covers the fundamental problem and the solution.

#### [Swagger Examples](./swagger-examples.md)

Practical, copy-paste examples for common API patterns:

- GET endpoints
- POST with validation
- Protected endpoints with authentication
- CRUD operations
- Custom response schemas
- Query parameters

#### [Swagger for Non-Charcole Projects](./swagger-for-non-charcole.md)

How to use @charcole/swagger in any Express.js project, even if you didn't use create-charcole. Covers installation, basic setup, and integration with existing projects.

#### [Adding Swagger to Existing Charcole Projects](./swagger-migration.md)

Step-by-step migration guide for projects created with Charcole v2.1 or earlier. Shows how to retrofit auto-generated Swagger documentation into existing codebases.

## Documentation Format

All documentation follows a consistent format:

- **YAML frontmatter:** Title, description, navigation icon, SEO metadata
- **Narrative style:** Clear explanations without unnecessary jargon
- **Practical focus:** Real-world examples and use cases
- **Problem-solution structure:** Explains why features exist, not just how to use them

## Navigation

The documentation is designed to be read in any order based on your needs:

**New to Charcole?**

1. Read repositories.md to understand core architecture
2. Read swagger.md to understand auto-generated docs
3. Try swagger-examples.md for hands-on examples

**Existing Charcole user (v2.1)?**

1. Read swagger.md for overview
2. Follow swagger-migration.md to add Swagger to your project
3. Reference swagger-examples.md as needed

**Want to use @charcole/swagger standalone?**

1. Read swagger.md for context
2. Follow swagger-for-non-charcole.md for setup
3. Reference swagger-examples.md for patterns

## Contributing to Documentation

When adding new documentation:

1. Follow the existing YAML frontmatter format
2. Use narrative style - explain why, not just how
3. Include practical examples
4. Keep it focused and concise
5. Update this README with links to new docs

## External Documentation

- **Package README:** `packages/swagger/README.md` - API reference for @charcole/swagger
- **Swagger Guide (in templates):** `template/ts/src/lib/swagger/SWAGGER_GUIDE.md` - Quick reference for projects created with Charcole
- **Changelog:** `CHANGELOG.md` - Version history and release notes
- **Backward Compatibility:** `packages/swagger/BACKWARD_COMPATIBILITY.md` - Migration and compatibility information
