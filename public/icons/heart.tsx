import * as React from "react"
const Heart = ( props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 84 76"
    {...props}
  >
    <path
      d="M601.13 1101.6c-5.062 0-10.125-2.06-13.688-5.81l-449.44-474.743c-108.75-114.94-108.75-302.06.188-416.81 53.062-56.062 123.74-86.812 198.94-86.812 75.191 0 145.87 30.938 198.94 87l65.25 68.812 63-66.375c53.062-56.062 123.74-86.812 198.94-86.812 75.191 0 145.87 30.938 198.94 86.812 108.94 114.94 108.94 302.06 0 417L614.83 1095.8c-3.563 3.75-8.438 5.82-13.688 5.82l-.012-.02Z"
      style={{
        fill: "#254D5D",
        fillRule: "nonzero",
      }}
      transform="matrix(.07655 0 0 .07655 -3.823 -8.933)"
    />
  </svg>
)
export default Heart
