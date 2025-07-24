import Comments from "@/components/Comments";
import Post from "@/components/Post";
import { app } from "@/firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";

const page = async ({ params }) => {
  let data = {};
  const db = getFirestore(app);

  const querySnapshot = await getDoc(doc(db, 'posts', params.id));

  data = { ...querySnapshot.data(), id: querySnapshot.id };

  return (
    <div className="max-w-xl mx-auto min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <div className="flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700">
        <Link href='/' className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-2">
          <HiArrowLeft className="h-5 w-5" />
        </Link>
        <h2 className="text-lg">Back</h2>
      </div>
      <Post post={data} />
      <Comments id={params.id} />
    </div>
  )
}

export default page
