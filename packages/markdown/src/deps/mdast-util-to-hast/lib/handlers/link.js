
import normalize from '../../../mdurl/encode'
import {all} from '../traverse'

/**
 * @type {Handler}
 * @param {Link} node
 */
export function link(h, node) {
  /** @type {Properties} */
  const props = {href: normalize(node.url)}

  if (node.title !== null && node.title !== undefined) {
    props.title = node.title
  }

  return h(node, 'a', props, all(h, node))
}
