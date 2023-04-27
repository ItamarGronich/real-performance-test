let isFrameRunning = false;

export function queueFrame(cb: () => void) {
  if (!isFrameRunning) {
    isFrameRunning = true;
    requestAnimationFrame(() => {
      cb();
      isFrameRunning = false;
    });
  }
}
