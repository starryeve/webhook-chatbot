
const fs = require('fs')
const { createHash } = require('crypto')

function formatImg(absPath) {
  const rs = fs.readFileSync(absPath)
  const base64 = rs.toString('base64')
  const md5 = createHash('md5')
  const md5res = md5.update(rs).digest('hex')
  return {
    base64,
    md5res
  }
}

module.exports = formatImg
