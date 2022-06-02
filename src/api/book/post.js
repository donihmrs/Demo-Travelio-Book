import axios from 'axios'

let ApiPostBook = {}

ApiPostBook.wishlist = (id, book) => {
    let postData = {}
    postData['idBrowser'] = id
    postData['jsonBook'] = book

    if (book !== {}) {
        return axios.post(process.env.REACT_APP_API+"/v1/book/saveWishlist",postData)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return false
        })
    }
}

ApiPostBook.delWishlist = (id, book) => {
    let postData = {}
    postData['idBrowser'] = id
    postData['jsonBook'] = book

    if (book !== {}) {
        return axios.post(process.env.REACT_APP_API+"/v1/book/delWishlist",postData)
        .then(res => {
            return res.data
        })
        .catch(err => {
            return false
        })
    }
}

export default ApiPostBook;