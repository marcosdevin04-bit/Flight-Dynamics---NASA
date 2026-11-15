// Independent minute windows per client in each running server instance.
const windowMs=60_000, maximum=15;
export function makeLimiter() {
  const clients=new Map<string,{expires:number,count:number}>();
  let nextSweep=0;
  return (client:string,now=Date.now())=>{
    if(now>=nextSweep){for(const [key,entry] of clients)if(entry.expires<=now)clients.delete(key);nextSweep=now+windowMs;}
    let entry=clients.get(client);
    if(!entry || entry.expires<=now){entry={expires:now+windowMs,count:0};clients.set(client,entry);}
    if(entry.count>=maximum)return Math.max(1,Math.ceil((entry.expires-now)/1000));
    entry.count++;return 0;
  };
}
export const limit=makeLimiter();
