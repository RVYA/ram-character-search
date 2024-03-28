"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import styles from "styles/pattern-background.module.css"

const kImgNamesCromulon = [
  "cromulon_blue",
  "cromulon_green",
  "cromulon_orange",
  "cromulon_pink",
  "cromulon_purple",
  "cromulon_red",
  "cromulon_teal",
  "cromulon_yellow",
]
const kImgNamePickleRick = "pickle_rick"

const kPrefixPathImages = "/images/"
const kSuffixExtImage = ".png"

function getPathForImg(name: string) {
  return kPrefixPathImages + name + kSuffixExtImage
}

interface PatternImages {
  pickleRick: HTMLImageElement
  cromulons: HTMLImageElement[]
}

async function preloadAllPatternImages(): Promise<PatternImages> {
  const imgFiles = kImgNamesCromulon.map((img) => getPathForImg(img))
  imgFiles.push(getPathForImg(kImgNamePickleRick))

  const imgLoadPromises = imgFiles.map<Promise<HTMLImageElement>>(
    (file) =>
      new Promise((resolve, reject) => {
        const img = new Image()
        img.src = file

        img.onload = () => resolve(img)
        img.onerror = () => reject(`Image file (${file}) has failed to load.`)
      }),
  )

  const loadedImages = await Promise.all(imgLoadPromises)
  return {
    pickleRick: loadedImages.pop()!, // last image is pickle_rick
    cromulons: loadedImages,
  }
}

interface PatternCoordinate {
  x: number
  y: number
}

export interface BackgroundDimensions {
  width: number
  height: number
}

interface PatternBackgroundProps {
  canvasWidth?: number
  canvasHeight?: number
}

const kHeightPattern = 100 //px
const kWidthPattern = 80 //px
const kGapPattern = 24 //px Maybe redundant
const kBufferCanvasSize = 16 //px

const kProbabilityPattern = 85 / 100
const kProbabilityPickleRick = 45 / 100 // To make it more uniform.

const kDelayPatternGen = 15 //ms

export default function PatternBackground({
  canvasWidth,
  canvasHeight,
}: PatternBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [imgs, setImgs] = useState<PatternImages>()

  // #region Pattern generation algorithm
  // Preloading images
  useEffect(() => {
    async function handlePreload() {
      setImgs(await preloadAllPatternImages())
    }
    handlePreload()
  }, [])

  const generateCoords = useCallback(() => {
    function doesCoordsOverlap(
      newX: number,
      newY: number,
      existingCoords: PatternCoordinate,
    ) {
      return (
        newX + kWidthPattern > existingCoords.x &&
        newX < existingCoords.x + kWidthPattern &&
        newY + kHeightPattern > existingCoords.y &&
        newY < existingCoords.y + kHeightPattern
      )
    }

    function generateRandomPadding(pad: number) {
      return Math.floor(Math.random() * (2 * pad + 1)) - pad
    }

    if (canvasRef.current === null) return

    const coords: PatternCoordinate[] = []

    const stepX = kWidthPattern + kGapPattern
    const stepY = kHeightPattern + kGapPattern
    const initPos = -kBufferCanvasSize
    for (let y = initPos; y < canvasRef.current.height; y += stepY) {
      for (let x = -initPos; x < canvasRef.current.width; x += stepX) {
        if (!(Math.random() < kProbabilityPattern)) continue

        const xPos = x + generateRandomPadding(kWidthPattern)
        const yPos = y + generateRandomPadding(kHeightPattern)

        const isOverlapping =
          coords.length > 0 &&
          coords.some((c) => doesCoordsOverlap(xPos, yPos, c))

        if (!isOverlapping) coords.push({ x: xPos, y: yPos })
      }
    }

    return coords
  }, [])

  const generatePatterns = useCallback(() => {
    function getRandomRotation() {
      return Math.random() * 2 * Math.PI // A random angle between 0 and 2π
    }

    function getRandomPattern() {
      // There is multiple cromulons, but one pickle rick image. May need a
      // better algorithm.
      const isPickleRickSelected = Math.random() <= kProbabilityPickleRick
      if (isPickleRickSelected) return imgs!.pickleRick
      else return imgs!.cromulons[(Math.random() * imgs!.cromulons.length) | 0]
    }

    if (canvasRef.current === null) return
    if (imgs === undefined) return

    const ctx = canvasRef.current.getContext("2d")
    if (ctx === null) return

    const coords = generateCoords()! // Doesn't get executed when the ref is null
    let coordIndex = 0
    function drawPattern() {
      if (ctx === null)
        throw Error("Canvas context was null when drawPattern was called.")
      if (coordIndex >= coords.length) return

      const randPatrImg = getRandomPattern()
      const coord = coords[coordIndex]
      // While this is rather an unexpected behaviour, randomly rotating the
      // canvas each time before drawing an image creates more of a randomized
      // scattering of images.
      ctx.rotate(getRandomRotation())
      // Assuming that preload function took care of loading images beforehand.
      ctx.drawImage(randPatrImg, coord.x, coord.y)

      coordIndex++
      setTimeout(drawPattern, kDelayPatternGen)
    }

    drawPattern()
  }, [generateCoords, imgs])

  useEffect(() => generatePatterns(), [generatePatterns])
  // #endregion

  useEffect(() => {
    if (canvasRef.current === null) return

    canvasRef.current.width = canvasWidth ?? window.innerWidth
    canvasRef.current.height = canvasHeight ?? window.innerHeight
    //canvasHeight ?? document.documentElement.scrollHeight

    generatePatterns()
  }, [canvasHeight, canvasWidth, generatePatterns])

  return <canvas className={styles.patternBackground} ref={canvasRef}></canvas>
}
