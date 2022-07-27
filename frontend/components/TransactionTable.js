import styles from '../styles/TransactionTable.module.scss'
import Web3 from "web3"
import Link from 'next/link';
export default function TransactionTable({ txns = [],type="normal" }) {

  return <div className={styles.container}>
    <div className='header-row'>
      <p>Latest Transaction</p>
      {type==='normal' && <button>View All Transaction</button>}
    </div>
    <div>
      {txns.map((txn, i) => <TxnItem txn={txn} type={type}/>)}
    </div>
  </div>;
}

const TxnItem = ({ txn ,type}) => {

  return <div className={styles.block}>
    <div className={styles.TxnTitle}>
      <p className={styles.rounded}>Tx</p>
      <div className={styles.TxnTitleDetail}>
      <Link href={`/txn/${txn.hash}`}>
      <p>{txn.hash.substr(0,5)}...</p>
      </Link>
      <p>x min ago</p>
    </div>
    </div>

    <div className={styles.center}>
      <p>From 0x...{txn.from.substr(32,42)}</p>
      <p>To 0x...{txn.to.substr(32,42)}</p>
    </div>


    <div>
      <p  className='label-arrow'>{Web3.utils.fromWei(txn.value)} Eth</p>
    </div>


  </div>
}