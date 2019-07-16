import React from 'react';

class AppItemList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            newUrl: "",
            optionList: ["https://www.amazon.com", "https://www.netflix.com", "https://www.ted.com/#/", "https://www.youtube.com/"],
            selectedOption: "",
            newInterval: "",
            displayInterval: 10,
            myWindow: null,
            loop: 0
        };
    }

    handleChange = (event) => {
        this.setState({ selectedOption: event.target.value });
    }

    handleChangeUrl = (event) => {
        this.setState({ newUrl: event.target.value });
    }

    handleChangeInterval = (event) => {
        this.setState({ newInterval: event.target.value });
    }

    componentDidMount() {
        this.setState({ selectedOption: this.state.optionList[0] })
    }

    moveUpOption = () => {
        //get Index of url
        const index = this.state.optionList.indexOf(this.state.selectedOption);

        if (index > 0) {
            let nextOptionList = [...this.state.optionList];
            const temp = nextOptionList[index - 1];
            nextOptionList[index - 1] = nextOptionList[index];
            nextOptionList[index] = temp;
            this.setState({
                optionList: nextOptionList
            })
        }
    }

    moveDownOption = () => {
        const index = this.state.optionList.indexOf(this.state.selectedOption);

        if (index < this.state.optionList.length - 1) {
            let nextOptionList = [...this.state.optionList];
            const temp = nextOptionList[index + 1];
            nextOptionList[index + 1] = nextOptionList[index];
            nextOptionList[index] = temp;
            this.setState({
                optionList: nextOptionList,
            })
        }
    }

    deleteOption = () => {
        const index = this.state.optionList.indexOf(this.state.selectedOption);
        let nextOptionList = [...this.state.optionList];
        if (index >= 0) {
            nextOptionList.splice(index, 1);
            this.setState({
                optionList: nextOptionList,
                selectedOption: nextOptionList[0]
            })
        }

    }

    addUrl = () => {
        let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(this.state.newUrl)) {
            let nextOptionList = [...this.state.optionList];
            nextOptionList.push(this.state.newUrl);
            this.setState({
                optionList: nextOptionList,
                newUrl: ""
            })
        } else {
            alert("Wrong URL format")
        }
        this.setState({ newUrl: "" })

    }

    setPlayInterval = () => {
        if (isNaN(this.state.newInterval)) {
            alert("Wrong Input, Please Enter a valid number")
        }
        else {
            this.setState({ displayInterval: this.state.newInterval, newInterval: "" })
        }


    }

    launchNavigate = () => {
        let i = 0;
        let urlList = [...this.state.optionList];
        if (this.state.myWindow != null) {
            this.state.myWindow.close();
            clearInterval(this.state.loop);
        }

        this.setState({
            myWindow: window.open(urlList[0], "_blank")
        })



        let that = this;

        //console.log("Is myWindow null: " + (that.state.myWindow.location));

        this.setState({
            loop: setInterval(function () {
                i++;
                //console.log("this.state.myWindow.location: " + this.state.myWindow);
                if (i >= urlList.length) {
                    i = 0;
                }
                console.log(i);
                that.state.myWindow.location = urlList[i];
            }, this.state.displayInterval * 1000)
        })

    }

    render() {

        return (
            <div>
                {/* First Row */}
                <div className="row">
                    <div className="col-11">
                        <select
                            className="custom-select"
                            size="10"
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                        >
                            {this.state.optionList.map((item, index) => {
                                return <option key={index}>{item}</option>
                            })}
                        </select>
                    </div>
                    <div className="col-1">
                        <button className="btn btn-light" style={{ marginTop: '30px' }} onClick={this.moveUpOption}>Up</button>
                        <button className="btn btn-light" style={{ marginTop: '30px' }} onClick={this.deleteOption}>Delete</button>
                        <button className="btn btn-light" style={{ marginTop: '30px' }} onClick={this.moveDownOption}>Down</button>
                    </div>
                </div>

                <br></br>
                <br></br>

                <div className="row">
                    <div className="col-5">
                        <div className="form-group">
                            <input
                                type="url"
                                className="form-control"
                                id="new-option"
                                placeholder="Add a new url"
                                value={this.state.newUrl}
                                onChange={this.handleChangeUrl}
                            ></input>
                        </div>
                    </div>
                    <div className="col-2">
                        <button className="btn btn-light btn-block" onClick={this.addUrl}>Add URL</button>
                    </div>
                    <div className="col-1">
                        <button className="btn btn-light btn-block" onClick={this.setPlayInterval}>Set</button>
                    </div>
                    <div className="col-2">
                        <input type="text"
                            className="form-control mb-2 mr-sm-2"
                            id="interval"
                            placeholder="Set Interval"
                            value={this.state.newInterval}
                            onChange={this.handleChangeInterval}>
                        </input>
                    </div>
                    <div className="col-2">
                        <p>current interval: {this.state.displayInterval}s</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-3">
                        <button className="btn btn-light btn-block">Save List</button>
                    </div>
                    <div className="col-3">
                        <button className="btn btn-light btn-block">Load list</button>
                    </div>
                </div>

                <br></br>
                <button className="btn btn-dark btn-lg btn-block" onClick={this.launchNavigate}>Launch</button>


            </div>
        );
    }
}

export default AppItemList;