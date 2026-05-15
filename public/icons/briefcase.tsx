import * as React from "react"
const Briefcase = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 87 80"
    {...props}
  >
    <path
      d="M732 108c72.891 0 132 59.109 132 132v72h180c53.02 0 96 42.984 96 96v588c0 53.02-42.98 96-96 96H156c-53.016 0-96-42.98-96-96V408c0-53.016 42.984-96 96-96h180v-72c0-72.891 59.109-132 132-132h264ZM468 228c-6.609 0-12 5.391-12 12v72h288v-72c0-6.609-5.391-12-12-12H468Z"
      style={{
        fill: "#254D5D",
      }}
      transform="matrix(.08 0 0 .08 -4.336 -7.774)"
    />
  </svg>
)
export default Briefcase