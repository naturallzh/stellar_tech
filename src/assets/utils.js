import xlsx from 'xlsx'

function randomNum (minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10)
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
    default:
      return 0
  }
}

function addZero (num) {
  num = parseInt(num)
  if (num >= 10) { return num + '' } else { return '0' + num }
}

// 导出excel所需相关函数
// 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
function sheet2blob (sheetArr) {
  // sheetName = sheetName || 'sheet1';
  const sheetNameArr = []
  for (let i = 0; i < sheetArr.length; i++) {
    sheetNameArr[i] = 'sheet' + (i + 1)
  }
  const workbook = {
    SheetNames: sheetNameArr,
    Sheets: {}
  }
  for (let i = 0; i < sheetArr.length; i++) {
    workbook.Sheets[sheetNameArr[i]] = sheetArr[i]
  }
  // 生成excel的配置项
  const wopts = {
    bookType: 'xlsx', // 要生成的文件类型
    bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    type: 'binary'
  }
  const wbout = xlsx.write(workbook, wopts)
  const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' })
  // 字符串转ArrayBuffer
  function s2ab (s) {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
    return buf
  }
  return blob
}

/**
 * 通用的打开下载对话框方法，没有测试过具体兼容性
 * @param url 下载地址，也可以是一个blob对象，必选
 * @param saveName 保存文件名，可选
 */
function openDownloadDialog (url, saveName) {
  if (typeof url === 'object' && url instanceof Blob) {
    url = URL.createObjectURL(url) // 创建blob地址
  }
  const aLink = document.createElement('a')
  aLink.href = url
  aLink.download = saveName || '' // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
  let event
  if (window.MouseEvent) event = new MouseEvent('click')
  else {
    event = document.createEvent('MouseEvents')
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  }
  aLink.dispatchEvent(event)
}

export default {
  randomNum,
  addZero,
  sheet2blob,
  openDownloadDialog
}
