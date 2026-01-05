import clsx from 'clsx';
import { Fragment, jsxDEV as reactJsxDEV } from 'react/jsx-dev-runtime';

function wrap(jsxFn) {
  return function (type, props, ...args) {
    if (props && props.className && typeof props.className !== 'string') {
      const newProps = { ...props, className: clsx(props.className) };
      return jsxFn(type, newProps, ...args);
    }
    return jsxFn(type, props, ...args);
  };
}

export const jsxDEV = wrap(reactJsxDEV);
export { Fragment };
