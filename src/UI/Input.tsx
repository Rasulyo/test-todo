import { InputProps } from "./types";
import "./styles.css";

export const Input = (props: InputProps) => {
  const { onChange, value } = props;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        placeholder="What should be done?!"
        onChange={onChangeHandler}
        className="input"
        data-testid="input"
      />
    </div>
  );
};
