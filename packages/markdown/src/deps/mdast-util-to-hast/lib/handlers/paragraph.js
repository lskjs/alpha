
import {all} from '../traverse'

/**
 * @type {Handler}
 * @param {Paragraph} node
 */
export function paragraph(h, node) {
  return h(node, 'p', all(h, node))
}
