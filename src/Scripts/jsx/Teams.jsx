class Teams extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            leagues: ds.store.get("leagues") || new Immutable.List(),
            seasons: ds.store.get("seasons") || new Immutable.Map(),
            curSeason: "",
            curLeague: "",
            teams: new Immutable.Map(),
            searched: false
        };
        this.setState = this.setState.bind(this);
        this.handleLeagueChange = this.handleLeagueChange.bind(this);
        this.handleSeasonChange = this.handleSeasonChange.bind(this);
        this.dataStoreUpdate = this.dataStoreUpdate.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount(){
        var da = new DataAccess();
        ds.updateListener("SeasonsByLeague", this.dataStoreUpdate);
        if(!ds.hasKey("leagues")) {
            da.requestLeagues();
        }
    }
    
    dataStoreUpdate(obj){
        this.setState(obj);
    }
    handleLeagueChange(e){
        var da = new DataAccess();
        da.requestSeasons(e.target.value);
        this.setState({
             curLeague: e.target.value,
             curSeason: "",
             teams: new Immutable.Map(),
             searched: false
        });
    }
    handleSeasonChange(e){
        this.setState({
            curSeason: e.target.value,
            searched: false
        });
    }
    handleClick(){
        var da = new DataAccess();
        da.requestTeams(this.state.curLeague, this.state.curSeason);
        this.setState({ searched: true });
    }
    render(){
        var key =(this.state.curLeague + "-" + this.state.curSeason);
        var list = this.state.teams.get(key) || new Immutable.List();
        return(
            <div>
                <Menu />
                <div className="container">
                    <select ref="leagues" className="form-control" onChange={this.handleLeagueChange}>
                        <option value="">--Select a League--</option>
                        {
                            this.state.leagues.map((ele) => {
                                return (
                                    <option value={ele.league_slug}>{ele.name}</option>
                                )
                            })
                        }
                    </select>
                    {
                        this.state.seasons.size > 0 && this.state.curLeague &&
                        <select className="form-control" onChange={this.handleSeasonChange} >
                            <option value="">--Select a Season--</option>
                            {
                                this.state.seasons.get(this.state.curLeague).map((ele) => {
                                    return (
                                        <option key={ele.season_slug} value={ele.season_slug}>{ele.name}</option>
                                    )
                                })
                            }
                        </select>
                    }
                    {
                        this.state.seasons.size > 0 && this.state.curLeague &&
                        <button className="btn btn-primary" onClick={this.handleClick}>Search</button>
                    }
                    <div>
                        {
                            list.size != 0 &&
                            <ul>
                                {
                                    list.map((ele) => {
                                        return(
                                            <li>
                                                {ele.name}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        }
                    </div>
                </div>
            </div>
        );
    }
}