import {
  Header,
  SearchForm,
  SearchBtn,
  BtnLabel,
  Input,
} from './Searchbar.styled';

export const Searchbar = onSubmit => {
  return (
    <Header>
      <SearchForm onSubmit={onSubmit}>
        <SearchBtn type="submit">
          <BtnLabel>Search</BtnLabel>
        </SearchBtn>

        <Input
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};