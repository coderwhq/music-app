function getRandom(a: number, b: number) {
  return Math.floor( Math.random() * (b - a + 1) + a )
}


export {
  getRandom
}