# Hero avatar

`public/assets/hero-avatar.json` is an animated Lottie of an [Open Peeps](https://www.openpeeps.com/) character
(by Pablo Stanley, CC0 1.0) customised to match me — short textured dark hair, rectangular glasses, full beard,
charcoal tee — generated with [DiceBear](https://www.dicebear.com/).

Animation (6s loop): breathing, slight head tilt, blink (only the eyes swap), and a glint across the glasses.

## Regenerate

```bash
cd scripts/avatar
npm i --no-save @dicebear/core @dicebear/collection
node generate.mjs                      # -> peeps-smile.svg, peeps-eyesClosed.svg
python3 peeps2lottie.py peeps-smile.svg peeps-eyesClosed.svg ../../public/assets/hero-avatar.json
rm -rf node_modules peeps-*.svg
```

Change the look via the options in `generate.mjs` (hair: `head`, beard: `facialHair`, glasses: `accessories`,
colours: `skinColor`, `clothingColor`).
