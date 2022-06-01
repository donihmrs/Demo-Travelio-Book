import React from "react";

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    render() {
        return (
            <footer className={"footer"}>
                <div className={"content has-text-centered"}>
                    <p>
                        <strong>Demo Test Travelio</strong> by <a href="https://tokocoding.com">Doni Syahroni</a>. The source code is licensed
                    </p>
                </div>
            </footer>
        )
    }
}


export default Footer;