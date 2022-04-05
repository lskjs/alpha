
import normalize from '../../../mdurl/encode'
import {revert} from '../revert'
import {all} from '../traverse'

/**
 * @type {Handler}
 * @param {LinkReference} node
 */
export function linkReference(h, node) {
  const def = h.definition(node.identifier)

  if (!def) {
    return revert(h, node)
  }

  /** @type {Properties} */
  const props = {href: normalize(def.url || '')}

  if (def.title !== null && def.title !== undefined) {
    props.title = def.title
  }

  return h(node, 'a', props, all(h, node))
}
