import { db, auth } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  getDocs,
  orderBy 
} from 'firebase/firestore';

const COLLECTION_NAME = 'transactions';

export const addTransaction = async (transactionData) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No authenticated user");

    const newDocRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...transactionData,
      userId: user.uid, // Ensure it's tied to current user
      createdAt: new Date().toISOString()
    });
    
    return { id: newDocRef.id, ...transactionData, userId: user.uid };
  } catch (error) {
    console.error("Error adding transaction:", error);
    throw error;
  }
};

export const getUserTransactions = async (userId) => {
  try {
    // Note: To use orderBy with where, Firebase requires a composite index.
    // For simplicity right now, we will fetch and sort in memory, or just rely on the React state.
    const q = query(
      collection(db, COLLECTION_NAME), 
      where("userId", "==", userId)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export const deleteTransaction = async (id) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
};
