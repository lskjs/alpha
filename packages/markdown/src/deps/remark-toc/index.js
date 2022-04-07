import { toc as util } from '../mdast-util-toc';

function toc(options) {
  const settings = options || {};

  return transformer;

  function transformer(node) {
    const result = util(node, { ...settings, heading: settings.heading || 'toc|table[ -]of[ -]contents?' });

    if (result.index === null || result.index === -1 || !result.map) {
      return;
    }

    node.children = [].concat(node.children.slice(0, result.index), result.map, node.children.slice(result.endIndex));
  }
}

module.exports = toc;
