import { createClient } from "redis";

const client = createClient()


client.on("error", (err)=>console.log(err,"failed to connect redis server"))

client.connect().then(()=>{
    console.log("connected to redis server");
}).catch((err)=>{
    console.log(err);
})

export default client;