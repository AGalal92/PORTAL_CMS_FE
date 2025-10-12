import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pageview } from './gtag';

export default function GAListener() {
  const location = useLocation();

  useEffect(() => {
    // Fire on initial load + every route change
    const path = location.pathname + location.search + location.hash;
    pageview(path);
  }, [location]);

  return null;
}
