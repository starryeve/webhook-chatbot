/*
 * @Author: zengfh
 * @Date: 2022-04-09 12:47:42
 * @LastEditTime: 2022-04-09 12:57:50
 * @Description:
 */
export interface IWebhookOption {
  webhook: string
}

export interface IBaseUrlOption {
  baseUrl: string
  key: string
}

export type MsgType =
  | 'text'
  | 'markdown'
  | 'image'
  | 'news'
  | 'file'
  | 'template_card'
  | string

export type IMsgType = {
  [key in MsgType]?: unknown
}

export interface ISend extends IMsgType {
  msgtype: MsgType
}

export interface ISendResponse {
  /**
   * 为0时，消息发送成功
   */
  errcode: number
  /**
   * 发送失败时的提示信息
   */
  errmsg: string
}

export interface IText {
  content: string
  mentioned_list?: string[]
  mentioned_mobile_list?: string[]
}

export interface IMarkdown {
  content: string
}

export interface IImage {
  base64: string
  md5: string
}

export interface INews {
  articles: {
    title: string
    description?: string
    url: string
    picurl?: string
  }[]
}

export interface IFile {
  media_id: string
}
