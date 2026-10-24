import styles from './CursorPokemon.module.css';

// Renders one frame of the sprite sheet, bottom-center anchored inside a
// fixed box so its feet stay planted even though the trimmed source frames
// are each a slightly different width.
export default function SpriteFrame({ frame }) {
  if (!frame) return null;
  return (
    <div className={styles.frameBox}>
      <img
        src={frame.src}
        alt=""
        width={frame.w}
        height={frame.h}
        className={styles.frameImg}
        draggable={false}
      />
    </div>
  );
}
