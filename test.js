var _ = require("underscore");
var Backbone = require("backbone");

function looseEqual(a, b) {
	if(a === b) {
		return true
	}
	var isObjectA = isObject(a);
	var isObjectB = isObject(b);
	if(isObjectA && isObjectB) {
		try {
			var isArrayA = Array.isArray(a);
			var isArrayB = Array.isArray(b);
			if(isArrayA && isArrayB) {
				return a.length === b.length && a.every(function(e, i) {
					return looseEqual(e, b[i])
				})
			} else if(a instanceof Date && b instanceof Date) {
				return a.getTime() === b.getTime()
			} else if(!isArrayA && !isArrayB) {
				var keysA = Object.keys(a);
				var keysB = Object.keys(b);
				return keysA.length === keysB.length && keysA.every(function(key) {
					return looseEqual(a[key], b[key])
				})
			} else {
				/* istanbul ignore next */
				return false
			}
		} catch (e) {
			/* istanbul ignore next */
			return false
		}
	} else if(!isObjectA && !isObjectB) {
		return String(a) === String(b)
	} else {
		return false
	}
}

/*
    涉及到递归问题的话，改如何处理：
    1、改key值；


    今天算是把vue的全过程触及完毕了，由于职业规划的需要，对于每个点的使用，暂时不做深入的研究。
    接下来去研究w5，给自己一个月的时间吧，看看能到达什么程度。
    研究完毕w5后呢？

    node --inspect-brk ../../bin/webpack.js --display-chunks --display-modules --display-origins --output-public-path \"js/\" -p
*/

function isArray(value) {
	return Array.isArray(value);
}

function isObject(value) {
	return Object.prototype.toString.call(value) === '[object Object]';
}

function myDeepCopy(source, destination) {
	if(!destination) {
		destination = source;
		if(source) {
			if(isArray(source)) {
				destination = myDeepCopy(source, []);
			} else if(source instanceof Date) {
				destination = new Date(source.getTime());
			} else if(isObject(source)) {
				destination = myDeepCopy(source, {});
			}
		}
	} else {
		if(isArray(source)) {
			while(destination.length) {
				destination.pop();
			}
			for(var i = 0; i < source.length; i++) {
				destination.push(myDeepCopy(source[i]));
			}
		} else {
			for(let key in destination) {
				delete destination[key];
			}
			for(var key in source) {
				if(key == "_renderProxy" || key == "_self" || key == "$root" || key == "$parent" || key == "parent" || key == "vm" || key == "__ob__" || key == "_watchers" || key == "root" || key == "myKey" || key == "compiler" || key == "_idlePrev" || key == "_idleNext" || key == "_idleTimeout") continue;
				destination[key] = myDeepCopy(source[key]);
			}
		}
	}
	return destination;
}

function deepCopy(source, destination, oldSource) {
	if(!destination) {
		destination = source;
		if(source) {
			if(isArray(source)) {
				destination = deepCopy(source, [], oldSource);
			} else if(source instanceof Date) {
				destination = new Date(source.getTime());
			} else if(isObject(source)) {
				destination = deepCopy(source, {}, oldSource);
			}
		}
	} else {
		if(isArray(source)) {
			while(destination.length) {
				destination.pop();
			}
			for(var i = 0; i < source.length; i++) {
				var currOld = oldSource && oldSource[i] && oldSource[i];
				if(source[i] != currOld || (source[i] == null && source[i] !== currOld)) {
					destination.push(copyExtend(source[i], null, currOld));
				}
			}
		} else {
			for(let key in destination) {
				delete destination[key];
			}
			for(var key in source) {
				if(key == "_renderProxy" || key == "_self" || key == "$root" || key == "$parent" || key == "parent" || key == "vm" || key == "__ob__" || key == "_watchers" || key == "root" || key == "myKey" || key == "compiler" || key == "_idlePrev" || key == "_idleNext" || key == "_idleTimeout") continue;
				var currOld = oldSource && oldSource[key] && oldSource[key];
				if(source[key] != currOld || (source[key] == null && source[key] !== currOld)) {
					destination[key] = copyExtend(source[key], null, currOld);
				}
			}
		}
	}
	return destination;
}

var globalOldSource;
var sourceStack = {};

function copyExtend(source, destination, oldSource, objKey) {
	var stackObj = sourceStack[objKey] || (sourceStack[objKey] = []);
	oldSource && stackObj.push(oldSource);
	globalOldSource[objKey] = stackObj[stackObj.length - 1];
	var res = deepCopy(source, destination, globalOldSource[objKey]);
	stackObj.pop();
	globalOldSource[objKey] = stackObj[stackObj.length - 1];
	(!stackObj.length) && (globalOldSource[objKey] = myDeepCopy(source));
	return res;
}

var globalOldSource = {
	//   abc: "def"
};
/* var source = {
  abc: "def",
  ccc: "yyyccc"
};
var res = copyExtend(source, null, globalOldSource);
console.log(res); */
function clearUpPrototype(val, par, parKey) {
	if(isArray(val)) {
		for(var i = 0; i < val.length; i++) {
			if(typeof val[i] == "undefined") {
				val.splice(i, 1); //undefined的元素，去掉
				i = i - 1;
			}
			if(isObject(val[i])) {
				clearUpPrototype(val[i], val, i);
				if(typeof val[i] != "undefined" && (Object.keys(val[i]) == 0 || val[i] === null)) {
					val.splice(i, 1);
					i = i - 1;
				}
			}
			if(isArray(val[i])) {
				clearUpPrototype(val[i], val, i);
				if(!val[i] || val[i].length == 0) {
					val.splice(i, 1);
					i = i - 1;
				}
			}

		}
		for(var i = 0; i < val.length; i++) {
			if(isArray(val[i]) && val[i].length == 0) {
				val.splice(i, 1);
				i = i - 1;
			}
			if(isObject(val[i]) && Object.keys(val[i]) == 0) {
				val.splice(i, 1);
				i = i - 1;
			}
		}
		par && val.length == 0 && (delete par[parKey]);
	} else if(isObject(val)) {
		for(var key in val) {
			if(isObject(val[key])) {
				clearUpPrototype(val[key], val, key);
				if(typeof val[key] != "undefined" && (Object.keys(val[key]) == 0 || val[key] === null)) {
					delete val[key];
				}
			}
			if(isArray(val[key])) {
				clearUpPrototype(val[key], val, key);
				if(!val[key] || val[key].length == 0) {
					delete val[key];
				}
			}
		}
		for(var key in val) {
			if(isArray(val[key]) && val[key].length == 0) {
				delete val[key];
			}
			if(isObject(val[key]) && Object.keys(val[key]) == 0 || val[key] === null) {
				delete val[key];
			}
			par && isObject(val) == 0 && (delete par[parKey]);
		}
	}
}

/* function clearUpPrototype(val) {
    var res;
    if(isArray(val)) {
        for(var i = 0; i < val.length; i++) {
            if(!val[i]) val.splice(i, 1);
        }
        for(var i = 0; i < val.length; i++) {
            res = delProp(val, i);
        }
    } else if(isObject(val)) {
        for(var key in val) {
            res = delProp(val, key);
        }
    }
    res && clearUpPrototype(val);
    return res;
} */

function delProp(val, key) {
	if(isArray(val[key])) {
		if(val[key].length == 0) {
			delete val[key];
			return true;
		} else {
			return clearUpPrototype(val[key]);
		}
	}
	if(isObject(val[key])) {
		if((Object.keys(val[key]) == 0 || !val[key])) {
			delete val[key];
			return true;
		} else {
			return clearUpPrototype(val[key]);
		}
	}
}

function conChange(source, lineMsg, objKey) {
	var oldSourceObj = globalOldSource[objKey] || (globalOldSource[objKey] = {});
	var res = copyExtend(source, null, oldSourceObj, objKey);
	var myDeep = myDeepCopy(source);
	console.log(("%c ☕  - " + lineMsg + " "), "background: #2e0801; color: #fff; padding:1px 0;");
	console.log(myDeep); //现有的属性
	clearUpPrototype(res);
	console.log(res);
	// debugger
}

var bbObject = {};
_.extend(bbObject, Backbone.Events);

bbObject.on("argv", function(source, lineMsg, objKey) { //compiler = makeProxy(compiler,"compiler");
	conChange(source, lineMsg, objKey);
});

//backbone  因为globalOldSource的原因，每次只能打印一个示例
/* module.exports = function () {
    var bbObject = {};
    _.extend(bbObject, Backbone.Events);
    global.bbObject = bbObject;
} */

var res = {};

function makeProxy(val, key) {
	val["myKey"] = key;
	var ret;
	if(!res[key]) {
		res[key] = ret = new Proxy(val, handler);
	} else {
		ret = new Proxy(val, handler);
	}
	bbObject.trigger("argv", res[key], "res " + val["myKey"], val["myKey"]);
	return ret;
}

var handler = {
	set(target, key, value) {
		// console.log(1111);
		// console.log(res);
		// debugger
		if(typeof value == "object" && target != value) {
			value = makeProxy(value, target["myKey"]);
		}
		target[key] = value;
		(target != value && key != "_currentPluginApply") && bbObject.trigger("argv", res[target["myKey"]], "res " + target["myKey"], target["myKey"]);
		return true;
	}
}
var firstSource;

function copy(source, destination, first) {
	if(firstSource && source == source) {
		return source;
	}
	first && (firstSource = source);
	return mCopy(source, destination);
}

function mCopy(source, destination) {
	if(!destination) {
		destination = source;
		if(source) {
			if(isArray(source)) {
				destination = copy(source, []);
			} else if(source instanceof Date) {
				destination = new Date(source.getTime());
			} else if(isObject(source)) {
				destination = copy(source, {});
			}
		}
	} else {
		if(isArray(source)) {
			while(destination.length) {
				destination.pop();
			}
			for(var i = 0; i < source.length; i++) {
				destination.push(copy(source[i]));
			}
		} else {
			foreach(destination, function(value, key) {
				delete destination[key];
			});
			for(var key in source) {
				destination[key] = copy(source[key]);
			}
		}
	}
	return destination;
}

function foreach(obj, iterator, context) {
	var key;
	if(obj) {
		if(isFunction(obj)) {
			for(key in obj) {
				if(key != 'prototype' && key != $length && key != $name && obj.hasOwnProperty(key)) {
					iterator.call(context, obj[key], key);
				}
			}
		} else if(obj.forEach) {
			obj.forEach(iterator, context);
		} else if(isObject(obj) && isNumber(obj.length)) {
			for(key = 0; key < obj.length; key++)
				iterator.call(context, obj[key], key);
		} else {
			for(key in obj)
				iterator.call(context, obj[key], key);
		}
	}
	return obj;
}

function isFunction(value) {
	return typeof value == "function";
}

function isNumber(value) {
	return typeof value == "number";
}
module.exports = function() {
	global.makeProxy = makeProxy;
	global.bbObject = bbObject;
	global.dCopy = copy;
}
/* var test = {};


var t1 = makeProxy(test); */
