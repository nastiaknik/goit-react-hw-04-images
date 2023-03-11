import styled from 'styled-components';

export const GalleryItem = styled.li`
  border-radius: 2px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);

  /*   flex-basis: calc((100% - 16px) / 3); */
  :not(:nth-of-type(3n + 3)) {
    margin-right: 16px;
  }
  :not(:nth-last-of-type(-n + 3)) {
    margin-bottom: 16px;
  }
`;

export const Image = styled.img`
  display: block;
  width: 429px;
  height: 260px;
  object-fit: cover;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  background-color: #ebebeb;

  /* :hover {
    transform: scale(1.03);
    cursor: zoom-in;
  } */
`;
