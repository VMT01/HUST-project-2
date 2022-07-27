import styles from '../styles/BlockTable.module.scss'
import Link from 'next/link'
export default function BlockTable({ blocks = [] }) {
  return <div className={styles.container}>
    <div className='header-row'>
      <p>Latest Blocks</p>
      <button>View All Blocks</button>
    </div>
    <div>
      {blocks.map((b, i) => <BlockItem key={i} block={b} />)}
    </div>
  </div>;
}

const BlockItem = ({ block }) => {

  return <div className={styles.block}>
    <div className={styles.blockTitle}>
      <p className={styles.rounded}>Bk</p>
      <div className={styles.blockTitleDetail}>
       <Link href={`/block/${block.number}`}> 
       <p>{block.number}</p>
       </Link>
        <p>x min ago</p>
      </div>

    </div>

    <div className={styles.center}>
      <p>Miner 0x...{block.miner.substr(32, 42)}</p>
      <a>view txns</a>
    </div>


    <div>
      <div className='label-arrow'><span>{calcBlockReward()} Eth</span></div>
    </div>


  </div>
}
const calcBlockReward=()=>{
  return (2 + 0.3*Math.random()).toFixed(3)
}