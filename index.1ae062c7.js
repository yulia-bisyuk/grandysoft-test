const e=document.getElementById("canvas"),t=document.getElementById("collapse"),n=document.getElementById("color"),o=document.getElementById("lineWidth"),a=e.getContext("2d");let d={x:0,y:0},s=null,c=5;function i(t){d.x=t.clientX-e.offsetLeft,d.y=t.clientY-e.offsetTop}function r(e){"canvas"===e.target.id&&(console.log("start"),i(e),document.addEventListener("mousemove",u))}function u(e){"canvas"===e.target.id&&(console.log("draw"),document.removeEventListener("mousedown",r),a.beginPath(),a.lineWidth=c,a.strokeStyle=s,a.moveTo(d.x,d.y),a.stroke(),i(e),a.lineTo(d.x,d.y),a.lineCap="round",a.stroke(),document.addEventListener("mouseup",l))}function l(e){"canvas"===e.target.id&&(console.log("stop"),document.removeEventListener("mousemove",u),i(e),s=null,document.removeEventListener("mouseup",l),document.addEventListener("mousedown",r))}document.addEventListener("mousedown",r),n.addEventListener("input",(function(e){console.log("onInput",e.target.value),s=e.target.value})),o.addEventListener("change",(function(e){c=e.target.value,console.log("onLineWidthChange",e.target.value)})),t.addEventListener("click",(function(){if(!d.x&&!d.y)return;a.clearRect(0,0,e.width,e.height),e.animate(m,v)}));const m=[{transform:"rotate(0) scale(1)"},{transform:"rotate(360deg) scale(0)"}],v={duration:500,iterations:1};
//# sourceMappingURL=index.1ae062c7.js.map