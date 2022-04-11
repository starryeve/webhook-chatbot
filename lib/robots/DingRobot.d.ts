import { IEntireActionCard, IFeedCard, ILinkContent, IMarkdown, IBaseUrlOption, IWebhookOption, ISend, ISendResponse, ISingleActionCard, ITextContent } from './DingRobotType';
declare class DingRobot {
    private webhook;
    private secret;
    /**
     * @param options.baseUrl webhook接口地址
     * @param options.access_token 你的access_token
     * @param options.secret  签名
     */
    constructor(options: IBaseUrlOption);
    /**
     * @param options.webhook webhook地址
     * @param options.secret  签名
     */
    constructor(options: IWebhookOption);
    /**
     * 发送指定格式的消息，详细参数请查文档（可用来发送其他类型的消息）
     * @param content.msgtype 消息格式
     * @param content.at.atMobiles 被@人的手机号
     * @param content.at.atMobiles 被@人的用户userid
     * @param content.at.atAll 是否@所有人
     * @param content[msgtype] 具体消息格式对应的内容
     */
    send(content: ISend): Promise<ISendResponse>;
    /**
     * @param textContent.content 消息内容
     * @param textContent.at.atMobiles 被@人的手机号
     * @param textContent.at.atMobiles 被@人的用户userid
     * @param textContent.at.atAll 是否@所有人
     */
    text(textContent: ITextContent): Promise<ISendResponse>;
    /**
     * @param linkContent.title 消息标题
     * @param linkContent.text 消息内容。如果太长只会部分展示
     * @param linkContent.messageUrl 点击消息跳转的URL
     * @param linkContent.picUrl 图片URL
     */
    link(linkContent: ILinkContent): Promise<ISendResponse>;
    /**
     * @param markdownContent.title 首屏会话透出的展示内容
     * @param markdownContent.text markdown格式的消息
     * @param markdownContent.at.atMobiles 被@人的手机号
     * @param markdownContent.at.atMobiles 被@人的用户userid
     * @param markdownContent.at.atAll 是否@所有人
     */
    markdown(markdownContent: IMarkdown): Promise<ISendResponse>;
    /**
     * @param entireActionCardContent.title 首屏会话透出的展示内容
     * @param entireActionCardContent.text markdown格式的消息
     * @param entireActionCardContent.singleTitle 单个按钮的标题
     * @param entireActionCardContent.singleURL 点击按钮触发的URL
     * @param entireActionCardContent.btnOrientation 0：按钮竖直排列; 1：按钮横向排列
     */
    entireActionCard(entireActionCardContent: IEntireActionCard): Promise<ISendResponse>;
    /**
     * @param singleActionCardContent.title 首屏会话透出的展示内容
     * @param singleActionCardContent.text markdown格式的消息
     * @param singleActionCardContent.btns.title 按钮标题
     * @param singleActionCardContent.btns.actionURL 点击按钮触发的URL
     * @param singleActionCardContent.btnOrientation 0：按钮竖直排列; 1：按钮横向排列
     */
    singleActionCard(singleActionCardContent: ISingleActionCard): Promise<ISendResponse>;
    /**
     * @param feedCardContent.links.title 单条信息文本
     * @param feedCardContent.links.messageURL 点击单挑新到跳转链接
     * @param feedCardContent.links.picURL 单条信息后面图片的URL
     */
    feedCard(feedCardContent: IFeedCard): Promise<ISendResponse>;
}
export default DingRobot;
