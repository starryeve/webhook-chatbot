import { ISend, IMarkdown, IImage, INews, IFile } from 'robot-sender';
import { ISendResponse } from './DingRobotType';
import { IBaseUrlOption, IWebhookOption, IText } from './WXRobotType';
declare class WXRobot {
    private webhook;
    private key;
    /**
     * @param options.baseUrl webhook接口地址
     * @param options.key 你的key值
     */
    constructor(options: IBaseUrlOption);
    /**
     * @param options.webhook webhook完整地址
     */
    constructor(options: IWebhookOption);
    /**
     * 发送指定类型的消息，详细参数请查文档（可用来发送其他类型的消息，如模板卡片类型等）
     * @param send.msgtype 消息类型
     * @param send[msgtype] 具体消息类型对应的内容
     */
    send(send: ISend): Promise<ISendResponse>;
    /**
     * @param text.content 文本内容，最长不超过2048个字节，必须是utf8编码
     * @param text.mentioned_list，提醒群中的指定成员(@某个成员)，@all表示提醒所有人
     * @param text.mentioned_mobile_list 手机号列表，提醒手机号对应的群成员(@某个成员)，@all表示提醒所有人
     */
    text(text: IText): Promise<ISendResponse>;
    /**
     * @param markdown.content markdown内容，最长不超过4096个字节，必须是utf8编码
     */
    markdown(markdown: IMarkdown): Promise<ISendResponse>;
    /**
     * @param image.base64 图片内容的base64编码
     * @param image.md5 图片内容（base64编码前）的md5值
     */
    image(image: IImage): Promise<ISendResponse>;
    /**
     * @param news.article 图文消息，一个图文消息支持1到8条图文
     */
    news(news: INews): Promise<ISendResponse>;
    /**
     * @param file.media_id 文件id，通过企业微信提供的文件上传接口获取
     */
    file(file: IFile): Promise<ISendResponse>;
}
export default WXRobot;
