import { NativeSelect } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const options = ["All filters", "Block", "Transaction", "Address"];

export default function SearchBar({ className }) {
  return (
    <>
      <NativeSelect
        defaultValue={0}
        inputProps={{
          name: "demo-simple-select-helper-label",
          id: "demo-simple-select-helper",
        }}
      >
        {options.map((item, index) => (
          <option value={index}>{item}</option>
        ))}
      </NativeSelect>
      <input type="text" />
      <button>
        <SearchIcon />
      </button>
    </>
  );
}
