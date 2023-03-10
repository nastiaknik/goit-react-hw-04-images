import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FiSearch } from 'react-icons/fi';
import {Header,
  SearchForm,
  SearchButton,
  Label,
  Input,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const onChange = event => {
    setQuery(event.currentTarget.value);
  };

  const onFormSubmit = event => {
    event.preventDefault();

    if (!query.trim()) {
      return toast.warning('Please type something!');
    }

    onSubmit(query);
  };

  return (
    <Header>
      <SearchForm onSubmit={onFormSubmit}>
        <SearchButton type="submit">
          <FiSearch size={20} />
          <Label>Search</Label>
        </SearchButton>
        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={onChange}
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
