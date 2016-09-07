class Ajax {
    constructor() {}
    GET(url, data, func){
        return this.Request({
			url: url, 
			data: data, 
			success: success,
			type: "GET"
		});
    }    
    POST(url, data, func){
        return this.Request({
			url: url, 
			data: data, 
			success: success,
			type: "POST"
		});
    }
    Request(parameters){
        var params = {
			url: parameters.url,
			type: parameters.type,
			data: parameters.data,
			statusCode: parameters.statusCode,
			success: eval(parameters.success),
			error: eval(parameters.error),
			complete: eval(parameters.complete),
			headers : (parameters.headers instanceof Array) ? parameters.headers : []	
		};

		var xhr = new XMLHttpRequest(),
			ret = {},
			query = "";
		
		xhr.onreadystatechange = function(){
			ret = {
				response: xhr.response,
				status: xhr.statusText,
				xhr: xhr
			};
			executeCodeFunctions(xhr.status);
		}
		
		for(var ele in params.data)
			query += ele + params.data[ele] + "&";
		
		if(params.type.toUpperCase() == "GET"){
			var newUrl = !!query ? (params.url + "?" + query) : params.url;
			xhr.open("GET", newUrl, false);
			params.headers.forEach(function(ele){
				xhr.setRequestHeader(ele.header, ele.value);
			});
			xhr.send(); 
		}
		else if(params.type.toUpperCase() == "POST") {
			xhr.open("POST", params.url, false);
			params.headers.forEach(function(ele){
				xhr.setRequestHeader(ele.header, ele.value);
			});
			xhr.send(query);
		}
			
		return ret;
		
		function executeCodeFunctions(status) {
		///<summary>Executes functions based on </summary>
		///<param name="status" type="number" />

			var strFunc = "function";
			if(!!params.statusCode && typeof(params.statusCode[status]) == strFunc)
				params.statusCode[status](ret.response, ret.xhr, ret.status);
			switch(status){
				case 200:
					if(typeof(params.success) == strFunc)
						params.success(JSON.parse(ret.response), ret.xhr, ret.status);
					break;
				default:
					if(typeof(params.error) == strFunc)
						params.error(ret.response, ret.xhr, ret.status);
					break;
			}
			
			if(params.statusCode && typeof(params.statusCode[status]) == strFunc)
				params.statusCode[status](ret.response, ret.xhr, ret.status);
			
			if(typeof(params.complete) == strFunc){
				params.complete(ret.response, ret.xhr, xhr.statusText);
			}		
		}
    }
}

var $ = new Ajax();

//module.export = Ajax;
