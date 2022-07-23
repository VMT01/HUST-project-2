import { useMemo } from "react";
import Web3 from "web3";
import style from "../../styles/txnDetail.module.scss";

const PROVIDER =
    "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
const web3 = new Web3(PROVIDER);

function handleValue(value) {
    if (!value) return "";
    const momentVal = moment.unix(value);
    return `${momentVal.fromNow()} (${momentVal.format(
        "MMM-DD-YYYY hh:mm:ss A Z"
    )})`;
}

export default function TransactionInfo({ data }) {
    const info = useMemo(
        () => [
            { name: "Transaction Hash:", value: data.hash },
            { name: "Block:", value: data.blockNumber },
            { name: "Timestamp:", value: handleValue(data.timestamp) },
            { name: "From:", value: data.from },
            { name: "To:", value: data.to },
            { name: "Value:", value: data.value },
            {
                name: "Transaction Fee:",
                value: web3.utils.fromWei(data.gasPrice * data.gas + ""),
            },
            { name: "Gas Price:", value: web3.utils.fromWei(data.gasPrice) },
            { name: "Gas Limit:", value: data.gas },
            { name: "Gas Fees:", value: data.maxFeePerGas },
            { name: "Input Data:", value: data.input },
        ],
        //eslint-disable-next-line
        []
    );

    return (
        <div className={style["txn-info"]}>
            {info.map((item, index) => (
                <p key={index}>
                    <span>{item.name}</span>
                    <span className={index === 10 ? style['txn-input'] : (index === 1 || index === 3 || index === 4) && style.link}>{item.value}</span>
                </p>
            ))}
        </div>
    );
}
