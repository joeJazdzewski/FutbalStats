"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainPage = function (_React$Component) {
    _inherits(MainPage, _React$Component);

    function MainPage(props) {
        _classCallCheck(this, MainPage);

        var _this = _possibleConstructorReturn(this, (MainPage.__proto__ || Object.getPrototypeOf(MainPage)).call(this, props));

        _this.state = {
            data: Immutable.Map({ "a": 50 }),
            leagues: []
        };
        return _this;
    }

    _createClass(MainPage, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            $.Request({
                url: "https://sportsop-soccer-sports-open-data-v1.p.mashape.com/v1/leagues",

                headers: [{ header: "x-mashape-key", value: keys.openSport.key }],
                success: function success(response) {
                    _this2.setState({ leagues: response.data.leagues });
                },
                fail: function fail(f) {
                    console.log(f);
                },
                type: "GET"
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(Menu, null),
                React.createElement(
                    "div",
                    { className: "container" },
                    React.createElement(
                        "h2",
                        null,
                        "Futbol Stats"
                    ),
                    React.createElement(
                        "p",
                        null,
                        "The place to get the most api based football stats. This site has data for the following leagues."
                    ),
                    React.createElement(
                        "div",
                        null,
                        this.state.leagues.map(function (ele) {
                            return React.createElement(
                                "div",
                                null,
                                React.createElement(
                                    "b",
                                    null,
                                    ele.name
                                )
                            );
                        })
                    )
                )
            );
        }
    }]);

    return MainPage;
}(React.Component);
