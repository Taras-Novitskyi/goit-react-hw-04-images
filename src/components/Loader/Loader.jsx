import { RotatingLines } from 'react-loader-spinner';
import { Box } from '../Box/Box';

export const Loader = () => {
  return (
    <Box display="flex" justifyContent="center">
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </Box>
  );
};
