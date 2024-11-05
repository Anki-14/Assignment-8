import { NavLink } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Made with &hearts; by{' '}
        <NavLink className="brand" to="https://www.linkedin.com/in/ankita-g-947943229/" target="_blank" rel="noopener noreferrer">
          Ankita
        </NavLink>
        <br /> &copy; 2024 all rights reserved
      </p>
    </footer>
  );
};

export default Footer;

