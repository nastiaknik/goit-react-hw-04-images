import { useEffect, useRef } from 'react';
import { StyledSkeleton } from './Loader.styled';
import 'react-loading-skeleton/dist/skeleton.css';

const Box = ({ children }) => {
  const skeletonRef = useRef();

  useEffect(() => {
    window.scrollTo({
      left: 0,
      top: skeletonRef.current.offsetTop - 86,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div
      ref={skeletonRef}
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
