const fs = require('fs')
const FormData = require('form-data')
const axios = require('axios')

async function uploadFile(absPath, key) {
  const file = await fs.createReadStream(absPath)
  const formData = new FormData()
  formData.append('media', file)
  const res = await axios.request({
    url:
      'https://qyapi.weixin.qq.com/cgi-bin/webhook/upload_media?key=' +
      key +
      '&type=file',
    method: 'post',
    headers: formData.getHeaders(),
    data: formData
  })
  return res.data.media_id
}

 module.exports = uploadFile
