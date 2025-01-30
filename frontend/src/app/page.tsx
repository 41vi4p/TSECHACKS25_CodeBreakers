// import Link from "next/link";

// export default function Home() {
//   return (
//     <div className="flex flex-col items-center h-screen justify-center text-lg">
//       <Link href="/user-dashboard">User Dashboard</Link>
//       <Link href="/org-dashboard">Org Dashboard</Link>
//       <Link href="/user-signup">User Sign Up</Link>
//       <Link href="/org-signup">Org Sign Up</Link>
//       <Link href="/user-login">User Login</Link>
//       <Link href="/org-login">Org Login</Link>
//       <Link href="/whistleblower">Whistleblower</Link>
//       <Link href="/apply-loan">Apply Loan</Link>
//       <Link href="/discussion-forum">Discussion Forum</Link>
//     </div>
//   );
// }
'use client'
import { getDocs,collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";


const [users, setUsers] = useState<any[]>([]);
useEffect(() => {
const colRef = collection(db, "users");
getDocs(colRef)
  .then((snapshot) => {
    let user: any = [];
    snapshot.docs.forEach((doc) => {
      user.push({ ...doc.data(), id: doc.id });
    });
    setUsers(user);
  })
  .catch((err) => {
    console.log(err.message);
  });
}, []);
