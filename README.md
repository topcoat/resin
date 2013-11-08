Resin
=====

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
        // Tell it where to put the processed file
        dest: 'css/output.css',
        // Tell it what browsers to prefix for
        browsers: ['last 1 version', 'ios', 'android 4']
    });

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
* [Autoprefixer](https://github.com/ai/autoprefixer)

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
* Banner
    * [issues#5](https://github.com/topcoat/resin/issues/5)
* Source Maps
    * [issues#6](https://github.com/topcoat/resin/issues/6)
