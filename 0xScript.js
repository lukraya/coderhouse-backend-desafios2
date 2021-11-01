//No funciona

const zeroEks = require('/Users/user/AppData/Roaming/npm/node_modules/0x')
const path = require('path')

async function capture () {
  const opts = {
    argv: [path.join(__dirname, 'index.js'), /* '--my-flag', '"value for my flag"' */],
    workingDir: __dirname
  }
  try {
    const file = await zeroEks(opts)
    console.log(`flamegraph in ${file}`)
  } catch (e) {
    console.error(e)
  }
}

capture()