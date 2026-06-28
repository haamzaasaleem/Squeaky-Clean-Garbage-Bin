(function(){
  "use strict";
  // mobile nav
  var b=document.getElementById('burger'), n=document.getElementById('nav');
  if(b&&n){b.addEventListener('click',function(){var o=n.classList.toggle('open');b.classList.toggle('x',o);});
    n.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){n.classList.remove('open');b.classList.remove('x');});});}

  // reveal on scroll
  var rv=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window && rv.length){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    rv.forEach(function(el,i){el.style.transitionDelay=(i%3)*80+'ms';io.observe(el);});
  }else{rv.forEach(function(el){el.classList.add('in');});}

  // before/after sliders
  document.querySelectorAll('.ba').forEach(function(ba){
    var after=ba.querySelector('.after-img'), handle=ba.querySelector('.handle'); if(!after||!handle)return;
    var drag=false;
    function set(x){var r=ba.getBoundingClientRect();var p=((x-r.left)/r.width)*100;p=Math.max(2,Math.min(98,p));after.style.clipPath='inset(0 0 0 '+p+'%)';handle.style.left=p+'%';}
    ba.addEventListener('mousedown',function(e){drag=true;set(e.clientX);});
    window.addEventListener('mousemove',function(e){if(drag)set(e.clientX);});
    window.addEventListener('mouseup',function(){drag=false;});
    ba.addEventListener('touchstart',function(e){drag=true;set(e.touches[0].clientX);},{passive:true});
    ba.addEventListener('touchmove',function(e){if(drag)set(e.touches[0].clientX);},{passive:true});
    window.addEventListener('touchend',function(){drag=false;});
  });

  // form
  document.querySelectorAll('form[data-fake]').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();var ok=f.querySelector('.okmsg'),valid=true;
      f.querySelectorAll('[required]').forEach(function(i){if(!i.value.trim()){valid=false;i.style.borderColor='#e0654f';}else{i.style.borderColor='';}});
      if(!valid)return;
      if(ok){ok.classList.add('show');var nm=(f.querySelector('[name=name]')||{}).value||'';var fn=nm.split(' ')[0];
        ok.querySelector('.t').textContent=(fn?'Thanks, '+fn+'! ':'Thanks! ')+"We'll text or call within one business day.";}
      f.querySelectorAll('input,textarea,select').forEach(function(i){if(i.type!=='radio')i.value='';});
      if(ok)ok.scrollIntoView({behavior:'smooth',block:'center'});
    });
  });

  var yr=document.getElementById('yr'); if(yr)yr.textContent=new Date().getFullYear();
})();
