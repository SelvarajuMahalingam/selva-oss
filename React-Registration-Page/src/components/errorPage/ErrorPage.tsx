import { ErrorMessageType } from '../../types/Types';

import './ErrorPage.css';

const ErrorPage = ({message}: ErrorMessageType) => {


  return (
    <div className="error-container">
     {message}
    </div>
  );
};

export default ErrorPage;