import React from 'react'
import Attribute from '../attribute'
import lodash from 'lodash'
import WpbakeryModal from './lib/wpbakeryModal'
import './lib/styles/init.less'

class WpbakeryEditForm extends Attribute {
  static defaultState = {
    showEditor: false,
    loadingEditor: false
  }

  updateState (props) {
    let newState = lodash.defaultsDeep({}, props, WpbakeryEditForm.defaultState)

    return newState
  }

  showEditor (e) {
    e && e.preventDefault && e.preventDefault()
    this.setState({ showEditor: true, loadingEditor: true })
  }

  editorIframeLoaded (e) {
    let ifrWin = this.refs.iframeRef.contentWindow
    if (!ifrWin.vc) {
      window.alert('Failed to load WPBakery Edit Form, please check WPBakery Page Builder Plugin.')
      this.close()
    }
    let preModel = ifrWin.vc.storage.parseContent([], this.state.value)
    // eslint-disable-next-line new-cap
    let model = new ifrWin.vc.shortcode(preModel[ 0 ])
    ifrWin.vc.edit_element_block_view.on('afterRender', () => {
      let $saveBtn = ifrWin.vc.edit_element_block_view.$el.find('[data-vc-ui-element="button-save"]').hide()
      let $newSaveBtn = ifrWin.jQuery(`<span class="vc_general vc_ui-button vc_ui-button-action vc_ui-button-shape-rounded vc_ui-button-fw" data-vc-ui-element="button-save-custom"></span>`)
      $newSaveBtn.text($saveBtn.text())
      $newSaveBtn.insertAfter($saveBtn)
      $newSaveBtn.click(this.save.bind(this))
      this.setState({
        loadingEditor: false
      })
    })
    ifrWin.vc.edit_element_block_view.on('save', this.save.bind(this))
    ifrWin.vc.edit_element_block_view.on('hide', this.close.bind(this))
    ifrWin.vc.edit_element_block_view.render(model)
  }

  close () {
    this.setState({
      showEditor: false
    })
  }

  save () {
    let ifrWin = this.refs.iframeRef.contentWindow
    const editForm = ifrWin.vc.edit_element_block_view
    const tag = editForm.model.get('shortcode')
    let params = editForm.getParams()
    let mergedParams = ifrWin._.extend({}, ifrWin.vc.getMergedParams(tag, params))
    if (!ifrWin._.isUndefined(params.content)) {
      mergedParams.content = params.content
    }
    const mapped = ifrWin.vc.getMapped(tag)

    const isContainer = ifrWin._.isObject(mapped) && ((ifrWin._.isBoolean(mapped.is_container) && mapped.is_container === true) || !ifrWin._.isEmpty(
      mapped.as_parent))
    const data = {
      tag: tag,
      attrs: mergedParams,
      content: mergedParams.content || '',
      type: ifrWin._.isUndefined(ifrWin.vc.getParamSettings(tag, 'content')) && !isContainer ? 'single' : ''
    }

    this.setFieldValue(ifrWin.wp.shortcode.string(data))
    this.close()
  }

  render () {
    let { value, loadingEditor } = this.state
    let loadingOverlay = null
    if (loadingEditor) {
      loadingOverlay = (
        <div className='vcv-loading-overlay'>
          <div className='vcv-loading-dots-container'>
            <div className='vcv-loading-dot vcv-loading-dot-1' />
            <div className='vcv-loading-dot vcv-loading-dot-2' />
          </div>
        </div>
      )
    }
    return (
      <React.Fragment>
        <textarea className='vcv-ui-form-input' value={value} onChange={this.handleChange.bind(this)} />
        {this.state.showEditor ? <WpbakeryModal>
          <div className='vcv-wpbakery-edit-form-modal-inner'>
            {loadingOverlay}
            <iframe ref='iframeRef' src='https://vcwb.ngrok.thq.lv/wp-admin/post-new.php?post_type=vcv-wpb-attribute' onLoad={this.editorIframeLoaded.bind(this)} />
          </div>
        </WpbakeryModal> : null}
        <p className='vcv-ui-form-helper'>WPBakery element is displayed as shortcode. Adjust shortcode parameters or open WPBakery Edit form for easier editing.</p>
        <button
          className='vcv-ui-form-input'
          onClick={this.showEditor.bind(this)}
          value={value}>Open Edit Form
        </button>
      </React.Fragment>
    )
  }
}

export default WpbakeryEditForm