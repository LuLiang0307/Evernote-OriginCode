const fs = require('fs')
const path = require('path')

// const mockBaseURL = 'http://localhost:3000'
const mockBaseURL = 'https://note-server.hunger-valley.com' //开发
const realBaseURL = 'https://note-server.hunger-valley.com' //发布

exports.config = function({ isDev = true } = { isDev: true }) { //当isDev没有被赋值时，默认为true
    let fileTxt = `
    module.exports = {
      baseURL: '${isDev ? mockBaseURL : realBaseURL}'
    }
    `
    fs.writeFileSync(path.join(__dirname, '../src/helpers/config-baseURL.js'), fileTxt)
}