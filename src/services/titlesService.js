class TitleService {

    constructor () {
        this.key =`${process.env.REACT_APP_API_KEY}`;
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

    async getTitlesPrincipalCastByIds(ids) {
        return await fetch(`https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList=${ids}&info=principalCast`, {
            method: "GET",
            headers: this.headers
        })
    }

    async getTitlesExtendedCastByIds(ids) {
        return await fetch(`https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList=${ids}&info=extendedCast`, {
            method: "GET",
            headers: this.headers
        })
    }

    async getTitlesByName(name,page) {
        return await fetch(`https://moviesdatabase.p.rapidapi.com/titles/search/title/${name}?sort=year.decr&exact=false&info=custom_info&limit=30&page=${page}`, {
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