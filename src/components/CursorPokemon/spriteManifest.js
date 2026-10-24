// Real Mudkip sprite frames, sliced per-direction in public/mudkip_images.
// Each animation's frames were trimmed to their own bounding box, so their
// native canvas sizes aren't consistent with each other (e.g. run_down is
// 70x78 natively, run_left_right is only 59x65) — applying one flat scale
// to raw pixel size made some directions visibly bigger than others.
// Instead we normalize by height: every animation is scaled so it renders
// at the same height (TARGET_H * BASE_SCALE), and only its width follows
// from its own aspect ratio. Height is constant within an animation
// already (confirmed from the source files), width varies frame to frame.

const BASE = '/mudkip_images/mudkip_sprites/mudkip_sprites';
const BASE_SCALE = 0.60;
const TARGET_H = 65; // mudkip_run_left_right's native height, used as the reference

function frames(name, nativeH, widths) {
  const scale = BASE_SCALE * (TARGET_H / nativeH);
  return widths.map((w, i) => ({
    src: `${BASE}/${name}/sprite_r1_c${i + 1}.png`,
    w: Math.round(w * scale),
    h: Math.round(nativeH * scale),
  }));
}

// Drawn facing: down/up are symmetric (front/back). left_right and
// run_down_right are drawn facing left / down-right respectively — the
// opposite horizontal direction and down-left (no separate asset exists)
// are produced by mirroring them with CSS, not by redrawing.
const RUN = {
  down: frames('mudkip_run_down', 78, [70, 70, 70]),
  up: frames('mudkip_run_up', 74, [53, 53, 53]),
  left: frames('mudkip_run_left_right', 65, [59, 62, 56]),
  downRight: frames('mudkip_run_down_right', 62, [56, 59, 50]),
  upLeft: frames('mudkip_run_up_left', 68, [50, 50, 50]),
  upRight: frames('mudkip_run_up_right', 68, [50, 50, 50]),
};

const IDLE = frames('mudkip_idle', 59, [53]);

// Two sleeping poses living in the same folder under different naming —
// one is picked at random each time it dozes off, not cycled between.
const SLEEP_OPTIONS = [
  { src: `${BASE}/mudkip_sleep/sprite_r1_c1.png`, nativeW: 56, nativeH: 53 },
  { src: `${BASE}/mudkip_sleep/sprite_2.png`, nativeW: 65, nativeH: 50 },
].map(({ src, nativeW, nativeH }) => {
  const scale = BASE_SCALE * (TARGET_H / nativeH);
  return { src, w: Math.round(nativeW * scale), h: Math.round(nativeH * scale) };
});

export function pickSleepFrame() {
  return SLEEP_OPTIONS[Math.floor(Math.random() * SLEEP_OPTIONS.length)];
}

// The click reaction: a 4-frame cheer, laid out as a 2x2 grid rather than
// sprite_r1_cN, and each row has a slightly different native height — so
// every frame is normalized individually to keep the animation a steady size.
const ROAR = [
  ['sprite_r1_c1.png', 51, 56],
  ['sprite_r1_c2.png', 50, 56],
  ['sprite_r2_c1.png', 51, 59],
  ['sprite_r2_c2.png', 53, 59],
].map(([file, w, h]) => {
  const scale = BASE_SCALE * (TARGET_H / h);
  return { src: `${BASE}/mudkip_roar/${file}`, w: Math.round(w * scale), h: Math.round(h * scale) };
});

export function roarFrames() {
  return ROAR;
}

// direction -> { frames, mirror }. 'right' and 'downLeft' reuse the mirrored
// opposite asset since no dedicated art exists for them.
const DIRECTIONS = {
  down: { frames: RUN.down, mirror: false },
  up: { frames: RUN.up, mirror: false },
  left: { frames: RUN.left, mirror: false },
  right: { frames: RUN.left, mirror: true },
  downRight: { frames: RUN.downRight, mirror: false },
  downLeft: { frames: RUN.downRight, mirror: true },
  upLeft: { frames: RUN.upLeft, mirror: false },
  upRight: { frames: RUN.upRight, mirror: false },
};

export function framesFor(direction, pose) {
  if (pose === 'sit') return IDLE;
  if (pose === 'sleep') return SLEEP_OPTIONS;
  return (DIRECTIONS[direction] || DIRECTIONS.down).frames;
}

export function mirrorFor(direction, pose) {
  if (pose !== 'walk') return false;
  return (DIRECTIONS[direction] || DIRECTIONS.down).mirror;
}

// Buckets a movement vector into 8 directions. Matches how real overworld
// sprites are organized — the diagonals here are genuine drawn art, not
// guesses, so unlike a procedural sprite there's no risk in using all 8.
export function directionFromVector(dx, dy) {
  if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return 'down';
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI; // -180..180, 0 = right, 90 = down
  const sector = Math.round(angle / 45) & 7;
  const TABLE = ['right', 'downRight', 'down', 'downLeft', 'left', 'upLeft', 'up', 'upRight'];
  return TABLE[sector];
}

export const ALL_SPRITE_URLS = [
  ...RUN.down,
  ...RUN.up,
  ...RUN.left,
  ...RUN.downRight,
  ...RUN.upLeft,
  ...RUN.upRight,
  ...IDLE,
  ...SLEEP_OPTIONS,
  ...ROAR,
].map((f) => f.src);
