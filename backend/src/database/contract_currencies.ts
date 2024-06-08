// DataService.js
import firebase from "./index.js";
import { IContractCurrency } from "./types.js";

const exchangesDb = firebase.ref("/contract_currencies");

class DataService {
  getAllExchanges() {
    return exchangesDb;
  }

  create(exchangeData: IContractCurrency) {
    const newExchangeRef = exchangesDb.push(); // Automatically generates a unique key
    return newExchangeRef.set(exchangeData);
  }

  updateExchange(key: string, value: Partial<IContractCurrency>) {
    return exchangesDb.child(key).update(value);
  }

  deleteExchange(key: string) {
    return exchangesDb.child(key).remove();
  }

  deleteAllExchanges() {
    return exchangesDb.remove();
  }

  getExchangeByIdCredential(id_credential: string): Promise<IContractCurrency | null> {
    return new Promise((resolve, reject) => {
      exchangesDb.orderByChild("id_credential").equalTo(id_credential).once("value", (snapshot) => {
        let exchangeFound: IContractCurrency | null = null;

        snapshot.forEach((childSnapshot) => {
          exchangeFound = childSnapshot.val();
          return true; // Breaks the forEach loop
        });

        resolve(exchangeFound);
      }, (error) => {
        reject(error); // Error handling
      });
    });
  }

  getContractsByDID(did: string): Promise<IContractCurrency[]> {
    return new Promise((resolve, reject) => {
      exchangesDb.orderByChild("did_buyer").equalTo(did).once("value", (snapshot) => {
        const results: IContractCurrency[] = [];

        snapshot.forEach((childSnapshot) => {
          const exchangeData: IContractCurrency = childSnapshot.val();
          results.push(exchangeData);
        });

        resolve(results);
      }, (error) => {
        reject(error); // Error handling
      });
    });
  }

  deleteByDID(did: string): Promise<void> {
    return new Promise((resolve, reject) => {
      exchangesDb.orderByChild('did_buyer').equalTo(did).once('value', (snapshot) => {
        const updates: { [key: string]: null } = {};
  
        snapshot.forEach((childSnapshot) => {
          updates[childSnapshot.key as string] = null;
        });
  
        exchangesDb.update(updates)
          .then(() => resolve())
          .catch((error) => reject(error));
      }, (error) => {
        reject(error); // Error handling
      });
    });
  }
}

export default new DataService();
