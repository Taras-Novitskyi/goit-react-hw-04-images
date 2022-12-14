import { BsSearch } from 'react-icons/bs';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  Header,
  SearchForm,
  SearchBtn,
  BtnLabel,
	Input,
} from './Searchbar.styled';

export function Searchbar({onSubmit}) {
  const [searchImg, setSearchImg] = useState('');

  const handleSearchCheange = event => {
    setSearchImg(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    event.currentTarget.reset();

    if (searchImg.trim() === '') {
      toast.error('Enter your search query');
    }

    onSubmit(searchImg);
    setSearchImg('');
  };

    return (
      <Header>
        <SearchForm onSubmit={handleSubmit}>
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
            onChange={handleSearchCheange}
          />
        </SearchForm>
      </Header>
    );
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
