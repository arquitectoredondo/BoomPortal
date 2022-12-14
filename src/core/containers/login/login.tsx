import React from 'react';
import './login.scss';
import { useKeycloak } from '@react-keycloak/web';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

interface LoginProps {
  loading: boolean;
}

export default function Login(props: LoginProps): JSX.Element {
  const [keycloak] = useKeycloak();
  let history = useHistory();

  React.useEffect(() => {
    if (!props.loading) {
      if (localStorage.getItem('mwTokenAdmin')) {
        history.push('/site/portals');
      } else {
        keycloak.login();
      }
    }
    // eslint-disable-next-line
  }, [props.loading]);

  return (
    <div className="init-loading-screen">
      <span>
        <CircularProgress size={160} />
      </span>
    </div>
  );
}
