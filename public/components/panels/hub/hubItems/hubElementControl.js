import React from 'react'
import classNames from 'classnames'
import { getService, getStorage } from 'vc-cake'
import ElementControl from '../../addElement/lib/elementControl'

const hubElementsService = getService('hubElements')
const hubElementsStorage = getStorage('hubElements')
const workspaceStorage = getStorage('workspace')

export default class HubElementControl extends ElementControl {
  constructor (props) {
    super(props)
    this.isHubInWpDashboard = workspaceStorage.state('isHubInWpDashboard').get()

    this.addElement = this.addElement.bind(this)
    this.downloadElement = this.downloadElement.bind(this)
  }

  downloadElement () {
    const { element, onDownloadItem } = this.props
    const localizations = window.VCV_I18N && window.VCV_I18N()
    const errorMessage = localizations.elementDownloadRequiresUpdate || 'Update Visual Composer plugin to the most recent version to download this content element.'

    const allowDownload = onDownloadItem(errorMessage)
    if (allowDownload) {
      hubElementsStorage.trigger('downloadElement', element)
    }
  }

  addElement () {
    this.props.addElement(this.props.element)
  }

  openPremiumTab () {
    window.open(window.VCV_UTM().goPremiumElementDownload)
  }

  render () {
    const { name, element, isDownloading, tag } = this.props
    const { previewVisible, previewStyle } = this.state

    let elementState = 'downloading'
    if (!isDownloading) {
      elementState = typeof hubElementsService.all()[tag] !== 'undefined' ? 'success' : 'inactive'
    }

    const itemElementClasses = classNames({
      'vcv-ui-item-element': true,
      'vcv-ui-item-element-inactive': elementState !== 'success'
    })

    const listItemClasses = classNames({
      'vcv-ui-item-list-item': true,
      'vcv-ui-item-list-item--inactive': false
    })
    const nameClasses = classNames({
      'vcv-ui-item-badge vcv-ui-badge--success': false,
      'vcv-ui-item-badge vcv-ui-badge--warning': false
    })

    const previewClasses = classNames({
      'vcv-ui-item-preview-container': true,
      'vcv-ui-state--visible': previewVisible
    })

    const itemOverlayClasses = classNames({
      'vcv-ui-item-overlay': true,
      'vcv-ui-item-downloading': elementState === 'downloading'
    })

    const publicPathThumbnail = element.metaThumbnailUrl
    const publicPathPreview = element.metaPreviewUrl
    const lockIcon = (!element.allowDownload && elementState === 'inactive') || !window.vcvIsAnyActivated

    const iconClasses = classNames({
      'vcv-ui-item-add': true,
      'vcv-ui-item-add-hub': true,
      'vcv-ui-icon': true,
      'vcv-ui-icon-download': elementState === 'inactive',
      'vcv-ui-wp-spinner-light': elementState === 'downloading',
      'vcv-ui-icon-lock': lockIcon,
      'vcv-ui-icon-add': elementState === 'success' && !this.isHubInWpDashboard
    })

    let action = this.isHubInWpDashboard ? null : this.addElement
    if (elementState !== 'success') {
      if (lockIcon) {
        action = this.openPremiumTab
      } else {
        action = this.downloadElement
      }
    }

    const overlayOutput = <span className={iconClasses} onClick={action} />
    let previewOutput = null

    if (previewVisible) {
      previewOutput = (
        <figure className={previewClasses} style={previewStyle}>
          <img className='vcv-ui-item-preview-image' src={publicPathPreview} alt={name} />
          <figcaption className='vcv-ui-item-preview-caption'>
            <div className='vcv-ui-item-preview-text'>
              {element.metaDescription}
            </div>
          </figcaption>
        </figure>
      )
    }

    return (
      <li className={listItemClasses}>
        <span
          className={itemElementClasses}
          onMouseEnter={this.handleMouseEnterShowPreview}
          onMouseLeave={this.handleMouseLeaveHidePreview}
          title={name}
        >
          <span className='vcv-ui-item-element-content'>
            <img className='vcv-ui-item-element-image' src={publicPathThumbnail} alt={name} />
            <span className={itemOverlayClasses}>
              {overlayOutput}
            </span>
          </span>
          <span className='vcv-ui-item-element-name'>
            <span className={nameClasses}>
              {name}
            </span>
          </span>
          {previewOutput}
        </span>
      </li>
    )
  }
}
