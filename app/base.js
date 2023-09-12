const wd = require('wd')
const driver = wd.promiseChainRemote({
  host:'127.0.0.1',
  port:4723,
  path:"/wd/hub"
})

const capabilities = {
  platformName: 'Android',
  platformVersion: '12',
  deviceName: 'Android Emulator',
  app:'',
  automationName:'UiAutomator2',
}

class Base{
  init(){
    return driver.init(capabilities)
  }
}

module.exports = new Base()
