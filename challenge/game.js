'use strict';
const $=id=>document.getElementById(id),E=QuestEngine,KEY='rfalk.five-question.v1',byId=new Map(QUESTIONS.map(q=>[q.id,q])),pool=QUESTIONS.filter(q=>q.eligible!==false);
let run=null,storageOK=true,locked=false;
function save(){try{localStorage.setItem(KEY,JSON.stringify(run));storageOK=true}catch{storageOK=false}$('save-note').textContent=storageOK?'本轮进度自动保存；切换页面或刷新，计时仍继续。':'浏览器不允许保存；请在当前页面完成本轮。'}
function read(){
 try{
  const raw=localStorage.getItem(KEY);if(!raw)return;
  const r=JSON.parse(raw);
  if(r.version!==1||!Array.isArray(r.ids)||r.ids.length!==5||new Set(r.ids).size!==5||r.ids.some(id=>!byId.has(id))||!Array.isArray(r.records)||r.records.length>5||typeof r.draft!=='string'||r.draft.length>400||typeof r.awaiting!=='boolean'||typeof r.complete!=='boolean'||!Number.isFinite(r.startedAt)||r.startedAt<=0||r.startedAt>Date.now()+5000||r.complete!==(r.records.length===5)||(r.awaiting&&(r.records.length===0||r.complete)))throw Error();
  for(let i=0;i<r.records.length;i++){
   const a=r.records[i],q=byId.get(r.ids[i]);
   if(a.id!==q.id||typeof a.answer!=='string'||a.answer.length>400||!Number.isFinite(a.seconds)||a.seconds<0||typeof a.skipped!=='boolean')throw Error();
   a.correct=!a.skipped&&E.grade(a.answer,q.expected,q.variable);a.points=E.score(a.correct,a.seconds,q.target);
  }
  run=r;
 }catch{$('resume-note').textContent='旧存档无法读取，可重新开始一轮。'}
}
function math(el,text){
 el.replaceChildren();const re=/\$\$([\s\S]*?)\$\$|\$([^$\n]+)\$/g;let last=0,m;
 while((m=re.exec(text))){el.append(document.createTextNode(text.slice(last,m.index)));const s=document.createElement(m[1]!==undefined?'div':'span');katex.render(m[1]??m[2],s,{displayMode:m[1]!==undefined,throwOnError:false,trust:false,strict:'ignore',maxExpand:100});el.append(s);last=re.lastIndex}el.append(document.createTextNode(text.slice(last)));
}
function show(id){for(const name of ['welcome','playing','result'])$(name).hidden=name!==id}
function index(){return run.records.length-(run.awaiting?1:0)}
function elapsed(){return Math.max(0,(Date.now()-run.startedAt)/1000)}
function duration(s){const sec=Math.floor(s);return String(Math.floor(sec/60)).padStart(2,'0')+':'+String(sec%60).padStart(2,'0')}
function updateTimer(){if(!run||run.complete||$('playing').hidden)return;$('timer').textContent=duration(run.awaiting?run.records.at(-1).seconds:elapsed())}
function preview(){
 const raw=$('answer').value.trim();if(!raw){$('preview').textContent='输入后在这里预览';return}
 try{
  const q=run&&!run.complete?byId.get(run.ids[index()]):null;
  let display;try{display=E.toLatex(raw,q?.variable||'')}catch{display=raw.replace(/^\$\$?|\$\$?$/g,'').replace(/^\\\(|\\\)$/g,'')}
  katex.render(display,$('preview'),{throwOnError:true,trust:false,strict:'ignore',maxExpand:100});
 }
 catch{$('preview').textContent='暂无法预览；请检查公式写法。'}
}
function renderQuestion(){
 show('playing');const i=index(),q=byId.get(run.ids[i]);
 $('position').textContent=String(i+1).padStart(2,'0')+' / 05';
 $('dots').replaceChildren();for(let n=0;n<5;n++){const d=document.createElement('span');d.className=n<i?'done':n===i?'current':'';$('dots').append(d)}
 $('topic').textContent='独立作答 · 题名将在结算后揭晓';
 $('title').textContent='第 '+(i+1)+' 题';math($('prompt'),q.prompt);
 $('budget').textContent='建议用时 '+q.target+' 秒 · 答对 60–100 分';
 $('answer').value=run.draft;$('answer').placeholder=q.variable?'输入含 '+q.variable+' 的表达式':'输入精确值，例如 \\frac{3}{4}';
 $('answer-form').hidden=run.awaiting;$('recorded').hidden=!run.awaiting;$('error').textContent='';
 preview();updateTimer();$('title').focus({preventScroll:true});
 $('save-note').textContent=storageOK?'本轮进度自动保存；切换页面或刷新，计时仍继续。':'当前无法保存，请保持页面开启。';
}
function startNew(){run={version:1,ids:E.draw(pool).map(q=>q.id),records:[],draft:'',startedAt:Date.now(),awaiting:false,complete:false};save();renderQuestion()}
function submit(skipped){
 if(locked||!run||run.awaiting||run.complete)return;
 locked=true;
 try{
  const q=byId.get(run.ids[index()]),answer=$('answer').value;
  const correct=skipped?false:E.grade(answer,q.expected,q.variable);
  const seconds=elapsed();
  run.records.push({id:q.id,answer,correct,seconds,points:E.score(correct,seconds,q.target),skipped});
  run.draft=answer;run.complete=run.records.length===5;run.awaiting=!run.complete;save();
  if(run.complete)renderResults();else renderQuestion();
 }catch(error){$('error').textContent=(error instanceof E.InputError?error.message:'暂时无法识别该表达式，请先化简。')+' 本次未提交，计时继续。';$('answer').focus()}
 finally{locked=false}
}
function renderResults(){
 show('result');const total=run.records.reduce((s,r)=>s+r.points,0),correct=run.records.filter(r=>r.correct).length,seconds=run.records.reduce((s,r)=>s+r.seconds,0);
 $('total').textContent=total;$('result-description').textContent='答对 '+correct+' / 5 题 · 累计作答 '+duration(seconds);
 $('breakdown').replaceChildren();
 run.records.forEach((r,i)=>{
  const q=byId.get(r.id),row=document.createElement('article');row.className='result-row';
  const top=document.createElement('div');top.className='row-top';const left=document.createElement('div'),heading=document.createElement('h2'),meta=document.createElement('div'),points=document.createElement('span');
  heading.textContent=String(i+1).padStart(2,'0')+' / '+q.title;meta.className='row-meta';
  const verdict=document.createElement('span');verdict.className=r.correct?'correct':'incorrect';verdict.textContent=r.skipped?'已跳过':r.correct?'正确':'错误';
  meta.append(verdict,document.createTextNode(' · '+duration(r.seconds)+' · '+(r.correct?'基础 60 + 速度 '+(r.points-60):'本题 0 分')));
  left.append(heading,meta);points.className='row-score';points.textContent=r.points;top.append(left,points);
  const details=document.createElement('details'),summary=document.createElement('summary');summary.textContent='查看答案与解析';
  const mine=document.createElement('div');mine.className='your-answer';
  if(r.skipped)mine.textContent='你的答案：（跳过）';else math(mine,'你的答案：$'+E.toLatex(r.answer,q.variable)+'$');
  const expected=document.createElement('div');expected.className='math';math(expected,'参考答案：$'+(q.answerLatex||E.toLatex(q.expected,q.variable))+'$\n\n'+q.explanation);
  const source=document.createElement('p');source.textContent='来源：'+q.source;
  details.append(summary,mine,expected,source);row.append(top,details);$('breakdown').append(row);
 });
 window.scrollTo({top:0,behavior:'instant'});
}
$('start').onclick=()=>{if(run&&!run.complete)renderQuestion();else startNew()};
$('again').onclick=startNew;
$('answer-form').onsubmit=e=>{e.preventDefault();submit(false)};
$('skip').onclick=()=>submit(true);
$('next').onclick=()=>{if(!run?.awaiting)return;run.awaiting=false;run.draft='';run.startedAt=Date.now();save();renderQuestion()};
$('answer').oninput=()=>{preview();if(run&&!run.awaiting&&!run.complete){run.draft=$('answer').value;save()}};
$('answer').onkeydown=e=>{if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();$('answer-form').requestSubmit()}};
setInterval(updateTimer,250);
const video=$('background');let wantsMotion=!matchMedia('(prefers-reduced-motion: reduce)').matches&&!navigator.connection?.saveData;
async function play(){if(!video.getAttribute('src'))video.src='../assets/noelle.mp4';try{await video.play()}catch{}}
function motionLabel(){$('motion').textContent=video.paused?'播放背景':'暂停背景'}
video.onplay=motionLabel;video.onpause=motionLabel;$('motion').onclick=()=>{wantsMotion=video.paused;if(wantsMotion)play();else video.pause()};
document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();else if(wantsMotion)play()});
if(wantsMotion)play();
read();if(run?.complete)renderResults();else if(run){$('start').textContent='继续本轮挑战 →';$('resume-note').textContent='已找到本轮存档，已提交 '+run.records.length+' / 5 题。'}else{$('resume-note').textContent='进阶题库 '+pool.length+' 道 · 每轮随机抽取 5 道 · 无需登录';}
