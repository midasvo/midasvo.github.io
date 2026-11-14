# midasvo.nl

Personal site of Midas van Oene, a senior Java engineer in Nijmegen: a short about page, a projects list and a blog. It is a plain Jekyll site hosted on GitHub Pages at https://midasvo.nl (see `CNAME`).

## Structure

- `_posts/` - blog posts, one Markdown file per post (`YYYY-MM-DD-slug.markdown`). Permalinks default to `/blog/:title` (see `_config.yml`). `_posts/drafts/` and `_posts/outdated/` hold unpublished or retired material.
- `_data/projects.yml` - the list rendered on `/projects/`. The field reference is at the top of the file.
- `_layouts/` and `_includes/` - page templates and partials. `_includes/head.html` holds the SEO metadata (title, Open Graph, Twitter cards, JSON-LD).
- `_sass/` and `css/main.scss` - styles. Design tokens (colours, spacing, type) live in the Sass partials and are compiled into `/css/main.css`.
- `assets/` - fonts, images and the default social image (`assets/og-image.png`, 1200x630).
- `feed.xml`, `robots.txt` - RSS feed and robots file. The sitemap comes from `jekyll-sitemap`.
- `index.html`, `about.md`, `blog.md`, `projects.md`, `uses.md` - top-level pages.

## Adding a post

Create `_posts/YYYY-MM-DD-slug.markdown`:

```yaml
---
layout: post
title: "Post title"
date: 2026-01-31 10:00:00
categories: blog featured
description: "One or two sentences, used for search results and link previews."
---
```

The date must not be in the future, or Jekyll skips the post. Set `image: /assets/images/...` to override the social preview image, `math: true` to load KaTeX, and `permalink:` to pick a custom URL. Prefer WebP for screenshots and reference images through the `relative_url` filter. Paths are case-sensitive on GitHub Pages.

## Adding a project

Add an entry at the top of `_data/projects.yml` (newest first) with `name`, `tagline`, `year` and optionally `image`, `image_alt`, `url`, `post_url` and `tech`.

## Previewing locally

There is currently no `Gemfile`. To preview you need Ruby and the `github-pages` gem, which pins the same Jekyll version GitHub Pages uses:

```sh
gem install github-pages
jekyll serve
```

If you add a `Gemfile` with `gem "github-pages", group: :jekyll_plugins`, use `bundle exec jekyll serve` instead. The site is then served at http://localhost:4000.

## Deployment

Push to `master`. GitHub Pages builds and publishes the site; there is no CI step. Only plugins on the GitHub Pages allowlist work.
