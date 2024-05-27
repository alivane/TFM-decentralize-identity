
import DataService from "./users.js";

const test = await DataService.create(
  {
    did: "12344",
    cid: "cid",
    public_key: ["public1", "public2"],
    last_modified: new Date(),
    email: "mail",
    name: "string,",
    last_name: "string,",
    document_id: "string,",
  }
);

//console.log(test, "=test")

const test1 = await DataService.getByDid("string,");
const test2 = await DataService.getByPublicKey("public2")
//console.log(test1, "=getByDid")
//console.log(test2, "=ali 2")