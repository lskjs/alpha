import {blockquote} from './blockquote'
import {hardBreak} from './break'
import {code} from './code'
import {strikethrough} from './delete'
import {emphasis} from './emphasis'
import {footnoteReference} from './footnote-reference'
import {footnote} from './footnote'
import {heading} from './heading'
import {html} from './html'
import {imageReference} from './image-reference'
import {image} from './image'
import {inlineCode} from './inline-code'
import {linkReference} from './link-reference'
import {link} from './link'
import {listItem} from './list-item'
import {list} from './list'
import {paragraph} from './paragraph'
import {root} from './root'
import {strong} from './strong'
import {table} from './table'
import {text} from './text'
import {thematicBreak} from './thematic-break'

export const handlers = {
  blockquote,
  break: hardBreak,
  code,
  delete: strikethrough,
  emphasis,
  footnoteReference,
  footnote,
  heading,
  html,
  imageReference,
  image,
  inlineCode,
  linkReference,
  link,
  listItem,
  list,
  paragraph,
  root,
  strong,
  table,
  text,
  thematicBreak,
  toml: ignore,
  yaml: ignore,
  definition: ignore,
  footnoteDefinition: ignore
}

// Return nothing for nodes that are ignored.
function ignore() {
  return null
}
