import { copyFile } from 'fs/promises'
import fs from 'fs'
import { resolve } from 'path'
import { marked } from 'marked'

type MdImageNode = marked.Tokens.Image
interface Config {
  imgDist: string
  folderLink?: string
}
export function convertor(source: string, config: Config) {
  const imageNodes: MdImageNode[] = []

  // walk all tokens to find all image node
  const walkTokens = (token: marked.Token) => {
    if (token.type === 'image')
      imageNodes.push(token)
  }

  marked.use({ walkTokens })

  marked.parse(source)
  const folderLink = config?.folderLink
  const imgDist = config.imgDist
  let res = source
  for (const item of imageNodes) {
    // in case of space in path
    const originFilePath = item.href.replace(' ', '%20')
    const fileName = item.text
    const extension = getExtension(item.href)
    if (fs.existsSync(originFilePath)) {
      copy(originFilePath, imgDist, fileName, extension)
      if (folderLink)
        res = res.replace(item.href, `${folderLink}/${fileName}.${extension}`)
    }
  }
  return res
}
function copy(originFilePath: string, dist: string, fileName: string, extension: string) {
  try {
    if (!fs.existsSync(dist))
      fs.mkdirSync(dist)
    copyFile(originFilePath, resolve(`${dist}/${fileName}.${extension}`)).catch((e) => {
      console.warn(e)
    })
  }
  catch (error) {
    return error
  }
}
function getExtension(fileName = '') {
  return fileName.substring(fileName.lastIndexOf('.') + 1)
}
