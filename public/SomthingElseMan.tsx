"use client"

import * as React from "react"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin"

const SomethingElseMan = (props: React.SVGProps<SVGSVGElement>) => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    gsap.registerPlugin(MorphSVGPlugin)

    const cover = svgRef.current?.querySelector("#CheckCover")
    const checkMark = svgRef.current?.querySelector("#checkMark")

    if (!cover || !checkMark) {
      return
    }

    const tl = gsap.timeline({ repeat: -1 })

    tl.add(gsap.delayedCall(0.2, () => {}))
      .to(cover, {
        duration: 0.75,
        morphSVG: "M67 110h6v36H67z",
      })
      .to(checkMark, {
        duration: 0.75,
        scale: 0.075,
        transformOrigin: "center center",
      })
      .to(checkMark, {
        duration: 0.75,
        scale: 0.058,
        transformOrigin: "center center",
      })
      .add(gsap.delayedCall(0.6, () => {}))
      .to(cover, {
        duration: 0.75,
        morphSVG: "M26 110h47v36H26z",
      })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 1.5,
      }}
      viewBox="0 0 219 231"
      {...props}
    >
    <path
      d="M795.381 3313.22v151.46c0 21.02-17.999 38.1-40.17 38.1H607.898c-22.171 0-40.171-17.08-40.171-38.1v-151.46c0-21.03 18-38.1 40.171-38.1h147.313c22.171 0 40.17 17.07 40.17 38.1Z"
      style={{
        fill: "#fff",
      }}
      transform="matrix(.96037 0 0 1.0126 -545.225 -3316.365)"
    />
    <path
      d="M337.826 364.549c4.009-23.405 21.776-98.565 117.656-108.922 26.09-2.818 234.549-6.419 297.031 14.732 47.067 15.934 69.995 63.111 77.858 112.177 13.036 81.34 15.173 273.673 0 361.131-10.668 61.494-14 123.115-71.829 146.592-67.172 27.269-264.284 41.17-331.202 17.025-53.396-19.267-80.277-88.864-89.514-144.873-14.919-90.456-14.64-312.397 0-397.862Z"
      style={{
        fill: "#6da097",
      }}
      transform="translate(9.913 1.148) scale(.18536)"
    />
    <path
      d="M382.295 545.346s38.92 42.396 58.504-4.804"
      style={{
        fill: "none",
        stroke: "#fff",
        strokeWidth: 8,
      }}
      transform="translate(22.73 -21.352) scale(.18536)"
    />
    <path
      d="M382.295 545.346s38.92 42.396 58.504-4.804"
      style={{
        fill: "none",
        stroke: "#fff",
        strokeWidth: 8,
      }}
      transform="matrix(-.18536 0 0 .18536 213.545 -21.324)"
    />
    <path
      d="M628.051 474.526s18.017 47.752 17.513 61.881c-.366 10.245-20.538 21.085-20.538 22.893"
      style={{
        fill: "none",
        stroke: "#fff",
        strokeWidth: 8,
      }}
      transform="translate(4.414 6.208) scale(.18536)"
    />
    <path
      d="M663.092 787.21s15.161 157.692 44.612 162.851c26.54 4.649 34.819-1.004 35.424-1.004"
      style={{
        fill: "none",
        stroke: "#6da097",
        strokeWidth: 25,
      }}
      transform="matrix(-.18536 0 0 .18536 227.909 19.848)"
    />
    <path
      d="M339.224 600s-31.036 10.617-41.323 39.664"
      style={{
        fill: "none",
        stroke: "#6da097",
        strokeWidth: 25,
      }}
      transform="translate(9.786 22.443) scale(.18536)"
    />
    <path
      d="M660.092 795.628s11.415 67.513 26.675 107.376c6.414 16.755 14.037 29.192 22.753 30.719 26.54 4.649 36.826-5.159 37.431-5.159"
      style={{
        fill: "none",
        stroke: "#76aaa0",
        strokeWidth: 25,
        strokeLinecap: "butt",
      }}
      transform="translate(9.786 22.443) scale(.18536)"
    />
    <path
      d="M709.52 933.723c26.54 4.649 36.826-5.159 37.431-5.159"
      style={{
        fill: "none",
        stroke: "#76aaa0",
        strokeWidth: 25,
      }}
      transform="translate(9.786 22.443) scale(.18536)"
    />
    <path
      d="M339.224 600s-31.036 10.617-41.323 39.664"
      style={{
        fill: "none",
        stroke: "#76aaa0",
        strokeWidth: 25,
      }}
      transform="matrix(-.18536 0 0 .18536 224.845 22.629)"
    />
    <path
      d="M667.932 253.47c54.894 1.963 57.642 7.77 84.581 16.889 47.067 15.934 69.995 63.111 77.858 112.177 13.036 81.34 15.173 273.673 0 361.131-10.668 61.494-14 123.115-71.829 146.592-24.74 10.043-67.105 18.273-114.1 23.457 125.697-59.317 192.216-211.875 168.822-401.666-20.784-168.622-67.956-211.878-145.332-258.58Z"
      style={{
        fill: "#76aaa0",
      }}
      transform="translate(9.913 1.148) scale(.18536)"
    />
    <path
      d="M226.908 293.87S335.523 15.831 843.861 19.211c0 0 547.809-35.277 620.079 274.659H226.908Z"
      style={{
        fill: "#af9c8f",
      }}
      transform="matrix(.0575 0 0 .11377 69.542 40.317)"
    />
    <path
      d="M223.794 461.935c17.662-4.042 37.685-11.091 56.565-11.091h116.424l-40.854-121.599c-2.868-10.949 8.571-7.436 9.208-7.436.547 0 38.535 100.523 49.299 129.035h87.742c130.245-28.681 225.004-126.403 225.004-126.403 26.822 45.885 45.287 88.101 57.269 126.74 70.803 3.687 156.952 68.199 199.437 119.46 22.242-47.627 21.152-120.311 21.152-120.311 10.01-248.045-194.787-294.891-194.787-294.891-42.556 11.904-49.328-31.629-49.328-31.629.637-35.048-78.32-59.651-78.32-59.651-316.972-76.66-435.909 234.204-435.909 234.204-17.955 58.168-25.548 115.894-22.902 163.572Z"
      style={{
        fill: "#2e4b59",
      }}
      transform="matrix(-.12281 0 0 .12281 191.691 18.442)"
    />
    <path
      d="M663.274 59.91C360.785.171 246.696 298.363 246.696 298.363c-17.955 58.168-25.548 115.894-22.902 163.572 17.662-4.042 37.685-11.091 56.565-11.091h14.228C365.68 250.241 506.621 102.935 663.274 59.91Z"
      style={{
        fill: "#385d6d",
      }}
      transform="matrix(-.12281 0 0 .12281 191.691 18.442)"
    />
    <path
      id="checkMark"
      d="M600 45C293.98 45 45 293.98 45 600s248.98 555 555 555 555-248.98 555-555S906.02 45 600 45Zm307.63 441.93L553.17 841.38c-10.789 10.789-25.738 16.98-40.992 16.98v24l-.516-24c-15.457-.133-30.469-6.59-41.195-17.711l-178.82-185.35c-22.199-23.004-21.539-59.762 1.465-81.961 10.859-10.488 25.152-16.246 40.234-16.246 15.875 0 30.695 6.289 41.723 17.711l137.86 142.88 312.74-312.73c10.945-10.945 25.5-16.98 40.992-16.98 15.48 0 30.035 6.023 40.98 16.969 22.586 22.605 22.586 59.387-.008 81.984l-.003.004Z"
      style={{
        fill: "#5d8155",
        fillRule: "nonzero",
      }}
      transform="translate(15.416 92.081) scale(.05795)"
    />

    
  <path
      id="CheckCover"
      d="M26 110h47v36H26z"
      style={{
        fill: "#5d8155",
      }}
    />
    </svg>
  )
}
export default SomethingElseMan
