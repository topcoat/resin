Resin
=====

[![Build Status](https://travis-ci.org/topcoat/resin.png?branch=master)](https://travis-ci.org/topcoat/resin)

Opinionated CSS preprocessor for Topcoat made with
[Rework](http://github.com/visionmedia/rework).

Installation
------------

```
npm install topcoat-resin

```

Usage
-----

```js

var resin = require('topcoat-resin');

    resin({
        // Pass it a css file to process
        src: 'src/entry.css',
        // Tell it what browsers to prefix for
        browsers: ['last 1 version', 'ios', 'android 4'],
        // Add a namespace to your classes to avoid collisions
        namespace: 'dam',
        // Add a license to the final output
        license: '// Copyright 2013 and stuff \n',
        // Generate sourecemaps for debugging
        debug: true
    });

```
This function will return an evaluated string that you can write to a file, or
stream etc.

Example writing to a file:

 ```js
var resin = require('topcoat-resin'),
    write = require('fs').writeFileSync,
    output;

    output = resin({
        // Pass it a css file to process
        src: 'src/entry.css',
        // Tell it what browsers to prefix for
        browsers: ['last 1 version', 'ios', 'android 4']
        // Add a namespace to your classes to avoid collisions
        namespace: 'dam'
    });

    write('path/to/output/dir/filename.css', output);

```

Entry CSS file
--------------

```css
@import "node-package-name";
@import "other-node-package-name";
```
Resin will pull in CSS source files distributed via npm packages and add them
to the AST. Uses [rework-npm](https://github.com/conradz/rework-npm) under the covers.

Features
--------

Resin supports:

* [Imports](https://github.com/conradz/rework-npm)
* [Variables](https://github.com/visionmedia/rework-vars)
* [Colors](https://github.com/visionmedia/rework#colors)
* [Extend](https://github.com/visionmedia/rework#extend)
* [Namespacing](https://gituhub.com/kristoferjoseph/rework-namespace)
* [Autoprefixer](https://github.com/ai/autoprefixer)
* License addition
* Source maps for debugging

TODO
----

* [Topdoc](https://github.com/topcoat/topdoc)
    * [issue#1](https://github.com/topcoat/resin/issues/1)
* Functions
    * [issue#2](https://github.com/topcoat/resin/issues/2)
* Linter
    * [issue#3](https://github.com/topcoat/resin/issues/3)
* Optimize
    * [issues#4](https://github.com/topcoat/resin/issues/4)
