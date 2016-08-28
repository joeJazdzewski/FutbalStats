class SiteRouter extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Router history={browserHistory}>
                <Route path="/dist/" component={MainPage} />
            </Router>
        );
    }
}