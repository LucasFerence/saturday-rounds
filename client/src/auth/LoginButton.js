import {React} from 'react';
import {useAuth0} from '@auth0/auth0-react';

/**
 * Renders a login button
 * @return {button}
 */
function LoginButton() {
  const {loginWithRedirect} = useAuth0();
  return <button onClick={() => loginWithRedirect()}>Log In</button>;
}

export default LoginButton;
