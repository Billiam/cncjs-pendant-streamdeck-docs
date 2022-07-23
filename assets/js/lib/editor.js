import { basicSetup, EditorView } from 'codemirror'
import { EditorState } from '@codemirror/state'
import { placeholder } from '@codemirror/view'
import { json } from '@codemirror/lang-json'
import { linter, lintGutter } from '@codemirror/lint'
import errorRenderer from './error-renderer'
import jsonLint from './linter'

export default ({ element, errorListElement }) => {
  const lintList = errorRenderer(errorListElement, {
    scrollTo: (pos) => {
      const effect = EditorView.scrollIntoView(pos, { y: 'center' })
      view.dispatch({ effects: [effect] })
    },
  })

  const state = EditorState.create({
    extensions: [
      basicSetup,
      json(),
      placeholder('Paste your JSON file here'),
      linter(jsonLint(lintList)),
      lintGutter(),
    ],
  })
  const view = new EditorView({
    state,
    parent: element,
  })
  return view
}
