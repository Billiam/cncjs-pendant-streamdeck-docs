import { Validator } from 'cncjs-pendant-streamdeck-validator'

export default (showDiagnostics = () => {}) => {
  const validate = Validator()

  return (view) => {
    const configStr = view.state.doc.toString()
    const result = validate(configStr)
    showDiagnostics(result)
    return result
  }
}
