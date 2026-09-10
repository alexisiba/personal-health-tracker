# Git Commit Skill

## Purpose

Create Git commits following the Conventional Commits specification while validating the repository state before attempting to commit.

---

## Workflow

### 1. Validate repository status

Before generating or executing any commit, inspect the repository status.

#### Case 1 - No staged files but unstaged changes exist

If there are **no staged changes** but **unstaged changes are present**:

- Stop immediately.
- Do NOT generate or perform a commit.
- Return the following message:

> Commit cancelled. There are modified files that have not been added to the staging area. Please stage the desired changes before creating a commit.

---

#### Case 2 - No staged files and no unstaged changes

If the working tree is completely clean:

- Stop immediately.
- Do NOT generate or perform a commit.
- Return the following message:

> Nothing to commit. The repository has no staged or unstaged changes.

---

#### Case 3 - Staged files exist

If staged files are present:

- Continue with the commit process.
- Ignore unstaged files that are not part of the staged changes.
- Generate a Conventional Commit message based **only** on the staged files.

---

## Commit Message Rules

Follow the Conventional Commits specification.

Format:

```
<type>: <short description>
```

Examples:

```
feat: add page hero component
fix: resolve navbar rendering issue
refactor: simplify layout rendering
style: improve hero spacing
docs: update installation guide
chore: update dependencies
perf: optimize asset loading
test: add layout unit tests
```

### Description Guidelines

- Use imperative mood.
- Be concise.
- Clearly describe the primary change.
- Avoid generic messages like "changes" or "updates".
- Keep the summary short but meaningful.

---

## Commit Summary

After a successful commit, return:

- The generated commit message.
- A brief summary of the staged files included in the commit.

Example:

```
Commit created successfully.

Commit:
feat: add reusable page hero component

Summary:
- Added the new PageHero partial.
- Added the PageHeroData DTO.
- Updated Layout rendering to support the new component.
```

---

## Requirements

- Never include unstaged files in the commit summary.
- Never infer changes that are not present in the staged files.
- Never perform a commit if validation fails.
- Always validate repository status before generating a commit message.
- Always base the commit message on the staged changes only.