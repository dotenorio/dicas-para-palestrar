const {
  readdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
  existsSync,
  mkdirSync
} = require('fs')
const { extname, join } = require('path')
const md2html = require('marked')
const dir = './'
const dirHtml = './docs'

function replaceExtMd (string) {
  return string.replace(/.md/g, '.html')
}

if (!existsSync(dirHtml)) {
  mkdirSync(dirHtml)
} else {
  const files = readdirSync(dirHtml)
  files.forEach((file) => {
    const pathUnlink = join(dirHtml, file)
    unlinkSync(pathUnlink)
  })
}

const files = readdirSync(dir)
files.filter((file) => {
  return extname(file) === '.md'
}).forEach((file) => {
  const content = replaceExtMd(readFileSync(file).toString())
  const newContent = md2html(content)
  let fileHtml = replaceExtMd(file)
  if (fileHtml === 'README.html') {
    fileHtml = 'index.html'
  }
  writeFileSync(join(dirHtml, fileHtml), newContent)
})
