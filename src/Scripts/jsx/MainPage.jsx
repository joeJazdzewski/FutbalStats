class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: Immutable.Map({ "a": 50 })
        };
    }
    render(){
        return (
            <div>
                <Menu />
                <div className="container">
                    <h2>Futbol Stats</h2>
                    <p>The place to get the most api based football stats</p>
                </div>
            </div>
        )
    }
}   