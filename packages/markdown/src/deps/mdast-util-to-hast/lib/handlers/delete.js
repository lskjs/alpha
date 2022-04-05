
import {all} from '../traverse'

/**
 * @type {Handler}
 * @param {Delete} node
 */
export function strikethrough(h, node) {
  return h(node, 'del', all(h, node))
}
