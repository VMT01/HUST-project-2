import moment from "moment";
import { useMemo } from "react";
import { ArrowLeftRounded, ArrowRightRounded } from "@mui/icons-material";
import style from "../../styles/blockDetail.module.scss";

function handleValue(value, index) {
  if (index === 1) {
    const momentVal = moment.unix(value);
    return `${momentVal.fromNow()} (${momentVal.format(
      "MMM-DD-YYYY hh:mm:ss A Z"
    )})`;
  }
  return value;
}

export default function BlockInfo({ data }) {
  const info = useMemo(
    () => [
      { name: "Block Height:", value: data.number },
      { name: "Timestamp:", value: data.timestamp },
      { name: "Mined By:", value: data.miner },
      { name: "Difficulty:", value: data.difficulty },
      { name: "Total Difficulty:", value: data.totalDifficulty },
      { name: "Size:", value: data.size },
      { name: "Hash:", value: data.hash },
      { name: "Parent Hash:", value: data.parentHash },
      { name: "Sha3 Uncles:", value: data.sha3Uncles },
      { name: "State root:", value: data.stateRoot },
      { name: "Nonce:", value: data.nonce },
    ],
    //eslint-disable-next-line
    []
  );

  return (
    <div className={style["block-info"]}>
      {info.map((item, index) => (
        <p key={index}>
          <span>{item.name}</span>
          <span className={index === 2 || index === 7 ? style.link : ""}>
            {handleValue(item.value, index)}
            {index === 0 && (
              <>
                <ArrowLeftRounded className={style.button} />
                <ArrowRightRounded className={style.button} />
              </>
            )}
          </span>
        </p>
      ))}
    </div>
  );
}
