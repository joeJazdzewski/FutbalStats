class TopScorer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            leagues: ds.store.get("leagues") || new Immutable.List(),
            seasons: ds.store.get("seasons") || new Immutable.Map(),
            seas: ds.store.get("seasons"),
            curSeason: "",
            curLeague: "",
            curScorers: new Immutable.List()
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
             curScorers: new Immutable.List()
        });
    }
    handleSeasonChange(e){
        this.setState({
            curSeason: e.target.value,
            curScorers: new Immutable.List()
        });
    }
    handleClick(){
        var da = new DataAccess();
        da.requestTopScorer(this.state.curLeague, this.state.curSeason);
    }
    render(){
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
                            this.state.curScorers.size != 0 &&
                            <div>
                                {
                                    this.state.curScorers.map((ele) => {
                                        return(
                                            <div>
                                                <h2>{ele.fullname}</h2>
                                                <b>Nationality: {ele.nationality}</b>
                                                <b>Number:  {ele.number}</b>
                                                <b>Goals: {ele.goals}</b>
                                                <b>Num of Matches: {ele.matches}</b>
                                                <b>Team: {ele.team}</b>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}