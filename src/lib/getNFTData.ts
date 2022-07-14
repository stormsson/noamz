export async function getNFTData() {

    const url = `${process.env.ALCHEMY_BASEURL}/getNFTsForCollection?` + new URLSearchParams({
        contractAddress:`${process.env.CONTRACT_ADDRESS}`,
        startToken:"0",
        withMetadata:"true"
    })
    let data: any = {};
    try {
       data = await fetch(url).then(res => res.json())
    } 
    catch (error: any) {
        console.log(error);
    }
    return data;
}