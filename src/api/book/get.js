import axios from 'axios'

let ApiGetBook = {}

ApiGetBook.keyword = (word) => {
    if (word !== "") {
        return axios.get("https://www.googleapis.com/books/v1/volumes?q="+word)
        .then(res => {
            if (res.data.totalItems === 0) return []
            return res.data.items
        })
        .catch(err => {
            return []
        })
    } else {
        return []
    }
}


export default ApiGetBook;