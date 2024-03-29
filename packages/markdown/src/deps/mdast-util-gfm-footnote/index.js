/**
 * @typedef {import('mdast').FootnoteReference} FootnoteReference
 * @typedef {import('mdast').FootnoteDefinition} FootnoteDefinition
 * @typedef {import('mdast-util-from-markdown').Extension} FromMarkdownExtension
 * @typedef {import('mdast-util-from-markdown').Handle} FromMarkdownHandle
 * @typedef {import('mdast-util-to-markdown').Options} ToMarkdownExtension
 * @typedef {import('mdast-util-to-markdown').Handle} ToMarkdownHandle
 * @typedef {import('mdast-util-to-markdown').Map} Map
 */

import {normalizeIdentifier} from '../micromark-util-normalize-identifier'
import {association} from '../mdast-util-to-markdown/lib/util/association.js'
import {containerFlow} from '../mdast-util-to-markdown/lib/util/container-flow.js'
import {indentLines} from '../mdast-util-to-markdown/lib/util/indent-lines.js'
import {safe} from '../mdast-util-to-markdown/lib/util/safe.js'
import {track} from '../mdast-util-to-markdown/lib/util/track.js'

/**
 * @returns {FromMarkdownExtension}
 */
export function gfmFootnoteFromMarkdown() {
  return {
    enter: {
      gfmFootnoteDefinition: enterFootnoteDefinition,
      gfmFootnoteDefinitionLabelString: enterFootnoteDefinitionLabelString,
      gfmFootnoteCall: enterFootnoteCall,
      gfmFootnoteCallString: enterFootnoteCallString
    },
    exit: {
      gfmFootnoteDefinition: exitFootnoteDefinition,
      gfmFootnoteDefinitionLabelString: exitFootnoteDefinitionLabelString,
      gfmFootnoteCall: exitFootnoteCall,
      gfmFootnoteCallString: exitFootnoteCallString
    }
  }

  /** @type {FromMarkdownHandle} */
  function enterFootnoteDefinition(token) {
    this.enter(
      {type: 'footnoteDefinition', identifier: '', label: '', children: []},
      token
    )
  }

  /** @type {FromMarkdownHandle} */
  function enterFootnoteDefinitionLabelString() {
    this.buffer()
  }

  /** @type {FromMarkdownHandle} */
  function exitFootnoteDefinitionLabelString(token) {
    const label = this.resume()
    const node = /** @type {FootnoteDefinition} */ (
      this.stack[this.stack.length - 1]
    )
    node.label = label
    node.identifier = normalizeIdentifier(
      this.sliceSerialize(token)
    ).toLowerCase()
  }

  /** @type {FromMarkdownHandle} */
  function exitFootnoteDefinition(token) {
    this.exit(token)
  }

  /** @type {FromMarkdownHandle} */
  function enterFootnoteCall(token) {
    this.enter({type: 'footnoteReference', identifier: '', label: ''}, token)
  }

  /** @type {FromMarkdownHandle} */
  function enterFootnoteCallString() {
    this.buffer()
  }

  /** @type {FromMarkdownHandle} */
  function exitFootnoteCallString(token) {
    const label = this.resume()
    const node = /** @type {FootnoteDefinition} */ (
      this.stack[this.stack.length - 1]
    )
    node.label = label
    node.identifier = normalizeIdentifier(
      this.sliceSerialize(token)
    ).toLowerCase()
  }

  /** @type {FromMarkdownHandle} */
  function exitFootnoteCall(token) {
    this.exit(token)
  }
}

/**
 * @returns {ToMarkdownExtension}
 */
export function gfmFootnoteToMarkdown() {
  footnoteReference.peek = footnoteReferencePeek

  return {
    // This is on by default already.
    unsafe: [{character: '[', inConstruct: ['phrasing', 'label', 'reference']}],
    handlers: {footnoteDefinition, footnoteReference}
  }

  /**
   * @type {ToMarkdownHandle}
   * @param {FootnoteReference} node
   */
  function footnoteReference(node, _, context, safeOptions) {
    const tracker = track(safeOptions)
    let value = tracker.move('[^')
    const exit = context.enter('footnoteReference')
    const subexit = context.enter('reference')
    value += tracker.move(
      safe(context, association(node), {
        ...tracker.current(),
        before: value,
        after: ']'
      })
    )
    subexit()
    exit()
    value += tracker.move(']')
    return value
  }

  /** @type {ToMarkdownHandle} */
  function footnoteReferencePeek() {
    return '['
  }

  /**
   * @type {ToMarkdownHandle}
   * @param {FootnoteDefinition} node
   */
  function footnoteDefinition(node, _, context, safeOptions) {
    const tracker = track(safeOptions)
    let value = tracker.move('[^')
    const exit = context.enter('footnoteDefinition')
    const subexit = context.enter('label')
    value += tracker.move(
      safe(context, association(node), {
        ...tracker.current(),
        before: value,
        after: ']'
      })
    )
    subexit()
    value += tracker.move(
      ']:' + (node.children && node.children.length > 0 ? ' ' : '')
    )
    tracker.shift(4)
    value += tracker.move(
      indentLines(containerFlow(node, context, tracker.current()), map)
    )
    exit()

    return value

    /** @type {Map} */
    function map(line, index, blank) {
      if (index) {
        return (blank ? '' : '    ') + line
      }

      return line
    }
  }
}
