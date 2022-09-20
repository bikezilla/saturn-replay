const puppeteer = require('puppeteer');

(async () => {
  const production = true

  const eventId = 12
  const start = new Date("2021-09-11 13:00")
  const duration = 1441 // minutes
  const interval = 1   // minutes
  const width = 1920
  const height = 1200

  const base = production ? 'http://live.kriva.org' : 'http://localhost:5000'
  const puppeteerConfig = {product: 'chrome', headless: true}

  const browser = await puppeteer.launch(puppeteerConfig)
  const page = await browser.newPage();
  await page.setViewport({width: width, height: height})

  console.log('Start')

  for(var offset = 0; offset <= duration; offset = offset + interval) {
    const atTime = new Date(start.getTime() + offset*60000)
    const url = `${base}/live/marathon_dashboards/${eventId}?at_time=${atTime.toUTCString()}`

    console.log(`Requesting ${url}`)
    await page.goto(url, {waitUntil: 'domcontentloaded'})
    await page.screenshot({path: `images/${atTime.getTime()}.jpg`, type: 'jpeg', quality: 100})
  }

  console.log('End')
  await browser.close()
})();
