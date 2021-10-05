import { useContext } from "react"
import { ChurrasContext } from "../contexts/ChurrasContext"

const useChurrasContext = () => {
  const context = useContext(ChurrasContext)
  if (!context) throw new Error('useChurrasContext should be used as a child of a ChurrasContext.Provider');
  return context;
}

export default useChurrasContext;