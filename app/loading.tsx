import css from "./Loader.module.css";

function Loader() {
  return (
    <>
      <div className={css.loaderFour} >
        <div className={css.loaderFour__preloader} ></div>
      </div>
    </>
  );
}

export default Loader;
