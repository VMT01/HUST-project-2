import SearchBar from "../share/Searchbar";
import style from "../../styles/txnDetail.module.scss"

export default function TransactionHeader() {
  return (
    <div className={style['txn-header']}>
      <p>Transaction Details</p>
      <div>
        <SearchBar />
      </div>
    </div>
  );
}
