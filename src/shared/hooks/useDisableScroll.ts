import { useEffect } from 'react';

const useDisableScroll = (disabled = true) => {
  useEffect(() => {
    document.body.style.overflow = disabled ? 'hidden' : 'unset'
  }, [disabled])
}

export default useDisableScroll;