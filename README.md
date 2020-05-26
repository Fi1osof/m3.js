# m3.js

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Origin from https://webglfundamentals.org/

## Install

### npm

```
npm install m3.js
```

### yarn

```
yanr add m3.js
```

## How to use
```
// Quick example
import * as m3 from 'm3.js';

// ...

// Compute the matrices
var projectionMatrix = m3.projection(gl.canvas.width, gl.canvas.height);
```

OR
```
// Quick example
import { projection } from 'm3.js';

// ...

// Compute the matrices
var projectionMatrix = projection(gl.canvas.width, gl.canvas.height);
```

## Methods
```
✔ degToRad
✔ distance
✔ dot
✔ identity
✔ inverse
✔ multiply
✔ normalize
✔ projection
✔ radToDeg
✔ reflect
✔ rotation
✔ rotate
✔ scaling
✔ scale
✔ transformPoint
✔ translation
✔ translate
✔ project
```


[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
