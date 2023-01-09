# Contributing

> This project is a fork of: https://github.com/mozilla/multi-account-containers

This project is a fork of another project and still contains a lot of the original code, much of it unused. Whenever you get a chance to remove some of the unused legacy code, please do!

## Requirements

- Firefox 91.1.0+
- Git 2.13+
- Node 7+

## Getting Started

1. Fetch the locales:

   ```
   cd multi-account-containers
   git submodule update --init
   ```

2. Install the project dependencies
   ```
   npm install --legacy-peer-deps
   ```
3. Run `npm run dev`.

## Translations

The translations are located in `src/_locales`. This directory is a git
repository (https://github.com/mozilla-l10n/multi-account-containers-l10n/) and is relic from the original forked project.

Whenever possible, replace locales references with inline text.
