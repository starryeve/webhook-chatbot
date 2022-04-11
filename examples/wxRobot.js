const path = require('path')
require('dotenv').config()
const { WXRobot } = require('../lib/index.cjs')
const formatImg = require('./utils/formatImg')
const uploadFile = require('./utils/uploadFile')

const wxRobot = new WXRobot({
  webhook: process.env.WX_WEBHOOK
})

;(async () => {
  const txtRes = await wxRobot.text({
    content: '今天月色真美！\n啊，我的意思是，你健康打卡了吗❓',
    mentioned_list: ['L', '@all'],
    mentioned_mobile_list: ['13800001111', '@all']
  })
  console.log(txtRes)

  // const mdRes = await wxRobot.markdown({
  //   content: `
  //  > 【报错项目】yl-club
  //  > 【错误级别】error
  //  > 【错误时间】${new Date().toLocaleDateString()}
  //  > 【错误原因】api request error
  //  > 【错误详情】[click here to view](https://sentry.io/xxx)`
  // })
  // console.log(mdRes);

  // const { md5res, base64 } = formatImg(path.join(__dirname, './assets/img.jpg'))
  // const imgRes = await wxRobot.image({
  //   base64: base64,
  //   md5: md5res
  // })
  // console.log(imgRes);

  // const newsRes = await wxRobot.news({
  //   articles: [
  //     {
  //       title: '中秋节礼品领取',
  //       description: '今年中秋节公司有豪礼相送',
  //       url: 'www.qq.com',
  //       picurl:
  //         'http://res.mail.qq.com/node/ww/wwopenmng/images/independent/doc/test_pic_msg1.png'
  //     }
  //   ]
  // })
  // console.log(newsRes);

  // const media_id = await uploadFile(
  //   path.join(__dirname, './assets/file.xlsx'),
  //   key
  // )
  // const fileRes = await wxRobot.file({
  //   media_id
  // })
  // console.log(fileRes);

  // const cardRes = await wxRobot.send({
  //   msgtype: 'template_card',
  //   template_card: {
  //     card_type: 'text_notice',
  //     source: {
  //       icon_url:
  //         'https://wework.qpic.cn/wwpic/252813_jOfDHtcISzuodLa_1629280209/0',
  //       desc: '企业微信',
  //       desc_color: 0
  //     },
  //     main_title: {
  //       title: '欢迎使用企业微信',
  //       desc: '您的好友正在邀请您加入企业微信'
  //     },
  //     emphasis_content: {
  //       title: '100',
  //       desc: '数据含义'
  //     },
  //     quote_area: {
  //       type: 1,
  //       url: 'https://work.weixin.qq.com/?from=openApi',
  //       appid: 'APPID',
  //       pagepath: 'PAGEPATH',
  //       title: '引用文本标题',
  //       quote_text: 'Jack：企业微信真的很好用~\nBalian：超级好的一款软件！'
  //     },
  //     sub_title_text: '下载企业微信还能抢红包！',
  //     horizontal_content_list: [
  //       {
  //         keyname: '邀请人',
  //         value: '张三'
  //       },
  //       {
  //         keyname: '企微官网',
  //         value: '点击访问',
  //         type: 1,
  //         url: 'https://work.weixin.qq.com/?from=openApi'
  //       },
  //       {
  //         keyname: '企微下载',
  //         value: '企业微信.apk',
  //         type: 2,
  //         media_id: 'MEDIAID'
  //       }
  //     ],
  //     jump_list: [
  //       {
  //         type: 1,
  //         url: 'https://work.weixin.qq.com/?from=openApi',
  //         title: '企业微信官网'
  //       },
  //       {
  //         type: 2,
  //         appid: 'APPID',
  //         pagepath: 'PAGEPATH',
  //         title: '跳转小程序'
  //       }
  //     ],
  //     card_action: {
  //       type: 1,
  //       url: 'https://work.weixin.qq.com/?from=openApi',
  //       appid: 'APPID',
  //       pagepath: 'PAGEPATH'
  //     }
  //   }
  // })
  // console.log(cardRes);
})()
