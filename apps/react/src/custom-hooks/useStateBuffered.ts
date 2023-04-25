import { useState } from "react";
import { measureCallsPerSecond } from "../utils/logging";

type StateTransformer<S> = (s: S) => S;
type StateOrStateTransformer<S> = S | StateTransformer<S>;

const STATE_CHANGE_EVENT_NAME = "stateChange";

class StateBuffer<S> {
  private state: S;
  private isFrameRunning = false;
  private pubSub = new EventTarget();

  constructor(initialState: S) {
    this.state = initialState;
  }

  updateState(stateOrFn: StateOrStateTransformer<S>) {
    if (stateOrFn instanceof Function) {
      this.state = stateOrFn(this.state);
    } else {
      this.state = stateOrFn;
    }

    this.runBuffer();
  }

  subscribe(cb: (s: S) => void) {
    const handler = () => cb(this.state);
    this.pubSub.addEventListener(STATE_CHANGE_EVENT_NAME, handler);
    return () => this.pubSub.removeEventListener(STATE_CHANGE_EVENT_NAME, handler);
  }

  private publishState() {
    this.pubSub.dispatchEvent(new CustomEvent(STATE_CHANGE_EVENT_NAME));
  }

  private runBuffer() {
    if (!this.isFrameRunning) {
      this.isFrameRunning = true;
      requestAnimationFrame(() => {
        this.publishState();
        this.isFrameRunning = false;
      });
    }
  }
}

export function useStateBuffered<S>(initialState: S): [S, (stateOrFn: StateOrStateTransformer<S>) => void] {
  const [state, setState] = useState(initialState);
  const buffer = new StateBuffer(initialState);
  buffer.subscribe((state) => {
    measureCallsPerSecond("setStateBufferred");
    setState(state);
  });
  return [state, (stateOrFn: StateOrStateTransformer<S>) => buffer.updateState(stateOrFn)];
}
