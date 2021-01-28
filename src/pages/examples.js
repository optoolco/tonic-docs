import fs from 'node:fs/promises'
import path from 'node:path'

import Tonic from 'tonic-ssr'
import head from './mixins/head.js'

const base = path.join('..', 'markdown', 'components')
const __dirname = path.dirname(import.meta.url).replace('file:', '')

class ExamplePage extends Tonic {
  async getComponentDocs () {
    const dir = path.join(__dirname, base)
    const files = await fs.readdir(dir)
    return files.map(file => ({
      name: file.replace('.md', ''),
      path: path.join(dir, file)
    }))
  }

  renderTableOfContents (files) {
    const html = []

    for (const file of files) {
      html.push(this.html`
        <a href="#${file.name}">
          ${file.name}
        </a>
      `)
    }

    return html
  }

  renderFiles (files) {
    const html = []

    for (const file of files) {
      html.push(this.html`
        <markdown-module src="${file.path}">
        </markdown-module>
      `)
    }

    return html
  }

  async render () {
    const files = await this.getComponentDocs()

    const toc = this.renderTableOfContents(files)
    const content = this.renderFiles(files)

    return this.html`
      <!DOCTYPE html>

      <html>
        <head>
          ${Tonic.unsafeRawString(head({
            title: 'Tonic - Component Examples',
            description: 'Component Examples',
            siteName: 'Tonic Framework',
            image: 'https://optoolco.github.io/components/tonic_preview.png',
            url: 'https://tonic.technology'
          }))}

          <style-module src="src/styles/index.less">
          </style-module>
        </head>

        <tonic-sprite>
        </tonic-sprite>

        <body>
          <aside>
            <toc-nav>
              <a class="logo" href="/">
                <svg>
                  <use xlink:href="images/logo.svg#tonic_logo">
                </svg>
              </a>

              ${toc}

            </toc-nav>
          </aside>

          <main>
            <a class="logo" href="https://github.com/optoolco/tonic">
              <svg>
                <use xlink:href="images/logo.svg#tonic_logo">
              </svg>
            </a>

            ${content}

          </main>

          <js-bundle
            src="./src/index.client.js"
            dest="./build/bundle.js"
            url="/bundle.js"
            minify=${true}
            format="esm"
            minify-whitespace=${true}
            keep-names=${true}
            sourcemap="inline">
          </js-bundle>

        </body>
      </html>
    `
  }
}

export default ExamplePage