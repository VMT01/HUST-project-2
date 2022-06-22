import styles from '../styles/BlockTable.module.scss'
export default function BlockTable({ blocks=[] }) {
  return <div className={styles.container}>
    <div className='header-row'>
      <p>Latest Blocks</p>
      <button>View All Blocks</button>
    </div>
    <div>
      {blocks.map((b,i)=><li key={i}>blocks</li>)}
    </div>
  </div>;
}
