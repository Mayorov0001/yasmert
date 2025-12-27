const rgba_to_hex = (r: number, g: number, b: number, a: number = 1): string =>
  `#${[r, g, b, a * 255]
    .map(v => Math.round(v).toString(16).padStart(2, '0'))
    .join('')}`

export { rgba_to_hex }
