import * as React from "react"
const Check = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 76 76"
    {...props}
  >
    <path
      d="M600 45C293.98 45 45 293.98 45 600s248.98 555 555 555 555-248.98 555-555S906.02 45 600 45Zm307.63 441.93L553.17 841.38c-10.789 10.789-25.738 16.98-40.992 16.98v24l-.516-24c-15.457-.133-30.469-6.59-41.195-17.711l-178.82-185.35c-22.199-23.004-21.539-59.762 1.465-81.961 10.859-10.488 25.152-16.246 40.234-16.246 15.875 0 30.695 6.289 41.723 17.711l137.86 142.88 312.74-312.73c10.945-10.945 25.5-16.98 40.992-16.98 15.48 0 30.035 6.023 40.98 16.969 22.586 22.605 22.586 59.387-.008 81.984l-.003.004Z"
      style={{
        fill: "#254D5D",
        fillRule: "nonzero",
      }}
      transform="matrix(.06777 0 0 .06777 -2.704 -2.846)"
    />
  </svg>
)
export default Check
