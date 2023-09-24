class TitleService {

    constructor () {
        this.key = "94e8a93e32mshfec3feee4ab31ccp1407c2jsn9e21d1465047";
        //this.key =   "6d36728c7bmshba73de4d4b3f21fp1ce1c3jsn60a4b7f90e12";
        this.headers = {
            'X-RapidAPI-Key': this.key,
            "X-RapidAPI-Host":"moviesdatabase.p.rapidapi.com",
            'Content-Type': 'application/json',
            "Permissions-Policy":"ch-ua-form-factor"
        }
    }

    async getTitlesByIds(ids) {
        return await fetch(`https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList=${ids}&info=custom_info`, {
            method: "GET",
            headers: this.headers
        })
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

    async getTitleCountries(id) {
        return await fetch(`https://moviesdatabase.p.rapidapi.com/titles/${id}?info=countriesOfOrigin`, {
            method: "GET",
            headers: this.headers
        })
    }

    async getTitlePrincipalCast(id) {
        return await fetch(`https://moviesdatabase.p.rapidapi.com/titles/${id}?info=principalCast`, {
            method: "GET",
            headers: this.headers
        })
    }

    async getTopBoxOfficeLastWeekend() {
        return await fetch(`https://moviesdatabase.p.rapidapi.com/titles?list=top_boxoffice_last_weekend_10`, {
            method: "GET",
            headers: this.headers
        })
    }

    async getTitleExtendedCast(id) {
        return await fetch(`https://moviesdatabase.p.rapidapi.com/titles/${id}?info=extendedCast`, {
            method: "GET",
            headers: this.headers
        })
    }

    async getTitlSummaries(id) {
        return await fetch(`https://moviesdatabase.p.rapidapi.com/titles/${id}?info=summaries`, {
            method: "GET",
            headers: this.headers
        })
    }

    async getTitlRevenueBudget(id) {
        return await fetch(`https://moviesdatabase.p.rapidapi.com/titles/${id}?info=revenue_budget`, {
            method: "GET",
            headers: this.headers
        })
    }

    async getTitleMoreLikeThis(id) {
        return await fetch(`https://moviesdatabase.p.rapidapi.com/titles/${id}?info=moreLikeThisTitles`, {
            method: "GET",
            headers: this.headers
        })
    }

    async getActorById(id) {
        return await fetch(`https://moviesdatabase.p.rapidapi.com/actors/${id}`, {
            method: "GET",
            headers: this.headers
        })
    }
    

}

const titlesService = new TitleService();

export { titlesService };