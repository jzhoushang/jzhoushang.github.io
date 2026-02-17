+++
title = "BugBo"
description = "Bug identification game"
date = "2026-02-17"
categories = ["JavaScript", "Webdev"]
cover = "/img/bugbo.png"
coverCaption = "Screenshot of BugBo being played"
author = "Jason Shang"
+++

BugBo is a somewhat common name for bug identification practice for the Science Olympiad entomology event. There are other versions of this game; however, this version was made because I often found other versions slow, had poor search parameters in their APIs that resulted in too many larval photos, and I often found myself one typo from the correct answer. This version has:

- More specific API search parameters that limit photos to adult photos for insects whose larval forms are not necessary for the Science Olympiad Entomology exam
- Autocomplete
- Direct querying of iNaturalist, which offers more control and faster speeds. Other versions I've seen often use a middleman
- The ability to enlarge the image

The API used was [iNaturalist](www.inaturalist.org)'s [v1 API](https://api.inaturalist.org/v1/docs/). The list of insects is from the Division C Science Olympiad National Entomology List.

## Links
{{< link href="/bugbo" text="Play the game here" >}}
{{< link href="https://runzhou2004.github.io/Bugbo-Web" text="Run Zhou's BugBo, the inspiration for this project" >}}
