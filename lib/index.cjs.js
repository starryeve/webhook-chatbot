'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var https = require('https');
var crypto = require('crypto');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var https__default = /*#__PURE__*/_interopDefaultLegacy(https);

function post(config) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(config.url);
        const search = urlObj.searchParams.toString();
        const options = {
            hostname: urlObj.hostname,
            protocol: urlObj.protocol,
            path: urlObj.pathname + '?' + search,
            port: '443',
            method: 'post',
            headers: config.headers
        };
        const req = https__default["default"]
            .request(options, res => {
            let data = '';
            res.on('data', chunk => {
                data += chunk;
            });
            res.on('end', () => {
                resolve(JSON.parse(data));
            });
        })
            .on('error', error => {
            console.error('Error:', error.message);
            reject(error);
        });
        req.write(config.data);
        req.end();
    });
}

class WXRobot {
    constructor(options) {
        if (!options) {
            throw new Error('Webhook config is needed!');
        }
        if (!options.webhook &&
            !(options.baseUrl || options.key)) {
            throw new Error('Webhook config is needed!');
        }
        this.webhook =
            options.webhook ||
                options.baseUrl +
                    '?key=' +
                    options.key;
        this.key = options.key;
    }
    /**
     * 发送指定类型的消息，详细参数请查文档（可用来发送其他类型的消息，如模板卡片类型等）
     * @param send.msgtype 消息类型
     * @param send[msgtype] 具体消息类型对应的内容
     */
    send(send) {
        return post({
            url: this.webhook,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(send)
        });
    }
    /**
     * @param text.content 文本内容，最长不超过2048个字节，必须是utf8编码
     * @param text.mentioned_list，提醒群中的指定成员(@某个成员)，@all表示提醒所有人
     * @param text.mentioned_mobile_list 手机号列表，提醒手机号对应的群成员(@某个成员)，@all表示提醒所有人
     */
    text(text) {
        return this.send({
            msgtype: 'text',
            text
        });
    }
    /**
     * @param markdown.content markdown内容，最长不超过4096个字节，必须是utf8编码
     */
    markdown(markdown) {
        return this.send({
            msgtype: 'markdown',
            markdown
        });
    }
    /**
     * @param image.base64 图片内容的base64编码
     * @param image.md5 图片内容（base64编码前）的md5值
     */
    image(image) {
        return this.send({
            msgtype: 'image',
            image
        });
    }
    /**
     * @param news.article 图文消息，一个图文消息支持1到8条图文
     */
    news(news) {
        return this.send({
            msgtype: 'news',
            news
        });
    }
    /**
     * @param file.media_id 文件id，通过企业微信提供的文件上传接口获取
     */
    file(file) {
        return this.send({
            msgtype: 'file',
            file
        });
    }
}

function sign(secret) {
    const timestamp = Date.now();
    const signString = timestamp + '\n' + secret;
    const hmacSHA256Sign = crypto.createHmac('sha256', secret);
    const base64Sign = hmacSHA256Sign
        .update(signString)
        .digest()
        .toString('base64');
    const urlEncodeSigh = encodeURIComponent(base64Sign);
    return urlEncodeSigh;
}

class DingRobot {
    constructor(options) {
        this.secret = '';
        if (!options) {
            throw new Error('Webhook config is needed!');
        }
        if (!options.webhook &&
            !(options.baseUrl ||
                options.access_token)) {
            throw new Error('Webhook config is needed!');
        }
        this.webhook =
            options.webhook ||
                options.baseUrl +
                    '?access_token=' +
                    options.access_token;
        if (options.secret) {
            const timestamp = Date.now();
            const signature = sign(options.secret);
            this.secret = '&timestamp=' + timestamp + '&sign=' + signature;
        }
    }
    /**
     * 发送指定格式的消息，详细参数请查文档（可用来发送其他类型的消息）
     * @param content.msgtype 消息格式
     * @param content.at.atMobiles 被@人的手机号
     * @param content.at.atMobiles 被@人的用户userid
     * @param content.at.atAll 是否@所有人
     * @param content[msgtype] 具体消息格式对应的内容
     */
    send(content) {
        return post({
            url: this.webhook + this.secret,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(content)
        });
    }
    /**
     * @param textContent.content 消息内容
     * @param textContent.at.atMobiles 被@人的手机号
     * @param textContent.at.atMobiles 被@人的用户userid
     * @param textContent.at.atAll 是否@所有人
     */
    text(textContent) {
        return this.send({
            msgtype: 'text',
            text: {
                content: textContent.content
            },
            at: textContent.at
        });
    }
    /**
     * @param linkContent.title 消息标题
     * @param linkContent.text 消息内容。如果太长只会部分展示
     * @param linkContent.messageUrl 点击消息跳转的URL
     * @param linkContent.picUrl 图片URL
     */
    link(linkContent) {
        return this.send({
            msgtype: 'link',
            link: Object.assign({}, linkContent)
        });
    }
    /**
     * @param markdownContent.title 首屏会话透出的展示内容
     * @param markdownContent.text markdown格式的消息
     * @param markdownContent.at.atMobiles 被@人的手机号
     * @param markdownContent.at.atMobiles 被@人的用户userid
     * @param markdownContent.at.atAll 是否@所有人
     */
    markdown(markdownContent) {
        return this.send({
            msgtype: 'markdown',
            markdown: {
                title: markdownContent.title,
                text: markdownContent.text
            },
            at: markdownContent.at
        });
    }
    /**
     * @param entireActionCardContent.title 首屏会话透出的展示内容
     * @param entireActionCardContent.text markdown格式的消息
     * @param entireActionCardContent.singleTitle 单个按钮的标题
     * @param entireActionCardContent.singleURL 点击按钮触发的URL
     * @param entireActionCardContent.btnOrientation 0：按钮竖直排列; 1：按钮横向排列
     */
    entireActionCard(entireActionCardContent) {
        return this.send({
            msgtype: 'actionCard',
            actionCard: Object.assign({}, entireActionCardContent)
        });
    }
    /**
     * @param singleActionCardContent.title 首屏会话透出的展示内容
     * @param singleActionCardContent.text markdown格式的消息
     * @param singleActionCardContent.btns.title 按钮标题
     * @param singleActionCardContent.btns.actionURL 点击按钮触发的URL
     * @param singleActionCardContent.btnOrientation 0：按钮竖直排列; 1：按钮横向排列
     */
    singleActionCard(singleActionCardContent) {
        return this.send({
            msgtype: 'actionCard',
            actionCard: Object.assign({}, singleActionCardContent)
        });
    }
    /**
     * @param feedCardContent.links.title 单条信息文本
     * @param feedCardContent.links.messageURL 点击单挑新到跳转链接
     * @param feedCardContent.links.picURL 单条信息后面图片的URL
     */
    feedCard(feedCardContent) {
        return this.send({
            msgtype: 'feedCard',
            feedCard: Object.assign({}, feedCardContent)
        });
    }
}

exports.DingRobot = DingRobot;
exports.WXRobot = WXRobot;
