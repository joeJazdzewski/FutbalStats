var root = {};

function init(){
    for(var ele in root){
        window[ele] = root[ele];
    }
}