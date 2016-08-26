# Resin

[![Build Status](https://travis-ci.org/kristoferjoseph/resin.svg?branch=master)](https://travis-ci.org/kristoferjoseph/resin) [![Code Climate](https://codeclimate.com/github/kristoferjoseph/resin/badges/gpa.svg)](https://codeclimate.com/github/kristoferjoseph/resin) [![Test Coverage](https://codeclimate.com/github/kristoferjoseph/resin/badges/coverage.svg)](https://codeclimate.com/github/kristoferjoseph/resin/coverage) [![Issue Count](https://codeclimate.com/github/kristoferjoseph/resin/badges/issue_count.svg)](https://codeclimate.com/github/kristoferjoseph/resin/issues)

A CSS preprocessor.

## Installation

```sh
npm install resin

```

## Usage

```js

var resin = require('resin');

resin({
  // Pass it a css file to process
  src: 'src/entry.css',
  // Tell it what browsers to prefix for
  browsers: ['last 1 version', 'ios', 'android 4'],
  // Add a namespace to your classes to avoid collisions
  namespace: 'dam',
  // Use the varibles plugin
  vars: true,
  // Use the inherit plugin
  extend: true,
  // Generate sourecemaps for debugging
  debug: true
});
// returns a promise.
```

This function will return an evaluated string that you can write to a file, or
stream etc.

Example writing to a file:

```js
var resin = require('resin'),
  write = require('fs').writeFileSync,
  output;

resin({
  // Pass it a css file to process
  src: 'src/entry.css',
  // Tell it what browsers to prefix for
  browsers: ['last 1 version', 'ios', 'android 4']
  // Add a namespace to your classes to avoid collisions
  namespace: 'dam'
}).then(function(result){
  write('path/to/output/dir/filename.css', result.css);
});
```

## Entry CSS file

```css
@import "node-package-name";
@import "other-node-package-name";
```

Resin will pull in CSS source files distributed via npm packages and add them
to the AST. Uses [postcss-import](https://github.com/garthdb/postcss-npm) under the covers.

## Features

Resin supports:

* [Imports](https://github.com/garthdb/postcss-npm)
* [Variables](https://github.com/MadLittleMods/postcss-css-variables)
* [Extend](https://github.com/garthdb/postcss-inherit)
* [Namespacing](https://github.com/garthdb/postcss-add-namespace)
* [Autoprefixer](https://github.com/postcss/autoprefixer)
* Source maps for debugging
