import { BsSearch } from 'react-icons/bs';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  Header,
  SearchForm,
  SearchBtn,
  BtnLabel,
	Input,
} from './Searchbar.styled';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchImg: '',
  };

  handleSearchCheange = event => {
    this.setState({ searchImg: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    event.currentTarget.reset();

    if (this.state.searchImg.trim() === '') {
      toast.error('Enter your search query');
      this.setState({ searchImg: '' });
      return;
    }

    this.props.onSubmit(this.state.searchImg);
    this.setState({ searchImg: '' });
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchBtn type="submit">
            <BsSearch />
            <BtnLabel>Search</BtnLabel>
          </SearchBtn>

          <Input
            type="text"
            autocomplete="off"
            name="input"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleSearchCheange}
          />
        </SearchForm>
      </Header>
    );
  }
}
