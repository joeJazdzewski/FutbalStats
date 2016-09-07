"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataAccess = function () {
    function DataAccess() {
        _classCallCheck(this, DataAccess);

        this.headers = [{ header: "x-mashape-key", value: keys.openSport.key }];
        this.fail = function (f) {
            console.log(f);
        };
        this.types = {
            get: "GET",
            post: "POST"
        };
        this.baseUrl = "https://sportsop-soccer-sports-open-data-v1.p.mashape.com/v1/leagues";
        this.requestLeagues = this.requestLeagues.bind(this);
        this.requestSeasons = this.requestSeasons.bind(this);
    }

    _createClass(DataAccess, [{
        key: "requestLeagues",
        value: function requestLeagues() {
            var that = this;
            $.Request({
                url: that.baseUrl,
                headers: that.headers,
                success: function success(response) {
                    ds.updateStore("leagues", Immutable.List(response.data.leagues));
                },
                fail: that.fail,
                type: that.types.get
            });
        }
    }, {
        key: "requestSeasons",
        value: function requestSeasons(league_slug) {
            var that = this;
            $.Request({
                url: that.baseUrl + "/" + league_slug + "/seasons",
                headers: that.headers,
                success: function success(response) {
                    if (!ds.hasKey("seasons")) ds.updateStore("seasons", new Immutable.Map());
                    var seasons = ds.getFromStore("seasons");
                    seasons = seasons.set(league_slug, new Immutable.List(response.data.seasons));
                    ds.updateStore("seasons", seasons);
                },
                fail: that.fail,
                type: that.types.get
            });
        }
    }, {
        key: "requestTopScorer",
        value: function requestTopScorer(league_slug, season_slug) {
            var that = this;
            $.Request({
                url: that.baseUrl + "/" + league_slug + "/seasons/" + season_slug + "/topscorers",
                headers: that.headers,
                success: function success(response) {
                    if (!ds.hasKey("topScorers")) ds.updateStore("topScorers", new Immutable.Map());
                    var scorers = ds.getFromStore("topScorers");
                    scorers = scorers.set(league_slug, new Immutable.List(response.data.topscorers));
                    ds.updateStore("topScorers", scorers);
                },
                fail: that.fail,
                type: that.types.get
            });
        }
    }]);

    return DataAccess;
}();
