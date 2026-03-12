import { db, auth } from '../config/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc 
} from 'firebase/firestore';

export const saveUserBudgets = async (budgetsData) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No authenticated user");

    // We will save user budgets as a single document under 'budgets' collection with the ID = user.uid
    // Structure: { 'Moradia': 1500, 'Lazer': 300 }
    await setDoc(doc(db, 'budgets', user.uid), budgetsData);
    
    return budgetsData;
  } catch (error) {
    console.error("Error saving budgets:", error);
    throw error;
  }
};

export const getUserBudgets = async (userId) => {
  try {
    const docRef = doc(db, 'budgets', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return {}; // No budgets defined yet
    }
  } catch (error) {
    console.error("Error fetching budgets:", error);
    throw error;
  }
};
