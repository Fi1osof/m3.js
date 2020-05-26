/*
 * Copyright 2012, Gregg Tavares.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Gregg Tavares. nor the names of his
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Various 2d math functions.
 *
 * @module webgl-2d-math
 */


/**
 * An array or typed array with 9 values.
 * @typedef {number[]|TypedArray} Matrix3
 * @memberOf module:webgl-2d-math
 */

/**
 * Takes two Matrix3s, a and b, and computes the product in the order
 * that pre-composes b with a.  In other words, the matrix returned will
 * @param {module:webgl-2d-math.Matrix3} a A matrix.
 * @param {module:webgl-2d-math.Matrix3} b A matrix.
 * @return {module:webgl-2d-math.Matrix3} the result.
 * @memberOf module:webgl-2d-math
 */
function multiply(a, b) {
  var a00 = a[0 * 3 + 0];
  var a01 = a[0 * 3 + 1];
  var a02 = a[0 * 3 + 2];
  var a10 = a[1 * 3 + 0];
  var a11 = a[1 * 3 + 1];
  var a12 = a[1 * 3 + 2];
  var a20 = a[2 * 3 + 0];
  var a21 = a[2 * 3 + 1];
  var a22 = a[2 * 3 + 2];
  var b00 = b[0 * 3 + 0];
  var b01 = b[0 * 3 + 1];
  var b02 = b[0 * 3 + 2];
  var b10 = b[1 * 3 + 0];
  var b11 = b[1 * 3 + 1];
  var b12 = b[1 * 3 + 2];
  var b20 = b[2 * 3 + 0];
  var b21 = b[2 * 3 + 1];
  var b22 = b[2 * 3 + 2];

  return [
    b00 * a00 + b01 * a10 + b02 * a20,
    b00 * a01 + b01 * a11 + b02 * a21,
    b00 * a02 + b01 * a12 + b02 * a22,
    b10 * a00 + b11 * a10 + b12 * a20,
    b10 * a01 + b11 * a11 + b12 * a21,
    b10 * a02 + b11 * a12 + b12 * a22,
    b20 * a00 + b21 * a10 + b22 * a20,
    b20 * a01 + b21 * a11 + b22 * a21,
    b20 * a02 + b21 * a12 + b22 * a22,
  ];
}


/**
 * Creates a 3x3 identity matrix
 * @return {module:webgl2-2d-math.Matrix3} an identity matrix
 */
function identity() {
  return [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1,
  ];
}

/**
 * Creates a 2D projection matrix
 * @param {number} width width in pixels
 * @param {number} height height in pixels
 * @return {module:webgl-2d-math.Matrix3} a projection matrix that converts from pixels to clipspace with Y = 0 at the top.
 * @memberOf module:webgl-2d-math
 */
function projection(width, height) {
  // Note: This matrix flips the Y axis so 0 is at the top.
  return [
    2 / width, 0, 0,
    0, -2 / height, 0,
    -1, 1, 1,
  ];
}

/**
 * Multiplies by a 2D projection matrix
 * @param {module:webgl-2d-math.Matrix3} the matrix to be multiplied
 * @param {number} width width in pixels
 * @param {number} height height in pixels
 * @return {module:webgl-2d-math.Matrix3} the result
 * @memberOf module:webgl-2d-math
 */
function project(m, width, height) {
  return multiply(m, projection(width, height));
}

/**
 * Creates a 2D translation matrix
 * @param {number} tx amount to translate in x
 * @param {number} ty amount to translate in y
 * @return {module:webgl-2d-math.Matrix3} a translation matrix that translates by tx and ty.
 * @memberOf module:webgl-2d-math
 */
function translation(tx, ty) {
  return [
    1, 0, 0,
    0, 1, 0,
    tx, ty, 1,
  ];
}

/**
 * Multiplies by a 2D translation matrix
 * @param {module:webgl-2d-math.Matrix3} the matrix to be multiplied
 * @param {number} tx amount to translate in x
 * @param {number} ty amount to translate in y
 * @return {module:webgl-2d-math.Matrix3} the result
 * @memberOf module:webgl-2d-math
 */
function translate(m, tx, ty) {
  return multiply(m, translation(tx, ty));
}

/**
 * Creates a 2D rotation matrix
 * @param {number} angleInRadians amount to rotate in radians
 * @return {module:webgl-2d-math.Matrix3} a rotation matrix that rotates by angleInRadians
 * @memberOf module:webgl-2d-math
 */
function rotation(angleInRadians) {
  var c = Math.cos(angleInRadians);
  var s = Math.sin(angleInRadians);
  return [
    c, -s, 0,
    s, c, 0,
    0, 0, 1,
  ];
}

/**
 * Multiplies by a 2D rotation matrix
 * @param {module:webgl-2d-math.Matrix3} the matrix to be multiplied
 * @param {number} angleInRadians amount to rotate in radians
 * @return {module:webgl-2d-math.Matrix3} the result
 * @memberOf module:webgl-2d-math
 */
function rotate(m, angleInRadians) {
  return multiply(m, rotation(angleInRadians));
}

/**
 * Creates a 2D scaling matrix
 * @param {number} sx amount to scale in x
 * @param {number} sy amount to scale in y
 * @return {module:webgl-2d-math.Matrix3} a scale matrix that scales by sx and sy.
 * @memberOf module:webgl-2d-math
 */
function scaling(sx, sy) {
  return [
    sx, 0, 0,
    0, sy, 0,
    0, 0, 1,
  ];
}

/**
 * Multiplies by a 2D scaling matrix
 * @param {module:webgl-2d-math.Matrix3} the matrix to be multiplied
 * @param {number} sx amount to scale in x
 * @param {number} sy amount to scale in y
 * @return {module:webgl-2d-math.Matrix3} the result
 * @memberOf module:webgl-2d-math
 */
function scale(m, sx, sy) {
  return multiply(m, scaling(sx, sy));
}

/**
 * Computes dot product of point(x1, y1) and point(x2, y2)
 * @param {number} x1 x-axis value of point 1
 * @param {number} y1 y-axis value of point 1
 * @param {number} x2 x-axis value of point 2
 * @param {number} y2 y-axis value of point 2
 * @return {number} the result
 * @memberOf module:webgl-2d-math
 */
function dot(x1, y1, x2, y2) {
  return x1 * x2 + y1 * y2;
}

/**
 * Computes the distance between point(x1, y1) with point(x2, y2)
 * @param {number} x1 x-axis value of point 1
 * @param {number} y1 y-axis value of point 1
 * @param {number} x2 x-axis value of point 2
 * @param {number} y2 y-axis value of point 2
 * @return {number} the result
 * @memberOf module:webgl-2d-math
 */
function distance(x1, y1, x2, y2) {
  var dx = x1 - x2;
  var dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Computes the normalized coordinate(on the unit circle) of point(x, y)
 * @param {number} x x-axis value
 * @param {number} y y-axis value
 * @return {number[]} the result array [normalized_x, normalized_y]
 * @memberOf module:webgl-2d-math
 */
function normalize(x, y) {
  var l = distance(0, 0, x, y);
  if (l > 0.00001) {
    return [x / l, y / l];
  } else {
    return [0, 0];
  }
}

/**
 * Computes the reflection vector of the incident vector (ix, iy) reflected by the plane whose normal vector is (nx, ny)
 * @param {number} ix incident vector's x-axis value
 * @param {number} iy incident vector's y-axis value
 * @param {number} nx normal vector's x-axis value
 * @param {number} ny normal vector's y-axis value
 * @return {number[]} the result
 * @memberOf module:webgl-2d-math
 */
function reflect(ix, iy, nx, ny) {
  // I - 2.0 * dot(N, I) * N.
  var d = dot(nx, ny, ix, iy);
  return [
    ix - 2 * d * nx,
    iy - 2 * d * ny,
  ];
}

/**
 * Convert radian to degree
 * @param {number} r radian
 * @returns {number} the result
 */
function radToDeg(r) {
  return r * 180 / Math.PI;
}

/**
 * Convert degree to radian
 * @param {number} d degree
 * @returns {number} the result
 */
function degToRad(d) {
  return d * Math.PI / 180;
}

/**
 * Transform point(x, y) by the matrix
 * @param {module:webgl-2d-math.Matrix3} m the transform matrix
 * @param {number[]} v point(x, y)
 * @return {number[]} the result
 * @memberOf module:webgl-2d-math
 */
function transformPoint(m, v) {
  var v0 = v[0];
  var v1 = v[1];
  var d = v0 * m[0 * 3 + 2] + v1 * m[1 * 3 + 2] + m[2 * 3 + 2];
  return [
    (v0 * m[0 * 3 + 0] + v1 * m[1 * 3 + 0] + m[2 * 3 + 0]) / d,
    (v0 * m[0 * 3 + 1] + v1 * m[1 * 3 + 1] + m[2 * 3 + 1]) / d,
  ];
}

/**
 * Computes the inverse of a matrix.
 * @param {module:webgl-2d-math.Matrix3} m matrix to compute inverse of
 * @return {module:webgl-2d-math.Matrix3} the result
 * @memberOf module:webgl-2d-math
 */
function inverse(m) {
  var t00 = m[1 * 3 + 1] * m[2 * 3 + 2] - m[1 * 3 + 2] * m[2 * 3 + 1];
  var t10 = m[0 * 3 + 1] * m[2 * 3 + 2] - m[0 * 3 + 2] * m[2 * 3 + 1];
  var t20 = m[0 * 3 + 1] * m[1 * 3 + 2] - m[0 * 3 + 2] * m[1 * 3 + 1];
  var d = 1.0 / (m[0 * 3 + 0] * t00 - m[1 * 3 + 0] * t10 + m[2 * 3 + 0] * t20);
  return [
    d * t00, -d * t10, d * t20,
    -d * (m[1 * 3 + 0] * m[2 * 3 + 2] - m[1 * 3 + 2] * m[2 * 3 + 0]),
    d * (m[0 * 3 + 0] * m[2 * 3 + 2] - m[0 * 3 + 2] * m[2 * 3 + 0]),
    -d * (m[0 * 3 + 0] * m[1 * 3 + 2] - m[0 * 3 + 2] * m[1 * 3 + 0]),
    d * (m[1 * 3 + 0] * m[2 * 3 + 1] - m[1 * 3 + 1] * m[2 * 3 + 0]),
    -d * (m[0 * 3 + 0] * m[2 * 3 + 1] - m[0 * 3 + 1] * m[2 * 3 + 0]),
    d * (m[0 * 3 + 0] * m[1 * 3 + 1] - m[0 * 3 + 1] * m[1 * 3 + 0]),
  ];
}


export {
  degToRad,
  distance,
  dot,
  identity,
  inverse,
  multiply,
  normalize,
  projection,
  radToDeg,
  reflect,
  rotation,
  rotate,
  scaling,
  scale,
  transformPoint,
  translation,
  translate,
  project,
}
