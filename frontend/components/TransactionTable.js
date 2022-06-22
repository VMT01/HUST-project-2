import styles from '../styles/TransactionTable.module.scss'

export default function TransactionTable({ txns=[] }) {
  return <div className={styles.container}>
    <div className='header-row'>
      <p>Latest Transaction</p>
      <button>View All Transaction</button>
    </div>
    <div>
      {txns.map((txn,i)=><li key={i}>txns</li>)}
    </div>
  </div>;
}
