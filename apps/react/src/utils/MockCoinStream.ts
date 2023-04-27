class MockSocketStream<T> {
  private callbacks: ((a: T) => void)[] = [];
  private intervals: number[] = [];
  private createEntity: () => T;

  constructor(createEntity: () => T) {
    this.createEntity = createEntity;
  }

  on(cb: (c: T) => void) {
    this.callbacks.push(cb);
    this.startStream();
    return () => this.off(cb);
  }

  off(cb: (c: T) => void) {
    this.callbacks = this.callbacks.filter((c) => c !== cb);
    if (this.callbacks.length === 0) {
      this.endStream();
    }
  }

  private startStream() {
    if (this.intervals.length === 0) {
      this.intervals = Array(500) // Make many intervals for speed purposes. Since each interval can fire at a max of ~250 per second.
        .fill(1)
        .map(() => setInterval(() => this.produceCoin(), 1));
    }
  }

  private endStream() {
    this.intervals.forEach((intervalId) => clearInterval(intervalId));
    this.intervals.length = 0;
  }

  private produceCoin() {
    this.publish(this.createEntity());
  }

  private publish(a: T) {
    this.callbacks.forEach((cb) => cb(a));
  }
}

export function createMockSocketStream<T>(createEntity: () => T) {
  return new MockSocketStream(createEntity);
}
