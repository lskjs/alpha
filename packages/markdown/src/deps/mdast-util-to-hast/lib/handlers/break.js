
import {u} from '../../../unist-builder'

/**
 * @type {Handler}
 * @param {Break} node
 * @returns {Array<Element|Text>}
 */
export function hardBreak(h, node) {
  return [h(node, 'br'), u('text', '\n')]
}
