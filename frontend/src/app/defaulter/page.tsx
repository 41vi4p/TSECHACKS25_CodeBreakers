import { db } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

async function checkAndUpdateDefaulterStatus() {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach(async (docSnapshot) => {
      const data = docSnapshot.data();
      console.log(data)
      const pendingInstallments = data.pendingInstallments;

      if (pendingInstallments > 4) {
        await updateDoc(doc(db, "users", docSnapshot.id), { defaulter: true });
        console.log(`User ${data.account} marked as defaulter.`);
      } else {
        await updateDoc(doc(db, "users", docSnapshot.id), { defaulter: false });
        console.log(`User ${data.account} is not a defaulter.`);
      }
    });
  } catch (error) {
    console.error("Error checking and updating defaulter status:", error);
  }
}

// Run the function
checkAndUpdateDefaulterStatus();
const Defaulter = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach(async (docSnapshot) => {
      const data = docSnapshot.data();
      console.log(data)
      const pendingInstallments = data.pendingInstallments;
    });
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-3xl">
            <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl shadow-2xl p-6">
            <h1 className="text-2xl font-semibold text-white">Defaulter Status Updated</h1>
           
                {querySnapshot.docs.map((docSnapshot, index) => {
                    const user = docSnapshot.data();
                    return (
                        <div key={index} className="flex justify-between items-center mt-4">
                            <div>
                                <h2 className="text-lg font-semibold text-white">{user.account}</h2>
                                <p className="text-sm text-gray-400">Pending Installments: {user.pendingInstallments}</p>
                                <p className="text-sm text-gray-200">Defaulter Status: {user.defaulter ? "Yes" : "No"}</p>
                            </div>
                        </div>
                    );
                })}
                
            </div>
        </div>
        </div>
    );
};

export default Defaulter;

