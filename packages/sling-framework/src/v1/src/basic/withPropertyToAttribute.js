import { pickBy } from 'sling-helpers';
import { LitElement } from '../../../lib/lit-element.bundle.js';

export const withPropertyToAttribute = (Base = LitElement) =>
  class extends Base {
    static get reflectedProperties() {
      return pickBy(this.properties || {},
        ({ reflectToAttribute }) => reflectToAttribute);
    }

    _propertiesChanged(props, changedProps, ...lastArgs) {
      super._propertiesChanged(props, changedProps, ...lastArgs);

      const { reflectedProperties } = this.constructor;
      const reflectedPropertyNames = Object.keys(reflectedProperties);

      Object
        .entries(changedProps || {})
        .filter(([propName]) => reflectedPropertyNames.includes(propName))
        .forEach(([propName, propValue]) => {
          if (propValue == null || propValue === false) {
            this.removeAttribute(propName);
          } else {
            const parsedValue = propValue === true ? '' : propValue;
            this.setAttribute(propName, parsedValue);
          }
        });
    }
  };
