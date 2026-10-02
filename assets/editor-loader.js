(function(){
'use strict';
let ready;
function load(){
  if(ready) return ready;
  ready=(async()=>{
    if(!document.getElementById('layoutEditor')){
      const r=await fetch('assets/editor-dialog.html',{cache:'no-store'});
      if(!r.ok) throw new Error('Impossible de charger l’éditeur visuel.');
      document.body.insertAdjacentHTML('beforeend',await r.text());
    }
    if(!window.CyrusEditor){
      await new Promise((resolve,reject)=>{
        const s=document.createElement('script');
        s.src='assets/editor.js';
        s.onload=resolve;
        s.onerror=()=>reject(new Error('Impossible de charger editor.js'));
        document.body.appendChild(s);
      });
    }
  })();
  return ready;
}
window.openLayoutEditor=async function(){
  try{await load();window.CyrusEditor.open()}
  catch(e){if(typeof msg==='function')msg(e.message||String(e),true);else alert(e.message||String(e))}
};
load().catch(()=>{});
})();