import Link from "next/link";
import { useEffect, useState } from "react";
import BlockTable from "../components/BlockTable";
import SearchBar from "../components/share/Searchbar";
import TransactionTable from "../components/TransactionTable";
import styles from '../styles/HomePage.module.scss'
export default function Home({ blocks, txns,addresses=[] }) {
  // avoid error text not match.
  const [load,setLoad]=useState(false)
  useEffect(()=>{
    setLoad(true)
  },[])
  if(!load) return <></>
  // 
  return (
    <div>
      {/* <div style={{ width: "60%" }}>
        <SearchBar />
      </div> */}
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
      <div className="latest-address">
        <p>Latest Addresses:</p>
       <div style={{width:'auto',display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
    
       {addresses.map((a,i)=><li key={i}><Link href={`/address/${a.address}`}>{a.address}</Link>----type: {a.type===2?"ví người dùng":"smart contract"}</li>)}
      
       </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await Promise.all([
    fetch('http://localhost:5000/api/block?limit=5').then(res => res.json()),
    fetch('http://localhost:5000/api/txn?limit=5').then(res => res.json()),
    fetch('http://localhost:5000/api/address?limit=5').then(res => res.json()),
  ])
  console.log(data[2]);
  return Object.freeze({
    props: {
      blocks: data[0].data,
      txns: data[1].data,
      addresses:data[2].data
    }
  })
}