import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import RingLoader from "react-spinners/RingLoader";

import React from "react";
import ApiGetBook from "../../api/book/get"
import ApiPostBook from "../../api/book/post"

import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

class BookWishlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            loading : false,
            errGetBook : false,
            getWishlist : [],
            update : false
        };

        this.dataBook = []
        this.handleDeleteWishlist = this.handleDeleteWishlist.bind(this);
    }

    componentDidMount() {
        this.getBook()
    }

    componentDidUpdate() {
        if (this.state.update) {
            this.getBook()
        }
    }

    async handleDeleteWishlist(e) {
        if (localStorage.getItem('idBrowser') !== null) {
            const idBook = e.currentTarget.dataset.id;
            let jsonBook = {}

            for (const key in this.dataBook) {
                if (Object.hasOwnProperty.call(this.dataBook, key)) {
                    const ele = this.dataBook[key];
                    if (idBook === ele.id) {
                        jsonBook = ele
                        break;
                    }
                }
            }

            let postBook = await ApiPostBook.delWishlist(localStorage.getItem('idBrowser'),jsonBook)

            if (postBook.status === 200 && postBook !== false) {
                Store.addNotification({
                    title: "Success!",
                    message: postBook.message,
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 3000,
                      onScreen: true
                    }
                });
            } else {
                Store.addNotification({
                    title: "Warning!",
                    message: postBook.message,
                    type: "warning",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 3000,
                      onScreen: true
                    }
                });
            }

            this.setState({update:true})
        }
    }


    async getBook() {
        this.setState({update:false})
        this.setState({errGetBook : false})
        this.setState({loading:true})
        if (localStorage.getItem('idBrowser') !== null) {
            let getBook = await ApiGetBook.wishlist(localStorage.getItem("idBrowser"))

            this.setState({loading:false})

            if (getBook.length === 0 && getBook !== false) {
                this.setState({errGetBook : true})
            } else {
                let tempData = []

                for (const key in getBook) {
                    if (Object.hasOwnProperty.call(getBook, key)) {
                        const ele = getBook[key].dataJson;
                        this.dataBook.push(ele)
                        tempData.push(
                            <div key={key}>
                                <div className={"columns"}>
                                    <div className={"column is-2 mt-3"}>
                                        <img alt={ele.image_alt} src={ele.image} />
                                    </div>
                                    <div className={"column is-full has-text-left mt-3"}>
                                        <h3>Judul : {ele.title}</h3>
                                    
                                        <h3>Authors : {ele.author}</h3>
                                        <br />
                                        <Rater total={5} rating={ele.rating} />
                                        <h3>Rating : {ele.rating_count}</h3>
                                        <button data-id={ele.id} onClick={this.handleDeleteWishlist}  className={"button is-danger mt-3"}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }
                
                this.setState({getWishlist:tempData})
            }
        } else {
            this.setState({loading:false})
            this.setState({errGetBook : true})
        }
    }

    render() {
        return (
            <div>
                <ReactNotifications />

                <div className={"columns"}>
                    <div className={"column is-full"}>
                        <h2 className={'has-text-weight-bold'}>WISHLIST BOOK</h2>
                    </div>
                </div>

                <div className={"columns"}>
                    <div className={"column is-full"}>
                        <RingLoader color={"#088500"} loading={this.state.loading} size={40} />
                        <h2 className={'has-text-weight-bold '+(this.state.errGetBook ? '' : 'is-hidden')}>Maaf, Wishlist tidak tersedia. Silakan tambahan buku ke dalam wishlist</h2>
                    </div>
                </div>

                <div className={'container'}>
                    { this.state.getWishlist }
                </div>
                
            </div>
        )
    }
}

// volumeInfo > averageRating , ratingsCount (bisa undefined)
// volumeInfo > title (string)
// volumeInfo > authors (array <string>)
// volumeInfo > imageLinks (object : smallThumbnail<string> , object : thumbnail <string> ) (cek undifined)

export default BookWishlist;