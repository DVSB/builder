/* global React, vcvAPI */
class Component extends vcvAPI.elementComponent {
  render () {
    let classes = 'vce-features'
    let { atts, editor, id } = this.props
    let { iconPicker, iconUrl, shape, iconAlignment, size, customClass, designOptions, toggleCustomHover, metaCustomId } = atts
    let customProps = {}
    let containerProps = {}
    let customIconProps = {}
    let CustomTag = 'div'
    let CustomIconTag = 'span'
    let { url, title, targetBlank, relNofollow } = iconUrl
    let iconClasses = `vce-icon-container ${iconPicker.icon}`

    if (url) {
      if (shape !== 'none') {
        CustomTag = 'a'
        customProps = {
          'href': url,
          'title': title,
          'target': targetBlank ? '_blank' : undefined,
          'rel': relNofollow ? 'nofollow' : undefined
        }
      } else {
        CustomIconTag = 'a'
        customIconProps = {
          'href': url,
          'title': title,
          'target': targetBlank ? '_blank' : undefined,
          'rel': relNofollow ? 'nofollow' : undefined
        }
      }
    } else {
      CustomTag = 'div'
      CustomIconTag = 'span'
    }

    if (shape) {
      classes += ` vce-features--style-${shape}`
    }

    if (iconAlignment) {
      classes += ` vce-features--align-${iconAlignment}`
    }

    if (size) {
      classes += ` vce-features--size-${size}`
    }

    if (designOptions.device) {
      let animations = []
      Object.keys(designOptions.device).forEach((device) => {
        let prefix = (device === 'all') ? '' : device
        if (designOptions.device[ device ].animation) {
          if (prefix) {
            prefix = `-${prefix}`
          }
          animations.push(`vce-o-animate--${designOptions.device[ device ].animation}${prefix}`)
        }
      })
      if (animations.length) {
        customProps[ 'data-vce-animate' ] = animations.join(' ')
      }
    }

    if (typeof customClass === 'string' && customClass) {
      classes += ' ' + customClass
    }

    let mixinData = this.getMixinData('iconColor')

    if (mixinData) {
      classes += ` vce-icon--style--icon-color-${mixinData.selector}`
    }

    mixinData = this.getMixinData('shapeColor')

    if (mixinData) {
      classes += ` vce-icon--style--shape-color-${mixinData.selector}`
    }

    mixinData = this.getMixinData('iconColorHover')

    if (mixinData && toggleCustomHover) {
      classes += ` vce-icon--style--icon-color-hover-${mixinData.selector}`
    }

    mixinData = this.getMixinData('shapeColorHover')

    if (mixinData && toggleCustomHover) {
      classes += ` vce-icon--style--shape-color-hover-${mixinData.selector}`
    }
    if (metaCustomId) {
      containerProps.id = metaCustomId
    }

    let doAll = this.applyDO('all')

    return <div className={classes} {...editor} {...containerProps}>
      <div id={'el-' + id} className='vce vce-features-icon-wrapper' {...doAll}>
        <CustomTag className='vce-features__icon vce-icon' {...customProps}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 769 769'>
            <path strokeWidth='40' d='M565.755 696.27h-360l-180-311.77 180-311.77h360l180 311.77z' />
          </svg>
          <CustomIconTag className={iconClasses} {...customIconProps} />
        </CustomTag>
      </div>
    </div>
  }
}

