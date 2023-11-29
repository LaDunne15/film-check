class LocalStorageService {

    addTitle(id) {
        const titles = this.getTitles().filter(item => item !== id);
        titles.unshift(id);
        localStorage.setItem('titles',JSON.stringify(titles.slice(0,10)));
        return titles;
    }

    clearTitles() {
        localStorage.setItem('titles',JSON.stringify([]));
        return [];
    }

    getTitles() {
        const titles = localStorage.getItem('titles');
        return titles?JSON.parse(titles):[];
    }

}

const localStorageService = new LocalStorageService();

export { localStorageService };