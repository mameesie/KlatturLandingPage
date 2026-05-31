import * as React from "react"
const Book = ( props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 64 88"
    {...props}
  >
    <path
      d="M913.485 773.538h21.264c4.867 0 8.817 3.526 8.817 7.87v58.561c0 4.344-3.95 7.87-8.817 7.87h-42.416c-4.866 0-8.817-3.526-8.817-7.87v-58.561c0-4.344 3.951-7.87 8.817-7.87h2.848a2.93 2.93 0 0 0-.056.573v22.155c0 .535.488.97 1.088.97.225 0 .443-.063.63-.182l7.039-4.498a.866.866 0 0 1 .902 0l7.039 4.498c.186.119.404.182.63.182.6 0 1.088-.435 1.088-.97v-22.155a2.93 2.93 0 0 0-.056-.573Z"
      style={{
        fill: "#254D5D",
      }}
      transform="matrix(1.03805 0 0 1.16292 -916.159 -898.599)"
    />
  </svg>
)
export default Book
