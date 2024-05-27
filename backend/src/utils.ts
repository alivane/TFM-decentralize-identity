import pako from 'pako';


export const getSpecificFields = (data: any, dataFrom: any) => {

  //console.log(data, "====data")
  //console.log(dataFrom, "data from ====")
    let response: any = {};
    for (let index in data) {
      const field: string = data[index];
      response[field] = dataFrom[field]; 
    }

    return response
}

export const reconstructData = (decodedData: any): any => {
  return pako.inflate(decodedData, { to: 'string' });
};
