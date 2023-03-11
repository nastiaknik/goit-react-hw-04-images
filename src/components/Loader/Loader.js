import { StyledSkeleton } from './Loader.styled';
import 'react-loading-skeleton/dist/skeleton.css';

const Box = ({ children }) => {
  return (
    <div
      style={{
        margin: '16px auto 16px',
        inline: 'true',
        flexWrap: 'wrap',
        display: 'flex',
        padding: 0,
        maxWidth: 'calc(100vw - 32px)',
        textAlign: 'start',
      }}
    >
      {children}
    </div>
  );
};

export const Loader = () => {
  return (
    <Box>
      <StyledSkeleton count={12} width={428} height={260} inline={true} />
    </Box>
  );
};
