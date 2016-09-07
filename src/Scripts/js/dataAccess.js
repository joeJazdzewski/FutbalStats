class DataAccess{
    constructor(){
        this.headers = [
            {header: "x-mashape-key", value: keys.openSport.key}
        ];
        this.fail = (f) => { console.log(f); };
        this.types = {
            get: "GET",
            post: "POST"
        };
        this.baseUrl = "https://sportsop-soccer-sports-open-data-v1.p.mashape.com/v1/leagues";
        this.requestLeagues = this.requestLeagues.bind(this);
        this.requestSeasons = this.requestSeasons.bind(this);
    }
    requestLeagues(){
        var that = this;
        $.Request({
            url:that.baseUrl, 
            headers: that.headers,
            success: (response) => {
                ds.updateStore("leagues", Immutable.List(response.data.leagues));
            },
            fail: that.fail, 
            type: that.types.get 
        });
    }
    requestSeasons(league_slug){
        var that = this
        $.Request({
            url: that.baseUrl + "/" + league_slug + "/seasons",
            headers: that.headers,
            success: (response) => {
                if(!ds.hasKey("seasons"))
                    ds.updateStore("seasons", new Immutable.Map());
                var seasons = ds.getFromStore("seasons");
                seasons = seasons.set(league_slug, new Immutable.List(response.data.seasons));
                ds.updateStore("seasons", seasons);
            },
            fail: that.fail,
            type: that.types.get
        });
    }
    requestTopScorer(league_slug, season_slug){
        var that = this;
        $.Request({
            url: that.baseUrl + "/" + league_slug + "/seasons/" + season_slug + "/topscorers",
            headers: that.headers,
            success: (response) => {
                if(!ds.hasKey("topScorers"))
                    ds.updateStore("topScorers", new Immutable.Map());
                var scorers = ds.getFromStore("topScorers");
                scorers = scorers.set(league_slug, new Immutable.List(response.data.topscorers));
                ds.updateStore("topScorers", scorers);
            },
            fail: that.fail,
            type: that.types.get
        })
    }
}