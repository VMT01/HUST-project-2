import BlockTable from "../components/BlockTable";
import SearchBar from "../components/share/Searchbar";
import TransactionTable from "../components/TransactionTable";
import styles from '../styles/HomePage.module.scss'
export default function Home() {
  return (
    <div>
      <div style={{ width: "60%" }}>
        <SearchBar />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <div className={styles.blocks}>
            <BlockTable />
          </div>
          <div className={styles.txns}>
            <TransactionTable />
          </div>
        </div>
      </div>
    </div>
  );
}
