import { WithFallbackProps } from "./interface"

const WithFallback: React.FC<WithFallbackProps> = ({
  children,
  fallback,
  shouldRenderFallback
}) => {
  return (
    <>
      {shouldRenderFallback ? fallback() : children}
    </>
  )
}

export default WithFallback;