import test from 'node:test';
import assert from 'node:assert/strict';
import { march } from '../src/math/raymarch.js';

test('march hits the ground from above', () => {
  const hit = march([0, 3, 0], [0, -1, 0], 64, 1e-3);
  assert.equal(hit.hit, true);
  assert.ok(hit.t > 0);
  assert.ok(Math.abs(hit.p[1]) < 0.05);
});

test('march misses skyward', () => {
  const hit = march([0, 3, 0], [0, 1, 0], 32, 1e-3);
  assert.equal(hit.hit, false);
});
