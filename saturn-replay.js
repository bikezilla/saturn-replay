const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');

(async () => {
  const browser = await puppeteer.launch('/Applications/Firefox.app/');

  const page = await browser.newPage();
  await page.setViewport({width: 1920, height: 1200})

  const config = {
    followNewTab: true,
    fps: 1,    
    aspectRatio: '8:5'
  }
  const recorder = new PuppeteerScreenRecorder(page, config);
  await recorder.start(`24@${config.fps}fps.mp4`);

  console.log('start')
  const interval = 1   // minutes
    const start = new Date("2021-09-11 12:59")    

    for(var offset = 0; offset <= 1441; offset = offset + interval) {
      const atTime = new Date(start.getTime() + offset*60000).toUTCString()

      await page.goto(`http://localhost:5000/live/marathon_dashboards/12?at_time=${atTime}`)          
      await page.waitForTimeout(300)
      await page.waitForSelector('footer')      
    
    } 

  console.log('end')
  await recorder.stop();
  await browser.close()
})();