import {caseSensitiveTransform} from './case-sensitive-transform'

export function caseInsensitiveTransform(attributes, property) {
  return caseSensitiveTransform(attributes, property.toLowerCase())
}
