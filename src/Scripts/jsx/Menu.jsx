class Menu extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/dist/">Futbol Stats</a>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li role="presentation"><Link to="/dist/">Home</Link></li>
                            <li role="presentation"><Link to="/dist/topscorer">Top Scorers</Link></li>
                        </ul>
                    </div>
                </div>
            </nav> 
        )
    }
}