require('dotenv').config()
const { DingRobot } = require('../lib/index.cjs.js') // 也支持 commonjs 模块

const ddRobot = new DingRobot({
  webhook: process.env.DD_WEBHOOK,
  secret: process.env.DD_SECRET
})

;(async () => {
  const txtRes = await ddRobot.text({
    content: '你今天健康打卡了吗❓',
    at: {
      atMobiles: ['xxx'],
      atUserIds: ['xxx'],
      isAtAll: true
    }
  })
  console.log(txtRes)

  //   const mdRes = await ddRobot.markdown({
  //     title: 'From Sentry',
  //     text: `
  // > 【报错项目】yl-club
  // >
  // > 【错误级别】error
  // >
  // > 【错误时间】${new Date().toLocaleDateString()}
  // >
  // > 【错误原因】api request error
  // >
  // > 【错误详情】[click here to view](https://sentry.io/xxx)`
  //   })
  //  console.log(mdRes)

  // const linkRes = await ddRobot.link({
  //   title: '你的周报请查收',
  //   text: '来看看这周有什么好玩的😍',
  //   messageUrl: 'https://news.ycombinator.com/',
  //   picUrl: 'https://raw.githubusercontent.com/starryeve/figure-bed/master/images/202204091627258.png'
  // })
  // console.log(linkRes);

  //   const eCardRes = await ddRobot.entireActionCard({
  //     title: "乔布斯 20 年前想打造一间苹果咖啡厅，而它正是 Apple Store 的前身",
  //     text: `![screenshot](https://gw.alicdn.com/tfs/TB1ut3xxbsrBKNjSZFpXXcXhFXa-846-786.png)
  // ### 乔布斯 20 年前想打造的苹果咖啡厅
  // Apple Store 的设计正从原来满满的科技感走向生活化，而其生活化的走向其实可以追溯到 20 年前苹果一个建立咖啡馆的计划`,
  //     btnOrientation: "0",
  //     singleTitle : "阅读全文",
  //     singleURL : "https://www.dingtalk.com/"
  //   })
  //   console.log(eCardRes);

  // const sCardRes = await ddRobot.singleActionCard({
  //   title: "我 20 年前想打造一间苹果咖啡厅，而它正是 Apple Store 的前身",
  //   text: `![screenshot](https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png) \n\n #### 乔布斯 20 年前想打造的苹果咖啡厅 \n\n Apple Store 的设计正从原来满满的科技感走向生活化，而其生活化的走向其实可以追溯到 20 年前苹果一个建立咖啡馆的计划`,
  //   btnOrientation: "0",
  //   btns: [
  //       {
  //           title: "内容不错",
  //           actionURL: "https://www.dingtalk.com/"
  //       },
  //       {
  //           title: "不感兴趣",
  //           actionURL: "https://www.dingtalk.com/"
  //       }
  //   ]
  // })
  // console.log(sCardRes);

  // const feedRes = await ddRobot.feedCard({
  //   links: [
  //     {
  //         title: "时代的火车向前开1",
  //         messageURL: "https://www.dingtalk.com/",
  //         picURL: "https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png"
  //     },
  //     {
  //         title: "时代的火车向前开2",
  //         messageURL: "https://www.dingtalk.com/",
  //         picURL: "https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png"
  //     }
  // ]
  // })
  // console.log(feedRes);
})()
