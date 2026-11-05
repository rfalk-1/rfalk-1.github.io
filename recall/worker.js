'use strict';
importScripts('vendor/nerdamer.min.js','math.js');
self.onmessage=({data})=>{
 try{self.postMessage({id:data.id,...RecallMath.grade(data.answer,data.question,nerdamer)})}
 catch(e){self.postMessage({id:data.id,error:e.message||'暂无法判定，请化简后重试。'})}
};
