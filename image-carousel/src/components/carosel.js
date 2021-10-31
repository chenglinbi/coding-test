import React from 'react'

class Carosel extends React.Component {
    componentDidUpdate() {
        document.getElementById('btnLeft').disabled = this.props.index === 0 ? true : false
        document.getElementById('btnRight').disabled = this.props.index === this.props.animalList.length - 1 ? true : false
        
    }
    navigateLeftBtnClick = () => {
        this.props.navigateLeft()
    }

    navigateRightBtnClick = () => {
        this.props.navigateRight()
    }

    render() {
        const {animalList} = this.props
        //console.log(animalList)
        return (
            <div className="row">
                <div className="col col-lg-2">
                    <button id="btnLeft" type="button" class="btn btn-primary" onClick={(e) => this.navigateLeftBtnClick()}>Left</button>
                    
                </div>
                
                <div className="col col-lg-8">
                    {
                        animalList.length === 0 ? 'loading...' : <img src={animalList[this.props.index]} class="img-fluid" alt="..."></img>
                    }
                </div>
                <div className="col col-lg-2">
                    <button id="btnRight" type="button" class="btn btn-primary" onClick={(e) => this.navigateRightBtnClick()}>Right</button>
    
                </div>
            </div>
        )
    }
}

export default Carosel