import lottie, { AnimationItem } from 'lottie-web'
import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactElement,
  useLayoutEffect,
  useRef,
} from 'react'

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  path: string
}

export default function Lottie(props: Props): ReactElement {
  const divRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const htmlDivElement = divRef.current
    let animationItem: AnimationItem
    if (htmlDivElement) {
      animationItem = lottie.loadAnimation({
        container: htmlDivElement,
        path: props.path,
      })
    }
    return () => {
      animationItem?.destroy()
    }
  }, [props.path])

  return <div {...props} ref={divRef}></div>
}
