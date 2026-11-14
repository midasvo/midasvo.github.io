---
layout: page
title: Uses
permalink: /uses/
description: "The hardware, editors, tools and services Midas van Oene uses day to day, kept as a living document."
---

A living document of what I currently use. Last updated November 2026.

## Hardware

My main machine is an [XMG NEO 16 (E25)](https://www.xmg.gg/): an Intel Core Ultra 9 275HX, an RTX 5090 Laptop GPU and 64 GB of RAM, running Windows 11. I once wrote on this page that I should stay away from NVIDIA next time. That didn't last.

## Development

- **Editors:** [Zed](https://zed.dev/) for most things, [IntelliJ IDEA](https://www.jetbrains.com/idea/) when a Java or Kotlin project needs the heavy machinery.
- **AI:** [Claude Code](https://claude.com/claude-code), mostly in the desktop app. [Ollama](https://ollama.com/) when I want to try a model locally.
- **Languages:** Java and Kotlin at work and in [Ephyra]({{ '/blog/ephyra' | relative_url }}), with [Eclipse Temurin](https://adoptium.net/) as the JDK. Some Rust, TypeScript with [SvelteKit](https://svelte.dev/) for small web projects, and Python for scripts.
- **Android:** the Android SDK and emulator, plus [jadx](https://github.com/skylot/jadx) for looking inside other people's APKs.
- **Shell:** PowerShell and Git Bash, with [WSL](https://learn.microsoft.com/windows/wsl/) for anything that really wants Linux.

## Code hosting and CI

- [GitHub](https://github.com/{{ site.github_username }}) with the [`gh`](https://cli.github.com/) CLI for public projects, and my own [Forgejo](https://forgejo.org/) for everything else.
- GitLab with [`glab`](https://gitlab.com/gitlab-org/cli) when a project lives there.
- GitHub Actions for builds and releases, [Renovate](https://docs.renovatebot.com/) to keep dependencies current. The [libmpv post]({{ '/blog/libmpv-android' | relative_url }}) shows how that fits together.
- Docker and nginx for the things I put online, like [nec.quest]({{ '/blog/nec-quest' | relative_url }}).

## Self-hosting

- [Jellyfin](https://jellyfin.org/) for films and series. It's the reason Ephyra exists.
- [Forgejo](https://forgejo.org/) for my own Git hosting.
- [Tailscale](https://tailscale.com/) to reach everything at home from wherever I am.
- [RustDesk](https://rustdesk.com/) for remote access.

## Everyday

- **Browsers:** [Brave](https://brave.com/), with [Firefox](https://www.mozilla.org/firefox/) next to it.
- **Mail:** [Fastmail](https://www.fastmail.com/), on my own domain.
- **Chat:** [Signal](https://signal.org/).
## Games

Steam and [Game Pass](https://www.xbox.com/xbox-game-pass), which is how [gamepass.fyi]({{ '/blog/gamepass-fyi' | relative_url }}) happened, with [Heroic](https://heroicgameslauncher.com/) for the Epic and GOG libraries. And Football Manager, mostly with N.E.C.
