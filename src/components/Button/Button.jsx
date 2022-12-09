import PropTypes from 'prop-types';
import { Btn } from './Button.styled';

export const Button = ({ text, onClick }) => {
  return (
    <Btn type="button" onClick={onClick}>
      {text}
    </Btn>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
