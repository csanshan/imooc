/**
 * [getStyle description]
 * @param  {object} oBj  the target of operation
 * @param  {string} attr the attribute of target
 * @return {string}      the attribut of target
 */
function getStyle(oBj,attr) {
	if (oBj.currentstyle) {
		return oBj.currentStyle[attr];
	} else {
		return getComputedStyle(oBj,false)[attr];
	}
}
/**
 * [startMove description]
 * @param  {object}   oBj  the target of operation
 * @param  {string}   attr the attribute of target
 * @param  {number}   json[attr]  the value of attribute
 * @param  {Function} fn   [description]
 * @return {string}        the attribute of target
 */
function startMove(oBj,json,fn) {
	clearInterval(oBj.timer);
	oBj.timer = setInterval(function() {
		for(var attr in json){
			var icur = 0;
			var flag = true;
			if (attr === "opacity") {
				icur = Math.round(parseFloat(getStyle(oBj,attr))*100);
			} else {
				icur = parseInt(getStyle(oBj,attr));
			}
			//2计算运动速度
			var speed = (json[attr] - icur)/8;
			speed = speed > 0?Math.ceil(speed):Math.floor(speed);
			//3检测停止
			if(icur != json[attr]){
				flag = false;
			}
			console.log(flag);
			if(attr === 'opacity'){
				oBj.style.fliter = "alpha(opacity):'+(icur + speed)+";
				oBj.style.opacity = (icur + speed)/100;
			}else{
				oBj.style[attr] = icur + speed + 'px';
			}
			if(flag){
				clearInterval(oBj.timer);
				if(fn){
					fn();
				}
			}
		}
	},30);
}
