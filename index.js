const { chromium, BrowserContext } = require("playwright")
const randomNames = require("random-name")
const { sha512_224 } = require("js-sha512")
const fs = require("fs")

async function addCookie (ctx, cookie, url) {
    var cookies = cookie.split("; ")
    cookies.forEach(element => {
        var split = element.split("=")
        ctx.addCookies([{ name: split[0], value: split[1], url: url }])
    });
}



const create = async () => {
    const browser = await chromium.launch({
        headless: false,
        args: ["--incognito"]
    })

    const page = await browser.newPage()
    const ctx = await page.context()
    await ctx.addCookies([{ name: "__playwright", value: "true", url: "https://accounts.google.com" }])
    await addCookie(ctx, 'APISID=HYmtyxSZGqeEmkgG/APrEQsHErn9CFohcf; SAPISID=sVY94s-laoxW4t0g/Au9LkrFZ8vy4I70Im; __Secure-1PAPISID=sVY94s-laoxW4t0g/Au9LkrFZ8vy4I70Im; __Secure-3PAPISID=sVY94s-laoxW4t0g/Au9LkrFZ8vy4I70Im; SEARCH_SAMESITE=CgQI-ZUB; OTZ=6608339_80_84_104220_80_446880; SID=Mwi6UnlbHuKBzWSRcW1Zu1VwRW_HnmfahGqLbW5pBIWPhA7UcqoCCgTj8Wshs7iH4OoV3w.; 1P_JAR=2022-08-04-01; OGPC=19027681-1:19022552-1:577841152-2:19030427-1:; SIDCC=AEf-XMS-snxDO4cTcgLRsQ-zTsWukgcywIUxTxMFDPnGgfiV6s_uWBos7XgT7OPW4quhZqTi97E', "https://.google.com")
    const infoDict = [randomNames.first(), randomNames.last(), ("@#$" + sha512_224(randomNames.first() + randomNames.last() + Math.random() + Math.random())).substring(0, 10)]

    await page.goto("https://accounts.google.com/signup/v2/webcreateaccount?continue=https%3A%2F%2Faccounts.google.com%2FManageAccount%3Fnc%3D1&dsh=S-2046073998%3A1659575107246983&biz=false&flowName=GlifWebSignIn&flowEntry=SignUp")
    await page.waitForLoadState("domcontentloaded")
    
    await page.click("css=body", { button: "right", delay: 1500 })

    await page.locator("css=#firstName").click()
    await page.locator("css=#firstName").type(infoDict[0], { delay: 20 })

    await page.locator("css=#lastName").type(infoDict[1], { delay: 20 })
    await page.locator("css=#lastName").click()
    
    await page.locator("css=#username").click()
    await page.locator("css=#username").type(infoDict[0] + (Math.random() * 100).toFixed(4), { delay: 20 })
    
    await page.locator("css=[name=Passwd]").click()
    await page.locator("css=[name=Passwd]").type(infoDict[2], { delay: 20 })

    await page.locator("css=[name=ConfirmPasswd]").click()
    await page.locator("css=[name=ConfirmPasswd]").type(infoDict[2], { delay: 20 })

    //await page.locator("css=button:has-text('Next')").click()

    await require("timers/promises").setTimeout(1500)

    //var buff = await page.screenshot({ path: "ss.png", fullPage: true })


    //await browser.close()
    console.log("done")
}
create()