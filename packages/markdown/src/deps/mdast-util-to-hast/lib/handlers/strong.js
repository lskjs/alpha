
import {all} from '../traverse'

/**
 * @type {Handler}
 * @param {Strong} node
 */
export function strong(h, node) {
  return h(node, 'strong', all(h, node))
}
