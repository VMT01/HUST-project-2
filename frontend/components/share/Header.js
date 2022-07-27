import Link from "next/link";

export default function Header() {
  return (
    <div style={{textAlign:'center',padding:"15px 0"}} className="bg-root">
      <Link href="/"> 
      <h1>Project 2</h1>
      </Link>
    </div>
  );
}
