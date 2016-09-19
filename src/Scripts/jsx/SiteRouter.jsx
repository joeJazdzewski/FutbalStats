class SiteRouter extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Router history={browserHistory}>
                <Route path="/dist/" component={MainPage} />
                <Route path="/dist/topScorer" component={TopScorer} />
                <Route path="/dist/teams" component={Teams} />
            </Router>
        );
    }
}