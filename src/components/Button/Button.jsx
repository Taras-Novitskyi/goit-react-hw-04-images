import { Btn } from "./Button.styled";

export const Button = ({text, onClick}) => {

	return (
    <Btn type="button" onClick={onClick}>
      {text}
    </Btn>
  );
}