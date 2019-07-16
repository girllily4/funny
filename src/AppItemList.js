/*
 * @Project: funny screen
 * @Program name: AppItemList.js    `
 * @Author: Yiwen Liu
 * @Date: 2019-07-15 11:22:47
 * @LastEditTime: 2019-07-16 14:08:33
 * @Description: file content
 */

import React from 'react';

class AppItemList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            newUrl: "",
            optionList: ["https://www.amazon.com", "https://www.netflix.com", "https://www.ted.com/#/", "https://www.youtube.com/"],
            selectedOption: undefined,
            newInterval: "",
            displayInterval: 10,
            myWindow: null,
            loop: 0
        };
    }

    /* Handler */

    handleChange = (event) => {
        this.setState({ selectedOption: event.target.value });
    }

    handleChangeUrl = (event) => {
        this.setState({ newUrl: event.target.value });
    }

    handleChangeInterval = (event) => {
        this.setState({ newInterval: event.target.value });
    }

    /* Functionality */

    moveUpOption = () => {
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
                optionList: nextOptionList
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
                selectedOption: undefined
            })
        }

    }

    addUrl = () => {
        // Regular Expression to detect the URL format
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
        // Use isNaN to detect whether the input value is a number, otherwise alert the user
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

        // Clean the existing loop function and close the window if click the launch button twice
        if (this.state.myWindow != null) {
            this.state.myWindow.close();
            clearInterval(this.state.loop);
        }

        // loop the url list and change the url address every displayInterval seconds
        const loop = setInterval(() => {
            i++;
            if (i >= urlList.length) {
                i = 0;
            }
            this.state.myWindow.location.replace(urlList[i]);
        }, this.state.displayInterval * 1000)

        // set and open a new window with start with first url of the urlList
        // save the loop function status to the state loop so that later the function can clear the loop
        this.setState({
            myWindow: window.open(urlList[0], "_blank"),
            loop,
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
                            {this.state.optionList.map((item) => {
                                return <option key={item}>{item}</option>
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