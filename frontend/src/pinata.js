import pinataSDK from '@pinata/sdk';

const pinata = pinataSDK(process.env.REACT_APP_PINATA_API_KEY, process.env.REACT_APP_PINATA_API_SECRET);

export default pinata;
