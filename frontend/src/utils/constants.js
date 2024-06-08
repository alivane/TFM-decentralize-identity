export const SIGNUP_STEPS = [
  "Form",
  "Upload Public Key", 
  "Download File and Verify Sign", 
  "Assign credentials"
];


export const SIGNIN_STEPS = [
  "DID or Upload Public Key", 
  "Download File and Verify Sign"
];

export const SINGLE_CHALLENGE_STEPS = [
  "Load Did Subject", 
  "Download File and Verify Sign"
];


export const VERIFY_CODE_PROCESS = [
  "GENERATE_CODE",
  "CODE_GENERATED",
  "VERIFY_CODE",
];


export const HOME_STEPS = [
  {
    target: '.create_account_button',
    content: 'If you are new here, you can create an account to get started. You have the option to generate a new key pair or register an existing public key.',
  },
  {
    target: '.login_button',
    content: 'If you already have an account, you can start navigating right away. Log in using your registered public key or the DID subject generated by our application.',
  },
];

export const SIGNUP_GUIDE_STEPS = [
  {
    target: '.generate_keys',
    content: 'You need to have a public key to register. You can either generate a new key pair through our application or use an existing public key. If you already have an account, you can start navigating right away. Log in using your registered public key or the DID subject generated by our application.',
  },
  {
    target: '.upload_public_key',
    content: 'Please upload your existing public key here. The file should have a .crt extension and must be RSA format.',
  },
];

export const GENERAL_GUIDE_STEPS =  [
  {
    target: '.enter_did_subject',
    content: 'This is where you can enter your Decentralized Identifier (DID). For example: did:key:6ffc1def15badd32e5e4e2173be3c407.',
  },
  {
    target: '.next_did_button',
    content: 'Once you have entered your DID, you can click on this button. Otherwise, you can proceed with uploading your public key.'
  },
  {
    target: '.upload_public_key',
    content: 'Please upload your existing public key here. The file should have a .crt extension and must be RSA format.',
  },
];

export const DIALOG_GUIDE_STEPS = [
  {
    target: '.upload',
    content: 'To ensure that the file corresponds to the one you intend to upload, please verify its contents and confirm that it matches the file you wish to upload.',
  },
  {
    target: '.cancel',
    content: 'To cancel, simply click the "Cancel" button.',
  },
];

export const SIGNITURE_GUIDE_STEPS = [
  {
    target: '.sign_file',
    content: 'The first step is to download the file code generated by our system. Then, you can sign it with your private key. Make sure to use the private key corresponding to your public key. Here is an example using OpenSSL: "openssl dgst -sha256 -sign PRIVATE_FILE_NAME.pem -out signature_output.signed EXPID_file_challenge.expid"',
  },
  {
    target: '.verify_sign',
    content: `The next step is to upload the file you signed earlier. Please make sure to use your private key. Remember to replace PRIVATE_FILE_NAME.pem with the path to your private key and EXPID_file_challenge.expid with the file you need to sign. UPLOAD THE signature_output.signed FILE GENERATED`,
  },
];

export const COUNTRIES_LIST_LOCATION  =  {
  "Bolivia": [[-69.646927, -22.872919], [-57.453800, -9.680099]],
  "Mexico": [[-118.617720, 14.532601], [-86.593202, 32.718525]],
  "Brazil": [[-73.992530, -33.751251], [-34.729993, 5.272420]],
  "France": [[-5.140554, 41.333740], [9.662021, 51.124214]],
  "China": [[73.499733, 18.159343], [135.041836, 53.560974]],
  "Colombia": [[-79.025833, -4.236000], [-66.853256, 13.524243]],
  "Germany": [[5.988658, 47.270111], [15.016996, 55.058140]],
  "India": [[68.14712, 6.745621], [97.415573, 35.501331]],
  "Canada": [[-140.99778, 41.675105], [-52.648099, 83.23324]],
  "Argentina": [[-73.588070, -55.051201], [-53.530342, -21.780001]],
  "Italy": [[6.619343, 36.649578], [18.51039, 47.092184]],
  "Indonesia": [[95.008682, -11.178401], [141.021896, 6.274191]],
  "United States": [[-179.148909, 18.910361], [-66.93457, 71.5388]],
  "Chile": [[-75.644395, -55.611069], [-66.959991, -17.498371]],
  "Spain": [[-18.160425, 27.640152], [4.327782, 43.791378]],
  "Pakistan": [[60.872972, 23.634499], [77.837451, 37.084107]],
  "Costa Rica": [[-85.941527, 8.050732], [-82.512525, 11.217903]],
  "Peru": [[-81.356529, -18.349259], [-68.677811, -0.012566]],
  "United Kingdom": [[-13.691314, 49.934859], [2.200274, 60.845398]],
  "Japan": [[122.93457, 24.396308], [153.986672, 45.551483]],
  "Australia": [[113.338953, -43.634597], [153.569469, -10.668185]],
  "Nigeria": [[2.692611, 4.24059], [14.680881, 13.885645]],
  "Russia": [[19.66064, 41.151416], [190.10042, 81.2504]],
  "Bangladesh": [[88.084422, 20.670883], [92.672721, 26.631998]],
  "Venezuela": [[-73.37783, 0.724452], [-59.803352, 12.201651]],
  "Thailand": [[97.343747, 5.611802], [105.639991, 20.463175]],
  "South Africa": [[16.344977, -34.819166], [32.830803, -22.091313]],
  "Egypt": [[24.698917, 22.0], [36.86623, 31.58568]],
  "Poland": [[14.122447, 49.002538], [24.145695, 54.903981]],
  "Turkey": [[25.00, 35.00], [44.00, 42.00]]
};


export const COUNTRIES_LIST = [
  "Bolivia",
  "Mexico", 
  "Brazil", 
  "France", 
  "China", 
  "Colombia", 
  "Germany", 
  "India", 
  "Canada", 
  "Argentina", 
  "Italy", 
  "Indonesia", 
  "United States", 
  "Chile", 
  "Spain", 
  "Pakistan", 
  "Costa Rica", 
  "Peru", 
  "United Kingdom", 
  "Japan", 
  "Australia", 
  "Nigeria", 
  "Russia", 
  "Bangladesh", 
  "Venezuela", 
  "Thailand", 
  "South Africa", 
  "Egypt", 
  "Poland", 
  "Germany", 
  "Turkey", 
  "Colombia",
  "Argentina", 
];

export const CURRENCY_BY_COUNTRY = [
  "USD - US Dollar",
"EUR - Euro",
"GBP - British Pound",
"CAD - Canadian Dollar",
"AUD - Australian Dollar",
"JPY - Japanese Yen",
"INR - Indian Rupee",
"NZD - New Zealand Dollar",
"CHF - Swiss Franc",
"ZAR - South African Rand",
"RUB - Russian Ruble",
"BGN - Bulgarian Lev",
"SGD - Singapore Dollar",
"HKD - Hong Kong Dollar",
"SEK - Swedish Krona",
"THB - Thai Baht",
"HUF - Hungarian Forint",
"CNY - Chinese Yuan Renminbi",
"NOK - Norwegian Krone",
"MXN - Mexican Peso",
"DKK - Danish Krone",
"MYR - Malaysian Ringgit",
"PLN - Polish Zloty",
"BRL - Brazilian Real",
"PHP - Philippine Peso",
"IDR - Indonesian Rupiah",
"CZK - Czech Koruna",
"AED - Emirati Dirham",
"TWD - Taiwan New Dollar",
"KRW - South Korean Won",
"ILS - Israeli Shekel",
"ARS - Argentine Peso",
"CLP - Chilean Peso",
"EGP - Egyptian Pound",
"TRY - Turkish Lira",
"RON - Romanian Leu",
"SAR - Saudi Arabian Riyal",
"PKR - Pakistani Rupee",
"COP - Colombian Peso",
"IQD - Iraqi Dinar",
"XAU - Gold Ounce",
"FJD - Fijian Dollar",
"KWD - Kuwaiti Dinar",
"BAM - Bosnian Convertible Mark",
"ISK - Icelandic Krona",
"MAD - Moroccan Dirham",
"VND - Vietnamese Dong",
"JMD - Jamaican Dollar",
"JOD - Jordanian Dinar",
"DOP - Dominican Peso",
"PEN - Peruvian Sol",
"CRC - Costa Rican Colon",
"BHD - Bahraini Dinar",
"BDT - Bangladeshi Taka",
"DZD - Algerian Dinar",
"KES - Kenyan Shilling",
"XAG - Silver Ounce",
"LKR - Sri Lankan Rupee",
"OMR - Omani Rial",
"QAR - Qatari Riyal",
"XOF - CFA Franc",
"IRR - Iranian Rial",
"XCD - East Caribbean Dollar",
"TND - Tunisian Dinar",
"TTD - Trinidadian Dollar",
"XPF - CFP Franc",
"EEK - Estonian Kroon",
"ZMK - Zambian Kwacha",
"ZMW - Zambian Kwacha",
"BBD - Barbadian or Bajan Dollar",
"NGN - Nigerian Naira",
"LBP - Lebanese Pound",
"XAF - Central African CFA Franc BEAC",
"MUR - Mauritian Rupee",
"XPT - Platinum Ounce",
"BSD - Bahamian Dollar",
"ALL - Albanian Lek",
"UYU - Uruguayan Peso",
"BMD - Bermudian Dollar",
"LVL - Latvian Lat",
"UAH - Ukrainian Hryvnia",
"GTQ - Guatemalan Quetzal",
"XDR - IMF Special Drawing Rights",
"BWP - Botswana Pula",
"BOB - Bolivian Bolíviano",
"CUP - Cuban Peso",
"PYG - Paraguayan Guarani",
"HNL - Honduran Lempira",
"LTL - Lithuanian Litas",
"NIO - Nicaraguan Cordoba",
"RSD - Serbian Dinar",
"NPR - Nepalese Rupee",
"HTG - Haitian Gourde",
"PAB - Panamanian Balboa",
"SVC - Salvadoran Colon",
"GYD - Guyanese Dollar",
"KYD - Caymanian Dollar",
"TZS - Tanzanian Shilling",
"CNH - Chinese Yuan Renminbi Offshore",
"CVE - Cape Verdean Escudo",
"FKP - Falkland Island Pound",
"ANG - Dutch Guilder",
"UGX - Ugandan Shilling",
"MGA - Malagasy Ariary",
"GEL - Georgian Lari",
"ETB - Ethiopian Birr",
"MDL - Moldovan Leu",
"VUV - Ni - Vanuatu Vatu",
"SYP - Syrian Pound",
"BND - Bruneian Dollar",
"KHR - Cambodian Riel",
"NAD - Namibian Dollar",
"MKD - Macedonian Denar",
"AOA - Angolan Kwanza",
"PGK - Papua New Guinean Kina",
"MMK - Burmese Kyat",
"KZT - Kazakhstani Tenge",
"MOP - Macau Pataca",
"MZN - Mozambican Metical",
"LYD - Libyan Dinar",
"SLE - Sierra Leonean Leone",
"SLL - Sierra Leonean Leone",
"GNF - Guinean Franc",
"BYN - Belarusian Ruble",
"BYR - Belarusian Ruble",
"GMD - Gambian Dalasi",
"AWG - Aruban or Dutch Guilder",
"AMD - Armenian Dram",
"YER - Yemeni Rial",
"LAK - Lao Kip",
"WST - Samoan Tala",
"MWK - Malawian Kwacha",
"KPW - North Korean Won",
"BIF - Burundian Franc",
"DJF - Djiboutian Franc",
"MNT - Mongolian Tughrik",
"UZS - Uzbekistani Som",
"TOP - Tongan Pa'anga",
"SCR - Seychellois Rupee",
"KGS - Kyrgyzstani Som",
"BTN - Bhutanese Ngultrum",
"SBD - Solomon Islander Dollar",
"GIP - Gibraltar Pound",
"RWF - Rwandan Franc",
"CDF - Congolese Franc",
"MVR - Maldivian Rufiyaa",
"MRU - Mauritanian Ouguiya",
"ERN - Eritrean Nakfa",
"SOS - Somali Shilling",
"SZL - Swazi Lilangeni",
"TJS - Tajikistani Somoni",
"LRD - Liberian Dollar",
"LSL - Basotho Loti",
"SHP - Saint Helenian Pound",
"STN - Sao Tomean Dobra",
"KMF - Comorian Franc",
"SPL - Seborgan Luigino",
"TMT - Turkmenistani Manat",
"SRD - Surinamese Dollar",
"IMP - Isle of Man Pound",
"JEP - Jersey Pound",
"TVD - Tuvaluan Dollar",
"GGP - Guernsey Pound",
"AFN - Afghan Afghani",
"AZN - Azerbaijan Manat",
"BZD - Belizean Dollar",
"CUC - Cuban Convertible Peso",
"GHS - Ghanaian Cedi",
"SDG - Sudanese Pound",
"VES - Venezuelan Bolívar",
"XPD - Palladium Ounce",
"BTC - Bitcoin",
"ADA - Cardano",
"BCH - Bitcoin Cash",
"DOGE - Dogecoin",
"DOT - Polkadot",
"ETH - Ethereum",
"LINK - Chainlink",
"LTC - Litecoin",
"LUNA - Terra",
"UNI - Uniswap",
"XLM - Stellar Lumen",
"XRP - Ripple",
"ZWL - Zimbabwean Dollar",
"HRK - Croatian Kuna (obsolete)",
"ZWD - Zimbabwean Dollar (obsolete)",
"VEF - Venezuelan Bolívar (obsolete)",
"ATS - Austrian Schilling (obsolete)",
"AZM - Azerbaijani Manat (obsolete)",
"BEF - Belgian Franc (obsolete)",
"CYP - Cypriot Pound (obsolete)",
"DEM - German Deutsche Mark (obsolete)",
"ESP - Spanish Peseta (obsolete)",
"FIM - Finnish Markka (obsolete)",
"FRF - French Franc (obsolete)",
"GHC - Ghanaian Cedi (obsolete)",
"GRD - Greek Drachma (obsolete)",
"IEP - Irish Pound (obsolete)",
"ITL - Italian Lira (obsolete)",
"LUF - Luxembourg Franc (obsolete)",
"MGF - Malagasy Franc (obsolete)",
"MRO - Mauritanian Ouguiya (obsolete)",
"MTL - Maltese Lira (obsolete)",
"MZM - Mozambican Metical (obsolete)",
"NLG - Dutch Guilder (obsolete)",
"PTE - Portuguese Escudo (obsolete)",
"ROL - Romanian Leu (obsolete)",
"SDD - Sudanese Dinar (obsolete)",
"SIT - Slovenian Tolar (obsolete)",
"SKK - Slovak Koruna (obsolete)",
"SRG - Surinamese Guilder (obsolete)",
"STD - Sao Tomean Dobra (obsolete)",
"TMM - Turkmenistani Manat (obsolete)",
"TRL - Turkish Lira (obsolete)",
"VAL - Vatican City Lira (obsolete)",
"VEB - Venezuelan Bolívar (obsolete)",
"XEU - European Currency Unit (obsolete)",
]


export const NAME_FIELDS_VC = {
  name: "Name",
  phone: "Phone",
  email: "Email",
  document_id: "Document Number",
  country_of_exchange: "Country of Exchange",
  currency_cost: "Currency Cost",
  currency_cost_value: "Currency Cost Value",
  currency_sell: "Currency Sell",
  currency_sell_value: "Currency Sell Value",
  did_buyer: "Buyer DID",
  did_seller: "Seller DID",
  // id_credential_seller: "Seller Credential ID",
  location: "Location",
  message_to_seller: "Message to Seller",
  time: "Time",
  id: "User DID"
};


export const NAME_FIELDS_SELLER = {
  name: "Name",
  phone: "Phone",
  email: "Email",
  document_id: "Document Number",
  country_of_exchange: "Country of Exchange",
  currency_cost: "Currency Cost",
  currency_cost_value: "Currency Cost Value",
  currency_sell: "Currency Sell",
  currency_sell_value: "Currency Sell Value",
  id: "Buyer DID",
};


export const NAME_FIELDS_BUYER = {
  name: "Name",
  phone: "Phone",
  email: "Email",
  document_id: "Document Number",
  country_of_exchange: "Country of Exchange",
  currency_cost: "Currency Cost",
  currency_cost_value: "Currency Cost Value",
  currency_sell: "Currency Sell",
  currency_sell_value: "Currency Sell Value",
  did_buyer: "Buyer DID",
  did_seller: "Seller DID",
  // id_credential_seller: "Seller Credential ID",
  location: "Location",
  message_to_seller: "Message to Seller",
  time: "Time",
};
