const { chromium } = require('playwright')

const LOGIN_URL = 'https://passport.damai.cn/login'
const TARGET_URL =
  'https://m.damai.cn/damai/detail/item.html?itemId=721607606095'

const START_TIME = '2023-7-2 12:07:00'

const USERS = ['p', 'y']

const main = async () => {
  try {
    const browser = await chromium.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto(LOGIN_URL)

    setTimeout(async () => {
      await buy()
    }, 30 * 1000)
  } catch (error) {
    console.log('--------error-------', error)
  }
}

const buy = async (page) => {
  try {
    await page.goto(TARGET_URL)
    let now = Date.now()
    while (now < new Date(START_TIME).getTime()) {
      now = Date.now()
    }
    await page.reload()

    const buyButton = await page.$('.buy__button__text')
    if (!buyButton) {
      await page.$('text = "刷新一下"').click()
    }
    await buyButton.click()

    await page.waitForSelector('.sku-tickets-card')
    const chooses = await page.$$('.sku-tickets-card .bui-dm-sku-card-item-box')

    let hasTitcketButton = null

    for (let index = 0; index < chooses.length; index++) {
      const div = chooses[index]
      const tag = await div.$$('.item-tag-outer')
      if (!tag.length) {
        hasTitcketButton = div
      }
    }

    await hasTitcketButton.click()

    await page.waitForSelector('.number-edit-bg')
    const add = (await page.$$('.number-edit-bg'))[1]
    for (let index = 0; index < USERS.length - 1; index++) {
      await add.click()
    }
    const [price, total] = await Promise.all([
      page.$('.price-text'),
      page.$('.number-info .total'),
    ])
    console.info(
      `------------------${await total.innerText()} ${await price.innerText()}----------------------`
    )

    const submit = await page.$('.sku-footer-bottom .sku-footer-buy-button')
    await submit.click()

    await page.waitForSelector('.icondanxuan-weixuan_')
    const selectUsers = await page.$$('.icondanxuan-weixuan_')
    for (let index = 0; index < selectUsers.length; index++) {
      const element = selectUsers[index]
      await element.click()
    }
    await page.click('span :text("提交订单")')
  } catch (error) {
    console.error('---------error--------', error)
  }
}

main()
