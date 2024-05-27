// DataService.js
import firebase from "./index.js";
import { ICurrencyExchange } from "./types.js";

const exchangesDb = firebase.ref("/currency_exchanges");

class DataService {
  getAllExchanges() {
    return exchangesDb;
  }

  createExchange(exchangeData: ICurrencyExchange) {
    const newExchangeRef = exchangesDb.push(); // Automatically generates a unique key
    return newExchangeRef.set(exchangeData);
  }

  updateExchange(key: string, value: any) {
    return exchangesDb.child(key).update(value);
  }

  deleteExchange(key: string) {
    return exchangesDb.child(key).remove();
  }

  deleteAllExchanges() {
    return exchangesDb.remove();
  }

  getExchangeByIdCredential(id_credential: string): Promise<ICurrencyExchange | null> {
    return new Promise((resolve, reject) => {
      exchangesDb.orderByChild("id_credential").equalTo(id_credential).once("value", (snapshot) => {
        let exchangeFound: ICurrencyExchange | null = null;

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

  searchByCountryAndSellValue(country: string, currencySell: string[]): Promise<ICurrencyExchange[]> {
    return new Promise((resolve, reject) => {
      exchangesDb.orderByChild("country_of_exchange").equalTo(country).once("value", (snapshot) => {
        const results: ICurrencyExchange[] = [];

        snapshot.forEach((childSnapshot) => {
          const exchangeData: ICurrencyExchange = childSnapshot.val();
          
          // Check if exchangeData.currency_sell is in the currencySell array
          if (currencySell.includes(exchangeData.currency_sell)) {
            results.push(exchangeData);
          }
        });

        resolve(results);
      }, (error) => {
        reject(error); // Error handling
      });
    });
  }
  
  getExchangesByDID(did: string): Promise<ICurrencyExchange[]> {
    return new Promise((resolve, reject) => {
      exchangesDb.orderByChild("did_subject").equalTo(did).once("value", (snapshot) => {
        const results: ICurrencyExchange[] = [];

        snapshot.forEach((childSnapshot) => {
          const exchangeData: ICurrencyExchange = childSnapshot.val();
          results.push(exchangeData);
        });

        resolve(results);
      }, (error) => {
        reject(error); // Error handling
      });
    });
  }
}

export default new DataService();
