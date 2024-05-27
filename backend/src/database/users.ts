import firebase from "./index.js";
import {IUserData} from "./types.js"

const db = firebase.ref("/users");

class DataService {
  getAll() {
    return db;
  }

  create(userData: IUserData) {
    return db.child(userData.did).set(userData);
  }

  update(key: string, value: any) {
    return db.child(key).update(value);
  }

  delete(key: string) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
  
  getByDidAndPublicKey(did: string, publicKey: string): Promise<IUserData | null> {
    return new Promise((resolve, reject) => {
      db.orderByChild("did").equalTo(did).once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const userData: IUserData = childSnapshot.val();
          if (userData.public_key && userData.public_key.includes(publicKey)) {
            resolve(userData);
            return;
          }
          if (Array.isArray(userData.public_key) && userData.public_key.includes(publicKey)) {
            resolve(userData);
            return;
          }
        });
        resolve(null); // User not found
      }, (error) => {
        reject(error); // Error handling
      });
    });
  }

  getByDid(did: string): Promise<IUserData | null> {
    return new Promise((resolve, reject) => {
      db.orderByChild("did").equalTo(did).once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const userData: IUserData = childSnapshot.val();
          resolve(userData);
          return;
        });
        resolve(null); // User not found
      }, (error) => {
        reject(error); // Error handling
      });
    });
  }

  getByPublicKey(publicKey: string): Promise<IUserData | null> {
    //console.log(publicKey, "=publicKeypublicKeypublicKeypublicKeypublicKey")
    return new Promise((resolve, reject) => {
      db.once("value", (snapshot) => {
        let userFound: IUserData | null = null;
  
        snapshot.forEach((childSnapshot) => {
          const userData: IUserData = childSnapshot.val();
  
          if (Array.isArray(userData.public_key) && userData.public_key.includes(publicKey)) {
            userFound = userData;
            return true; // Breaks the forEach loop
          }
        });
  
        resolve(userFound);
      }, (error) => {
        reject(error); // Error handling
      });
    });
  }
  
}

export default new DataService();