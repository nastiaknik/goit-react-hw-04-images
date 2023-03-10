import PropTypes from 'prop-types';
import { StyledButton } from './Button.styled';

export const Button = ({ text, onLoadMore }) => {
  return (
    <StyledButton type="button" onClick={onLoadMore}>
      {text}
    </StyledButton>
  );
};

Button.prototype = {
  onLoadMore: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
