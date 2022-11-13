// 正则(regular)表达式(expression) 

const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export function parseLyric(lyricString: any) {
  const lyricStrings = lyricString.split("\n")
  const lyricInfo = []
  for(const lineString of lyricStrings) {
    const timeResult: any = timeRegExp.exec(lineString)
    if(!timeResult) continue
    // 获取时间
    const minute = timeResult[1] * 60 * 1000
    const second = timeResult[2] * 1000
    const millsecondTime = timeResult[3]
    const millsecond = millsecondTime.length === 2 ? millsecondTime * 10 : millsecondTime * 1
    const time = minute + second + millsecond

    // 获取歌词
    const text = lineString.replace(timeResult[0], "")
    lyricInfo.push({ time, text })
  }
  return lyricInfo
}