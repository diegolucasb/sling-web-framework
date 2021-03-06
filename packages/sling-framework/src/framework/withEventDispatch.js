import { isFunction } from 'sling-helpers';

export const withEventDispatch = (Base = HTMLElement) =>
  class extends Base {
    constructor() {
      super();

      this.bubbleEvent = this.bubbleEvent.bind(this);
    }

    dispatchEventAndMethod(evtName, detail, target = this) {
      const event = new CustomEvent(evtName, {
        bubbles: true,
        detail,
      });

      const method = target[`on${evtName}`];

      target.dispatchEvent(event);

      if (isFunction(method)) {
        method(event);
      }
    }

    bubbleEvent(evt) {
      this.dispatchEvent(evt);
    }
  };
