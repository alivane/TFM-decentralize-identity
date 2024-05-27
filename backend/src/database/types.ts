export interface IUserData {
  did: string;
  cid: string;
  public_key: string[];
  last_modified: Date;
  email: string;
  name: string;
  last_name: string;
  document_id: string;
}


export interface ICurrencyExchange {
  id_credential: string;
  did_subject: string;
  currency_sell: string;
  currency_sell_value: string;
  currency_cost_value: string;
  currency_cost: string;
  country_of_exchange: string;
}

// types.js
export interface IContractCurrency {
  did_buyer: string;
  did_seller: string;
  id_credential_seller: string;
  id_credential_buyer: string;
  message_to_seller: string;
  currency_sell: string;
  currency_sell_value: string;
  currency_cost_value: string;
  currency_cost: string;
  country_of_exchange: string;
  location: [number, number];
  time: string;
}
