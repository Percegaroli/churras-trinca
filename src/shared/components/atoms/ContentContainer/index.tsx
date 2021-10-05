import { ContentContainerProps } from "./interface";

const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  className
}) => {
  return (
    <div className={`${className} w-full max-w-7xl mx-auto xl:px-0 px-4`}>
      {children}
    </div>
  )
}

export default ContentContainer;