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

function formatDuration (duration: any) {
  // ms > s
  duration = duration / 1000

  var minute = Math.floor(duration / 60)
  var seccond = Math.floor(duration) % 60

  return padLeftZero(minute) + ":" + padLeftZero(seccond)
}


export { 
  formatCount,
  formatDate,
  formatDuration
}