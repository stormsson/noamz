import { readJSON, writeJSON } from 'https://deno.land/x/flat/mod.ts'

// The filename is the first invocation argument
const filename = Deno.args[0] // Same name as downloaded_filename
const data = await readJSON(filename)
const savedMetadata = await readJSON('data/metadata.json')

const tokenIdsToRefetch = [];
data.nfts.forEach(element => {
    const tokenId = element.id.tokenId;    
    console.log(tokenId," ==> ",element.error? element.error: "OK")    
    if(savedMetadata.nft_metadata[tokenId] === undefined) {
        if(!element.error) {
            savedMetadata.nft_metadata[tokenId] =  element.metadata;
        } else {            
            tokenIdsToRefetch.push(tokenId);
        }
    }
});


for (let i = 0; i < tokenIdsToRefetch.length; i++) {
    const tokenId = tokenIdsToRefetch[i];
    const fetchUrl = Deno.env.get('ALCHEMY_BASEURL') + "/getNFTMetadata?contractAddress="
            +Deno.env.get('CONTRACT_ADDRESS')
            +"&tokenId="+tokenId
            +"&tokenUriTimeoutInMs=0";
            
    console.log("I would fetch:  ",fetchUrl)
    const response = await fetch(fetchUrl);
    const element = await response.json();
    savedMetadata.nft_metadata[tokenId] =  element.metadata;
}


// console.log(config);
await writeJSON('data/metadata.json', savedMetadata)


// Pluck a specific key off
// and write it out to a different file
// Careful! any uncaught errors and the workflow will fail, committing nothing.
// const newfile = `subset_of_${filename}`