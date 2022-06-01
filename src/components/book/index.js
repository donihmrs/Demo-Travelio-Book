import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import RingLoader from "react-spinners/RingLoader";

import React from "react";
import ApiGetBook from "../../api/book/get"

class BookIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            valSearch : "",
            loading : false,
            errGetBook : false,
            dataBook : []
        };

        this.authorName = ""
        this.handleTrack = this.handleTrack.bind(this);
        this.handleSearchPress = this.handleSearchPress.bind(this);
        this.handleBtnSearch = this.handleBtnSearch.bind(this);
        this.handleSaveWishlist = this.handleSaveWishlist.bind(this);
    }

    async getBook() {
        this.setState({errGetBook : false})
        this.setState({loading:true})
        let getBook = await ApiGetBook.keyword(this.state.valSearch)

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

                    // eslint-disable-next-line
                    {
                        this.authorName = "" 
                    }

                    if (ele.volumeInfo !== undefined) {
                        const data = ele.volumeInfo
                        tempData.push(
                                <div key={key}>
                                    <div className={"columns"}>
                                        <div className={"column is-2 mt-3"}>
                                            {
                                                (data.imageLinks !== undefined ?  
                                                <img alt={data.title} src={(data.imageLinks.thumbnail !== undefined ? data.imageLinks.thumbnail : data.smallThumbnail)} /> : 
                                                <img alt='not' src='https://www.totalsupply.com.au/assets/Uploads/220984-200.png' /> )
                                            }
                                        
                                        </div>
                                        <div className={"column is-full has-text-left mt-3"}>
                                            <h3>Judul : {(data.title === undefined ? "-" : data.title)}</h3>
                                            { 
                                                (data.authors !== undefined ? 
                                                    data.authors.forEach(author => {
                                                        this.authorName += author + ", "
                                                    })
                                                : "")
                                            }

                                            <h3>Authors : {(this.authorName === "" ? "Not Show" : this.authorName)}</h3>
                                            <br />
                                            <Rater total={5} rating={(data.averageRating === undefined ? 0 : data.averageRating)} />
                                            <h3>Rating : {(data.ratingsCount === undefined ? 0 : data.ratingsCount)}</h3>
                                            <button data-id={key} onClick={this.handleSaveWishlist}  className={"button is-danger mt-3"}>Wishlist</button>
                                        </div>
                                    </div>
                                </div>
                        )
                    }
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

    handleSaveWishlist(e) {

    }

    render() {
        return (
            <div>
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