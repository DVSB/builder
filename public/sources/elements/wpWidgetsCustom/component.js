/* global React, vcvAPI, vcCake */
/* eslint no-unused-vars: 0 */
class Component extends vcvAPI.elementComponent {
  state = {
    shortcode: '',
    shortcodeContent: ''
  }

  componentDidMount () {
    this.requestToServer()
  }

  componentDidUpdate (prevProps) {
    let isEqual = require('lodash').isEqual
    if (!isEqual(this.props.atts, prevProps.atts)) {
      this.requestToServer()
    }
  }

  requestToServer () {
    let ajax = vcCake.getService('utils').ajax

    if (this.serverRequest) {
      this.serverRequest.abort()
    }
    let atts = {
      before_title: this.props.atts.atts_before_title,
      after_title: this.props.atts.atts_after_title,
      before_widget: this.props.atts.atts_before_widget,
      after_widget: this.props.atts.atts_after_widget
    }
    this.setState({
      shortcodeContent: '<span class="vcv-ui-icon vcv-ui-wp-spinner"></span>'
    })
    this.serverRequest = ajax({
      'vcv-action': 'elements:widget:adminNonce',
      'vcv-nonce': window.vcvNonce,
      'vcv-widget-key': this.props.atts.widgetKey,
      'vcv-element-tag': this.props.atts.tag,
      'vcv-widget-value': this.props.atts.widget,
      'vcv-atts': atts
    }, (result) => {
      let response = JSON.parse(result.response)
      if (response && response.status) {
        this.setState({
          shortcode: response.shortcode,
          shortcodeContent: response.shortcodeContent || ''
        })
      } else {
        this.setState({
          shortcode: '',
          shortcodeContent: ''
        })
      }
    })
  }

  render () {
    let { id, atts, editor } = this.props
    let { designOptions, customClass, metaCustomId } = atts
    let containerClasses = [ 'vce-widgets-container' ]

    let customProps = {}
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
    if (customClass) {
      containerClasses.push(customClass)
    }
    if (metaCustomId) {
      customProps.id = metaCustomId
    }

    let doAll = this.applyDO('all')

    return (
      <div className={containerClasses.join(' ')} {...customProps} {...editor}>
        <div className='vce vce-widgets-wrapper' id={'el-' + id} {...doAll}>
          <vcvhelper data-vcvs-html={this.state.shortcode || ''}
            dangerouslySetInnerHTML={{ __html: this.state.shortcodeContent || '' }} />
        </div>
      </div>
    )
  }
}
