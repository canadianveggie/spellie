const { isMobileBrowser } = require("../public/mobileCheck");

describe("mobileCheck", () => {
  it("isMobileBrowser", () => {
    const chromeWindows =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36";
    const chromeMacos =
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.80 Safari/537.36";
    const safariIos =
      "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1";
    const safariMacos =
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Safari/605.1.15";
    expect(isMobileBrowser(chromeWindows)).toBe(false);
    expect(isMobileBrowser(chromeMacos)).toBe(false);
    expect(isMobileBrowser(safariIos)).toBe(true);
    expect(isMobileBrowser(safariMacos)).toBe(false);
  });
});
