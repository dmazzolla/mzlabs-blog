(function(){
'use strict';
var r=document.documentElement;
var reduz=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var botao=document.getElementById('tema');
function atual(){var t=r.getAttribute('data-theme');if(t==='dark'||t==='light')return t;
return window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}
if(botao)botao.addEventListener('click',function(){var n=atual()==='dark'?'light':'dark';
r.setAttribute('data-theme',n);try{localStorage.setItem('mzlabs-tema',n);}catch(e){}});
Array.prototype.forEach.call(document.querySelectorAll('[data-carrossel]'),function(c){
var t=c.querySelector('.trilho'),n=t.children.length,ant=c.querySelector('.ant'),prox=c.querySelector('.prox'),
cont=c.querySelector('.contador'),pontos=c.querySelectorAll('.pontos span'),i=0;
if(n<2)return;
function vai(k){k=Math.max(0,Math.min(n-1,k));t.scrollTo({left:k*t.clientWidth,behavior:reduz?'auto':'smooth'});}
function marca(){var k=Math.round(t.scrollLeft/Math.max(1,t.clientWidth));if(k===i&&cont.textContent)return;i=k;
cont.textContent=(i+1)+'/'+n;ant.disabled=i===0;prox.disabled=i===n-1;
for(var j=0;j<pontos.length;j++)pontos[j].classList.toggle('ativo',j===i);}
ant.addEventListener('click',function(){vai(i-1);});
prox.addEventListener('click',function(){vai(i+1);});
var pedido=0;t.addEventListener('scroll',function(){cancelAnimationFrame(pedido);pedido=requestAnimationFrame(marca);},{passive:true});
t.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){vai(i+1);e.preventDefault();}
else if(e.key==='ArrowLeft'){vai(i-1);e.preventDefault();}});
window.addEventListener('resize',function(){t.scrollLeft=i*t.clientWidth;});
i=-1;marca();
});
})();
