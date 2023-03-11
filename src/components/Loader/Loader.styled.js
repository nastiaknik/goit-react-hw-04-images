import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

export const StyledSkeleton = styled(Skeleton)`
  border-radius: 2px;

  /*   flex-basis: calc((100% - 16px) / 3); */

  :not(:nth-of-type(3n + 3)) {
    margin-right: 16px;
  }
  :not(:nth-of-type(n + 10)) {
    margin-bottom: 16px;
  }
`;
