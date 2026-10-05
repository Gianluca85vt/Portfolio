import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pickQueries, sameSearch } from './media-kit-data.mjs';

test('the same search typed differently counts once', () => {
  assert.ok(sameSearch('paintbridge krita', 'paint bridge krita'));
  assert.ok(sameSearch('downtown generator blender', 'blender downtown generator'));
  assert.ok(sameSearch('goldeneye decomp', 'goldeneye 64 decomp'));
  assert.ok(sameSearch('unreal engine 6', 'unreal engine 6?'));
  assert.ok(!sameSearch('quadify blender', 'quad draw blender'));
  assert.ok(!sameSearch('dlss 5 pass count', 'dlss 5 cost scaler'));
});

test('tool queries lead, his own name never appears, thirty at most', () => {
  const rows = [
    { query: 'gianluca scattarella', impressions: 900 },
    { query: 'best games october', impressions: 500 },
    { query: 'nuke gaussian splat relighting', impressions: 20 },
    ...Array.from({ length: 40 }, (_, i) => ({ query: `query number ${i} here`, impressions: 10 })),
  ];
  const out = pickQueries(rows);
  assert.equal(out[0], 'nuke gaussian splat relighting');
  assert.ok(!out.some((q) => /scattarella/.test(q)));
  assert.ok(out.length <= 30);
});
