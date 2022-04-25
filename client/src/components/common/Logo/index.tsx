import logo from '../../../assets/img/logo.svg';
import { Link } from 'react-router-dom';

const Logo = () => (
  <Link to="/">
    <img src={logo} alt="Logo" />
  </Link>
);

export default Logo;
