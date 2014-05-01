function randomBetween(min, max){
	return Math.floor(Math.random() * (max - min)) + min;
}

function randomBetweenExact(min, max){
	return Math.random() * (max - min) + min;
}

function deleteObj(obj, baseObj){
	if(jQuery.type(obj) == "object") {
		var entrie;
		var onlyEntries = true;
		for (entrie in obj){
			if(jQuery.type(entrie) == "object" && entrie) {
				deleteObj(entrie, obj);
				onlyEntries = false;
			}else{
				entrie = null;
				delete entrie;
			}
		}
		if(onlyEntries){
			obj = null;
			delete obj;
			deleteObj(baseObj);
		}
	}else{
		obj = null;
		delete obj;
	}
}