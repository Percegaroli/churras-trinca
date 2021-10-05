import { useMemo } from 'react';
import { v4 } from 'uuid'

const useUniqueId = (): string => {
  return useMemo(() => v4().slice(0,8),[])
}

export default useUniqueId;