import css from "./ErrorMessage.module.css";

function ErrorText() {
  return (
    <>
      <p className={css.text}>There was an error, please try again...</p>;
    </>
  );
}

export default ErrorText;
