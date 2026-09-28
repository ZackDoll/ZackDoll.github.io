import { Component, lazy, Suspense, useEffect, useRef, useState } from 'react';
import styles from './RoomWindow.module.css';

const RoomScene = lazy(() => import('./RoomScene'));

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

class SceneBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export default function RoomWindow({ fallback }) {
  const frameRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [everVisible, setEverVisible] = useState(false);
  const [supported] = useState(hasWebGL);

  // Only load and run the 3D scene while the window is on screen.
  useEffect(() => {
    const el = frameRef.current;
    if (!el || !('IntersectionObserver' in window)) {
      setVisible(true);
      setEverVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) setEverVisible(true);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!supported) return fallback;

  return (
    <div className={styles.window} ref={frameRef}>
      <div className={styles.glass}>
        {everVisible && (
          <SceneBoundary fallback={fallback}>
            <Suspense fallback={null}>
              <RoomScene active={visible} />
            </Suspense>
          </SceneBoundary>
        )}
        <div className={styles.reflection} />
      </div>
      <div className={styles.sill} />
    </div>
  );
}
