export interface IBaseUrlOption {
  baseUrl: string
  access_token: string
  secret?: string
}

export interface IWebhookOption {
  webhook: string
  secret?: string
}

export type MsgType =
  | 'text'
  | 'link'
  | 'markdown'
  | 'actionCard'
  | 'feedCard'
  | string

export type IMsgType = {
  [key in MsgType]?: unknown
}

export interface ISend extends IMsgType {
  msgtype: MsgType
  at?: {
    atMobiles?: string[]
    atUserIds?: string[]
    isAtAll?: boolean
  }
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

export interface ITextContent {
  at?: {
    atMobiles?: string[]
    atUserIds?: string[]
    isAtAll?: boolean
  }
  content: string
}

export interface ILinkContent {
  messageUrl: string
  picUrl?: string
  text: string
  title: string
}

export interface IMarkdown {
  at?: {
    atMobiles?: string[]
    atUserIds?: string[]
    isAtAll?: boolean
  }
  text: string
  title: string
}

export interface IEntireActionCard {
  text: string
  title: string
  btnOrientation?: '0' | '1'
  singleTitle: string
  singleURL: string
}

export interface ISingleActionCard {
  text: string
  title: string
  btns: {
    title: string
    actionURL: string
  }[]
  btnOrientation?: '0' | '1'
}

export interface IFeedCard {
  links: {
    title: string
    messageURL: string
    picURL: string
  }[]
}
