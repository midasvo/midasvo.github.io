---
layout: post
title:  "gptiers / gamepass.fyi"
date:   2026-04-26 10:00:00
categories: blog featured
permalink: /blog/gamepass-fyi
description: "Building gamepass.fyi — a side-by-side Game Pass tier diff tool over the public xbox.com catalog API."
---

Microsoft restructured Game Pass in October 2025. Three tiers now: Essential, Premium, Ultimate. The compare page on xbox.com lists feature differences (HDR, day-one releases, EA Play included) but doesn't list a single actual game. So if you're sitting there trying to decide whether the Ultimate delta is worth it, you can't see the catalogs side by side. You can browse them one at a time, and you can guess. That's the entire UX.

I stared at the compare page for about three minutes, gave up, and built [gamepass.fyi](https://gamepass.fyi) instead.

![gamepass.fyi diff view: Premium (386 games) compared to Ultimate (518), with EA Play and Ubisoft+ benefit chips and a count of 134 games in Ultimate but not Premium]({{ "/assets/images/gamepass_fyi/diff.png" | relative_url }})

The thing I like most about this project is how boring it is. xbox.com itself fetches its catalog from a public, unauthenticated API. `catalog.gamepass.com` and `displaycatalog.mp.microsoft.com`. No Microsoft account, no key, no scraping. Crack DevTools, hit the tier filter, and the Network tab tells you exactly which UUIDs the page asks for.

So step one was capturing those UUIDs. I pointed another Claude agent at the compare page with a discovery brief and it sat there toggling tier filters and recording every request. Three useful findings dropped out:

- The endpoint is `sigls/v3`, not v2. v3 requires a `platformContext` (console vs PC) and a `subscriptionContext`.
- There's no "Ultimate SIGL". There's one master "all games" UUID, parameterised by the Microsoft Store product family ID of the tier. Ultimate is `cfq7ttc0khs0`, Premium is `cfq7ttc0p85b`, and so on.
- EA Play and Ubisoft+ Classics aren't tiers. They're benefits bundled into Ultimate, each with its own console-vs-PC SIGL pair.

Those captures landed in `src/test/resources/fixtures` as JSON. The whole backend suite runs offline against WireMock, which is the kind of thing I appreciate when I'm coding on the train.

The actual app is a single Spring Boot process plus Postgres. Kotlin because that's what I reach for, Spring Boot 3 because there's no reason not to, Postgres because the diff is literally a `NOT EXISTS`. No graph DB, no Elasticsearch, nothing fancy.

The schema is one of the few places I let myself overthink it. `tier_memberships` is `(game, tier, market, first_seen_at, last_seen_at, is_current)`. When a game leaves a tier I flip `is_current=false` and keep the row. If it comes back six weeks later, that's a new row, not an update. Which means "games added to Ultimate this month" is a query, not a separate cron. And the history stays intact even when titles bounce in and out, which they do more than I expected.

![gamepass.fyi game detail page for Aerial_Knight's DropShot, with tier badges (Ultimate, PC Game Pass, Console Legacy) and a membership history table showing first-seen and last-seen dates per tier]({{ "/assets/images/gamepass_fyi/detail.png" | relative_url }})

A daily job at 04:00 CET pulls each `(tier, market)` SIGL, enriches any new BigIds in batches of 20 against displaycatalog, and reconciles. About a thousand unique games across all tiers, twenty seconds start to finish. There's a small Caffeine cache in front of the read API that the sync runner explicitly evicts when it finishes, so the next page load sees the new numbers. That one was a small gotcha to wire correctly.

Two things did surprise me. First, the `MS-CV` header value displaycatalog wants has a `+` in it, and Microsoft's server form-decodes the query string, so the `+` gets read as a space and the call 400s. I had to bypass Spring's URI builder and hand-encode it as `%2B`. There's a comment in `DisplayCatalogClient.kt` so future-me doesn't politely "fix" it back.

Second, benefits sync across both the console and PC SIGLs and union the BigIds before reconciling. The first version only synced one platform, which promptly marked every PC game as not-current. The schema doesn't carry a platform column on benefits (deliberate, on grounds that EA Play is EA Play), so the reconciler has no way to tell "missing because removed" apart from "missing because I asked the wrong SIGL". Union, then reconcile.

Hosting is the usual stack: Oracle Free Tier VPS, Caddy out front for TLS, Forgejo Actions building both images on every push to `develop`. The frontend container is an unprivileged nginx that internally proxies `/api`, `/admin` and `/actuator` to the backend over the docker network, so Caddy on the host forwards to a single port and there's no `/api` split to maintain at the edge. Renovate runs Mondays before 6am and auto-merges patches. I almost never have to look at this stack and that's the point.

![gamepass.fyi admin panel with cards for Sync a Tier, Sync a Benefit, Full Daily Run, Display Settings and Read Caches, plus a Recent Sync Runs table at the bottom]({{ "/assets/images/gamepass_fyi/admin.png" | relative_url }})

The admin page is form-login behind a single in-memory user. One-click triggers for "sync this tier", "sync this benefit", "run the full daily job now". Paginated table of recent runs underneath. Everything I need to debug a sync without SSHing in, which means most of the time I don't.

Most of the build was a long weekend in April. I handed `PLAN.md` to Claude Code with a tight phase brief and a self-review checklist, and worked through the phases with code review between steps. The DevTools/SIGL discovery was a separate agent on the same setup. I'm still a bit surprised it came together in three days. There's a version of this project where I shave yaks for a week on test infrastructure or bikeshed the schema. None of that happened, mostly because the API turned out to be exactly what I hoped, and partly because the brief was specific enough that the agent didn't have room to invent stuff.

The `.fyi` TLD felt right for an info tool. Cheap, flat renewal, and the only person who's ever asked me what `.fyi` stands for is my dad.

What I might add: a "leaving soon" view, since Microsoft already exposes that as its own SIGL. Maybe a notification when something I've flagged shows up in Ultimate. Probably not. The thing answers one question, the one I built it for. For NL in April 2026: yes, by 139 games.
