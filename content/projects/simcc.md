+++
title = "SimCC"
description = "A basic simulation involving pathfinding"
date = "2024-05-13"
categories = ["Python"]
cover = "/img/simcc.png"
coverCaption = "Screenshot of SimCC running"
author = "Jason Shang"
+++

In my freshman year of high school, I took a CS course called Advanced Python. One of the projects for this class was creating a simple simulation.

This project uses [A* pathfinding](https://en.wikipedia.org/wiki/A*_search_algorithm) to simulate students moving around a school. The project has not been updated since.

The project initially faced issues with efficiency. My implementation of the A* algorithm was very slow, especially on the slow laptops our school provided. As a result, the project uses [`mypyc`](https://mypyc.readthedocs.io/en/latest/introduction.html) to compile type-annotated Python into CPython extensions, resulting in a 40% speed up in the pathfinding calculations.

## Links

{{< link href="https://github.com/jzhoushang/simcc" text="GitHub" >}}
