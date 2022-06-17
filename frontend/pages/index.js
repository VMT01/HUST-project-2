import BlockTable from "../components/BlockTable";
import SearchBar from "../components/share/Searchbar";
import TransactionTable from "../components/TransactionTable";

export default function Home() {
  return (
    <div>
      <SearchBar />
      <div>
        <BlockTable />
        <TransactionTable />
      </div>
    </div>
  );
}
