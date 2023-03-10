import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FiSearch } from 'react-icons/fi';
import {
  Header,
  SearchForm,
  SearchButton,
  Label,
  Input,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = { query: '' };

  onChange = event => {
    this.setState({ query: event.currentTarget.value });
  };

  onSubmit = event => {
    event.preventDefault();

    if (!this.state.query.trim()) {
      return toast.warning('Please type something!');
    }

    this.props.onSubmit(this.state.query);
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.onSubmit}>
          <SearchButton type="submit">
            <FiSearch size={20} />
            <Label>Search</Label>
          </SearchButton>
          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.onChange}
          />
        </SearchForm>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
