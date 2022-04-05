
import {all} from '../traverse'

/**
 * @type {Handler}
 * @param {Emphasis} node
 */
export function emphasis(h, node) {
  return h(node, 'em', all(h, node))
}
