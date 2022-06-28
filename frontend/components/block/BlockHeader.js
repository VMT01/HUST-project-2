import SearchBar from "../share/Searchbar";
import style from "../../styles/blockDetail.module.scss";

export default function BlockHeader({ number }) {
  return (
    <div className={style["block-header"]}>
      <p>
        Block <span>#{number}</span>
      </p>
      <div>
        <SearchBar />
      </div>
    </div>
  );
}
