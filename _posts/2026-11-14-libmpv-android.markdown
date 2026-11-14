---
layout: post
title:  "libmpv for Android: my own build of mpv, on Maven Central"
date:   2026-11-14 12:00:00
categories: blog
permalink: /blog/libmpv-android
description: "Why I forked libmpv-android, the library that puts mpv in Ephyra, and now publish it to Maven Central as io.github.midasvo:libmpv."
---

[Ephyra](/blog/ephyra), my Jellyfin client for Android, has two players: ExoPlayer and mpv. The mpv one comes from [libmpv-android](https://github.com/jarnedemeulemeester/libmpv-android), a small library by Jarne Demeulemeester, the developer of Findroid. It builds mpv, FFmpeg and their friends for every Android ABI, wraps them in a bit of Kotlin and puts the result on Maven Central.

As of today Ephyra uses my own fork of it: [io.github.midasvo:libmpv](https://midasvo.nl/libmpv-android/).

## Why

Upstream had already merged mpv 0.42 and FFmpeg 9, but there was no release with them yet. Meanwhile I had a bug in Ephyra that I wanted gone: AV1 film grain rendered wrong in mpv, which a newer libplacebo fixes. I didn't want Ephyra's player to depend on someone else's release schedule.

So I forked it and set it up to publish its own releases. Version 1.1.0 has mpv 0.42.0, FFmpeg 9.0.2 and the libplacebo fix.

## Keeping it boring

A fork of a build library is only useful if it stays close to the original, so most of the work went into making that cheap:

- **A weekly upstream merge.** A workflow opens a pull request with whatever upstream did that week. The fork's own changes are a short list of files, so those merges are trivial.
- **Renovate** proposes every new version of mpv, FFmpeg and the rest, and CI builds all four ABIs before anything gets merged.
- **Same Kotlin package.** The code is still `dev.jdtech.mpv`, so switching from upstream is a one-line change in Gradle. I wrote down [why](https://github.com/midasvo/libmpv-android/blob/main/docs/adr/0001-keep-the-kotlin-package.md).
- **Source with every release.** The AAR is GPL because of FFmpeg, so each release comes with a tarball of the exact source it was built from, every dependency included.

## Testing it

A new mpv is a new player, so 1.1.0 went through Ephyra before it went anywhere else. I played it on a phone, on a bunch of emulators, and on the Xiaomi TV box: a 32-bit ARM device and the slowest thing I own. The 10-bit AV1 test file played hardware-decoded there, which was the part I worried about most.

## Using it

If you build an Android app with mpv, you can use it too:

```kotlin
implementation("io.github.midasvo:libmpv:1.1.0")
```

Everything else, including the full list of what's inside and the licences, is on [midasvo.nl/libmpv-android](https://midasvo.nl/libmpv-android/). The code is at [github.com/midasvo/libmpv-android](https://github.com/midasvo/libmpv-android).

Thanks to Jarne for the library, and to the [mpv-android](https://github.com/mpv-android/mpv-android) people whose build scripts it started from.
