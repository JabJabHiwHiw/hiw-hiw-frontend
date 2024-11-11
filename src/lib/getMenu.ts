export default async function getMenu(id:string){
    //const menu_url = process.env.MENU_SERVICE_ENDPOINT
    const menu_url = 'http://137.184.249.83/food/menu'
    console.log("menu_url = " + menu_url)
    const response = await fetch(`${menu_url}/${id}`)
    if (!response.ok){
        throw new Error("Failed to fetch a menu")
    }
    return await response.json()
}