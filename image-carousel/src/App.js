import React from 'react'
import Carosel from './components/carosel'
class App extends React.Component {

    constructor(props) {
        super(props)
        
        this.state = {
            catsList: [],
            sharksList: [],
            catsSharksList: [],
            currentAnimalList: [],
            index: 0
        }

    }

    componentDidMount() {
        //console.log('calling cat API')
        fetch("http://localhost:8080/cats", {
            mode:'cors'
        })
        .then(res => res.json())
        .then((res) => {
            this.setState({catsList: res})
        })

        //console.log('calling shark API')
        fetch("http://localhost:8080/sharks", {
            mode:'cors'
        })
        .then(res => res.json())
        .then((res) => {
            this.setState({sharksList: res})
            //default animal list
            this.setState({currentAnimalList: res})
        })

        //console.log('calling cats and shark API')
        fetch("http://localhost:8080/catsandsharks", {
            mode:'cors'
        })
        .then(res => res.json())
        .then((res) => {
            this.setState({catsSharksList: res})
        })

        //default to shark images
        document.getElementById('sharkBtn').checked = true
    }

    setAnimal = (event, animal) => {
        var sharkBtn = document.getElementById('sharkBtn').checked
        var catBtn = document.getElementById('catBtn').checked
        this.setState({index: 0})

        if (catBtn && sharkBtn) {
            //console.log('cat and shark')
            this.setState({currentAnimalList: this.state.catsSharksList})
        }
        else if (catBtn && !sharkBtn) {
            //console.log('cat only')
            this.setState({currentAnimalList: this.state.catsList})
        }
        else if (!catBtn && sharkBtn) {
            //console.log('shark only')
            this.setState({currentAnimalList: this.state.sharksList})
        }
        else if (!catBtn && !sharkBtn) {
            document.getElementById('sharkBtn').checked = true
            this.setState({currentAnimalList: this.state.sharksList})
        }
        //console.log(this.state.currentAnimalList)
        
    }

    navigateLeft = () => {
        console.log(this.state.index)
        if (this.state.index > 0) {
            //console.log("left")
            this.setState({index:this.state.index - 1})
        }
    }

    navigateRight = () => {
        console.log(this.state.index)
        if (this.state.index < this.state.currentAnimalList.length - 1) {
            //console.log("right")
            this.setState({index:this.state.index + 1})
        }
    }

    render() {
        return (
            <div className="App">
                <div className="container">
                    <div className="row">
                        <div className="btn-group justify-content-center" role="group" aria-label="Basic checkbox toggle button group" style={{margin:"20px"}}>
                            <div className="col col-lg-2">
                                <input type="checkbox" class="btn-check" id="sharkBtn" autocomplete="off" onChange={(e) => this.setAnimal(e, 'shark')}></input>
                                <label class="btn btn-outline-primary" for="sharkBtn">Shark</label>
                            </div>
                            <div className="col col-lg-2">
                                <input type="checkbox" class="btn-check" id="catBtn" autocomplete="off" onChange={(e) => this.setAnimal(e, 'cat')}></input>
                                <label className="btn btn-outline-primary" for="catBtn">Cat</label>
                            </div>
                        </div>
                    </div>
                    <Carosel animalList={this.state.currentAnimalList} index={this.state.index} navigateLeft={this.navigateLeft} navigateRight={this.navigateRight}/>
                </div>
            </div>
        );
    }
}

export default App;
