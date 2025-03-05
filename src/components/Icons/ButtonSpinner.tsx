import React from 'react';

type ButtonSpinnerProps = {} & React.SVGProps<SVGSVGElement>;

// <style>.spinner_GuJz{transform - origin:center;animation:spinner_STY6 1.5s linear infinite}@keyframes
//   spinner_STY6{100 % {transform: rotate(360deg)}}</style>

function ButtonSpinner(props: ButtonSpinnerProps) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="currentColor">
        <circle key="1" cx="3" cy="12" r="2" />
        <circle key="2" cx="21" cy="12" r="2" />
        <circle key="3" cx="12" cy="21" r="2" />
        <circle key="4" cx="12" cy="3" r="2" />
        <circle key="5" cx="5.64" cy="5.64" r="2" />
        <circle key="6" cx="18.36" cy="18.36" r="2" />
        <circle key="7" cx="5.64" cy="18.36" r="2" />
        <circle key="8" cx="18.36" cy="5.64" r="2" />
      </g>
    </svg>
  );
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      {...props}
    >
      <path
        fill="currentColor"
        d="M41.9 23.9c-.3-6.1-4-11.8-9.5-14.4c-6-2.7-13.3-1.6-18.3 2.6c-4.8 4-7 10.5-5.6 16.6c1.3 6 6 10.9 11.9 12.5c7.1 2 13.6-1.4 17.6-7.2c-3.6 4.8-9.1 8-15.2 6.9c-6.1-1.1-11.1-5.7-12.5-11.7c-1.5-6.4 1.5-13.1 7.2-16.4c5.9-3.4 14.2-2.1 18.1 3.7c1 1.4 1.7 3.1 2 4.8c.3 1.4.2 2.9.4 4.3c.2 1.3 1.3 3 2.8 2.1c1.3-.8 1.2-2.5 1.1-3.8c0-.4.1.7 0 0"
      />
    </svg>
  );
}

export default ButtonSpinner;
