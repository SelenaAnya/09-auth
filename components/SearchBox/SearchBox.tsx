import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (value: string) => void;
  value: string;
//   error?: string;
}

export default function SearchBox({ onSearch, value }: SearchBoxProps) {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  }
  return (
    <>
      <input
        className={css.input}
        type="text"
        placeholder="Search notes"
        value={value}
        onChange={handleSearch}
      />
   </>
  );
};
