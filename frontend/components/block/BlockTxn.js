import { useMemo } from "react";
import style from "../../styles/blockDetail.module.scss";
import Web3 from "web3";

export default function BlockTxn({ data }) {
  console.log(data);
  const info = useMemo(
    () => {
      const res = data.data.map((txn) => ({
        hash: txn.hash,
        method: txn.method,
        from: txn.from,
        to: txn.to,
        fee: Web3.utils.fromWei(txn.maxFeePerGas * txn.gas + ""),
      }));
      return [
        {
          hash: "Txn Hash",
          method: "Method",
          from: "From",
          to: "To",
          fee: "Txn Fee",
        },
        ...res,
      ];
    },
    //eslint-disable-next-line
    [data]
  );
  return (
    <div className={style["block-txn"]}>
      <div className={style["block-txn__title"]}>
        <span className={style.type}>Transactions</span>
        <span className={style.title}>{data.total} Transactions</span>
      </div>
      <div className={style["block-txn__txn-list"]}>
        {info.map((item, index) => (
          <div key={index}>
            <span>{item.hash}</span>
            <span>{item.method}</span>
            <span>{item.from}</span>
            <span>{item.to}</span>
            <span>{item.fee}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
