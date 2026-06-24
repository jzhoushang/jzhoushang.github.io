+++
title = "peHash Implementation"
description = "An implementation of the peHash algorithm"
date = "2025-06-30"
categories = ["C", "Cybersecurity"]
author = "Jason Shang"
+++

This is an implementation of the peHash algorithm as part of an exploration of similarity digest generation and static analysis of [Portable Executable](https://learn.microsoft.com/en-us/windows/win32/debug/pe-format) files.

In particular, peHash leverages metadata and flags stored in the file header which stays relatively static between different binaries of the same malware type. Among the fields used include `Characteristics`, which includes data about the program's endianness, word size, and debug information. The algorithm then chooses specific bytes from within these fields. For example, the least significant byte of the four-byte file size is likely to change with small obfuscations, and the most significant byte is unlikely to be different between various malware types; so, the algorithm only uses the middle two bytes.

As malware files often obfuscate data using redundant algorithms that create the same effect, it seems natural to use [Kolgomorov complexity](https://en.wikipedia.org/wiki/Kolmogorov_complexity)---the length of the minimal algorithm to generate a certain output---to characterize them. This is, of course, uncomputable; thus, peHash approximates it using the [bzip2](https://en.wikipedia.org/wiki/Bzip2) compession algorithm.

Finally, peHash concatenates the collected data and applies a SHA1 hash.

This implementation uses C and depends on the `libbz2` and `openssl` libraries. It involves fundamental processes in computer science and cybersecurity such as file IO, compression, and hashing.

## Links

{{< link href="https://github.com/jzhoushang/pehash" text="Source code on GitHub" >}}
{{< link href="https://www.usenix.org/legacy/events/leet09/tech/full_papers/wicherski/wicherski.pdf" text="\"peHash: A Novel Approach to Fast Malware Clustering\"">}}