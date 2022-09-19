const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');

(async () => {
  const headless = true
  const production = true

  const eventId = 16
  const start = new Date("2022-09-10 13:30")
  const duration = 60 // minutes
  const interval = 5   // minutes
  const width = 1920
  const height = 1200

  const base = production ? 'http://live.kriva.org' : 'http://localhost:5000'
  const puppeteerConfig = headless ? '/Applications/Firefox' : {product: 'chrome', headless: false}

  const browser = await puppeteer.launch(puppeteerConfig)
  const page = await browser.newPage();
  await page.setViewport({width: width, height: height})

  const recorderConfig = {
    followNewTab: true,
    fps: 1,
    aspectRatio: '8:5'
  }
  const recorder = new PuppeteerScreenRecorder(page, recorderConfig);
  await recorder.start(`24@${recorderConfig.fps}fps.mp4`);

  console.log('Start')

  for(var offset = 0; offset <= duration; offset = offset + interval) {
    const atTime = new Date(start.getTime() + offset*60000).toUTCString()
    const url = `${base}/live/marathon_dashboards/${eventId}?at_time=${atTime}`

    console.log(`Requesting ${url}`)
    await page.goto(url)
    await page.waitForTimeout(300)
    await page.waitForSelector('footer')
  }

  console.log('End')
  await recorder.stop();
  await browser.close()
})();
