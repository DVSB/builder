import React from 'react'
import vcCake from 'vc-cake'
const vcvAPI = vcCake.getService('api')

export default class RowElement extends vcvAPI.elementComponent {
  render () {
    let { id, atts, editor } = this.props
    let { customClass, rowWidth, removeSpaces, columnGap, fullHeight, metaCustomId, equalHeight, columnPosition, contentPosition, designOptionsAdvanced, layout } = atts
    let content = this.props.children

    let classes = [ 'vce-row' ]

    classes.push(this.getBackgroundClass(designOptionsAdvanced))
    classes.push(`vce-row--col-gap-${columnGap ? parseInt(columnGap) : 0}`)
    if (layout && layout.reverseColumn) {
      classes.push('vce-row-wrap--reverse')
    }
    let customProps = {
      style: {}
    }
    let customRowProps = {
      style: {}
    }
    let containerProps = {}
    const classNames = require('classnames')
    if (typeof customClass === 'string' && customClass) {
      classes.push(customClass)
    }

    if (rowWidth === 'stretchedRow' || rowWidth === 'stretchedRowAndColumn') {
      customRowProps[ 'data-vce-full-width' ] = true
    } else {
      customRowProps.style.width = ''
      customRowProps.style.left = ''
      customProps.style.paddingLeft = ''
      customProps.style.paddingRight = ''
    }

    if (rowWidth === 'stretchedRowAndColumn') {
      customRowProps[ 'data-vce-stretch-content' ] = true
    }

    if (rowWidth === 'stretchedRowAndColumn' && removeSpaces) {
      classes.push('vce-row-no-paddings')
    }

    if (fullHeight) {
      classes.push('vce-row-full-height')
    } else {
      customRowProps.style.minHeight = ''
    }

    if (equalHeight && columnPosition !== 'stretch') {
      classes.push('vce-row-equal-height')
    }

    if (columnPosition) {
      classes.push(`vce-row-columns--${columnPosition}`)
    }

    if (contentPosition) {
      classes.push(`vce-row-content--${contentPosition}`)
    }

    let className = classNames(classes)

    if (metaCustomId) {
      containerProps.id = metaCustomId
    }

    let doAll = this.applyDO('all')

    return <div className='vce-row-container' {...containerProps}>
      <div className={className} {...customRowProps} {...editor} id={'el-' + id} {...doAll}>
        {this.getBackgroundTypeContent()}
        <div className='vce-row-content' {...customProps}>
          {content}
        </div>
      </div>
    </div>
  }
}
