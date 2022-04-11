import { createHmac } from 'crypto'
function sign(secret: string) {
  const timestamp = Date.now()
  const signString = timestamp + '\n' + secret

  const hmacSHA256Sign = createHmac('sha256', secret)
  const base64Sign = hmacSHA256Sign
    .update(signString)
    .digest()
    .toString('base64')

  const urlEncodeSigh = encodeURIComponent(base64Sign)

  return urlEncodeSigh
}

export default sign
