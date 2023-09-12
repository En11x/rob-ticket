const base = require('./base')

async function run() {
  try {
    base.init()
  } catch (error) {
    console.log(error)
  }
}

run()
