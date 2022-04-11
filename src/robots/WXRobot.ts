import { ISend, IMarkdown, IImage, INews, IFile } from 'robot-sender'
import { post } from '../utils/rq'
import { ISendResponse } from './DingRobotType'
import { IBaseUrlOption, IWebhookOption, IText } from './WXRobotType'

class WXRobot {
  private webhook: string
  private key: string

  /**
   * @param options.baseUrl webhook接口地址
   * @param options.key 你的key值
   */
  constructor(options: IBaseUrlOption)
  /**
   * @param options.webhook webhook完整地址
   */
  constructor(options: IWebhookOption)

  constructor(options: IWebhookOption | IBaseUrlOption) {
    if (!options) {
      throw new Error('Webhook config is needed!')
    }

    if (
      !(<IWebhookOption>options).webhook &&
      !((<IBaseUrlOption>options).baseUrl || (<IBaseUrlOption>options).key)
    ) {
      throw new Error('Webhook config is needed!')
    }
    this.webhook =
      (<IWebhookOption>options).webhook ||
      (<IBaseUrlOption>options).baseUrl +
        '?key=' +
        (<IBaseUrlOption>options).key
    this.key = (<IBaseUrlOption>options).key
  }

  /**
   * 发送指定类型的消息，详细参数请查文档（可用来发送其他类型的消息，如模板卡片类型等）
   * @param send.msgtype 消息类型
   * @param send[msgtype] 具体消息类型对应的内容
   */
  send(send: ISend) {
    return post<ISendResponse>({
      url: this.webhook,
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(send)
    })
  }

  /**
   * @param text.content 文本内容，最长不超过2048个字节，必须是utf8编码
   * @param text.mentioned_list，提醒群中的指定成员(@某个成员)，@all表示提醒所有人
   * @param text.mentioned_mobile_list 手机号列表，提醒手机号对应的群成员(@某个成员)，@all表示提醒所有人
   */
  text(text: IText) {
    return this.send({
      msgtype: 'text',
      text
    })
  }

  /**
   * @param markdown.content markdown内容，最长不超过4096个字节，必须是utf8编码
   */
  markdown(markdown: IMarkdown) {
    return this.send({
      msgtype: 'markdown',
      markdown
    })
  }

  /**
   * @param image.base64 图片内容的base64编码
   * @param image.md5 图片内容（base64编码前）的md5值
   */
  image(image: IImage) {
    return this.send({
      msgtype: 'image',
      image
    })
  }

  /**
   * @param news.article 图文消息，一个图文消息支持1到8条图文
   */
  news(news: INews) {
    return this.send({
      msgtype: 'news',
      news
    })
  }

  /**
   * @param file.media_id 文件id，通过企业微信提供的文件上传接口获取
   */
  file(file: IFile) {
    return this.send({
      msgtype: 'file',
      file
    })
  }
}

export default WXRobot
