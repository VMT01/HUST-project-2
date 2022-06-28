import Web3 from "web3";
import style from "../../styles/blockDetail.module.scss";

export default function BlockTxn({ data }) {
  // const info = useMemo(
  //   () =>
  //     data.data.map(async (item) => {
  //       const txn = await web3.eth.getTransactionReceipt(item.hash);

  //       return {
  //         hash: item.hash,
  //         type: txn.type,
  //         from: item.from,
  //         to: item.to,
  //         fee: web3.utils.fromWei(item.gas),
  //       };
  //     }),
  //   // eslint-disable-next-line
  //   []
  // );

  // console.log(info);

  return (
    <div className={style["block-txn"]}>
      <div>
        <span>Transactions</span>
        <span className={style.title}>{data.total} Transactions</span>
      </div>
    </div>
  );
}
