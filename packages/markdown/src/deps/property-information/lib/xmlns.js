import {create} from './util/create'
import {caseInsensitiveTransform} from './util/case-insensitive-transform'

export const xmlns = create({
  space: 'xmlns',
  attributes: {xmlnsxlink: 'xmlns:xlink'},
  transform: caseInsensitiveTransform,
  properties: {xmlns: null, xmlnsXLink: null}
})
