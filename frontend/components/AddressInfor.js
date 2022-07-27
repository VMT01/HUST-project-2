import styles from '../styles/AddressInfor.module.scss'
import React, { useEffect } from 'react'
import BlockTxn from './block/BlockTxn'
import TransactionTable from './TransactionTable';
export default function AddressInfor({data={}}){

    const [txn,setTxn]=React.useState([]);
    const [pagination,setPagination]=React.useState({
        total:0,
        currentPage:0,
    })
    useEffect(()=>{
            const address=data.address;
            fetch(`http://localhost:5000/api/txn?address=${address}&limit=5`).then(res=>res.json()).then(res=>{
                setTxn(res.data)
                delete res.data;
                setPagination({...res})
            })

    },[data])
  
    return <div>
        <div className={styles.container}>


<div className={styles['infor-container']}>
    <p>Overview</p>
    {data.type===2  ? <WalletInfor data={data}/>:<ContractInfor data={data}/>}

</div>
<div className={styles['infor-container']}>
    
    

</div>

</div>
<div>
    {/* txn viewer */}
    {/* <BlockTxn data={{data:txn}}/> */}
   <TransactionTable txns={txn} type="detail"/> 
   <p>có {Math.ceil(pagination.total/5)} trang, đang ở trang thứ {pagination.currentPage} </p>
   <input placeholder='page' type="number" onChange={e=>{
    const nextPage=e.target.value;
    fetch(`http://localhost:5000/api/txn?address=${data.address}&limit=5&page=${nextPage}`).then(res=>res.json()).then(res=>{
        setTxn(res.data)
        delete res.data;
        setPagination({...res})
    })
   }}/>
</div>
    </div>
}

const ContractInfor=({data})=>{
return <div>
    <p>Đây là địa chỉ của smart contract</p>
         <p>Contract</p>
        <p>Address: {data.address}</p>
        
    </div>
}
const WalletInfor=({data})=>{
    const [balance,setBalance]=React.useState(0);
    useEffect(()=>{
        if(data?.address){

            getWallerBalance(data.address).then(res=>{
               setBalance(res.result);
            })
        }
    },[data])
    return <div>
        <p>Đây là ví của người dùng</p>
        <p>Address: {data?.address}</p>
       <p> Balance: {balance}</p>
    </div>
}
const getWallerBalance=async(address)=>{
 const res= await fetch(`https://api-rinkeby.etherscan.io//api?module=account&action=balance&address=${address}&tag=latest&apikey=51S5NCAT1SM6C4EX4EMQ1SW6BEWCHEYTYY`)
 return await res.json();
}