class TitleService {

    constructor () {
        this.key = "94e8a93e32mshfec3feee4ab31ccp1407c2jsn9e21d1465047"
        this.headers = {
            'X-RapidAPI-Key': this.key,
            "X-RapidAPI-Host":"moviesdatabase.p.rapidapi.com",
            'Content-Type': 'application/json'
        }
    }

    async getTitleCustomInfo(id) {
        
        return await fetch(`https://moviesdatabase.p.rapidapi.com/titles/${id}?info=custom_info`, {
            method: "GET",
            headers: this.headers
        })
    }

    async getTitleAwards(id) {
        return await fetch(`https://moviesdatabase.p.rapidapi.com/titles/${id}?info=awards`, {
            method: "GET",
            headers: this.headers
        })
    }

    async getTitleImages(id) {
        return await fetch(`https://moviesdatabase.p.rapidapi.com/titles/${id}?info=titleMainImages`, {
            method: "GET",
            headers: this.headers
        })
    }


    sayHello() {
        return "Hello!";
    }
}

const titlesService = new TitleService();

export { titlesService };