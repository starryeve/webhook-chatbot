type HttpHeader = number | string | string[]
type HttpHeaders = NodeJS.Dict<HttpHeader>

import https from 'https'

interface RequestConfig {
  url: string
  headers?: HttpHeaders
  data?: unknown
}

function post<R>(config: RequestConfig) {
  return new Promise<R>((resolve, reject) => {
    const urlObj = new URL(config.url)
    const search = urlObj.searchParams.toString()
    const options: https.RequestOptions = {
      hostname: urlObj.hostname,
      protocol: urlObj.protocol,
      path: urlObj.pathname + '?' + search,
      port: '443',
      method: 'post',
      headers: config.headers
    }

    const req = https
      .request(options, res => {
        let data = ''
        res.on('data', chunk => {
          data += chunk
        })

        res.on('end', () => {
          resolve(JSON.parse(data))
        })
      })
      .on('error', error => {
        console.error('Error:', error.message)
        reject(error)
      })
    req.write(config.data)
    req.end()
  })
}

function get<R>(config: RequestConfig) {
  return new Promise<R>((resolve, reject) => {
    const urlObj = new URL(config.url)
    const search = urlObj.searchParams.toString()
    const options: https.RequestOptions = {
      hostname: urlObj.hostname,
      protocol: urlObj.protocol,
      path: urlObj.pathname + '?' + search,
      port: '443',
      method: 'get',
      headers: config.headers
    }

    const req = https
      .request(options, res => {
        let data = ''
        res.on('data', chunk => {
          data += chunk
        })

        res.on('end', () => {
          resolve(JSON.parse(data))
        })
      })
      .on('error', error => {
        console.error('Error:', error.message)
        reject(error)
      })
    req.write(config.data)
    req.end()
  })
}

export { get, post }
