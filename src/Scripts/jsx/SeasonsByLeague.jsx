class SeasonsByLeague extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    componentDidMount(){
       $.Request({
           url: "",
           headers: [
               { header: "", value: "" }
           ],
           success: (response) => {

           },
           fail: (response) => {
               console.log(response);
           }
        }) 
    }
    handleLeagueChange(e){
    }
    render(){
        return(
            <div>
                <Menu />
                <div className="container">
                    <select ref="leagues" className="form-control" onChange={this.handleLeagueChange}>
                        {
                            this.state.leagues.map((ele) => {
                                return (
                                    <option val={ele.league_slug}>{ele.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
        );
    }
}