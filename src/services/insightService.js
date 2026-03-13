import { db } from '../config/firebase';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';

/**
 * Busca um insight cacheado para um determinado mês/ano.
 */
export const getCachedInsight = async (userId, month, year) => {
  try {
    const id = `${userId}_${month}_${year}`;
    const docRef = doc(db, 'insights', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().text;
    }
    return null;
  } catch (error) {
    console.error("Error getting cached insight:", error);
    return null;
  }
};

/**
 * Salva um insight no cache.
 */
export const saveInsightToCache = async (userId, month, year, text) => {
  try {
    const id = `${userId}_${month}_${year}`;
    const docRef = doc(db, 'insights', id);
    await setDoc(docRef, {
      userId,
      month,
      year,
      text,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error saving insight to cache:", error);
  }
};
