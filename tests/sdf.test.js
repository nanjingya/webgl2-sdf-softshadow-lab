import test from 'node:test';
import assert from 'node:assert/strict';
import { sdSphere, sdPlane, sceneSDF, softShadow } from '../src/math/sdf.js';

test('sdSphere distance', () => {
  assert.ok(Math.abs(sdSphere([0,0,0], [0,0,0], 1) + 1) < 1e-6);
  assert.ok(Math.abs(sdSphere([2,0,0], [0,0,0], 1) - 1) < 1e-6);
});

test('sdPlane y-up ground', () => {
  assert.ok(Math.abs(sdPlane([0,1,0], [0,1,0], 0) - 1) < 1e-6);
  assert.ok(Math.abs(sdPlane([0,0,0], [0,1,0], 0) - 0) < 1e-6);
});

test('sceneSDF near sphere center is negative', () => {
  assert.ok(sceneSDF([0, 1, 0]) < 0);
});

test('softShadow is within 0..1 and lower when occluded', () => {
  const lit = softShadow([0, 5, 0], [0, -1, 0], 0.01, 20, 8);
  const blocked = softShadow([-2, 0.2, 0], [1, 0, 0], 0.01, 20, 8);
  assert.ok(lit >= 0 && lit <= 1);
  assert.ok(blocked >= 0 && blocked <= 1);
  assert.ok(blocked <= lit + 1e-6);
});
