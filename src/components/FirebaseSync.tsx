import React, { useEffect, useState } from 'react';
import { auth, db, loginAnonymously, logout } from '../lib/firebase';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { userStore } from '../utils/userStore';

const SYNC_KEYS = [
  'murphy_grammar_completed_units',
  'murphy_grammar_quiz_results',
  'murphy_grammar_exercise_attempts',
  'duo_user_xp',
  'duo_user_gems',
  'duo_user_hearts',
  'duo_user_streak',
  'kafa_all_users_registry',
  'kafa_current_user_id'
];

let isSyncingFromServer = false;

// Monkey-patch localStorage to intercept writes and push to cloud
const originalSetItem = localStorage.setItem;
export const overrideLocalStorage = (userUid: string) => {
  localStorage.setItem = async function(key, value) {
    originalSetItem.apply(this, arguments as any);
    
    if (SYNC_KEYS.includes(key) && !isSyncingFromServer) {
      try {
        // We use merge: true so we don't overwrite other keys that might not have changed yet
        await setDoc(doc(db, 'user_data', userUid), {
          [key]: value,
          lastUpdatedAt: Date.now()
        }, { merge: true });
      } catch (error) {
        console.error("Firebase sync error:", error);
      }
    }
  };
};

export const restoreLocalStorage = () => {
  localStorage.setItem = originalSetItem;
};

export const FirebaseSync: React.FC = () => {
  useEffect(() => {
    // Automatically log in anonymously in the background
    loginAnonymously().catch(console.error);

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Prefer syncing to the local UserStore ID if available, otherwise fallback to Auth UID
        const syncId = userStore.getCurrentUser().id || currentUser.uid;
        overrideLocalStorage(syncId);
        
        // On first connection, check if there's cloud data. If not, upload current local data.
        try {
          const docSnap = await getDoc(doc(db, 'user_data', syncId));
          if (!docSnap.exists()) {
            const localData: any = { lastUpdatedAt: Date.now() };
            SYNC_KEYS.forEach(key => {
              const val = localStorage.getItem(key);
              if (val) localData[key] = val;
            });
            await setDoc(doc(db, 'user_data', syncId), localData);
          }
        } catch(e) {}

        // Listen for real-time cloud changes
        const unsubSnapshot = onSnapshot(doc(db, 'user_data', syncId), (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            isSyncingFromServer = true;
            let needsReload = false;
            
            SYNC_KEYS.forEach(key => {
              if (data[key] && localStorage.getItem(key) !== data[key]) {
                originalSetItem.call(localStorage, key, data[key]);
                needsReload = true;
              }
            });
            
            isSyncingFromServer = false;
            
            // If data changed from cloud, we reload to reflect in React state safely
            if (needsReload) {
              window.location.reload();
            }
          }
        }, (error) => {
          console.error("Snapshot error", error);
        });
        
        return () => unsubSnapshot();
      } else {
        restoreLocalStorage();
      }
    });

    return () => {
      unsubscribeAuth();
      restoreLocalStorage();
    };
  }, []);

  // Return null to hide the component entirely from the UI
  return null;
};
