const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  try {
    await page.goto('https://www.marketwatch.com/investing/index/vix');
    const vix = await page.innerText('.intraday__price .last-value');
    const data = {
      MKT: {
        vix: parseFloat(vix),
        lastUpdated: new Date().toLocaleString('de-DE')
      },
      prices: Array.from({length: 50}, () => 1.08 + Math.random() * 0.01)
    };
    fs.writeFileSync('market_data.json', JSON.stringify(data, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
  }
})();
