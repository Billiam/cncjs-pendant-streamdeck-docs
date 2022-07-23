export default (element, { scrollTo }) => {
  return (errors) => {
    const fragment = document.createDocumentFragment()
    const title = document.createElement('header')
    fragment.append(title)

    const errorTypes = errors.reduce(
      (result, error) => {
        if (error.severity === 'warning') {
          result.warning++
        } else {
          result.error++
        }
        result.total++
        return result
      },
      { error: 0, warning: 0, total: 0 }
    )

    if (errorTypes.total) {
      title.className = 'error-title error'
      const message = ['error', 'warning']
        .map((type) => {
          if (errorTypes[type]) {
            return `${errorTypes[type]} ${type}${
              errorTypes[type] === 1 ? '' : 's'
            }`
          }
        })
        .filter(Boolean)
      title.append(`${message.join(' and ')} found`)
    } else {
      title.className = 'error-title ok'
      title.append('No errors found')
    }

    const list = document.createElement('ul')
    list.className = 'error-list'
    fragment.append(list)

    errors.forEach((error) => {
      const line = document.createElement('li')
      line.className = `error-item ${error.severity ?? 'error'}`
      line.append(error.message)
      if (scrollTo) {
        line.addEventListener('click', (e) => {
          scrollTo(error.from)
        })
      }
      list.append(line)
    })
    element.innerHTML = ''
    element.append(fragment)
  }
}
