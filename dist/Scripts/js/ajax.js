"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ajax = function () {
	function Ajax() {
		_classCallCheck(this, Ajax);
	}

	_createClass(Ajax, [{
		key: "GET",
		value: function GET(url, data, func) {
			return this.Request({
				url: url,
				data: data,
				success: success,
				type: "GET"
			});
		}
	}, {
		key: "POST",
		value: function POST(url, data, func) {
			return this.Request({
				url: url,
				data: data,
				success: success,
				type: "POST"
			});
		}
	}, {
		key: "Request",
		value: function Request(parameters) {
			var params = {
				url: parameters.url,
				type: parameters.type,
				data: parameters.data,
				statusCode: parameters.statusCode,
				success: eval(parameters.success),
				error: eval(parameters.error),
				complete: eval(parameters.complete),
				headers: parameters.headers instanceof Array ? parameters.headers : []
			};

			var xhr = new XMLHttpRequest(),
			    ret = {},
			    query = "";

			xhr.onreadystatechange = function () {
				ret = {
					response: xhr.response,
					status: xhr.statusText,
					xhr: xhr
				};
				executeCodeFunctions(xhr.status);
			};

			for (var ele in params.data) {
				query += ele + params.data[ele] + "&";
			}if (params.type.toUpperCase() == "GET") {
				var newUrl = !!query ? params.url + "?" + query : params.url;
				xhr.open("GET", newUrl, false);
				params.headers.forEach(function (ele) {
					xhr.setRequestHeader(ele.header, ele.value);
				});
				xhr.send();
			} else if (params.type.toUpperCase() == "POST") {
				xhr.open("POST", params.url, false);
				params.headers.forEach(function (ele) {
					xhr.setRequestHeader(ele.header, ele.value);
				});
				xhr.send(query);
			}

			return ret;

			function executeCodeFunctions(status) {
				///<summary>Executes functions based on </summary>
				///<param name="status" type="number" />

				var strFunc = "function";
				if (!!params.statusCode && _typeof(params.statusCode[status]) == strFunc) params.statusCode[status](ret.response, ret.xhr, ret.status);
				switch (status) {
					case 200:
						if (_typeof(params.success) == strFunc) params.success(JSON.parse(ret.response), ret.xhr, ret.status);
						break;
					default:
						if (_typeof(params.error) == strFunc) params.error(ret.response, ret.xhr, ret.status);
						break;
				}

				if (params.statusCode && _typeof(params.statusCode[status]) == strFunc) params.statusCode[status](ret.response, ret.xhr, ret.status);

				if (_typeof(params.complete) == strFunc) {
					params.complete(ret.response, ret.xhr, xhr.statusText);
				}
			}
		}
	}]);

	return Ajax;
}();

var $ = new Ajax();

//module.export = Ajax;
