import { resolve } from 'path'
import { describe, expect, it } from 'vitest'
import { convertor } from '../src'
const str = `
![image-20220921105317781](/Users/duanjipeng/Desktop/leetcode/assets/image-20220921105317781.png)
`
describe('should', () => {
  it('exported', () => {
    const res = convertor(str, { imgDist: resolve(__dirname, 'assets'), folderLink: 'https://raw.githubusercontent.com/kitiho/leetcode/main/assets' })
    expect(res).toMatchInlineSnapshot(`
      "
      ![image-20220921105317781](https://raw.githubusercontent.com/kitiho/leetcode/main/assets/image-20220921105317781.png)
      "
    `)
  })
})
