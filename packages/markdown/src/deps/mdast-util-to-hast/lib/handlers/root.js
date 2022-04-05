
import {u} from '../../../unist-builder'
import {all} from '../traverse'
import {wrap} from '../wrap'

/**
 * @type {Handler}
 * @param {Root} node
 */
export function root(h, node) {
  // @ts-expect-error `root`s are also fine.
  return h.augment(node, u('root', wrap(all(h, node))))
}
