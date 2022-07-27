import AddressInfor from "../../components/AddressInfor";
import styles from "../../styles/AddressPage.module.scss";
export default function AddressPage({data}) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <AddressInfor data={data}/>
      </div>
    </div>
  );
}

export async function getServerSideProps(props) {
  const address=props.query.address;
  const data=await fetch('http://localhost:5000/api/address/'+address).then(res=>res.json())

  if(data.statusCode===404){
    return {
      notFound: true
    }
  }
  return {
    props: {
      data,
    },
  };
}
