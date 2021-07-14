const fs = require('fs')
const path = require('path')

module.exports = function resolveRoute(root) {
    let result = []
    root = root || path.resolve(__dirname, '../router')
    fs.readdirSync(root).forEach(x => {
        const path = `${root}\\${x}`
        const isDir = fs.statSync(path).isDirectory()
        if (isDir) {
            result = result.concat(resolveRoute(path))
        } else {
            result.push(path)
        }
    })
    return result
}