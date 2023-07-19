import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



export const PublicRoute = ({element}) => {
    //const { isLoggedIn } = useSelector((state) => state.isAuthChecked);
    const isLoggedIn = useSelector((store) => store.user.isAuthChecked);
    if (isLoggedIn) {
        return <Navigate to="/" /*replace={true}*/ />
      }
    
      return element;
}

PublicRoute.propTypes = {
    element: PropTypes.element.isRequired,
  };