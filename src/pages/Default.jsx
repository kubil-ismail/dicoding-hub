import React from 'react';
import { useNavigate } from 'react-router-dom';

function Default() {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate('/dashboard');
  }, []);

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}

export default Default;
