# massage

MArkdown Site StAtic GEnerator.

## Installation

```
npm i @tadatuta/massage
massage
```

## Configuration

Put `site.yml` to the root of your repo.

```yaml
siteName: gemini
description: Utility for regression testing of web pages using screenshots

pages:
  - slug: index
    source: README.md
    title: Quick start

  - slug: configuration
    source: doc/config.md
    title: Configuration

theme: simple

outputDir: site
```
