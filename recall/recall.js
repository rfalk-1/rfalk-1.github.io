'use strict';
const $=id=>document.getElementById(id),BANK=window.RECALL_BANK,M=window.RecallMath,KEY='rfalk.recall.v1';
const byId=new Map(BANK.questions.map(q=>[q.id,q])),byTopic=new Map(BANK.topics.map(t=>[t.id,t]));
let state={version:1,run:null,best:{}},busy=false,worker=null,sequence=0,fallbackPromise=null;
function save(){
 try{localStorage.setItem(KEY,JSON.stringify(state));$('save-note').textContent='本轮答案与进度已保存在此浏览器。';$('global-note').textContent=''}
 catch{$('save-note').textContent='浏览器不允许保存，请在当前页面完成本轮。';$('global-note').textContent='当前无法保存本地进度和最佳成绩，仍可正常检测。'}
}
function read(){
 try{
  const raw=localStorage.getItem(KEY);if(!raw)return;const s=JSON.parse(raw);
  if(s.version!==1||!s.best||typeof s.best!=='object'||Array.isArray(s.best))throw Error();
  const clean={};for(const t of BANK.topics){const b=s.best[t.id],max=BANK.questions.filter(q=>q.topic===t.id).length*10;if(b&&Number.isInteger(b.points)&&b.points>=0&&b.points<=max&&b.points%10===0)clean[t.id]={points:b.points}}
  if(s.run){
   const r=s.run,pool=BANK.questions.filter(q=>q.topic===r.topic);
   if(!byTopic.has(r.topic)||!Array.isArray(r.ids)||r.ids.length!==pool.length||new Set(r.ids).size!==pool.length||r.ids.some(id=>byId.get(id)?.topic!==r.topic)||!Array.isArray(r.records)||r.records.length>r.ids.length||typeof r.complete!=='boolean'||r.complete!==(r.records.length===r.ids.length)||typeof r.draft!=='string'||r.draft.length>300||typeof r.awaiting!=='boolean'||r.awaiting&&(r.complete||!r.records.length))throw Error();
   for(const [i,a]of r.records.entries())if(a.id!==r.ids[i]||typeof a.answer!=='string'||a.answer.length>300||typeof a.correct!=='boolean'||typeof a.skipped!=='boolean'||(a.skipped&&a.correct))throw Error();
  }
  state={version:1,run:s.run||null,best:clean};
 }catch{$('global-note').textContent='背诵存档无法读取，可以重新选择专题开始。'}
}
function element(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e}
function math(el,latex){katex.render(latex,el,{displayMode:true,throwOnError:false,trust:false,strict:'ignore',maxExpand:100})}
function show(id){for(const s of ['menu','quiz','results'])$(s).hidden=s!==id;window.scrollTo({top:0,behavior:'instant'})}
function menu(){
 show('menu');$('topics').replaceChildren();
 BANK.topics.forEach(t=>{
  const count=BANK.questions.filter(q=>q.topic===t.id).length,card=element('article','topic-card');
  card.append(element('span','subtitle',t.subtitle),element('h2','',t.title),element('p','',t.description));
  const best=state.best[t.id];card.append(element('p','best',count+' 题 · 满分 '+count*10+' 分'+(best?' · 最佳 '+best.points+' 分':' · 尚未完成检测')));
  const b=element('button','primary');b.type='button';b.append(element('span','','开始检测'),element('span','','↗'));b.onclick=()=>start(t.id);card.append(b);$('topics').append(card);
 });
 $('resume').hidden=!state.run;
 if(state.run){$('resume-text').textContent=byTopic.get(state.run.topic).title+' · '+(state.run.complete?'上次检测已完成':'已提交 '+state.run.records.length+' / '+state.run.ids.length+' 题');$('resume-button').textContent=state.run.complete?'查看上次结算':'继续上次检测'}
}
function start(topic){
 if(state.run&&!state.run.complete&&!window.confirm('开始新检测会替换当前未完成的背诵进度，确定开始吗？'))return;
 const ids=BANK.questions.filter(q=>q.topic===topic).map(q=>q.id);
 for(let i=ids.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[ids[i],ids[j]]=[ids[j],ids[i]]}
 state.run={topic,ids,records:[],draft:'',awaiting:false,complete:false};save();question();
}
function current(){const r=state.run;return byId.get(r.ids[r.records.length-(r.awaiting?1:0)])}
function preview(){
 const text=$('answer').value;
 if(!text.trim()){$('preview').textContent='完整表达式会在这里显示';return}
 try{math($('preview'),M.toLatex(text,current().variables))}
 catch{$('preview').textContent='暂无法解析，请检查括号或参考输入说明。'}
}
function question(){
 show('quiz');const r=state.run,q=current(),i=r.records.length-(r.awaiting?1:0);
 $('topic-label').textContent=byTopic.get(r.topic).title+' / FULL EXPRESSION';
 $('position').textContent=String(i+1).padStart(2,'0')+' / '+r.ids.length;
 $('progress').max=r.ids.length;$('progress').value=r.records.length;
 $('question-title').textContent='第 '+(i+1)+' 题 · '+q.title;
 $('question-prompt').textContent=q.prompt;math($('question-formula'),q.formula);$('question-context').textContent=q.context;
 $('answer').value=r.draft;$('answer').placeholder=q.topic==='taylor'?'填写完整展开多项式，不含余项':'填写完整表达式，普通数学写法或 LaTeX 均可';
 $('answer-form').hidden=r.awaiting;$('recorded').hidden=!r.awaiting;$('error').textContent='';
 preview();$('question-title').focus({preventScroll:true});
}
async function fallbackGrade(answer,q){
 if(!fallbackPromise)fallbackPromise=new Promise((resolve,reject)=>{
  const script=document.createElement('script');script.src='vendor/nerdamer.min.js';script.onload=resolve;script.onerror=()=>{fallbackPromise=null;reject(Error('无法加载判题组件，请检查 recall/vendor 文件夹是否完整。'))};document.head.append(script);
 });
 await fallbackPromise;return M.grade(answer,q,window.nerdamer);
}
function grade(answer,q){
 // Local file previews cannot consistently create workers; the deployed site uses an isolated worker.
 if(location.protocol==='file:')return fallbackGrade(answer,q);
 return new Promise((resolve,reject)=>{
  try{if(!worker)worker=new Worker('worker.js?v=20261105')}
  catch{reject(Error('无法启动判题组件，请检查 recall/worker.js 是否已上传。'));return}
  const id=++sequence;
  const cleanup=()=>{clearTimeout(timer);if(worker){worker.onmessage=null;worker.onerror=null}};
  const timer=setTimeout(()=>{cleanup();worker.terminate();worker=null;reject(Error('表达式处理超时，请化简后重试；本题尚未提交。'))},5000);
  worker.onmessage=({data})=>{if(data.id!==id)return;cleanup();data.error?reject(Error(data.error)):resolve(data)};
  worker.onerror=()=>{cleanup();worker.terminate();worker=null;reject(Error('判题组件加载失败，请检查 recall 文件夹是否完整，刷新后重试。'))};
  worker.postMessage({id,answer,question:q});
 });
}
function lock(value){busy=value;for(const id of ['submit','skip','to-menu','answer'])$(id).disabled=value;$('submit').textContent=value?'正在校验表达式…':'提交完整答案 →'}
async function submit(skipped){
 if(busy||!state.run||state.run.awaiting||state.run.complete)return;
 const r=state.run,q=current(),answer=$('answer').value.trim();$('error').textContent='';lock(true);
 try{
  const result=skipped?{correct:false,reason:''}:await grade(answer,q);
  r.records.push({id:q.id,answer,correct:result.correct,reason:result.reason||'',skipped});r.draft=answer;r.complete=r.records.length===r.ids.length;r.awaiting=!r.complete;
  if(r.complete){const points=r.records.filter(a=>a.correct).length*10;state.best[r.topic]={points:Math.max(points,state.best[r.topic]?.points||0)}}
  save();if(r.complete)results();else question();
 }catch(e){$('error').textContent=e.message+' 本次未提交。';$('answer').focus()}
 finally{lock(false)}
}
function results(){
 show('results');const r=state.run,t=byTopic.get(r.topic),correct=r.records.filter(a=>a.correct).length;
 $('score').textContent=correct*10;$('maximum').textContent='/ '+r.ids.length*10+' 分';
 $('result-topic').textContent=t.title;$('result-summary').textContent='答对 '+correct+' / '+r.ids.length+' 题 · 正确率 '+Math.round(correct/r.ids.length*100)+'% · 本专题最佳 '+(state.best[r.topic]?.points||0)+' 分';
 $('review').replaceChildren();
 r.records.forEach((a,i)=>{
  const q=byId.get(a.id),row=element('article','review-row'),top=element('div','review-top');
  top.append(element('h2','',String(i+1).padStart(2,'0')+' / '+q.title),element('span','verdict '+(a.correct?'correct':'incorrect'),a.skipped?'已跳过 · 0 分':a.correct?'正确 · 10 分':'错误 · 0 分'));
  const prompt=element('div','formula question-formula');math(prompt,q.formula);row.append(top,element('p','help',q.prompt),prompt);
  if(q.context)row.append(element('p','help',q.context));
  const mine=element('div','answer-block');mine.append(element('p','review-label','你的完整答案'));
  if(a.skipped)mine.append(element('p','muted','（跳过）'));
  else{const formula=element('div','formula');try{math(formula,M.toLatex(a.answer,q.variables))}catch{formula.textContent=a.answer}mine.append(formula);mine.append(element('div','raw-answer',a.answer))}
  const ref=element('div','answer-block reference');ref.append(element('p','review-label','参考表达式'));const formula=element('div','formula');math(formula,q.answerLatex);ref.append(formula);row.append(mine,ref);
  const details=element('details'),summary=element('summary','','复查提示与来源');details.append(summary);
  if(q.note)details.append(element('p','',q.note));
  if(a.reason)details.append(element('p','',a.reason));
  if(q.topic==='antiderivative')details.append(element('p','','原函数相差常数仍判为正确；需要在题目规定的实数范围内有定义。'));
  details.append(element('p','','来源：背诵内容 / '+t.source));row.append(details);$('review').append(row);
 });
}
$('answer-form').onsubmit=e=>{e.preventDefault();submit(false)};
$('skip').onclick=()=>submit(true);
$('answer').oninput=()=>{preview();state.run.draft=$('answer').value;save()};
$('answer').onkeydown=e=>{if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();$('answer-form').requestSubmit()}};
$('next').onclick=()=>{if(busy||!state.run?.awaiting)return;state.run.awaiting=false;state.run.draft='';save();question()};
$('to-menu').onclick=()=>{if(!busy)menu()};
$('resume-button').onclick=()=>state.run.complete?results():question();
$('choose').onclick=menu;$('retry').onclick=()=>start(state.run.topic);
const video=$('wallpaper');let motion=!matchMedia('(prefers-reduced-motion: reduce)').matches&&!navigator.connection?.saveData;
async function play(){if(!video.getAttribute('src'))video.src='../assets/noelle.mp4';try{await video.play()}catch{}}
function label(){$('motion').textContent=video.paused?'播放背景':'暂停背景'}
video.onplay=label;video.onpause=label;
$('motion').onclick=()=>{motion=video.paused;if(motion)play();else video.pause()};
document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();else if(motion)play()});
if(motion)play();read();menu();
