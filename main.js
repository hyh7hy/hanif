(()=>{'use strict';
const CONTACT_EMAIL=''; // Add a real address here to enable the email fallback.
const pages=[['index.html','Home'],['about.html','About'],['work.html','Work'],['services.html','Services'],['contact.html','Contact']];
const compass=(c='')=>`<svg class="compass ${c}" viewBox="0 0 200 200" role="img" aria-label="Antique compass rose illustration" tabindex="0" fill="none" stroke="#292720" stroke-width=".8"><circle cx="100" cy="100" r="92"/><circle cx="100" cy="100" r="80" stroke-dasharray="2 3"/><circle cx="100" cy="100" r="56"/><path d="M100 8v184M8 100h184M35 35l130 130M165 35L35 165" opacity=".4"/><path d="M100 14l10 76 76 10-76 10-10 76-10-76-76-10 76-10z" fill="#E7DCC7"/><g class="needle"><path d="M100 30l7 70h-14z" fill="#292720"/><path d="M100 170l-7-70h14z" fill="#F5F0E6"/></g><path class="mk" d="M100 6v22" stroke-width="2.5"/><path class="route" d="M100 100Q140 70 175 40" stroke-dasharray="3 3"/><text x="96" y="5" font-size="8" fill="#292720" stroke="none">N</text><text x="62" y="196" font-size="6" fill="#777065" stroke="none">7.67°N 36.83°E</text></svg>`;
const logo=`<svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" aria-hidden="true"><circle cx="17" cy="17" r="15"/><path d="M17 2v6M17 26v6M2 17h6M26 17h6"/><text x="7" y="22" font-size="12" font-family="Cormorant Garamond,serif" fill="currentColor" stroke="none">HA</text></svg>`;
const here=location.pathname.split('/').pop()||'index.html';
const h=document.getElementById('site-header');
if(h)h.outerHTML=`<header class="site"><div class="wrap"><a class="logo" href="index.html" aria-label="Hanif Awol Seid, home">${logo}Hanif Awol Seid</a><button class="menu-btn" aria-expanded="false" aria-controls="nav">Menu</button><nav id="nav" aria-label="Main"><ul>${pages.map(([u,t])=>`<li><a href="${u}"${u===here?' aria-current="page"':''}>${t}</a></li>`).join('')}</ul></nav></div></header>`;
const f=document.getElementById('site-footer');
if(f)f.outerHTML=`<footer><div class="wrap"><div><strong>Hanif Awol Seid</strong><p class="mono">Jimma, Ethiopia</p><p class="mono">© ${new Date().getFullYear()}</p></div><ul>${pages.map(([u,t])=>`<li><a href="${u}">${t}</a></li>`).join('')}</ul><div style="max-width:140px">${compass()}</div></div></footer>`;
document.querySelectorAll('[data-compass]').forEach(e=>e.innerHTML=compass());
const btn=document.querySelector('.menu-btn'),nav=document.getElementById('nav');
if(btn){const set=o=>{nav.classList.toggle('open',o);btn.setAttribute('aria-expanded',o)};
btn.onclick=()=>set(!nav.classList.contains('open'));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){set(false);btn.focus()}});}
// Placeholder projects: replace with real work. Nothing here claims finished work.
const projects=[
{t:'Web project (placeholder)',c:'Web Development',d:'Slot for a front-end website. Add real details.',tools:'HTML, CSS, JavaScript'},
{t:'Graphic design (placeholder)',c:'Graphic Design',d:'Slot for a design piece.',tools:'Adobe Photoshop, Adobe Illustrator'},
{t:'VFX music video (placeholder)',c:'Visual Effects',d:'Slot for the music video visual effects artwork.',tools:'Adobe After Effects'},
{t:'Ayu Sanitary content (placeholder)',c:'Video Editing',d:'Slot for content writing and video editing associated with Ayu Sanitary.',tools:'To be added'},
{t:'Maldova Investment content (placeholder)',c:'Content Writing',d:'Slot for content writing and visual communication associated with Maldova Investment.',tools:'To be added'},
{t:'Photo edit (placeholder)',c:'Photo Editing',d:'Slot for a photo editing piece.',tools:'Adobe Photoshop'}];
const grid=document.getElementById('grid');
if(grid){const lim=+grid.dataset.limit||projects.length;
grid.innerHTML=projects.slice(0,lim).map((p,i)=>`<article class="card" data-cat="${p.c}"><div class="ph" role="img" aria-label="Placeholder image for ${p.t}"><span class="mono">IMAGE PLACEHOLDER<br>${i+1}</span></div><span class="mono">${p.c}</span><h3>${p.t}</h3><p>${p.d}</p><p class="mono">${p.tools}</p><button class="btn ghost" data-i="${i}">View details</button></article>`).join('');
const dlg=document.getElementById('dlg');let last;
grid.onclick=e=>{const b=e.target.closest('button[data-i]');if(!b)return;last=b;const p=projects[b.dataset.i];
dlg.innerHTML=`<h2>${p.t}</h2><p class="mono">${p.c}</p><dl><dt>DESCRIPTION</dt><dd>${p.d}</dd><dt>CONTEXT</dt><dd>Not yet provided.</dd><dt>HANIF'S CONTRIBUTION</dt><dd>Not yet provided.</dd><dt>TOOLS</dt><dd>${p.tools}</dd><dt>RESULTS</dt><dd>None verified yet.</dd></dl><div class="row"><button class="btn" autofocus>Close</button></div>`;
dlg.showModal();dlg.querySelector('button').onclick=()=>dlg.close()};
dlg.onclick=e=>{if(e.target===dlg)dlg.close()};dlg.onclose=()=>last&&last.focus();
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filters button').forEach(x=>x.setAttribute('aria-pressed',x===b));
grid.querySelectorAll('.card').forEach(c=>c.hidden=b.dataset.f!=='all'&&c.dataset.cat!==b.dataset.f)});
grid.addEventListener('touchstart',e=>{const c=e.target.closest('.card');grid.querySelectorAll('.sel').forEach(x=>x.classList.remove('sel'));c&&c.classList.add('sel')},{passive:true});}
const form=document.getElementById('cform');
if(form){const st=document.getElementById('status');
form.onsubmit=e=>{e.preventDefault();let ok=true;
form.querySelectorAll('[required]').forEach(i=>{const m=form.querySelector('#e-'+i.id);let msg='';
if(!i.value.trim())msg='This field is required.';else if(i.type==='email'&&!/^\S+@\S+\.\S+$/.test(i.value))msg='Enter a valid email address.';
m.textContent=msg;i.setAttribute('aria-invalid',!!msg);if(msg)ok=false});
st.style.display='block';
if(!ok){st.textContent='Please fix the highlighted fields. Nothing was sent.';return}
if(CONTACT_EMAIL){const d=new FormData(form);location.href=`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Project enquiry: '+d.get('type'))}&body=${encodeURIComponent(d.get('message')+'\n\n'+d.get('name')+' <'+d.get('email')+'>')}`;st.textContent='Your email app should open with the message ready. It is not sent until you send it there.'}
else st.textContent='Your details look valid, but this site has no email address or backend configured yet, so nothing was sent.'}}
})();
