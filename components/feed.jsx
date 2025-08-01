import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore';
import { app } from '../firebase';
import Post from './Post';

export default async function Feed() {
    const db = getFirestore(app);
    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);

    let data = [];
    querySnapshot.forEach((doc) => {
        data.push({
            id: doc.id,
            ...doc.data()
        });
    });

    return (
        <div className="bg-white dark:bg-black text-black dark:text-white">
            {data.map((post) => (
                <Post key={post.id} post={post} id={post.id} />
            ))}
        </div>
    );
}
