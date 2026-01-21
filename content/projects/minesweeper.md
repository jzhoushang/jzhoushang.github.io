+++
title = "Minesweeper TUI"
description = "A simple TUI-version of Minesweeper in C"
date = "2024-06-27"
categories = ["C"]
cover = "/img/minesweeper.png"
coverCaption = "Screenshot of minesweeper being played"
author = "Jason Shang"
+++

Around this time, I found out about [terminal user interfaces](https://en.wikipedia.org/wiki/Text-based_user_interface) in my Advanced Python class using the [Python `curses` library](https://docs.python.org/3/library/curses.html). As this library is just a wrapper for Unix [`curses`](https://en.wikipedia.org/wiki/Curses_(programming_library)) library, I decided to write a simple TUI in C to better understand how it works (as well as other programs such as vim, which I was also learning to use at the time).

This project isn't very pretty and uses a simple TUI. As it uses `curses`, it can only run on Unix-like systems.

## Links

{{< link href="https://github.com/jzhoushang/minesweeper" text="GitHub" >}}

