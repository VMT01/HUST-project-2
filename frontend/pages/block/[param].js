import BlockHeader from "../../components/block/BlockHeader";
import BlockInfo from "../../components/block/BlockInfo";
import BlockTxn from "../../components/block/BlockTxn";
import style from "../../styles/blockDetail.module.scss";

export default function BlockDetail({ dataBlock, dataTxn }) {
  return (
    <div className={style["block-detail"]}>
      <BlockHeader number={dataBlock.number} />
      <BlockInfo data={dataBlock} />
      <BlockTxn data={dataTxn} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const address =
    process.env.NODE_ENV === "development"
      ? process.env.MOCK_ADDR
      : process.env.SERVER_ADDR;

  const resBlock = await fetch(`${address}/block/${context.param}`);
  const dataBlock = await resBlock.json();
  if (!dataBlock) {
    return {
      notFound: true,
    };
  }

  const resTxn = await fetch(`${address}/txn?blockNumber=${dataBlock.number}`);
  const dataTxn = await resTxn.json();
  if (!dataTxn) {
    return {
      notFound: true,
    };
  }

  return { props: { dataBlock, dataTxn } };
}
