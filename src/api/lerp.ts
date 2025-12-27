const lerp = (a: number, b: number, t: number): number => a + (b - a) * t
const lerp_hex = (hexA: string, hexB: string, t: number): string => {
  const parse = (hex: string) => ({
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
    a: hex.length >= 9 ? parseInt(hex.slice(7, 9), 16) : 255,
  })

  const toHex = (v: number) =>
    Math.round(v).toString(16).padStart(2, '0')

  const a = parse(hexA)
  const b = parse(hexB)

  return `#${toHex(lerp(a.r, b.r, t))}${toHex(
    lerp(a.g, b.g, t)
  )}${toHex(lerp(a.b, b.b, t))}${toHex(
    lerp(a.a, b.a, t)
  )}`
} 

export { lerp, lerp_hex }
