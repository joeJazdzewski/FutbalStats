class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: Immutable.Map({ "a": 50 }),
            leagues: ds.store.get("leagues") || []
        };
        this.setState = this.setState.bind(this);
    }
    componentDidMount(){
        if(!ds.hasKey("leagues")) {
            ds.updateListener("MainPage", this.setState);
            new DataAccess().requestLeagues();
        }
    }
    componentWillUnmount() {
        ds.removeListener("MainPage");
    }
    render(){
        return (
            <div>
                <Menu />
                <div className="container">
                    <h2>Futbol Stats</h2>
                    <p>The place to get the most api based football stats. This site has data for the following leagues.</p>
                    <div>
                        {
                            this.state.leagues.map((ele) =>{
                                return(
                                    <div>
                                        <b>{ele.name}</b>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}   