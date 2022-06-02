import axios from 'axios'

let ApiGetBook = {}

ApiGetBook.keyword = (word) => {
    if (word !== "") {
        return axios.get(process.env.REACT_APP_API+"/v1/book/apiBook?word="+word)
        .then(res => {
            if (res.data.status !== 200) return []
            return res.data.data
        })
        .catch(err => {
            return []
        })
    } else {
        return []
    }
}

ApiGetBook.wishlist = (id) => {
    if (id !== "") {
        return axios.get(process.env.REACT_APP_API+"/v1/book/wishlist?id="+id)
        .then(res => {
            return res.data.data
        })
        .catch(err => {
            return false
        })
    }
}

export default ApiGetBook;