import Editor from './lib/editor'

document.addEventListener('DOMContentLoaded', function (event) {
  const element = document.querySelector('#editor')
  const errorListElement = document.querySelector('#error_list')
  const editor = Editor({ element, errorListElement })
})
