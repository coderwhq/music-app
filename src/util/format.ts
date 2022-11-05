function formatCount(count: string | number) {
  var counter = typeof count === 'number' ? count : parseInt(count)
  if (counter > 100000000) {
    return (counter / 100000000).toFixed(1) + "亿"
  } else if (counter > 10000) {
    return (counter / 10000).toFixed(1) + "万"
  } else {
    return counter + ""
  }
}

function formatDate(time: number | string) {
  if(typeof time === 'number') {
    const date = new Date(time)
    const y = date.getFullYear() + '-'
    const m = padLeftZero(date.getMonth()) + '-'
    const d = padLeftZero(date.getDate()) + ''
    time = y + m + d
  }
  return time
}

function padLeftZero(time: any) {
  time = time + ""
  return ("00" + time).slice(time.length)
}

export { 
  formatCount,
  formatDate
}