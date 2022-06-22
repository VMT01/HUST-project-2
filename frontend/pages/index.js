import BlockTable from "../components/BlockTable";
import SearchBar from "../components/share/Searchbar";
import TransactionTable from "../components/TransactionTable";
import styles from '../styles/HomePage.module.scss'
export default function Home({ blocks, txns }) {
  return (
    <div>
      <div style={{ width: "60%" }}>
        <SearchBar />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <div className={styles.blocks}>
            <BlockTable blocks={blocks} />
          </div>
          <div className={styles.txns}>
            <TransactionTable txns={txns} />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const data = await Promise.all([
    fetch('https://stoplight.io/mocks/sotatek/pr-2/2951998/block').then(res => res.json()),
    fetch('https://stoplight.io/mocks/sotatek/pr-2/2951998/txn').then(res => res.json()),
  ])
  return {
    props: {
      blocks: data[0].data,
      txns: data[1].data
    }
  }
}