import React from 'react'

interface TimerPlayProps {
  size?: number
}

const TimerStop: React.FC = ({ size = 20 }: TimerPlayProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 19 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.33333 16C7.61666 16 7.85416 15.9042 8.04583 15.7125C8.23749 15.5208 8.33333 15.2833 8.33333 15V8.99999C8.33333 8.71666 8.23749 8.47916 8.04583 8.28749C7.85416 8.09582 7.61666 7.99999 7.33333 7.99999C7.04999 7.99999 6.81249 8.09582 6.62083 8.28749C6.42916 8.47916 6.33333 8.71666 6.33333 8.99999V15C6.33333 15.2833 6.42916 15.5208 6.62083 15.7125C6.81249 15.9042 7.04999 16 7.33333 16ZM11.3333 16C11.6167 16 11.8542 15.9042 12.0458 15.7125C12.2375 15.5208 12.3333 15.2833 12.3333 15V8.99999C12.3333 8.71666 12.2375 8.47916 12.0458 8.28749C11.8542 8.09582 11.6167 7.99999 11.3333 7.99999C11.05 7.99999 10.8125 8.09582 10.6208 8.28749C10.4292 8.47916 10.3333 8.71666 10.3333 8.99999V15C10.3333 15.2833 10.4292 15.5208 10.6208 15.7125C10.8125 15.9042 11.05 16 11.3333 16ZM7.33333 1.99999C7.04999 1.99999 6.81249 1.90416 6.62083 1.71249C6.42916 1.52082 6.33333 1.28332 6.33333 0.99999C6.33333 0.716657 6.42916 0.479157 6.62083 0.28749C6.81249 0.0958238 7.04999 -9.53674e-06 7.33333 -9.53674e-06H11.3333C11.6167 -9.53674e-06 11.8542 0.0958238 12.0458 0.28749C12.2375 0.479157 12.3333 0.716657 12.3333 0.99999C12.3333 1.28332 12.2375 1.52082 12.0458 1.71249C11.8542 1.90416 11.6167 1.99999 11.3333 1.99999H7.33333ZM9.33333 21C8.09999 21 6.9375 20.7625 5.84583 20.2875C4.75416 19.8125 3.79999 19.1667 2.98333 18.35C2.16666 17.5333 1.52083 16.5792 1.04583 15.4875C0.570828 14.3958 0.333328 13.2333 0.333328 12C0.333328 10.7667 0.570828 9.60416 1.04583 8.51249C1.52083 7.42082 2.16666 6.46666 2.98333 5.64999C3.79999 4.83332 4.75416 4.18749 5.84583 3.71249C6.9375 3.23749 8.09999 2.99999 9.33333 2.99999C10.3667 2.99999 11.3583 3.16666 12.3083 3.49999C13.2583 3.83332 14.15 4.31666 14.9833 4.94999L15.6833 4.24999C15.8667 4.06666 16.1 3.97499 16.3833 3.97499C16.6667 3.97499 16.9 4.06666 17.0833 4.24999C17.2667 4.43332 17.3583 4.66666 17.3583 4.94999C17.3583 5.23332 17.2667 5.46666 17.0833 5.64999L16.3833 6.34999C17.0167 7.18332 17.5 8.07499 17.8333 9.02499C18.1667 9.97499 18.3333 10.9667 18.3333 12C18.3333 13.2333 18.0958 14.3958 17.6208 15.4875C17.1458 16.5792 16.5 17.5333 15.6833 18.35C14.8667 19.1667 13.9125 19.8125 12.8208 20.2875C11.7292 20.7625 10.5667 21 9.33333 21ZM9.33333 19C11.2667 19 12.9167 18.3167 14.2833 16.95C15.65 15.5833 16.3333 13.9333 16.3333 12C16.3333 10.0667 15.65 8.41666 14.2833 7.04999C12.9167 5.68332 11.2667 4.99999 9.33333 4.99999C7.39999 4.99999 5.75 5.68332 4.38333 7.04999C3.01666 8.41666 2.33333 10.0667 2.33333 12C2.33333 13.9333 3.01666 15.5833 4.38333 16.95C5.75 18.3167 7.39999 19 9.33333 19Z"
        fill="white"
      />
    </svg>
  )
}

export default TimerStop