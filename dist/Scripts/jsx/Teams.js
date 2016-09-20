"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Teams = function (_React$Component) {
    _inherits(Teams, _React$Component);

    function Teams(props) {
        _classCallCheck(this, Teams);

        var _this = _possibleConstructorReturn(this, (Teams.__proto__ || Object.getPrototypeOf(Teams)).call(this, props));

        _this.state = {
            leagues: ds.store.get("leagues") || new Immutable.List(),
            seasons: ds.store.get("seasons") || new Immutable.Map(),
            curSeason: "",
            curLeague: "",
            teams: new Immutable.Map(),
            searched: false
        };
        _this.setState = _this.setState.bind(_this);
        _this.handleLeagueChange = _this.handleLeagueChange.bind(_this);
        _this.handleSeasonChange = _this.handleSeasonChange.bind(_this);
        _this.dataStoreUpdate = _this.dataStoreUpdate.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }

    _createClass(Teams, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var da = new DataAccess();
            ds.updateListener("SeasonsByLeague", this.dataStoreUpdate);
            if (!ds.hasKey("leagues")) {
                da.requestLeagues();
            }
        }
    }, {
        key: "dataStoreUpdate",
        value: function dataStoreUpdate(obj) {
            this.setState(obj);
        }
    }, {
        key: "handleLeagueChange",
        value: function handleLeagueChange(e) {
            var da = new DataAccess();
            da.requestSeasons(e.target.value);
            this.setState({
                curLeague: e.target.value,
                curSeason: "",
                teams: new Immutable.Map(),
                searched: false
            });
        }
    }, {
        key: "handleSeasonChange",
        value: function handleSeasonChange(e) {
            this.setState({
                curSeason: e.target.value,
                searched: false
            });
        }
    }, {
        key: "handleClick",
        value: function handleClick() {
            var da = new DataAccess();
            da.requestTeams(this.state.curLeague, this.state.curSeason);
            this.setState({ searched: true });
        }
    }, {
        key: "render",
        value: function render() {
            var key = this.state.curLeague + "-" + this.state.curSeason;
            var list = this.state.teams.get(key) || new Immutable.List();
            return React.createElement(
                "div",
                null,
                React.createElement(Menu, null),
                React.createElement(
                    "div",
                    { className: "container" },
                    React.createElement(
                        "select",
                        { ref: "leagues", className: "form-control", onChange: this.handleLeagueChange },
                        React.createElement(
                            "option",
                            { value: "" },
                            "--Select a League--"
                        ),
                        this.state.leagues.map(function (ele) {
                            return React.createElement(
                                "option",
                                { value: ele.league_slug },
                                ele.name
                            );
                        })
                    ),
                    this.state.seasons.size > 0 && this.state.curLeague && React.createElement(
                        "select",
                        { className: "form-control", onChange: this.handleSeasonChange },
                        React.createElement(
                            "option",
                            { value: "" },
                            "--Select a Season--"
                        ),
                        this.state.seasons.get(this.state.curLeague).map(function (ele) {
                            return React.createElement(
                                "option",
                                { key: ele.season_slug, value: ele.season_slug },
                                ele.name
                            );
                        })
                    ),
                    this.state.seasons.size > 0 && this.state.curLeague && React.createElement(
                        "button",
                        { className: "btn btn-primary", onClick: this.handleClick },
                        "Search"
                    ),
                    React.createElement(
                        "div",
                        null,
                        list.size != 0 && React.createElement(
                            "ul",
                            null,
                            list.map(function (ele) {
                                return React.createElement(
                                    "li",
                                    null,
                                    ele.name
                                );
                            })
                        )
                    )
                )
            );
        }
    }]);

    return Teams;
}(React.Component);
