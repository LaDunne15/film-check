class TitleService {

    constructor () {
        this.key = "94e8a93e32mshfec3feee4ab31ccp1407c2jsn9e21d1465047"
    }

    async getTitleCustomInfo(id) {
        
        return await fetch(`https://moviesdatabase.p.rapidapi.com/titles/${id}?info=custom_info`, {
            method: "GET",
            headers: {
                'X-RapidAPI-Key': this.key,
                "X-RapidAPI-Host":"moviesdatabase.p.rapidapi.com",
                'Content-Type': 'application/json'
            }
        })
    }


    sayHello() {
        return "Hello!";
    }
}

const titlesService = new TitleService();

export { titlesService };