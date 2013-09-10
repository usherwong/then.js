'use strict';
/*global module, process*/

var testThen = (function(){function r(b){return null===b||"undefined"===typeof b}function q(b){return"function"===typeof b}function n(b,a,c){return Error("Argument "+b+' in "'+a+'" function is not a '+c+"!")}function u(b,a,c,h){function f(a,k,z){g-=1;l[a]=z;(0>=g||!r(k))&&b(k||null,l)}var d,e,g,l=[];f._this_then=!0;if(s(a))if(q(c))if(g=e=a.length)for(d=0;d<e;d++)c.call(h,f.bind(null,d),a[d],d,a);else b(null,l);else b(n(c,"each","function"));else b(n(a,"each","array"))}function v(b,a,c,h){function f(l,m){g[e]=m;
e+=1;e<d&&r(l)?c.call(h,f,a[e],e,a):(delete g[-1],b(l||null,g))}var d,e=-1,g=[];f._this_then=!0;s(a)?q(c)?(d=a.length)?f():b(null,g):b(n(c,"eachSeries","function")):b(n(a,"eachSeries","array"))}function w(b,a,c){function h(a,c,k){e-=1;g[a]=k;(0>=e||!r(c))&&b(c||null,g)}var f,d,e,g=[];h._this_then=!0;if(s(a))if(e=d=a.length)for(f=0;f<d;f++)q(a[f])?a[f].call(c,h.bind(null,f),f):b(n(a[f],"parallel","function"));else b(null,g);else b(n(a,"parallel","array"))}function x(b,a,c){function h(g,l){e[d]=l;d+=
1;d<f&&r(g)?q(a[d])?a[d].call(c,h,d):b(n(a[d],"series","function")):(delete e[-1],b(g||null,e))}var f,d=-1,e=[];h._this_then=!0;s(a)?(f=a.length)?h():b(null,e):b(n(a,"series","array"))}function p(b,a){function c(k,a){var t=new l,b=t.defer.bind(t);b._this_then=t;k(b,a);return t}function h(k,a){A(function(){try{a()}catch(b){k(b)}})}function f(k){return function(a,b,d){return c(function(c){h(c,k.bind(null,c,a,b,d))})}}function d(k){return function(a,b){return c(function(c){h(c,k.bind(null,c,a,b))})}}
function e(a,b){return q(b)?b._this_then?b:b.bind(null,a):null}var g=[],l=function(){},m=l.prototype;m.all=function(b){return c(function(a,c){c._all=e(a,b)},this)};m.then=function(b,a){return c(function(c,d){d._success=e(c,b);d._error=e(c,a)},this)};m.fail=function(b){return c(function(a,c){c._fail=e(a,b);c._success=a.bind(a,null);c._fail&&g.push(c._fail)},this)};m.each=function(a,b,d){return c(function(c,e){e._each=function(e,f,g){u(c,a||e,b||f,d||g)}},this)};m.eachSeries=function(a,b,d){return c(function(c,
e){e._eachSeries=function(e,f,g){v(c,a||e,b||f,d||g)}},this)};m.parallel=function(a,b){return c(function(c,d){d._parallel=function(d,e){w(c,a||d,b||e)}},this)};m.series=function(a,b){return c(function(c,d){d._series=function(d,e){x(c,a||d,b||e)}},this)};m.defer=function(a){this._error=this._fail?g.shift():this._error;if(this._all)try{this._all.apply(this._all._this_then,y.call(arguments)),a=null}catch(b){a=b}else if(r(a)){this._success=this._success||this._each||this._eachSeries||this._parallel||
this._series;try{return this._success&&this._success.apply(this._success._this_then,y.call(arguments,1))}catch(c){a=c}}if(!r(a)){if(this._error||g.length)return this._error?this._error(a):g.shift()(a);throw a;}};p.each=f(u);p.eachSeries=f(v);p.parallel=d(w);p.series=d(x);return c(function(c){h(c,q(b)?b.bind(a,c):c)})}var y=[].slice,s=Array.isArray,A="object"===typeof process&&q(process.nextTick)?process.nextTick:setTimeout;"undefined"!==typeof module&&module.exports?module.exports=p:"function"===
typeof define&&define(function(){return p});"object"===typeof window&&(window.then=p);return p})();
// TEST begin

function asnycTask(n, callback) {
    setTimeout(function () {
        callback(null, n);
    }, n * 1000);
}

testThen(function (defer) {
    console.log(111);
    asnycTask(1, defer);
}).then(function (defer, a) {
    console.log(222, a);
    asnycTask(2, defer);
}).then(function (defer, a) {
    console.log(333, a);
    asnycTask(3, function (err, b) {
        console.log(3332, err, b);
        defer(null, 'hello!', b);
    });
}).then(function (defer, a, b) {
    console.log(444, a, b);
    defer('Error1!');
}).then(function (defer) {
    console.log(555);
    defer('Error2!');
}).fail(function (defer, err) {
    console.log(666, err);
    defer(null, 'aaa');
}).then(function (defer, a) {
    console.log(777, a);
    defer('Error3!');
}).fail(function (defer, err) {
    console.log(888, err);
});
// TEST end