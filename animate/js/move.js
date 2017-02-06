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
 * @param  {number}   opa  the value of attribute
 * @param  {Function} fn   [description]
 * @return {string}        the attribute of target
 */
function startMove(oBj,attr,opa,fn) {
	clearInterval(oBj.timer);
	oBj.timer = setInterval(function() {
		var icur = 0;
		if (attr === "opacity") {
			icur = Math.round(parseFloat(getStyle(oBj,attr))*100);
		} else {
			icur = parseInt(getStyle(oBj,attr));
		}
		var speed = (opa - icur)/8;
		speed = speed > 0?Math.ceil(speed):Math.floor(speed);
		if (icur === opa) {
			clearInterval(oBj.timer);
			if(fn){
				fn();
			}
		} else {
			if(attr === 'opacity'){
				oBj.style.fliter = "alpha(opacity):'+(icur + speed)+";
				oBj.style.opacity = (icur + speed)/100;
			}else{
				oBj.style[attr] = icur + speed + 'px';
			}
		}
	},30);
}
