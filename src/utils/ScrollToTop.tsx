import { useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';

function ScrollToTop() {
  const location = useHistory();
  useEffect(() => {
    const unlisten = location.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    }
  });

  return (null);
}

export default withRouter(ScrollToTop);