import vcCake from 'vc-cake'
const documentService = vcCake.getService('document')
const elementAssetsLibraryService = vcCake.getService('elementAssetsLibrary')
const stylesManager = vcCake.getService('stylesManager')

const loadedCssFiles = []
vcCake.add('assets', (api) => {
  const dataUpdate = (data, action, id) => {
    if (action === 'reset') {
      vcCake.getData('globalAssetsStorage').resetElements(Object.keys(documentService.all()))
    }
    let doElement = document.querySelector('#vcv-do-styles')
    let styleElement = document.querySelector('#vcv-css-styles')
    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = 'vcv-css-styles'
      document.body.appendChild(styleElement)
    }
    if (!doElement) {
      doElement = document.createElement('style')
      doElement.id = 'vcv-do-styles'
      document.body.appendChild(doElement)
    }

    let siteStylesManager = stylesManager.create()
    siteStylesManager.add(vcCake.getData('globalAssetsStorage').getGlobalInstance().getWpBackendSiteCssData())
    siteStylesManager.compile().then((result) => {
      styleElement.innerHTML = result
    })

    let pageStylesManager = stylesManager.create()
    pageStylesManager.add(vcCake.getData('globalAssetsStorage').getGlobalInstance().getWpBackendPageCssData())
    pageStylesManager.compile().then((result) => {
      doElement.innerHTML = result
    })

    let d = window.document

    let assetsFiles = elementAssetsLibraryService.getAssetsFilesByTags(vcCake.getData('globalAssetsStorage').getGlobalInstance().getElementsTagsList())
    let cssFiles = assetsFiles.cssBundles

    cssFiles.forEach((file) => {
      if (loadedCssFiles.indexOf(file) === -1) {
        loadedCssFiles.push(file)
        let cssLink = d.createElement('link')
        cssLink.setAttribute('rel', 'stylesheet')
        cssLink.setAttribute('href', file)
        d.querySelector('head').appendChild(cssLink)
      }
    })
  }
  // TODO: Use state against event
  api.reply('data:changed', dataUpdate)
  api.reply('settings:changed', dataUpdate)
  api.reply('wordpress:data:added', dataUpdate)
  api.reply('data:added', dataUpdate)

  api.reply('data:afterAdd', (ids) => {
    vcCake.getData('globalAssetsStorage').addElement(ids)
  })

  api.reply('data:afterUpdate', (id, element) => {
    vcCake.getData('globalAssetsStorage').updateElement(id)
  })

  api.reply('data:beforeRemove', (id) => {
    let elements = []
    let walkChildren = (id) => {
      elements.push(id)
      let children = documentService.children(id)
      children.forEach((child) => {
        walkChildren(child.id)
      })
    }
    walkChildren(id)
    vcCake.getData('globalAssetsStorage').removeElement(elements)
  })

  api.reply('node:beforeSave', (data) => {
    if (data.hasOwnProperty('pageElements')) {
      let elements = []
      for (let id in data.pageElements) {
        if (data.pageElements[ id ].hasOwnProperty('tag')) {
          elements.push(id)
        }
      }
      vcCake.getData('globalAssetsStorage').updateElement(elements)
    }
  })

  api.reply('wordpress:beforeSave', (data) => {
    if (data.hasOwnProperty('pageElements')) {
      let elements = []
      for (let id in data.pageElements) {
        if (data.pageElements[ id ].hasOwnProperty('tag')) {
          elements.push(id)
        }
      }
      vcCake.getData('globalAssetsStorage').updateElement(elements)
    }
  })

  api.reply('data:afterClone', (id) => {
    let elements = []
    let walkChildren = (id) => {
      elements.push(id)
      let children = documentService.children(id)
      children.forEach((child) => {
        walkChildren(child.id)
      })
    }
    walkChildren(id)
    vcCake.getData('globalAssetsStorage').addElement(elements)
  })
})
const resetURLWithFragment = () => {
  window.location.href.indexOf('#') > -1 && window.history.pushState('', document.title, window.location.pathname +
    window.location.search)
}
window.onpopstate = resetURLWithFragment
resetURLWithFragment()
