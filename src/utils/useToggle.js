import { useNavigate } from 'react-router-dom';

const useToggle = () => {
  const navigate = useNavigate();
  const toggle = () => navigate('/users');

  return toggle;
};

export default useToggle;
