import uriToHttp from 'lib/utils/uriToHttp'
import Vibrant from 'node-vibrant/lib/bundle.js'
import { shade } from 'polished'
import { useEffect, useState } from 'react'
import { hex } from 'wcag-contrast'

async function getColorFromUriPath(uri: string): Promise<string | null> {
  const formattedPath = uriToHttp(uri)[0]

  const palette = await Vibrant.from(formattedPath).getPalette()
  if (!palette?.Vibrant) {
    return null
  }

  let detectedHex = palette.Vibrant.hex
  let AAscore = hex(detectedHex, '#FFF')
  while (AAscore < 3) {
    detectedHex = shade(0.005, detectedHex)
    AAscore = hex(detectedHex, '#FFF')
  }

  return detectedHex
}

export function useListColor(listImageUri?: string) {
  const [color, setColor] = useState('#2172E5')

  useEffect(() => {
    let stale = false

    if (listImageUri) {
      getColorFromUriPath(listImageUri).then((color) => {
        if (!stale && color !== null) {
          setColor(color)
        }
      })
    }

    return () => {
      stale = true
      setColor('#2172E5')
    }
  }, [listImageUri])

  return color
}
