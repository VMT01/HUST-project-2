import { NativeSelect } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import style from "../../styles/searchBar.module.scss";

const options = ["All filters", "Block", "Transaction", "Address"];

export default function SearchBar() {
  return (
    <div className={style.searchbar}>
      <NativeSelect
        className={style.select}
        defaultValue={0}
        inputProps={{
          name: "select",
          id: "select",
        }}
        disableUnderline={true}
      >
        {options.map((item, index) => (
          <option className={style.option} key={index} value={index}>
            {item}
          </option>
        ))}
      </NativeSelect>
      <input className={style.input} type="text" />
      <button className={style.search}>
        <SearchIcon />
      </button>
    </div>
  );
}
