const e=document.getElementById("canvas"),t=document.getElementById("collapse"),n=e.getContext("2d");let o,l={x:0,y:0},i=[],c=[];function s(t){l.x=t.clientX-e.offsetLeft,l.y=t.clientY-e.offsetTop,i.push({x:t.clientX-e.offsetLeft,y:t.clientY-e.offsetTop})}function r(e){console.log("start"),"canvas"===e.target.id&&(s(e),document.addEventListener("mousemove",a))}function a(e){console.log("draw"),document.removeEventListener("click",r),n.beginPath(),n.lineWidth=1,n.strokeStyle="#000",n.moveTo(l.x,l.y),s(e),n.lineTo(l.x,l.y),n.stroke(),document.addEventListener("click",d)}function d(e){var t,l;let u,m;if(console.log("stop"),document.removeEventListener("mousemove",a),s(e),function(e){c.push(e)}((t=i[0],l=i[i.length-1],[t,l])),console.log("allLines",c),c.length>=2)for(let e=0;e<=c.length;e++)u=c[e],m=c[e+1],console.log("line1",u),console.log("line2",m),u&&m&&(o=f(u[0],u[1],m[0],m[1])),console.log("intersection",o);var y,g;o&&(y=Math.ceil(o.x),g=Math.ceil(o.y),n.fillStyle="red",n.beginPath(),n.arc(y,g,5,0,2*Math.PI,!0),n.fill()),i=[],document.removeEventListener("click",d),document.addEventListener("click",r)}function f(e,t,n,o){let l=n.x-o.x,i=e.x-t.x,c=n.y-o.y,s=e.y-t.y,r=i*c-s*l;0==r&&console.log("Number of intersection points is zero or infinity.");let a=e.x*t.y-e.y*t.x,d=n.x*o.y-n.y*o.x;return{x:(a*l-i*d)/r,y:(a*c-s*d)/r}}document.addEventListener("click",r),t.addEventListener("click",(function(){if(!l.x&&!l.y)return;n.clearRect(0,0,e.width,e.height),e.animate(u,m),o=null}));const u=[{transform:"rotate(0) scale(1)"},{transform:"rotate(360deg) scale(0)"}],m={duration:500,iterations:1};
//# sourceMappingURL=index.644b25ce.js.map
