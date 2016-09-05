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
            ds.addListener("MainPage", this.setState);
            $.Request({
                url:"https://sportsop-soccer-sports-open-data-v1.p.mashape.com/v1/leagues", 
                
                headers:[
                    {header: "x-mashape-key", value: keys.openSport.key}
                ],
                success: (response) => {
                    ds.addToStore("leagues", Immutable.List(response.data.leagues));
                },
                fail: (f) => {
                    console.log(f);
                }, 
                type: "GET" 
            });
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