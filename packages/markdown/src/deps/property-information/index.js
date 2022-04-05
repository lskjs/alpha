import {merge} from './lib/util/merge'
import {xlink} from './lib/xlink'
import {xml} from './lib/xml'
import {xmlns} from './lib/xmlns'
import {aria} from './lib/aria'
import {html as htmlBase} from './lib/html'
import {svg as svgBase} from './lib/svg'

export {find} from './lib/find'
export {hastToReact} from './lib/hast-to-react'
export {normalize} from './lib/normalize'
export const html = merge([xml, xlink, xmlns, aria, htmlBase], 'html')
export const svg = merge([xml, xlink, xmlns, aria, svgBase], 'svg')
