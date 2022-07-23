import TransactionHeader from "../../components/transaction/TransactionHeader";
import TransactionInfo from "../../components/transaction/TransactionInfo";
import style from "../../styles/txnDetail.module.scss"

export default function TransactionDetail({ dataTxn }) {
  console.log(dataTxn);
  return (
    <div className={style["txn-detail"]}>
      <TransactionHeader />
      <TransactionInfo data={dataTxn} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const address =
    process.env.NODE_ENV === "development"
      ? process.env.MOCK_ADDR
      : process.env.SERVER_ADDR;

  const resTxn = await fetch(`${address}/txn/${context.param}`);
  const dataTxn = await resTxn.json();
  if (!dataTxn) {
    return {
      notFound: true,
    };
  }

  return { props: { dataTxn } };
}
