import BlockTable from "../components/BlockTable";
import SearchBar from "../components/share/Searchbar";
import TransactionTable from "../components/TransactionTable";

export default function Home() {
  return (
    <div>
      <div style={{ width: "60%" }}>
        <SearchBar />
      </div>
      <div>
        <BlockTable />
        <TransactionTable />
      </div>
    </div>
  );
}
