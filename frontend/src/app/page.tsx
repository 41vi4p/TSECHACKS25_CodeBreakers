import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center h-screen justify-center text-lg">
      <Link href="/user-dashboard">User Dashboard</Link>
      <Link href="/org-dashboard">Org Dashboard</Link>
      <Link href="/user-signup">User Sign Up</Link>
      <Link href="/org-signup">Org Sign Up</Link>
      <Link href="/user-login">User Login</Link>
      <Link href="/org-login">Org Login</Link>
      <Link href="/whistleblower">Whistleblower</Link>
      <Link href="/apply-loan">Apply Loan</Link>
      <Link href="/discussion-forum">Discussion Forum</Link>
    </div>
  );
}
