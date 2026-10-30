(() => {
 const dialog=document.querySelector('#editorial-menu'),open=document.querySelector('.editorial-open');
 if(!dialog||!open)return;
 const panels=[...dialog.querySelectorAll('.editorial-panel')],buttons=[...dialog.querySelectorAll('[data-panel]')];
 const reset=()=>{panels.forEach(p=>p.hidden=true);buttons.forEach(b=>b.setAttribute('aria-expanded','false'));dialog.classList.remove('has-panel');};
 open.addEventListener('click',()=>{reset();dialog.showModal();document.body.style.overflow='hidden';dialog.querySelector('.editorial-close').focus();});
 const close=()=>dialog.close();
 dialog.querySelector('.editorial-close').addEventListener('click',close);
 dialog.addEventListener('close',()=>{document.body.style.overflow='';open.focus();});
 dialog.addEventListener('click',e=>{if(e.target===dialog||e.target.closest('a'))close();});
 buttons.forEach(b=>b.addEventListener('click',()=>{reset();document.getElementById(b.dataset.panel).hidden=false;b.setAttribute('aria-expanded','true');dialog.classList.add('has-panel');if(matchMedia('(max-width:700px)').matches)document.getElementById(b.dataset.panel).querySelector('button').focus();}));
 dialog.querySelectorAll('.editorial-back').forEach(b=>b.addEventListener('click',()=>{const selected=buttons.find(x=>x.getAttribute('aria-expanded')==='true');reset();selected?.focus();}));
 document.querySelectorAll('a[href]').forEach(a=>{if(a.getAttribute('href')===location.pathname)a.setAttribute('aria-current','page');});
})();
