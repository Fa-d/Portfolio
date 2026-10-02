// Generates the two Open Peeps avatar variants (smiling + eyes closed) used by peeps2lottie.py.
// Run from this folder after a temporary install: npm i --no-save @dicebear/core @dicebear/collection
import { createAvatar } from '@dicebear/core';
import { openPeeps } from '@dicebear/collection';
import { writeFileSync } from 'node:fs';

const options = {
  seed: 'fahad',
  backgroundColor: ['transparent'],
  head: ['short5'],
  facialHair: ['full'],
  facialHairProbability: 100,
  accessories: ['glasses3'],
  accessoriesProbability: 100,
  skinColor: ['d08b5b'],
  headContrastColor: ['2c1b18'],
  clothingColor: ['3b3f46'],
  maskProbability: 0,
};

for (const face of ['smile', 'eyesClosed']) {
  writeFileSync(`peeps-${face}.svg`, createAvatar(openPeeps, { ...options, face: [face] }).toString());
}
console.log('wrote peeps-smile.svg, peeps-eyesClosed.svg');
