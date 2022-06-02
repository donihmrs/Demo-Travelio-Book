import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import RingLoader from "react-spinners/RingLoader";

import React from "react";
import ApiGetBook from "../../api/book/get"
import ApiPostBook from "../../api/book/post"

import { v4 as uuidv4 } from 'uuid';
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

class BookIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            valSearch : "",
            loading : false,
            errGetBook : false,
            dataBook : []
        };

        this.handleTrack = this.handleTrack.bind(this);
        this.handleSearchPress = this.handleSearchPress.bind(this);
        this.handleBtnSearch = this.handleBtnSearch.bind(this);
        this.handleSaveWishlist = this.handleSaveWishlist.bind(this);
        this.dataBook = []
    }

    async getBook() {
        this.setState({errGetBook : false})
        this.setState({loading:true})
        let getBook = await ApiGetBook.keyword(this.state.valSearch)

        this.dataBook = getBook

        this.setState({loading:false})
        if (getBook.length === 0) {
            this.setState({errGetBook : true})
            this.setState({valSearch : "" })
            this.setState({dataBook:[]})
        } else {
            let tempData = []

            for (const key in getBook) {
                if (Object.hasOwnProperty.call(getBook, key)) {
                    const ele = getBook[key];
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
                                    <button data-id={ele.id} onClick={this.handleSaveWishlist}  className={"button is-danger mt-3"}>Wishlist</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            }
            
            this.setState({dataBook:tempData})
        }
    }

    handleTrack(e) {
        this.setState({valSearch : e.target.value })
    };

    handleBtnSearch(e) {
        this.handleTrack(e);
        this.getBook()
        e.preventDefault();
    }

    handleSearchPress(e) {
        if (e.key === "Enter") {
          this.handleTrack(e);
          this.getBook()
          e.preventDefault();
        }
    };

    async handleSaveWishlist(e) {
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

            let postBook = await ApiPostBook.wishlist(localStorage.getItem('idBrowser'),jsonBook)

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
        }
    }

    render() {
        if (localStorage.getItem('idBrowser') === null) {
            localStorage.setItem('idBrowser',uuidv4())
        }
        
        return (
            <div>
                <ReactNotifications />

                <div className={"columns p-5"}>
                    <div className={"column is-3 mt-3"}>
                        <h3>Silakan cari judul buku yang anda inginkan : </h3>
                    </div>
                    <div className={"column is-3 mt-2"}>
                        <input onKeyPress={this.handleSearchPress} value={this.state.valSearch} onChange={this.handleTrack} className={"input is-primary"} type="text" placeholder="Contoh : Doraemon" />
                    </div>
                    <div className={"buttons column is-1 mt-2"}>
                        <button type='button' onClick={this.handleBtnSearch} className={"button is-primary"}>Search</button>
                    </div>
                    
                    <div className={"column is-full"}></div>
                </div>

                <div className={"columns"}>
                    <div className={"column is-full"}>
                        <h2 className={'has-text-weight-bold'}>DAFTAR BUKU</h2>
                    </div>
                </div>

                <div className={"columns"}>
                    <div className={"column is-full"}>
                        <RingLoader color={"#088500"} loading={this.state.loading} size={40} />
                        <h2 className={'has-text-weight-bold '+(this.state.errGetBook ? '' : 'is-hidden')}>Maaf, Judul buku tidak ditemukan</h2>
                    </div>
                </div>

                <div className={'container'}>
                    { this.state.dataBook }
                </div>
                
            </div>
        )
    }
}

// volumeInfo > averageRating , ratingsCount (bisa undefined)
// volumeInfo > title (string)
// volumeInfo > authors (array <string>)
// volumeInfo > imageLinks (object : smallThumbnail<string> , object : thumbnail <string> ) (cek undifined)

export default BookIndex;