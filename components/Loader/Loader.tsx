import css from "./Loader.module.css";

function Loader() {
  return (
    <>
      <div className={css.loaderFour} data-testid="loader-four">
        <div className={css.loaderFour__preloader} data-testid="loader-four__preloader"></div>
      </div>
    </>
  );
}

export default Loader;
