
import {all} from '../traverse'

/**
 * @type {Handler}
 * @param {Heading} node
 */
export function heading(h, node) {
  return h(node, 'h' + node.depth, all(h, node))
}
