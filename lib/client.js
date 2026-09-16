window.__ModuleLoader__.load({ id: 'dsh-filehub', factory: (require) => { var module = { exports: {} }; var exports = module.exports;
"use strict";var O=require("react");function K(e){let t=e??(typeof navigator<"u"?navigator:void 0);return/^zh\b|-zh/i.test(t?.language??"")?"zh":"en"}function P(e){if(!Number.isFinite(e)||e<0)return"?";if(e<1024)return`${e} B`;let t=["KB","MB","GB","TB","PB"],n=e,o="B";for(let i of t)if(n/=1024,o=i,n<1024)break;let s=Math.round(n*10)/10;return`${Number.isInteger(s)?String(s):s.toFixed(1)} ${o}`}function se(e){let t=e.replace(/\\/g,"/"),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function ve(e){let t=e.replace(/\\/g,"/").trim();for(;t.startsWith("./");)t=t.slice(2);return t==="."||t===".."?"":t.replace(/^\/+|\/+$/g,"")}var oe=!1;function N(e,t){if(oe||typeof document>"u")return;if(document.getElementById(e)!==null){oe=!0;return}let n=document.createElement("style");n.id=e,n.textContent=t,document.head.appendChild(n),oe=!0}function xe(e){return e!==void 0&&/\s/u.test(e)}function Se(e){let t=[],n=0;for(;n<e.length;){let o=n===0||xe(e[n-1]);if(e[n]!=="@"||!o){n+=1;continue}if(e[n+1]==='"'){let r=e.indexOf('"',n+2);if(r>n+2){let i=e.slice(n+2,r);t.push({raw:e.slice(n,r+1),value:i,quoted:!0,start:n,end:r+1}),n=r+1;continue}break}let s=n+1;for(;s<e.length&&!xe(e[s]);)s+=1;if(s>n+1){let r=e.slice(n+1,s);t.push({raw:e.slice(n,s),value:r,quoted:!1,start:n,end:s})}n=s}return t}function re(e,t,n=!1){let o=t==="directory"?`${e}/`:e;return/[\u0000-\u001f\u007f-\u009f"]/u.test(o)?void 0:n||/\s/u.test(o)?t==="directory"?`@"${o}`:`@"${o}"`:`@${o}`}var m=require("react/jsx-runtime"),z="currentColor";function M({body:e}){return(0,m.jsxs)("svg",{className:"zdsh-filehub-icon",viewBox:"0 0 16 16","aria-hidden":"true",children:[(0,m.jsx)("path",{d:"M4 1.5h5L13 5v9a.9.9 0 0 1-.9.9H4.9A.9.9 0 0 1 4 14V2.4Z",fill:"none",stroke:z,strokeWidth:"1.2",strokeLinejoin:"round"}),e]})}function we(e,t){if(e==="directory")return(0,m.jsx)("svg",{className:"zdsh-filehub-icon",viewBox:"0 0 16 16","aria-hidden":"true",children:(0,m.jsx)("path",{d:"M1.8 3.5h4l1.4 1.6h6.9c.4 0 .7.3.7.7v7.4c0 .4-.3.7-.7.7H1.8a.7.7 0 0 1-.7-.7V4.2c0-.4.3-.7.7-.7Z",fill:"none",stroke:z,strokeWidth:"1.2",strokeLinejoin:"round"})});switch(t.slice(t.lastIndexOf(".")+1).toLowerCase()){case"md":case"markdown":return(0,m.jsx)(M,{body:(0,m.jsx)("path",{d:"M6 11V7l2 2.2L10 7v4M12.5 7v4m0-1.6 1.3-1.5m-1.3 3.1 1.3 1.4",fill:"none",stroke:z,strokeWidth:"1.1",strokeLinecap:"round",strokeLinejoin:"round"})});case"ts":case"tsx":case"js":case"jsx":case"mjs":case"cjs":return(0,m.jsx)(M,{body:(0,m.jsx)("path",{d:"m6.4 7.6-1.8 1.8 1.8 1.8m3.2-3.6 1.8 1.8-1.8 1.8",fill:"none",stroke:z,strokeWidth:"1.1",strokeLinecap:"round",strokeLinejoin:"round"})});case"py":return(0,m.jsx)(M,{body:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("circle",{cx:"6.6",cy:"9",r:"0.7",fill:z}),(0,m.jsx)("circle",{cx:"9.4",cy:"11",r:"0.7",fill:z}),(0,m.jsx)("path",{d:"M8.2 6.6c-1.6 0-1.6 1.2-1.6 1.2v1h2.8v.9s.1 1.3-1.4 1.3",fill:"none",stroke:z,strokeWidth:"1",strokeLinecap:"round"})]})});case"json":case"yaml":case"yml":case"toml":return(0,m.jsx)(M,{body:(0,m.jsx)("path",{d:"M6 6.4 4.4 8 6 9.6m4-3.2L11.6 8 10 9.6M8.6 5.8l-1.2 4.4",fill:"none",stroke:z,strokeWidth:"1.1",strokeLinecap:"round",strokeLinejoin:"round"})});case"png":case"jpg":case"jpeg":case"gif":case"webp":case"bmp":case"ico":case"svg":return(0,m.jsx)(M,{body:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("rect",{x:"5.6",y:"7",width:"6.2",height:"4.6",rx:"0.6",fill:"none",stroke:z,strokeWidth:"1"}),(0,m.jsx)("circle",{cx:"7.3",cy:"8.6",r:"0.6",fill:z}),(0,m.jsx)("path",{d:"m6.4 11.2 1.7-1.7 1.2 1.2 1.1-1.1 1 1",fill:"none",stroke:z,strokeWidth:"0.9",strokeLinejoin:"round"})]})});case"pdf":return(0,m.jsx)(M,{body:(0,m.jsx)("path",{d:"M6.2 11.4V7h1.5a1.1 1.1 0 1 1 0 2.2H6.2m3.8-.1v2.3m0-2.3c0-1 1.8-1 1.8 0s-1.8 1-1.8 2.3Z",fill:"none",stroke:z,strokeWidth:"1",strokeLinecap:"round",strokeLinejoin:"round"})});case"zip":case"gz":case"tar":case"tgz":return(0,m.jsx)(M,{body:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("path",{d:"M8 6.4v1m0 .9v1m0 .9v.9",stroke:z,strokeWidth:"1",strokeLinecap:"round"}),(0,m.jsx)("rect",{x:"6.9",y:"11.2",width:"2.2",height:"1.4",rx:"0.3",fill:"none",stroke:z,strokeWidth:"0.9"})]})});default:return(0,m.jsx)(M,{body:(0,m.jsx)("path",{d:"M6.4 8.4h3.2M6.4 10.2h3.2",stroke:z,strokeWidth:"1",strokeLinecap:"round"})})}}function ze(){return async(e,t,n)=>{let o=`/api/filehub/search?sessionId=${encodeURIComponent(e)}&q=${encodeURIComponent(t)}`,s=await fetch(o,{signal:n});if(!s.ok)throw new Error(`filehub search failed: HTTP ${s.status}`);return await s.json()}}function at(e,t){let n=t.trim().toLowerCase();return n===""?[...e]:e.filter(o=>{let s=o.relativePath.toLowerCase(),r=s.lastIndexOf("/");return s.slice(r+1).includes(n)||s.includes(n)})}function ke(e,t,n=120){let o,s=[],r,i=p=>{let h=s;s=[];let u=t();if(u===null||u===""){for(let l of h)l.reject(new Error("session-missing"));return}r?.abort();let f=new AbortController;r=f,e(u,p,f.signal).then(l=>{if(!f.signal.aborted)for(let a of h)a.resolve(at(l.entries,p))}).catch(l=>{if(!f.signal.aborted)for(let a of h)a.reject(l)})};return(p,h)=>new Promise((u,f)=>{if(h.aborted){f(new Error("aborted"));return}s.push({resolve:u,reject:f}),h.addEventListener("abort",()=>{f(new Error("aborted"))},{once:!0}),o!==void 0&&clearTimeout(o),o=setTimeout(()=>{i(p)},Math.max(0,n)),typeof o.unref=="function"&&o.unref()})}var lt="zdsh-filehub.mentionDisabled";function dt(e){if(typeof e>"u")return!1;try{return e.getItem(lt)==="1"}catch{return!1}}function ct(e,t){if(re(e.relativePath,e.kind,t)===void 0)return;let o={p:e.relativePath,k:e.kind},s=e.relativePath.lastIndexOf("/"),r=s>=0?e.relativePath.slice(s+1):e.relativePath,i=s>0?e.relativePath.slice(0,s):void 0;return{name:r,description:i??e.kind,section:"filehub",value:JSON.stringify(o)}}function ut(e={}){let t=e.sessionId??pt,n=ke(e.fetchSearch??ze(),t,120),o="";return{trigger:"@",name:"filehub",order:20,showGroupTitle:!0,async candidates(s,r){o=r.query;try{return(await n(r.query,r.signal)).flatMap(p=>ct(p,r.quoted===!0)??[])}catch{return[]}},onPick(s){let r;try{r=s.candidate.value!==void 0?JSON.parse(s.candidate.value):void 0}catch{r=void 0}let i=r?.k;if(r===void 0||i!=="file"&&i!=="directory")return;let p=o.endsWith('"'),h=re(r.p,i,s.candidate.name.includes(" ")||p);if(h!==void 0)return{text:`${h} `}}}}var Ce=null;function ie(e){Ce=e!==null&&e!==""?e:null}function pt(){return Ce}function Ee(e,t={}){if(dt(t.storage??(typeof localStorage>"u"?void 0:localStorage))){e.logger.info("[filehub] mention trigger disabled by settings; skipping source registration");return}let n;try{n=e.get("inputTriggers")}catch{n=void 0}if(!n||typeof n.registerSource!="function"){e.logger.warn("[filehub] inputTriggers service unavailable; @ picker not registered");return}return n.registerSource(ut(t))}var D=require("react/jsx-runtime"),ft=`
.zdsh-filehub-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 2px 0;
}
.zdsh-filehub-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  max-width: 260px;
  padding: 2px 4px 2px 6px;
  border-radius: 6px;
  background: rgba(127, 127, 127, 0.16);
  font-size: 12px;
  line-height: 1.3;
  border: none;
  color: inherit;
  cursor: pointer;
}
.zdsh-filehub-chip:hover { background: rgba(127, 127, 127, 0.28); }
.zdsh-filehub-chip-label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
button.zdsh-filehub-chip-x {
  flex: none;
  border: none;
  background: transparent;
  color: inherit;
  font-size: 10px;
  line-height: 1;
  padding: 2px 3px;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.7;
}
button.zdsh-filehub-chip-x:hover { opacity: 1; background: rgba(127, 127, 127, 0.3); }
`;function ht(e,t){try{let o=(e?.closest("[data-composer-card]")??e?.ownerDocument.querySelector("[data-composer-card]"))?.querySelector("textarea");if(!o)return;o.focus();let s=Math.min(t.start,o.value.length),r=Math.min(t.end,o.value.length);o.setSelectionRange(s,r)}catch{}}function Re(e){let{sessionId:t,useInput:n,inputActions:o,draft:s,onLocate:r}=e;(0,O.useEffect)(()=>(ie(t??null),()=>{ie(null)}),[t]),(0,O.useEffect)(()=>{N("zdsh-filehub-mention-chip-styles",ft)},[]);let i=n?n(l=>l.draft):s??"",p=Se(i),h=l=>!l.quoted&&l.value.endsWith("/")?"directory":"file",u=(0,O.useCallback)(l=>{o&&o.setDraft(i.slice(0,l.start)+i.slice(l.end))},[i,o]),f=(0,O.useCallback)((l,a)=>{if(r){r(l);return}ht(a,l)},[r]);return p.length===0?null:(0,D.jsx)("div",{className:"zdsh-filehub-chips","data-testid":"zdsh-filehub-chips",children:p.map((l,a)=>(0,D.jsx)(gt,{token:l,index:a,kind:h(l),onRemove:()=>{u(l)},onLocate:f},`${l.start}:${l.raw}`))})}function gt(e){let{token:t,index:n,kind:o,onRemove:s,onLocate:r}=e,i=t.value.replace(/\/$/u,""),p=i.lastIndexOf("/"),h=p>=0?i.slice(p+1):i;return(0,D.jsxs)("span",{className:"zdsh-filehub-chip","data-testid":`zdsh-filehub-chip-${n}`,title:t.value,role:"button",tabIndex:0,onClick:u=>{r(t,u.currentTarget)},onKeyDown:u=>{u.key==="Enter"&&r(t,u.currentTarget)},children:[we(o,t.value),(0,D.jsx)("span",{className:"zdsh-filehub-chip-label",children:h}),(0,D.jsx)("button",{type:"button",className:"zdsh-filehub-chip-x",title:"Remove reference","aria-label":`Remove reference ${t.value}`,onClick:u=>{u.stopPropagation(),s()},children:"\u2715"})]})}var I=require("react");var Q=`
.zdsh-filehub-hidden-input { display: none !important; }

button.zdsh-filehub-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border: none;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 12px;
  line-height: 1;
  padding: 4px 6px;
  border-radius: 6px;
  cursor: pointer;
  opacity: 0.82;
}
button.zdsh-filehub-btn:hover,
button.zdsh-filehub-btn:focus-visible {
  opacity: 1;
  background: rgba(127, 127, 127, 0.14);
  outline: none;
}
.zdsh-filehub-btn-icon { width: 14px; height: 14px; }

.zdsh-filehub-mask {
  position: fixed;
  inset: 0;
  z-index: 2147483000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(16, 24, 40, 0.45);
  backdrop-filter: blur(2px);
  pointer-events: none;
}
.zdsh-filehub-mask-card {
  max-width: 420px;
  padding: 20px 32px;
  border-radius: 12px;
  border: 2px dashed rgba(255, 255, 255, 0.55);
  background: rgba(16, 24, 40, 0.72);
  color: #fff;
  text-align: center;
}
.zdsh-filehub-mask-title { font-size: 18px; font-weight: 600; }
.zdsh-filehub-mask-sub { margin-top: 6px; font-size: 12px; opacity: 0.85; }

.zdsh-filehub-dock {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 2px 0;
}
.zdsh-filehub-row {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  padding: 3px 6px;
  border-radius: 6px;
  font-size: 12px;
  line-height: 1.3;
}
.zdsh-filehub-row:hover { background: rgba(127, 127, 127, 0.10); }
.zdsh-filehub-badge {
  flex: none;
  min-width: 30px;
  text-align: center;
  padding: 2px 4px;
  border-radius: 4px;
  background: rgba(127, 127, 127, 0.18);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.04em;
  overflow: hidden;
}
.zdsh-filehub-name {
  flex: 0 1 auto;
  min-width: 0;
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.zdsh-filehub-dir-mark { flex: none; opacity: 0.7; }
.zdsh-filehub-size { flex: none; opacity: 0.65; font-variant-numeric: tabular-nums; }
.zdsh-filehub-bar {
  flex: 1 1 60px;
  height: 4px;
  min-width: 48px;
  border-radius: 999px;
  background: rgba(127, 127, 127, 0.22);
  overflow: hidden;
}
.zdsh-filehub-bar-fill {
  height: 100%;
  border-radius: 999px;
  background: currentColor;
  transition: width 120ms ease-out;
}
.zdsh-filehub-status { flex: none; opacity: 0.75; }
.zdsh-filehub-status--done { color: #2fa36b; opacity: 1; }
.zdsh-filehub-status--error { color: #e5484d; opacity: 1; }
.zdsh-filehub-error-text { color: #e5484d; flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.zdsh-filehub-xbtns { display: inline-flex; gap: 2px; margin-left: auto; flex: none; }
button.zdsh-filehub-xbtn {
  border: none;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 11px;
  line-height: 1;
  padding: 3px 5px;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.75;
}
button.zdsh-filehub-xbtn:hover { opacity: 1; background: rgba(127, 127, 127, 0.16); }
`;var mt={"dock.explained":"\u5DF2\u8BB2\u89E3","console.tab":"\u6587\u4EF6","console.title":"\u6587\u4EF6\u4E2D\u5FC3","console.search.placeholder":"\u641C\u7D22\u6587\u4EF6\u540D\u6216\u8DEF\u5F84\u2026","console.filter.all":"\u5168\u90E8","console.filter.image":"\u56FE\u7247","console.filter.document":"\u6587\u6863","console.filter.text":"\u6587\u672C","console.filter.binary":"\u4E8C\u8FDB\u5236","console.filter.media":"\u97F3\u89C6\u9891","console.stats.summary":"{files} \u4E2A\u6587\u4EF6 \xB7 {size}","console.empty":"\u6CA1\u6709\u5339\u914D\u7684\u6587\u4EF6","console.loading":"\u52A0\u8F7D\u4E2D\u2026","console.retry":"\u91CD\u8BD5","console.refresh":"\u5237\u65B0","console.truncated":"\u7ED3\u679C\u8FC7\u591A\uFF0C\u4EC5\u663E\u793A\u524D {limit} \u6761","console.disabled":"FileHub \u5DF2\u5728\u8BBE\u7F6E\u4E2D\u505C\u7528","console.error.load":"\u52A0\u8F7D\u5931\u8D25\uFF1A{message}","console.detail.path":"\u8DEF\u5F84","console.detail.copy":"\u590D\u5236\u8DEF\u5F84","console.detail.copied":"\u5DF2\u590D\u5236","console.detail.session":"\u4F1A\u8BDD","console.detail.size":"\u5927\u5C0F","console.detail.time":"\u65F6\u95F4","console.detail.kind":"\u7C7B\u578B","console.cleanup.expired":"\u6E05\u7406\u8FC7\u671F\u6587\u4EF6","console.cleanup.session":"\u6E05\u7A7A\u672C\u4F1A\u8BDD\u6587\u4EF6","console.cleanup.confirmTitle":"\u786E\u8BA4\u6E05\u7406","console.cleanup.dryRun":"\u5C06\u5220\u9664 {count} \u4E2A\u6587\u4EF6\uFF0C\u91CA\u653E {size}\u3002","console.cleanup.execute":"\u786E\u8BA4\u5220\u9664","console.cleanup.cancel":"\u53D6\u6D88","console.cleanup.working":"\u5904\u7406\u4E2D\u2026","console.cleanup.done":"\u5DF2\u5220\u9664 {count} \u4E2A\u6587\u4EF6\uFF0C\u91CA\u653E {size}","console.cleanup.failed":"\u6E05\u7406\u5931\u8D25\uFF1A{message}","settings.tab":"FileHub","settings.section.general":"\u901A\u7528","settings.section.privacy":"\u9690\u79C1","settings.enabled":"\u542F\u7528 FileHub","settings.enabled.desc":"\u5173\u95ED\u540E\u63A7\u5236\u53F0\u4E0E\u4E0A\u4F20\u5165\u53E3\u4E00\u5E76\u9690\u85CF\u3002","settings.ignorePastedMentions":"\u5FFD\u7565\u7C98\u8D34\u5185\u5BB9\u7684 @ \u5019\u9009","settings.ignorePastedMentions.desc":"\u7C98\u8D34\u6587\u672C\u4E2D\u7684\u8DEF\u5F84\u4E0D\u518D\u751F\u6210\u6587\u4EF6\u5F15\u7528\u5019\u9009\u3002","settings.candidatesMax":"\u5019\u9009\u6570\u91CF\u4E0A\u9650","settings.candidatesMax.desc":"@ \u63D0\u53CA\u9009\u62E9\u5668\u4E00\u6B21\u5C55\u793A\u7684\u6700\u5927\u6761\u6570\uFF081\u2013200\uFF09\u3002","settings.defaultView":"\u63A7\u5236\u53F0\u9ED8\u8BA4\u89C6\u56FE","settings.defaultView.desc":"\u6253\u5F00\u201C\u6587\u4EF6\u201D\u6807\u7B7E\u9875\u65F6\u7684\u5206\u7EC4\u65B9\u5F0F\u3002","settings.defaultView.grouped":"\u6309\u4F1A\u8BDD\u5206\u7EC4","settings.defaultView.flat":"\u5E73\u94FA\u5217\u8868","settings.localFirstVision":"\u672C\u5730\u4F18\u5148\u5C55\u793A\u56FE\u7247","settings.localFirstVision.desc":"\u5148\u5C55\u793A\u672C\u5730\u7F29\u7565\u4E0E\u8BF4\u660E\uFF0C\u5916\u53D1\u8BF7\u6C42\u5E26\u6A2A\u5E45\u6807\u8BB0\u8BFB\u53D6\u3002","settings.visionMode":"\u56FE\u50CF\u7406\u89E3\u6A21\u5F0F","settings.visionMode.desc":"\u63A7\u5236\u89C6\u89C9\u7011\u5E03\u6D41\u5BF9\u5916\u53D1\u9001\u56FE\u50CF\u7684\u7B56\u7565\u3002","settings.visionMode.off":"\u5173\u95ED","settings.visionMode.caption":"\u4EC5\u751F\u6210\u8BF4\u660E","settings.visionMode.analyze":"\u5B8C\u6574\u5206\u6790","settings.restoreDefaults":"\u6062\u590D\u9ED8\u8BA4\u8BBE\u7F6E","settings.restoreConfirm":"\u786E\u5B9A\u6062\u590D\u5168\u90E8\u9ED8\u8BA4\u503C\u5417\uFF1F","settings.saved":"\u5DF2\u4FDD\u5B58","settings.saveError":"\u4FDD\u5B58\u5931\u8D25\uFF1A{message}","settings.loading":"\u52A0\u8F7D\u4E2D\u2026"},bt={"dock.explained":"Explained","console.tab":"Files","console.title":"File center","console.search.placeholder":"Search file name or path\u2026","console.filter.all":"All","console.filter.image":"Images","console.filter.document":"Documents","console.filter.text":"Text","console.filter.binary":"Binary","console.filter.media":"Media","console.stats.summary":"{files} files \xB7 {size}","console.empty":"No matching files","console.loading":"Loading\u2026","console.retry":"Retry","console.refresh":"Refresh","console.truncated":"Too many results \u2014 showing the first {limit}","console.disabled":"FileHub is disabled in Settings","console.error.load":"Failed to load: {message}","console.detail.path":"Path","console.detail.copy":"Copy path","console.detail.copied":"Copied","console.detail.session":"Session","console.detail.size":"Size","console.detail.time":"Time","console.detail.kind":"Kind","console.cleanup.expired":"Clean expired files","console.cleanup.session":"Clear this session\u2019s files","console.cleanup.confirmTitle":"Confirm cleanup","console.cleanup.dryRun":"{count} file(s) would be deleted, freeing {size}.","console.cleanup.execute":"Delete now","console.cleanup.cancel":"Cancel","console.cleanup.working":"Working\u2026","console.cleanup.done":"Deleted {count} file(s), freed {size}","console.cleanup.failed":"Cleanup failed: {message}","settings.tab":"FileHub","settings.section.general":"General","settings.section.privacy":"Privacy","settings.enabled":"Enable FileHub","settings.enabled.desc":"Turning this off hides the console and upload entries.","settings.ignorePastedMentions":"Skip @ candidates for pasted text","settings.ignorePastedMentions.desc":"Paths pasted into the draft no longer offer mention candidates.","settings.candidatesMax":"Candidate limit","settings.candidatesMax.desc":"Maximum entries shown by the @ mention picker (1\u2013200).","settings.defaultView":"Console default view","settings.defaultView.desc":"Grouping applied when the Files tab opens.","settings.defaultView.grouped":"By session","settings.defaultView.flat":"Flat list","settings.localFirstVision":"Local-first image display","settings.localFirstVision.desc":"Show local thumbnails first; outbound requests carry a banner marker.","settings.visionMode":"Vision mode","settings.visionMode.desc":"Controls how the vision waterfall sends images outward.","settings.visionMode.off":"Off","settings.visionMode.caption":"Caption only","settings.visionMode.analyze":"Full analysis","settings.restoreDefaults":"Restore defaults","settings.restoreConfirm":"Reset all values to defaults?","settings.saved":"Saved","settings.saveError":"Save failed: {message}","settings.loading":"Loading\u2026"},Fe={zh:mt,en:bt},W=K(),ae=new Set;function Te(){return W}function Le(e){if(e!==W){W=e;for(let t of[...ae])try{t()}catch{}}}function Ne(e){return ae.add(e),()=>ae.delete(e)}function d(e,t){let n=Fe[W][e]??Fe.en[e]??e;return t===void 0?n:n.replace(/\{(\w+)\}/g,(o,s)=>Object.prototype.hasOwnProperty.call(t,s)?String(t[s]):o)}function Ie(e){return e==="zh"?"zh":"en"}function Pe(e){if(!(!e||typeof e.getLocale!="function"||typeof e.subscribe!="function"))try{Le(Ie(e.getLocale().active)),e.subscribe(()=>{Le(Ie(e.getLocale().active))})}catch{}}var G=class extends Error{constructor(n,o){super(o??`upload failed with HTTP ${n}`);this.status=n;this.name="UploadHttpError"}},V=class extends Error{constructor(t){super(t),this.name="UploadResponseError"}};function yt(){let e=new Error("upload aborted");return e.name="AbortError",e}function vt(e){return e instanceof Error&&e.name==="AbortError"}function xt(e,t){if(e<200||e>299)throw new G(e,t.slice(0,300));let n;try{n=JSON.parse(t)}catch{throw new V("upload endpoint returned non-JSON body")}if(typeof n!="object"||n===null||typeof n.path!="string"||typeof n.relativePath!="string"||typeof n.sniffedType!="string"||typeof n.label!="string")throw new V("upload endpoint returned an unexpected body shape");let o=n;if(typeof o.path!="string"||typeof o.relativePath!="string"||typeof o.sniffedType!="string"||typeof o.label!="string")throw new V("upload endpoint returned an unexpected body shape");return{path:o.path,relativePath:o.relativePath,sniffedType:o.sniffedType,label:o.label,...typeof o.imageCaption=="string"&&o.imageCaption.length>0?{imageCaption:o.imageCaption}:{}}}function St(e){switch(e){case 403:return{httpStatus:e,code:"sessionUnknown",retryable:!1};case 413:return{httpStatus:e,code:"tooLarge",retryable:!1};case 415:return{httpStatus:e,code:"dangerousExtension",retryable:!1};case 429:return{httpStatus:e,code:"concurrencyFull",retryable:!0};case 507:return{httpStatus:e,code:"quotaExhausted",retryable:!0};default:return e>=500?{httpStatus:e,code:"serverError",retryable:!0}:{httpStatus:e,code:"badResponse",retryable:!1}}}var Me={sessionUnknown:{en:"Session expired or unknown; reopen the conversation.",zh:"\u4F1A\u8BDD\u672A\u77E5\u6216\u5DF2\u5931\u6548\uFF0C\u8BF7\u91CD\u65B0\u6253\u5F00\u4F1A\u8BDD\u3002"},sessionMissing:{en:"No active session yet \u2014 open a conversation first.",zh:"\u4F1A\u8BDD\u672A\u5C31\u7EEA\u2014\u2014\u8BF7\u5148\u6253\u5F00\u4E00\u4E2A\u4F1A\u8BDD\u3002"},tooLarge:{en:"File exceeds the size limit.",zh:"\u6587\u4EF6\u8D85\u8FC7\u5927\u5C0F\u4E0A\u9650\u3002"},dangerousExtension:{en:"This file type is blocked for safety.",zh:"\u8BE5\u6269\u5C55\u540D\u88AB\u5B89\u5168\u7B56\u7565\u62D2\u7EDD\u3002"},concurrencyFull:{en:"Server busy; retry in a moment.",zh:"\u670D\u52A1\u7AEF\u5E76\u53D1\u5DF2\u6EE1\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"},quotaExhausted:{en:"Session storage quota is full; remove some files and retry.",zh:"\u4F1A\u8BDD\u914D\u989D\u5DF2\u6EE1\uFF0C\u8BF7\u5220\u9664\u90E8\u5206\u6587\u4EF6\u540E\u91CD\u8BD5\u3002"},serverError:{en:"Server error; you can retry.",zh:"\u670D\u52A1\u7AEF\u9519\u8BEF\uFF0C\u53EF\u91CD\u8BD5\u3002"},badResponse:{en:"Upload rejected by server.",zh:"\u4E0A\u4F20\u88AB\u670D\u52A1\u7AEF\u62D2\u7EDD\u3002"},invalidResponse:{en:"Upload endpoint returned malformed data.",zh:"\u4E0A\u4F20\u63A5\u53E3\u8FD4\u56DE\u6570\u636E\u5F02\u5E38\u3002"},network:{en:"Network error; check connection and retry.",zh:"\u7F51\u7EDC\u9519\u8BEF\uFF0C\u8BF7\u68C0\u67E5\u8FDE\u63A5\u540E\u91CD\u8BD5\u3002"}};function wt(){return e=>new Promise((t,n)=>{if(typeof XMLHttpRequest>"u"){n(new Error("XMLHttpRequest is not available in this environment"));return}let o=new XMLHttpRequest,s=()=>{o.abort()};e.signal.addEventListener("abort",s,{once:!0});let r=()=>{e.signal.removeEventListener("abort",s)};o.open("POST",e.url);for(let[i,p]of Object.entries(e.headers))o.setRequestHeader(i,p);o.upload.onprogress=i=>{e.onProgress(i.loaded)},o.onload=()=>{r();try{t(xt(o.status,typeof o.responseText=="string"?o.responseText:""))}catch(i){n(i instanceof Error?i:new Error(String(i)))}},o.onerror=()=>{r(),n(new Error("network failure during upload"))},o.onabort=()=>{r(),n(yt())},o.send(e.body)})}var zt="/api/filehub/upload",kt=4,Y=class{items=[];listeners=new Set;controllers=new Map;blobs=new Map;activeCount=0;nextId=1;uploadUrl;concurrency;resolveSessionId;transport;constructor(t={}){this.uploadUrl=t.uploadUrl??zt,this.concurrency=Math.max(1,t.concurrency??kt),this.resolveSessionId=t.sessionId??(()=>null),this.transport=t.transport??wt()}getItems(){return this.items}subscribe(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}stats(){let t={total:this.items.length,uploading:0,pending:0,done:0,errored:0};for(let n of this.items)n.status==="uploading"?t.uploading+=1:n.status==="pending"?t.pending+=1:n.status==="done"?t.done+=1:n.status==="error"&&(t.errored+=1);return t}enqueue(t){let n=[];for(let o of t){let s=ve(o.relativePath??""),r="name"in o.file&&typeof o.file.name=="string"?o.file.name:"blob",i=se(s)||se(r)||r||"blob",p={id:`up-${this.nextId++}`,name:i,relativePath:s,sizeBytes:Math.max(0,o.file.size),status:"pending",sentBytes:0,result:void 0,error:void 0};n.push(p)}if(n.length===0)return[];for(let o=0;o<n.length;o+=1){let s=n[o],r=t[o];s===void 0||r===void 0||this.blobs.set(s.id,r.file)}return this.items=[...this.items,...n],this.emit(),this.pump(),n}retry(t){let n=this.items.find(o=>o.id===t);return!n||n.status!=="error"&&n.status!=="cancelled"?!1:(this.patch(t,{status:"pending",sentBytes:0,error:void 0}),this.emit(),this.pump(),!0)}cancel(t){let n=this.items.find(o=>o.id===t);return!n||n.status!=="uploading"?!1:(this.controllers.get(t)?.abort(),!0)}remove(t){let n=this.items.findIndex(s=>s.id===t);if(n<0)return!1;let o=this.items[n];return o!==void 0&&o.status==="uploading"&&(this.controllers.get(t)?.abort(),this.controllers.delete(t)),this.blobs.delete(t),this.items=this.items.filter(s=>s.id!==t),this.emit(),!0}clear(){for(let t of this.controllers.values())t.abort();this.controllers.clear(),this.blobs.clear(),this.activeCount=0,this.items.length!==0&&(this.items=[],this.emit())}patch(t,n){let o=this.items.findIndex(i=>i.id===t);if(o<0)return;let s=[...this.items],r=s[o];r!==void 0&&(s[o]={...r,...n},this.items=s,this.emit())}emit(){for(let t of this.listeners)t()}pump(){for(;this.activeCount<this.concurrency;){let t=this.items.find(n=>n.status==="pending");if(!t)return;this.start(t)}}start(t){let n=this.resolveSessionId()??null,o=n!==null&&n.trim()!==""?n:null;if(o===null){this.patch(t.id,{status:"error",error:{code:"sessionMissing",retryable:!0}});return}let s=new AbortController;this.controllers.set(t.id,s),this.activeCount+=1,this.patch(t.id,{status:"uploading",sentBytes:0,error:void 0});let r=this.blobs.get(t.id);if(!r){this.controllers.delete(t.id),this.activeCount-=1,this.patch(t.id,{status:"error",error:{code:"invalidResponse",retryable:!1}});return}let i=typeof r.type=="string"&&r.type!==""?r.type:"",p=i!==""?i:"application/octet-stream",h={url:this.uploadUrl,body:r,headers:{"x-file-name":encodeURIComponent(t.name),"x-file-relpath":encodeURIComponent(t.relativePath),"x-session-id":o,"content-type":p},onProgress:u=>{s.signal.aborted||this.patch(t.id,{sentBytes:u})},signal:s.signal};this.transport(h).then(u=>{s.signal.aborted||this.patch(t.id,{status:"done",sentBytes:t.sizeBytes,result:u,error:void 0})}).catch(u=>{if(vt(u)||s.signal.aborted){this.patchIfUploading(t.id,{status:"cancelled",error:void 0});return}let f=u instanceof G?St(u.status):u instanceof V?{code:"invalidResponse",retryable:!1}:{code:"network",retryable:!0};this.patchIfUploading(t.id,{status:"error",error:f})}).finally(()=>{this.controllers.delete(t.id),this.activeCount-=1,this.pump()})}patchIfUploading(t,n){let o=this.items.find(s=>s.id===t);!o||o.status!=="uploading"||this.patch(t,n)}};var C=require("react");var k=require("react/jsx-runtime"),A=null;function le(){return A!==null&&A!==""?A:null}function Ct(e){return new Promise((t,n)=>{e.file?.(o=>{t(o)},o=>{n(o instanceof Error?o:new Error(`failed to read ${e.name}`))}),e.file||n(new Error(`entry ${e.name} provides no file accessor`))})}function Et(e){let t=[];return new Promise((n,o)=>{let s=()=>{e.readEntries(r=>{if(r.length===0){n(t);return}t.push(...r),s()},r=>{o(r instanceof Error?r:new Error("readEntries failed"))})};s()})}async function Ue(e,t,n){if(e.isFile&&e.file){try{let o=await Ct(e);n.push({file:o,relativePath:`${t}${o.name}`})}catch{}return}if(e.isDirectory&&e.createReader){let o;try{o=await Et(e.createReader())}catch{return}let s=`${t}${e.name}/`;await Promise.all(o.map(r=>Ue(r,s,n)))}}async function Rt(e,t){let n=[],o=[];for(let s=0;s<e.length;s+=1){let r=e[s];if(!r||r.kind!=="file")continue;let i=typeof r.webkitGetAsEntry=="function"?r.webkitGetAsEntry():null;i&&o.push(i)}if(o.length>0&&(await Promise.all(o.map(s=>Ue(s,"",n))),n.length>0))return n;if(t)for(let s=0;s<t.length;s+=1){let r=t[s];if(!r)continue;let i=r.webkitRelativePath;n.push({file:r,relativePath:i&&i!==""?i.replace(/\\/g,"/"):r.name})}return n}function J(e){let t=e.dataTransfer?.types;if(!t)return!1;for(let n=0;n<t.length;n+=1)if(t[n]==="Files")return!0;return!1}async function Ft(e){let t=e.dataTransfer;if(!t)return[];let n=Array.from(t.items),o=Array.from(t.files);return Rt(n,o)}function De(e){let{sessionId:t,queue:n}=e,o=(0,C.useRef)(null),[s,r]=(0,C.useState)(!1);(0,C.useEffect)(()=>(A=t??null,()=>{A=null}),[t]);let i=(0,C.useCallback)(f=>{f.length!==0&&n.enqueue(f.map(l=>({file:l.file,relativePath:l.relativePath})))},[n]);(0,C.useEffect)(()=>{let f=0,l=v=>{J(v)&&(v.preventDefault(),f+=1,r(!0))},a=v=>{J(v)&&(v.preventDefault(),v.dataTransfer&&(v.dataTransfer.dropEffect="copy"))},y=v=>{J(v)&&(f=Math.max(0,f-1),f===0&&r(!1))},R=v=>{J(v)&&(v.preventDefault(),f=0,r(!1),Ft(v).then(i))};return document.addEventListener("dragenter",l),document.addEventListener("dragover",a),document.addEventListener("dragleave",y),document.addEventListener("drop",R),()=>{document.removeEventListener("dragenter",l),document.removeEventListener("dragover",a),document.removeEventListener("dragleave",y),document.removeEventListener("drop",R)}},[i]),(0,C.useEffect)(()=>{let f=l=>{let a=l.clipboardData?.files;if(!a||a.length===0)return;let y=[];for(let R=0;R<a.length;R+=1){let v=a[R];v&&y.push({file:v,relativePath:v.name})}i(y)};return document.addEventListener("paste",f),()=>{document.removeEventListener("paste",f)}},[i]),(0,C.useEffect)(()=>{N("zdsh-filehub-styles",Q)},[]);let p=(0,C.useCallback)(()=>{o.current?.click()},[]),h=(0,C.useCallback)(f=>{let l=f.target.files,a=[];if(l)for(let y=0;y<l.length;y+=1){let R=l[y];R&&a.push({file:R,relativePath:R.name})}i(a),f.target.value=""},[i]),u=de();return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsxs)("button",{type:"button",className:"zdsh-filehub-btn",title:u==="zh"?"\u4E0A\u4F20\u6587\u4EF6\u5230\u4F1A\u8BDD\u5DE5\u4F5C\u533A":"Upload files to the session workspace",onClick:p,children:[(0,k.jsxs)("svg",{className:"zdsh-filehub-btn-icon",viewBox:"0 0 16 16","aria-hidden":"true",children:[(0,k.jsx)("path",{d:"M8 10.5 4.5 7h2V2h3v5h2L8 10.5Z",fill:"currentColor"}),(0,k.jsx)("path",{d:"M2.5 12h11v2h-11v-2Z",fill:"currentColor"})]}),(0,k.jsx)("span",{children:u==="zh"?"\u4E0A\u4F20":"Upload"})]}),(0,k.jsx)("input",{ref:o,type:"file",multiple:!0,className:"zdsh-filehub-hidden-input",onChange:h}),s?(0,k.jsx)("div",{className:"zdsh-filehub-mask","data-testid":"zdsh-filehub-drop-mask",children:(0,k.jsxs)("div",{className:"zdsh-filehub-mask-card",children:[(0,k.jsx)("div",{className:"zdsh-filehub-mask-title",children:u==="zh"?"\u91CA\u653E\u4EE5\u4E0A\u4F20":"Drop to upload"}),(0,k.jsx)("div",{className:"zdsh-filehub-mask-sub",children:u==="zh"?"\u6587\u4EF6\u4E0E\u6574\u4E2A\u6587\u4EF6\u5939\u90FD\u4F1A\u8FDB\u5165\u4E0A\u4F20\u961F\u5217":"Files and whole folders join the upload queue"})]})}):null]})}function de(){let[e]=(0,C.useState)(()=>K());return e}var w=require("react/jsx-runtime");async function Lt(e){let t=await fetch(`/api/filehub/file?path=${encodeURIComponent(e)}`,{method:"DELETE"});if(!t.ok&&t.status!==204)throw new Error(`delete failed with HTTP ${t.status}`)}var It={pending:{en:"Queued",zh:"\u6392\u961F\u4E2D"},uploading:{en:"Uploading",zh:"\u4E0A\u4F20\u4E2D"},done:{en:"Done",zh:"\u5DF2\u5B8C\u6210"},error:{en:"Failed",zh:"\u5931\u8D25"},cancelled:{en:"Cancelled",zh:"\u5DF2\u53D6\u6D88"}};function Tt(e){let t=e.lastIndexOf("."),n=t>=0?e.slice(t+1):"";return(n.length>0&&n.length<=5?n:"file").toUpperCase()}function Nt(e){return e.status==="done"?100:e.sizeBytes<=0?0:Math.min(100,Math.round(e.sentBytes/e.sizeBytes*100))}function He(e){let{queue:t,onDeleteUploaded:n}=e,o=de(),s=(0,I.useSyncExternalStore)((0,I.useCallback)(a=>t.subscribe(a),[t]),()=>t.getItems(),()=>t.getItems()),[r,i]=(0,I.useState)(()=>new Set),[p,h]=(0,I.useState)({});(0,I.useEffect)(()=>{N("zdsh-filehub-styles",Q)},[]);let u=(0,I.useCallback)(a=>{t.remove(a)},[t]),f=(0,I.useCallback)(a=>{let y=a.result?.path;if(!y){u(a.id);return}i(v=>new Set(v).add(a.id)),h(v=>{if(!(a.id in v))return v;let{[a.id]:F,...q}=v;return q}),(n??Lt)(y).then(()=>{u(a.id)}).catch(()=>{i(v=>{let F=new Set(v);return F.delete(a.id),F}),h(v=>({...v,[a.id]:o==="zh"?"\u5220\u9664\u5931\u8D25\uFF0C\u53EF\u91CD\u8BD5":"Delete failed; try again"}))})},[o,n,u]),l=(0,I.useCallback)(a=>{t.retry(a)},[t]);return s.length===0?null:(0,w.jsx)("div",{className:"zdsh-filehub-dock","data-testid":"zdsh-filehub-dock",children:s.map(a=>(0,w.jsx)(Mt,{item:a,lang:o,deleting:r.has(a.id),deleteError:p[a.id],onRetry:l,onRemove:u,onRemoveUploaded:f},a.id))})}function Pt(e){let n=e.result?.imageCaption;return typeof n=="string"&&n.length>0?n:void 0}function Mt(e){let{item:t,lang:n,deleting:o,deleteError:s,onRetry:r,onRemove:i,onRemoveUploaded:p}=e,h=It[t.status][n],u=Nt(t),f=t.result?.sniffedType??"",l=f!==""?f.slice(f.indexOf("/")+1).toUpperCase().slice(0,5):Tt(t.name),a=t.error?Me[t.error.code][n]:void 0,y=t.status==="done"?Pt(t):void 0;return(0,w.jsxs)("div",{className:"zdsh-filehub-row","data-status":t.status,children:[(0,w.jsx)("span",{className:"zdsh-filehub-badge",children:l}),(0,w.jsx)("span",{className:"zdsh-filehub-name",title:t.relativePath!==""?t.relativePath:t.name,children:t.name}),(0,w.jsx)("span",{className:"zdsh-filehub-size",children:P(t.status==="done"?t.sizeBytes:Math.max(t.sentBytes,0))}),y?(0,w.jsx)("span",{className:"zdsh-filehub-explained",title:y,children:d("dock.explained")}):null,t.status==="uploading"||t.status==="pending"?(0,w.jsx)("span",{className:"zdsh-filehub-bar",role:"progressbar","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":u,children:(0,w.jsx)("span",{className:"zdsh-filehub-bar-fill",style:{width:`${u}%`}})}):null,a?(0,w.jsx)("span",{className:"zdsh-filehub-error-text",title:a,children:a}):null,s?(0,w.jsx)("span",{className:"zdsh-filehub-error-text",title:s,children:s}):null,(0,w.jsx)("span",{className:`zdsh-filehub-status zdsh-filehub-status--${t.status}`,children:h}),(0,w.jsxs)("span",{className:"zdsh-filehub-xbtns",children:[t.status==="error"&&(t.error?.retryable??!1)||t.status==="cancelled"?(0,w.jsx)("button",{type:"button",className:"zdsh-filehub-xbtn",title:n==="zh"?"\u91CD\u8BD5":"Retry",onClick:()=>{r(t.id)},children:"\u27F3"}):null,t.status==="uploading"?(0,w.jsx)("button",{type:"button",className:"zdsh-filehub-xbtn",title:n==="zh"?"\u53D6\u6D88":"Cancel",onClick:()=>{i(t.id)},children:"\u2715"}):t.status==="done"?(0,w.jsx)("button",{type:"button",className:"zdsh-filehub-xbtn",disabled:o,title:n==="zh"?"\u4ECE\u5DE5\u4F5C\u533A\u5220\u9664":"Delete from workspace",onClick:()=>{p(t)},children:o?"\u2026":"\u2715"}):(0,w.jsx)("button",{type:"button",className:"zdsh-filehub-xbtn",title:n==="zh"?"\u79FB\u9664":"Remove",onClick:()=>{i(t.id)},children:"\u2715"})]})]})}var S=require("react");async function $(e,t){let n;try{n=await fetch(e,t)}catch(r){throw new Error(r instanceof Error?r.message:String(r))}let o=await n.text(),s;if(o!=="")try{s=JSON.parse(o)}catch{}if(!n.ok){let r=s!==null&&typeof s=="object"&&"error"in s?String(s.error):`HTTP ${n.status}`;throw new Error(r)}return s}async function Oe(){return $("/api/filehub/library")}async function Ve(){return $("/api/filehub/usage")}async function Z(){return $("/api/filehub/settings")}async function Be(e){return $("/api/filehub/settings",{method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify(e)})}async function ce(e){return $("/api/filehub/cleanup",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(e)})}var X=`
.zdsh-filehub-console {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 2px;
  font-size: 12px;
  min-width: 0;
}
.zdsh-filehub-console-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  min-width: 0;
}
.zdsh-filehub-console-search {
  flex: 1 1 140px;
  max-width: 260px;
  min-width: 0;
  padding: 4px 8px;
  font: inherit;
  border-radius: 6px;
  border: 1px solid rgba(127, 127, 127, 0.35);
  background: transparent;
  color: inherit;
}
.zdsh-filehub-console-search:focus {
  outline: none;
  border-color: rgba(127, 127, 127, 0.7);
}
.zdsh-filehub-chip {
  border: 1px solid rgba(127, 127, 127, 0.35);
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 999px;
  cursor: pointer;
  opacity: 0.75;
}
.zdsh-filehub-chip:hover { opacity: 1; }
.zdsh-filehub-chip[aria-pressed="true"] {
  opacity: 1;
  background: rgba(127, 127, 127, 0.18);
  border-color: rgba(127, 127, 127, 0.7);
}
.zdsh-filehub-console-stats {
  font-size: 11px;
  opacity: 0.72;
}
.zdsh-filehub-console-list {
  position: relative;
  height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid rgba(127, 127, 127, 0.22);
  border-radius: 8px;
}
.zdsh-filehub-console-row {
  position: absolute;
  left: 0;
  right: 0;
  height: 28px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 8px;
  box-sizing: border-box;
  cursor: pointer;
  white-space: nowrap;
}
.zdsh-filehub-console-row:hover,
.zdsh-filehub-console-row[aria-selected="true"] {
  background: rgba(127, 127, 127, 0.12);
}
.zdsh-filehub-console-rowheader {
  cursor: default;
  font-weight: 600;
  opacity: 0.65;
  font-size: 11px;
  background: transparent;
}
.zdsh-filehub-console-rowheader:hover { background: transparent; }
.zdsh-filehub-kinddot {
  flex: none;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.zdsh-filehub-entryname {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}
.zdsh-filehub-entrymeta {
  flex: none;
  opacity: 0.6;
  font-size: 11px;
}
.zdsh-filehub-console-detail {
  border: 1px solid rgba(127, 127, 127, 0.25);
  border-radius: 8px;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  word-break: break-all;
}
.zdsh-filehub-console-detailpath {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  opacity: 0.85;
}
.zdsh-filehub-console-note {
  font-size: 11px;
  opacity: 0.7;
}
.zdsh-filehub-console-error {
  color: #e5484d;
  font-size: 11px;
}
.zdsh-filehub-confirmcard {
  border: 1px solid rgba(230, 130, 60, 0.55);
  border-radius: 8px;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

/* ---- Settings panel ------------------------------------------------------ */
.zdsh-filehub-settings {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 520px;
  padding: 12px 4px;
  font-size: 13px;
}
.zdsh-filehub-settings h3 {
  margin: 0 0 8px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.65;
}
.zdsh-filehub-settingrow {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 4px 0;
}
.zdsh-filehub-settingtext {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.zdsh-filehub-settingdesc {
  font-size: 12px;
  opacity: 0.6;
}
.zdsh-filehub-switch {
  position: relative;
  flex: none;
  width: 34px;
  height: 20px;
  border-radius: 999px;
  border: 1px solid rgba(127, 127, 127, 0.45);
  background: transparent;
  cursor: pointer;
  padding: 0;
}
.zdsh-filehub-switch::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.55;
  transition: transform 120ms ease;
}
.zdsh-filehub-switch[aria-checked="true"]::after {
  transform: translateX(14px);
  opacity: 1;
}
.zdsh-filehub-numberinput,
.zdsh-filehub-select {
  flex: none;
  width: 90px;
  padding: 4px 6px;
  font: inherit;
  border-radius: 6px;
  border: 1px solid rgba(127, 127, 127, 0.35);
  background: transparent;
  color: inherit;
}
.zdsh-filehub-select option { color: #111; }
.zdsh-filehub-settings-status {
  font-size: 12px;
  min-height: 18px;
}
.zdsh-filehub-settings-saved { opacity: 0.75; }
.zdsh-filehub-settings-error { color: #e5484d; }
`;var je=require("react");function Ae(){return(0,je.useSyncExternalStore)(Ne,Te)}var Ut=["image","document","text","binary","media"],$e=["all",...Ut];function Dt(e,t,n){if(n!=="all"&&e.kind!==n)return!1;let o=t.trim().toLowerCase();return o===""?!0:e.name.toLowerCase().includes(o)||e.relativePath.toLowerCase().includes(o)}function qe(e,t,n){return e.filter(o=>Dt(o,t,n)).sort((o,s)=>s.uploadedAtMs-o.uploadedAtMs||(o.name<s.name?-1:1))}function _e(e){let t=[];for(let n of e.sessions)t.push(...n.entries);return t}function Ke(e,t,n,o,s=6){if(e<=0||o<=0||n<=0)return{start:0,end:0,padTop:0,padBottom:0};let r=Math.min(Math.floor(Math.max(0,t)/o),e-1),i=Math.max(0,r-s),p=Math.ceil(n/o)+s*2,h=Math.min(e,i+p);return{start:i,end:h,padTop:i*o,padBottom:Math.max(0,(e-h)*o)}}function ue(e,t){if(!Number.isFinite(e))return"?";let n=new Date(e),o=r=>String(r).padStart(2,"0"),s=`${n.getFullYear()}-${o(n.getMonth()+1)}-${o(n.getDate())} ${o(n.getHours())}:${o(n.getMinutes())}`;return t==="zh"?s:s.replace("-","/").replace("-","/")}function Qe(e,t){if(!t)return e.map(r=>({type:"entry",entry:r}));let n=new Map,o=[];for(let r of e){let i=n.get(r.sessionId);i?i.push(r):(n.set(r.sessionId,[r]),o.push(r.sessionId))}let s=[];for(let r of o){let i=n.get(r)??[];s.push({type:"header",sessionId:r,count:i.length,bytes:i.reduce((p,h)=>p+h.sizeBytes,0)});for(let p of i)s.push({type:"entry",entry:p})}return s}var c=require("react/jsx-runtime"),pe=28,Ht=300,Ot={image:{color:"#4c8dff"},document:{color:"#b58cff"},text:{color:"#3fbf7f"},media:{color:"#ff8a5c"},binary:{color:"rgba(127,127,127,0.8)"}};function We(e){let t=Ae(),[n,o]=(0,S.useState)({stage:"loading"}),[s,r]=(0,S.useState)(null),[i,p]=(0,S.useState)(null),[h,u]=(0,S.useState)(null),[f,l]=(0,S.useState)(""),[a,y]=(0,S.useState)("all"),[R,v]=(0,S.useState)(0),[F,q]=(0,S.useState)(null),[tt,_]=(0,S.useState)(!1),[L,U]=(0,S.useState)({phase:"idle"}),nt=(0,S.useRef)(null);(0,S.useEffect)(()=>{N("zdsh-filehub-console-styles",X)},[]);let H=(0,S.useCallback)(async()=>{u(null);try{let[g,x]=await Promise.all([Oe(),Ve()]);r(g),p(x)}catch(g){u(g instanceof Error?g.message:String(g))}},[]);(0,S.useEffect)(()=>{let g={cancelled:!1};return(async()=>{try{let x=await Z();if(g.cancelled)return;if(!x.enabled){o({stage:"disabled"});return}o({stage:"open",defaultView:x["console.defaultView"]})}catch(x){g.cancelled||o({stage:"error",message:x instanceof Error?x.message:String(x)})}})(),()=>{g.cancelled=!0}},[]),(0,S.useEffect)(()=>{n.stage==="open"&&H()},[n.stage,H]);let be=n.stage==="open"?n.defaultView==="grouped":!0,ee=(0,S.useMemo)(()=>s?Qe(qe(_e(s),f,a),be):[],[s,f,a,be]),j=Ke(ee.length,R,Ht,pe),ot=ee.slice(j.start,j.end),ye=(0,S.useCallback)(async g=>{U({phase:"busy"});try{let x=await ce({scope:g,...g==="session"&&e.sessionId?{sessionId:e.sessionId}:{},dryRun:!0});U({phase:"confirm",scope:g,report:x})}catch(x){U({phase:"failed",message:x instanceof Error?x.message:String(x)})}},[e.sessionId]),st=(0,S.useCallback)(async()=>{if(L.phase!=="confirm")return;let{scope:g}=L;U({phase:"busy"});try{let x=await ce({scope:g,...g==="session"&&e.sessionId?{sessionId:e.sessionId}:{},dryRun:!1});U({phase:"done",message:d("console.cleanup.done",{count:x.deleted,size:P(x.freedBytes)})}),await H()}catch(x){U({phase:"failed",message:x instanceof Error?x.message:String(x)})}},[L,e.sessionId,H]);if(n.stage==="loading"||n.stage==="disabled")return null;if(n.stage==="error")return(0,c.jsx)("div",{className:"zdsh-filehub-console",children:(0,c.jsx)("div",{className:"zdsh-filehub-console-error",children:d("console.error.load",{message:n.message})})});let rt=async()=>{if(!F)return;let g=navigator.clipboard;try{if(g===void 0)return;await g.writeText(F.path),_(!0),setTimeout(()=>{_(!1)},1500)}catch{}};return(0,c.jsxs)("div",{className:"zdsh-filehub-console","data-testid":"zdsh-filehub-console",children:[(0,c.jsxs)("div",{className:"zdsh-filehub-console-bar",children:[(0,c.jsx)("span",{style:{fontWeight:600},children:d("console.title")}),(0,c.jsx)("span",{className:"zdsh-filehub-console-stats",children:i!==null?d("console.stats.summary",{files:i.files,size:P(i.totalBytes)}):""}),(0,c.jsx)("span",{style:{flex:1}}),(0,c.jsx)("button",{type:"button",className:"zdsh-filehub-btn",onClick:()=>void H(),children:d("console.refresh")})]}),(0,c.jsxs)("div",{className:"zdsh-filehub-console-bar",children:[(0,c.jsx)("input",{type:"search",className:"zdsh-filehub-console-search",placeholder:d("console.search.placeholder"),value:f,onChange:g=>{l(g.target.value)}}),$e.map(g=>(0,c.jsx)("button",{type:"button",className:"zdsh-filehub-chip","aria-pressed":a===g,onClick:()=>{y(g)},children:d(g==="all"?"console.filter.all":`console.filter.${g}`)},g))]}),s?.truncated?(0,c.jsx)("div",{className:"zdsh-filehub-console-note",children:d("console.truncated",{limit:2e3})}):null,h!==null?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{className:"zdsh-filehub-console-error",children:d("console.error.load",{message:h})}),(0,c.jsx)("button",{type:"button",className:"zdsh-filehub-btn",onClick:()=>void H(),children:d("console.retry")})]}):null,L.phase==="confirm"?(0,c.jsxs)("div",{className:"zdsh-filehub-confirmcard","data-testid":"zdsh-filehub-cleanup-confirm",children:[(0,c.jsx)("strong",{children:d("console.cleanup.confirmTitle")}),(0,c.jsx)("span",{children:d("console.cleanup.dryRun",{count:L.report.wouldDelete,size:P(L.report.wouldFreeBytes)})}),(0,c.jsx)("button",{type:"button",className:"zdsh-filehub-btn",onClick:()=>void st(),children:d("console.cleanup.execute")}),(0,c.jsx)("button",{type:"button",className:"zdsh-filehub-btn",onClick:()=>{U({phase:"idle"})},children:d("console.cleanup.cancel")})]}):null,L.phase==="done"?(0,c.jsx)("div",{className:"zdsh-filehub-console-note",children:L.message}):null,L.phase==="failed"?(0,c.jsx)("div",{className:"zdsh-filehub-console-error",children:d("console.cleanup.failed",{message:L.message})}):null,(0,c.jsxs)("div",{ref:nt,className:"zdsh-filehub-console-list",onScroll:g=>{v(g.target.scrollTop)},role:"listbox","aria-label":d("console.title"),children:[(0,c.jsx)("div",{style:{height:j.padTop}}),ee.length===0&&s!==null&&h===null?(0,c.jsx)("div",{className:"zdsh-filehub-console-note",style:{padding:"10px 8px"},children:d("console.empty")}):null,ot.map((g,x)=>{let te=j.start+x;if(g.type==="header")return(0,c.jsx)("div",{role:"presentation",className:"zdsh-filehub-console-row zdsh-filehub-console-rowheader",style:{top:te*pe},children:(0,c.jsxs)("span",{className:"zdsh-filehub-entryname",children:[g.sessionId," \xB7 ",g.count," \xB7 ",P(g.bytes)]})},`h:${g.sessionId}:${te}`);let T=g.entry,it=F!==null&&F.path===T.path;return(0,c.jsxs)("div",{role:"option","aria-selected":it,tabIndex:0,className:"zdsh-filehub-console-row",style:{top:te*pe},onClick:()=>{q(T),_(!1)},onKeyDown:ne=>{(ne.key==="Enter"||ne.key===" ")&&(ne.preventDefault(),q(T),_(!1))},children:[(0,c.jsx)("span",{className:"zdsh-filehub-kinddot",style:Ot[T.kind]}),(0,c.jsx)("span",{className:"zdsh-filehub-entryname",children:T.name}),(0,c.jsx)("span",{className:"zdsh-filehub-entrymeta",children:T.sessionId}),(0,c.jsx)("span",{className:"zdsh-filehub-entrymeta",children:ue(T.uploadedAtMs,t)}),(0,c.jsx)("span",{className:"zdsh-filehub-entrymeta",children:P(T.sizeBytes)})]},`${T.sessionId}:${T.relativePath}`)}),(0,c.jsx)("div",{style:{height:j.padBottom}})]}),F!==null?(0,c.jsxs)("div",{className:"zdsh-filehub-console-detail","data-testid":"zdsh-filehub-entry-detail",children:[(0,c.jsx)("div",{className:"zdsh-filehub-console-detailpath",children:F.path}),(0,c.jsxs)("div",{className:"zdsh-filehub-console-bar",children:[(0,c.jsxs)("span",{children:[d("console.detail.kind"),": ",d(`console.filter.${F.kind}`)]}),(0,c.jsxs)("span",{children:[d("console.detail.size"),": ",P(F.sizeBytes)]}),(0,c.jsxs)("span",{children:[d("console.detail.time"),": ",ue(F.uploadedAtMs,t)]}),(0,c.jsx)("span",{style:{flex:1}}),(0,c.jsx)("button",{type:"button",className:"zdsh-filehub-btn",onClick:()=>void rt(),children:tt?d("console.detail.copied"):d("console.detail.copy")})]})]}):null,(0,c.jsxs)("div",{className:"zdsh-filehub-console-bar",children:[(0,c.jsx)("button",{type:"button",className:"zdsh-filehub-btn",disabled:L.phase==="busy",onClick:()=>void ye("expired"),children:L.phase==="busy"?d("console.cleanup.working"):d("console.cleanup.expired")}),(0,c.jsx)("button",{type:"button",className:"zdsh-filehub-btn",disabled:e.sessionId===void 0||L.phase==="busy",onClick:e.sessionId?()=>void ye("session"):void 0,children:d("console.cleanup.session")})]})]})}var E=require("react");var fe=Object.freeze({enabled:!0,ignorePastedMentions:!1,"candidates.max":20,"console.defaultView":"grouped","privacy.localFirstVision":!0,"vision.mode":"caption"});function he(e){return{values:{...e},savedValues:{...e},status:"idle"}}function Ge(e,t,n){return e.values[t]===n?e:{...e,values:{...e.values,[t]:n},status:"idle",errorMessage:void 0}}function Ye(e){return{...e,status:"saving",errorMessage:void 0}}function Je(e,t){return{...e,savedValues:{...t},status:"saved"}}function Ze(e,t){return{...e,status:"error",errorMessage:t}}function Xe(e,t){return{...e,values:{...t},savedValues:{...t},status:"idle",errorMessage:void 0}}var b=require("react/jsx-runtime"),Vt=1600;function et(e){let[t,n]=(0,E.useState)(!1),[,o]=(0,E.useState)(null),[s,r]=(0,E.useState)(()=>he({...fe})),i=(0,E.useRef)(void 0),p=(0,E.useRef)(s);p.current=s,(0,E.useEffect)(()=>(N("zdsh-filehub-console-styles",X),()=>{clearTimeout(i.current)}),[]),(0,E.useEffect)(()=>{let l={cancelled:!1};return(async()=>{try{let a=await Z();l.cancelled||(r(he(a)),n(!0))}catch(a){l.cancelled||(o(a instanceof Error?a.message:String(a)),n(!0))}})(),()=>{l.cancelled=!0}},[]);let h=(0,E.useCallback)(async l=>{r(Ye(l));try{let a=await Be(l.values);r(y=>Je(y,a)),clearTimeout(i.current),i.current=setTimeout(()=>{r(y=>y.status==="saved"?{...y,status:"idle"}:y)},Vt)}catch(a){r(y=>Ze(y,a instanceof Error?a.message:String(a)))}},[]),u=(0,E.useCallback)((l,a)=>{let y=Ge(p.current,l,a);y!==p.current&&(r(y),h(y))},[h]),f=(0,E.useCallback)(()=>{if(!window.confirm(d("settings.restoreConfirm")))return;let l=Xe(p.current,{...fe});r(l),h(l)},[h]);return t?(0,b.jsxs)("div",{className:"zdsh-filehub-settings","data-testid":"zdsh-filehub-settings",children:[(0,b.jsxs)("section",{children:[(0,b.jsx)("h3",{children:d("settings.section.general")}),(0,b.jsx)(B,{label:d("settings.enabled"),desc:d("settings.enabled.desc"),control:(0,b.jsx)(ge,{checked:s.values.enabled,label:d("settings.enabled"),onChange:l=>{u("enabled",l)}})}),(0,b.jsx)(B,{label:d("settings.ignorePastedMentions"),desc:d("settings.ignorePastedMentions.desc"),control:(0,b.jsx)(ge,{checked:s.values.ignorePastedMentions,label:d("settings.ignorePastedMentions"),onChange:l=>{u("ignorePastedMentions",l)}})}),(0,b.jsx)(B,{label:d("settings.candidatesMax"),desc:d("settings.candidatesMax.desc"),control:(0,b.jsx)("input",{type:"number",min:1,max:200,className:"zdsh-filehub-numberinput",value:s.values["candidates.max"],onChange:l=>{let a=Number.parseInt(l.target.value,10);Number.isNaN(a)||u("candidates.max",Math.min(200,Math.max(1,a)))}})}),(0,b.jsx)(B,{label:d("settings.defaultView"),desc:d("settings.defaultView.desc"),control:(0,b.jsxs)("select",{className:"zdsh-filehub-select",value:s.values["console.defaultView"],onChange:l=>{u("console.defaultView",l.target.value==="flat"?"flat":"grouped")},children:[(0,b.jsx)("option",{value:"grouped",children:d("settings.defaultView.grouped")}),(0,b.jsx)("option",{value:"flat",children:d("settings.defaultView.flat")})]})})]}),(0,b.jsxs)("section",{children:[(0,b.jsx)("h3",{children:d("settings.section.privacy")}),(0,b.jsx)(B,{label:d("settings.localFirstVision"),desc:d("settings.localFirstVision.desc"),control:(0,b.jsx)(ge,{checked:s.values["privacy.localFirstVision"],label:d("settings.localFirstVision"),onChange:l=>{u("privacy.localFirstVision",l)}})}),(0,b.jsx)(B,{label:d("settings.visionMode"),desc:d("settings.visionMode.desc"),control:(0,b.jsxs)("select",{className:"zdsh-filehub-select",value:s.values["vision.mode"],onChange:l=>{let a=l.target.value;u("vision.mode",a==="off"?"off":a==="analyze"?"analyze":"caption")},children:[(0,b.jsx)("option",{value:"off",children:d("settings.visionMode.off")}),(0,b.jsx)("option",{value:"caption",children:d("settings.visionMode.caption")}),(0,b.jsx)("option",{value:"analyze",children:d("settings.visionMode.analyze")})]})})]}),(0,b.jsxs)("div",{className:"zdsh-filehub-settingrow",children:[(0,b.jsx)("button",{type:"button",className:"zdsh-filehub-btn",onClick:f,children:d("settings.restoreDefaults")}),(0,b.jsx)("span",{className:s.status==="error"?"zdsh-filehub-settings-status zdsh-filehub-settings-error":s.status==="saved"?"zdsh-filehub-settings-status zdsh-filehub-settings-saved":"zdsh-filehub-settings-status","data-testid":"zdsh-filehub-settings-status",children:s.status==="saved"?d("settings.saved"):s.status==="error"&&s.errorMessage!==void 0?d("settings.saveError",{message:s.errorMessage}):""})]})]}):(0,b.jsx)("div",{className:"zdsh-filehub-settings","data-testid":"zdsh-filehub-settings",children:(0,b.jsx)("div",{className:"zdsh-filehub-console-note",children:d("settings.loading")})})}function B(e){return(0,b.jsxs)("div",{className:"zdsh-filehub-settingrow",children:[(0,b.jsxs)("div",{className:"zdsh-filehub-settingtext",children:[(0,b.jsx)("span",{children:e.label}),(0,b.jsx)("span",{className:"zdsh-filehub-settingdesc",children:e.desc})]}),e.control]})}function ge(e){return(0,b.jsx)("button",{type:"button",role:"switch","aria-checked":e.checked,"aria-label":e.label,className:"zdsh-filehub-switch",onClick:()=>{e.onChange(!e.checked)}})}var Bt=["@deepseek-ai/dsh-client-ui-conversation","@deepseek-ai/dsh-client-ui-slots","@deepseek-ai/dsh-client-ui-input-trigger","@deepseek-ai/dsh-client-ui-settings","@deepseek-ai/dsh-client-locale"],me;function jt(){return me===void 0&&(me=new Y({sessionId:()=>le()})),me}function At(e){e.logger.info("[filehub] client M1 upload domain loaded"),Pe(e.locale);let t=jt();e.slots.inject("conversation.input.left",()=>e.slots.register({name:"conversation.input.left",id:"zdsh-filehub-upload-entry",order:40,registrant:"zdsh-filehub",inject:()=>({queue:t})},De)),e.slots.inject("conversation.input.dock",()=>e.slots.register({name:"conversation.input.dock",id:"zdsh-filehub-dock",order:20,registrant:"zdsh-filehub",inject:()=>({queue:t})},He)),Ee(e,{sessionId:()=>le()}),e.slots.inject("conversation.input.dock",()=>e.slots.register({name:"conversation.input.dock",id:"zdsh-filehub-mention-chips",order:21,registrant:"zdsh-filehub",inject:()=>({queue:t})},Re)),e.slots.inject("conversation.view",()=>e.slots.register({name:"conversation.view",id:"zdsh-filehub-files",order:30,registrant:"zdsh-filehub",label:()=>d("console.tab")},We)),e.slots.inject("settings.plugins.tab",()=>e.slots.register({name:"settings.plugins.tab",id:"zdsh-filehub",order:60,registrant:"zdsh-filehub",label:()=>d("settings.tab")},et))}module.exports={apply:At,inject:Bt};
return module.exports; } });
