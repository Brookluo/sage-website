import { useState, useEffect } from 'react'


export default function TypeWriter(props) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)

  const [phraseIndex, setPhraseIndex] = useState(0)
  const [fullText, setFullText] = useState(props.texts[phraseIndex] || '')


  // typing effect
  useEffect(() => {
    if (index >= fullText.length)
      return

    const handle = setTimeout(() => {
      setText(`${text}${fullText[index]}`)
      setIndex(index + 1)
    }, 25)

    return () => clearTimeout(handle)
  }, [index, fullText, text])


  // changing text index
  useEffect(() => {
    function update() {
      const handle = setTimeout(() => {
        setPhraseIndex(prev => (prev + 1) % props.texts.length)
        update()
      }, 3000)

      return handle
    }

    const handle = update()

    return () => clearTimeout(handle)
  }, [props.texts.length])


  // change actual text, reset index/text
  useEffect(() => {
    setIndex(0)
    setText('')
    setFullText(props.texts[phraseIndex])
  }, [phraseIndex, props.texts])


  return (
    <>{text ? text : <>&nbsp;</>}</>
  )
}