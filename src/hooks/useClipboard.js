const useClipboard = () => {
  const textArea = document.createElement('textarea')

  const copy = (text, cb = () => {}) => {
    textArea.innerText = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    textArea.remove()
    cb()
  }

  return { copy }
}

export default useClipboard
