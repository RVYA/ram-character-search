"use client"

import { useEffect, useRef } from "react"
import styles from "./squiggly-hr.module.css"

interface SquigglyHRProps {}

const kColorRickBlue = "#aad3ea"
const kColorMortyYellow = "#f9f769"
const kColorBethRed = "#ff6e7e"
const kColorJerryGreen = "#7a8f53"
const kColorSummerPurple = "#ff8de7"

const kWidthStroke = 3

export default function SquigglyHR({}: SquigglyHRProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    //#region Setup canvas
    const canvas = canvasRef.current
    if (canvas === null) return

    const ctx = canvas.getContext("2d")
    if (ctx === null) return

    canvas.width = canvas.clientWidth
    //#endregion

    const amplitude = canvas.height / 2
    const frequency = canvas.width / 2 / canvas.height

    //#region Setup gradient overlay
    const ramGradient = ctx.createLinearGradient(
      0,
      canvas.height / 2,
      canvas.width,
      canvas.height / 2,
    )
    ramGradient.addColorStop(0, kColorRickBlue)
    ramGradient.addColorStop(25 / 100, kColorMortyYellow)
    ramGradient.addColorStop(50 / 100, kColorBethRed)
    ramGradient.addColorStop(75 / 100, kColorJerryGreen)
    ramGradient.addColorStop(100 / 100, kColorSummerPurple)
    //#endregion

    ctx.beginPath()

    for (let x = 0; x < canvas.width; x++) {
      const y =
        amplitude * Math.sin(frequency * (x / canvas.width) * 2 * Math.PI)

      ctx.lineWidth = kWidthStroke
      ctx.strokeStyle = ramGradient

      if (x === 0) {
        ctx.moveTo(x, canvas.height / 2 + y)
      } else {
        ctx.lineTo(x, canvas.height / 2 + y)
      }
    }

    ctx.stroke()
  }, [canvasRef])

  return <canvas className={styles.squigglyHR} ref={canvasRef}></canvas>
}
