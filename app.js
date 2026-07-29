const { characters, routes, questions, questionBanks } = window.gameData;
const app = document.querySelector('#app');
const SAVE_KEY = 'beike-lamb-cpp-session-v4';
const PROFILE_KEY = 'beike-lamb-cpp-profile-v4';
const DAILY_GOAL = 3;

const emptyState = () => ({ screen:'home', characterId:null, step:0, scores:[0,0,0], phase:'story', lessonSet:[], completed:[], learned:0, hint:false, feedback:null, sequence:[], sessionXP:0 });
const emptyProfile = () => ({ xp:0, streak:0, lastStudyDate:'', correctTotal:0, completedChapters:0, badges:[], mastery:{}, reviewQueue:[], dailyDate:'', dailyCorrect:0, reducedMotion:false });
const today = () => new Date().toISOString().slice(0,10);
const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const load = (key, make) => { try { return { ...make(), ...JSON.parse(localStorage.getItem(key) || '{}') }; } catch { return make(); } };
let state = load(SAVE_KEY, emptyState);
let profile = load(PROFILE_KEY, emptyProfile);
profile.mastery ||= {}; profile.reviewQueue ||= []; profile.badges ||= [];
if (profile.dailyDate !== today()) { profile.dailyDate = today(); profile.dailyCorrect = 0; }

function save() { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); localStorage.setItem(PROFILE_KEY, JSON.stringify(profile)); }
function character() { return characters.find(item => item.id === state.characterId) || characters[0]; }
function routeKey() { const max = Math.max(...state.scores); return state.scores[0] === max ? 'warm' : state.scores[1] === max ? 'explore' : 'steady'; }
function route() { return routes[routeKey()]; }
function lessonSet() {
  const priority = new Set(profile.reviewQueue);
  return questionBanks.slice().sort((a,b) => Number(priority.has(b.id)) - Number(priority.has(a.id))).map(bank => ({ ...bank.items[Math.floor(Math.random() * bank.items.length)], bankId:bank.id, bankName:bank.name, bankKind:bank.kind }));
}
function lesson() { if (!Array.isArray(state.lessonSet) || state.lessonSet.length !== questionBanks.length) state.lessonSet = lessonSet(); return state.lessonSet[state.step]; }
function btn(label, action, style='primary', extra='') { return `<button class="${style} ${extra}" data-action="${action}">${label}</button>`; }
function progress(step=state.step + 1) { return `<div class="progress-row" aria-label="当前第 ${step} 章，共 ${questions.length} 章"><span class="step">${step}</span><div class="track"><b style="width:${step/questions.length*100}%"></b></div><span>${questions.length}</span></div>`; }
function addBadge(id, label, icon) { if (!profile.badges.some(item => item.id === id)) profile.badges.push({id,label,icon}); }
function refreshBadges() { if (profile.xp >= 10) addBadge('first-shell','第一片贝壳','🐚'); if (profile.correctTotal >= 8) addBadge('syntax-explorer','语法探索家','🔎'); if (profile.streak >= 7) addBadge('seven-tides','七日海潮','🌊'); if (Object.values(profile.mastery).filter(item => item.correct >= 2).length >= 4) addBadge('steady-learner','稳稳前进','🧭'); }
function award(amount, isCorrect=false) {
  state.sessionXP += amount; profile.xp += amount;
  if (profile.lastStudyDate !== today()) { const yesterday = new Date(Date.now()-86400000).toISOString().slice(0,10); profile.streak = profile.lastStudyDate === yesterday ? profile.streak+1 : 1; profile.lastStudyDate = today(); }
  if (isCorrect) profile.dailyCorrect += 1;
  refreshBadges();
}
function mastery(bankId) { return profile.mastery[bankId] ||= { attempts:0, correct:0 }; }
function recordResult(correct) {
  const item = lesson(); const stat = mastery(item.bankId); stat.attempts += 1;
  if (correct) { stat.correct += 1; profile.correctTotal += 1; if (!state.completed.includes(state.step)) { state.completed.push(state.step); state.learned += 1; award(10,true); } profile.reviewQueue = profile.reviewQueue.filter(id => id !== item.bankId); }
  else if (!profile.reviewQueue.includes(item.bankId)) profile.reviewQueue.push(item.bankId);
  state.feedback = correct; state.phase = 'feedback';
}
function render() {
  document.body.classList.toggle('reduce-motion', Boolean(profile.reducedMotion));
  const views = {home,choose,profileView,game,result,report};
  app.innerHTML = views[state.screen]();
  app.querySelectorAll('[data-action]').forEach(node => node.addEventListener('click', act));
  save();
}

function brand() { return `<div class="brand-strip"><div class="brand-unit"><img src="assets/gongxing-qingyun.jpg" alt="躬行青耘标识"/><span>躬行青耘</span></div><div class="brand-divider"></div><div class="brand-unit"><img class="school-logo" src="assets/hohhot-no2-wordmark.svg" alt="呼和浩特二中标识"/><span>呼和浩特市<br>第二中学</span></div></div>`; }
function dailyCard() { return `<div class="daily-card"><span>🌱 今日小任务</span><b>${Math.min(profile.dailyCorrect,DAILY_GOAL)} / ${DAILY_GOAL}</b><i><em style="width:${Math.min(100,profile.dailyCorrect/DAILY_GOAL*100)}%"></em></i><small>${profile.dailyCorrect >= DAILY_GOAL ? '今天的学习任务完成啦！' : '答对三题，收集今天的学习贝壳。'}</small></div>`; }
function home() { const canResume = state.characterId && state.step < questions.length && state.screen !== 'result'; return `<section class="screen hero">${brand()}<div class="hero-content"><div class="home-stats"><span>🔟 连续学习 ${profile.streak} 天</span><span>🐚 ${profile.xp} 枚贝壳</span></div>${dailyCard()}<img class="art" src="assets/lamb-wave.png" alt="挥手的贝壳小羊"/><h1>和贝壳小羊开启一场心动学习</h1><p class="lead">八段互动剧情，八种 C++ 解题方式。<br>每一次选择，都会变成一段小小的代码冒险。</p>${canResume ? btn(`继续第 ${state.step+1} 章`,'resume') : btn('开始冒险','choose')}<div class="home-actions">${btn('查看学习档案','report','secondary')}</div><p class="footnote">本机保存进度 · 无需注册 · 不收集个人信息</p></div></section>`; }
function choose() { return `<section class="screen"><div class="nav-row">${btn('← 返回首页','home','text-button')}<span>🐚 ${profile.xp}</span></div><div class="top-copy"><h2>选择贝壳小羊的模样</h2><p>每一面贝壳小羊，都有属于自己的温柔</p></div><div class="character-grid">${characters.map(item => `<button class="character" style="--accent:${item.color}" data-action="select:${item.id}"><img loading="lazy" src="${item.image}" alt="${item.name}"/><h3>${item.name}</h3><span class="pill">${item.type}</span><p>${item.quote}</p></button>`).join('')}</div></section>`; }
function profileView() { const item=character(); return `<section class="screen profile" style="--accent:${item.color}"><button class="back" data-action="choose">← 返回选择</button><img class="profile-art" src="${item.image}" alt="${item.name}"/><h2>${item.name}</h2><div class="traits">${item.traits.map(x=>`<span>${x}</span>`).join('')}</div><p class="forecast">心动预告</p><p style="line-height:1.65;margin:12px 0 15px">一段恰到好处的相遇，正在慢慢靠近你。</p><article class="intro-card">${item.intro}</article><p class="quote">${item.quote}</p>${btn('确认选择 TA','start')}</section>`; }
function game() { if (state.phase === 'lesson') return lessonView(); if (state.phase === 'feedback') return feedbackView(); const q=questions[state.step]; return `<section class="screen game">${progress()}<div class="route-pill">${route().emoji} ${route().name}</div><div class="chapter"><div class="icon">✦</div><div class="eyebrow">CHAPTER ${state.step+1} OF 8</div><h2>${q.title}</h2><strong>${q.sub}</strong></div><p class="scene">${q.scene}</p><p class="story-route">${route().lines[state.step]}</p><div class="dialogue">${q.say}</div><p class="choice-label">选择你的回应</p><div class="options">${q.opts.map((x,i)=>`<button class="option" data-action="story:${i}"><span class="letter">${'ABCD'[i]}</span>${x[0]}</button>`).join('')}</div></section>`; }

function exercise(item) {
  if (item.mode === 'choice') return `<div class="options lesson-options">${item.options.map((x,i)=>`<button class="option" data-action="study:${i}"><span class="letter">${'ABCD'[i]}</span><code>${x}</code></button>`).join('')}</div>`;
  if (item.mode === 'binary') return `<div class="binary-options">${item.options.map((x,i)=>`<button class="binary-option" data-action="study:${i}">${x === 'true' ? '✓ true' : '✕ false'}</button>`).join('')}</div>`;
  if (item.mode === 'number') return `<label class="answer-field">我的推演结果<input id="text-answer" inputmode="numeric" autocomplete="off" aria-label="输入数值答案" /></label>${btn('提交推演结果','submittext')}`;
  if (item.mode === 'fill') return `<div class="code-editor fill-editor"><code>${esc(item.before)}</code><input id="text-answer" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="填写一个比较符号"/><code>${esc(item.after)}</code></div>${btn('提交填空','submittext')}`;
  if (item.mode === 'sequence') { const chosen=state.sequence||[]; const left=item.tokens.map((_,i)=>i).filter(i=>!chosen.includes(i)); return `<p class="interaction-label">已排顺序：<strong>${chosen.map(i=>item.tokens[i]).join(' → ') || '等待选择'}</strong></p><div class="token-row">${left.map(i=>`<button class="token" data-action="sequence:${i}">${item.tokens[i]}</button>`).join('')}</div><div class="mini-actions">${btn('重排','seqreset','secondary')}${btn('确认顺序','submitsequence')}</div>`; }
  if (item.mode === 'array') return `<div class="array-grid">${item.cells.map((x,i)=>`<button class="array-cell" data-action="study:${i}" aria-label="数组位置 ${i}"><small>[${i}]</small><b>${x}</b></button>`).join('')}</div>`;
  if (item.mode === 'match') return `<div class="match-list">${item.pairs.map(([value],i)=>`<label><code>${value}</code><span> → </span><select id="match-${i}" aria-label="为 ${value} 选择形参"><option value="">选择形参</option>${item.targets.map(x=>`<option value="${x}">${x}</option>`).join('')}</select></label>`).join('')}</div>${btn('确认配对','submitmatch')}`;
  if (item.mode === 'bug') return `<div class="bug-lines">${item.lines.map((x,i)=>`<button data-action="study:${i}"><span>${i+1}</span><code>${esc(x)}</code></button>`).join('')}</div>`;
  return '';
}
function lessonView() { const item=lesson(); const code=item.code?`<pre class="cpp-code"><code>${item.code}</code></pre>`:''; return `<section class="screen game">${progress()}<article class="study-card"><span class="learn-badge">📎 ${item.bankName} · ${item.bankKind}</span><p class="mission">🐑 ${item.mission}</p><h2>${item.topic}</h2>${code}<p>${item.prompt}</p>${state.hint?`<p class="hint">💡 ${item.hint}</p>`:''}<div class="interaction">${exercise(item)}</div><div class="lesson-actions">${btn(state.hint?'已显示提示':'查看提示','hint','secondary')}</div></article></section>`; }
function feedbackView() { const item=lesson(), ok=state.feedback; return `<section class="screen game">${progress()}<article class="study-card feedback ${ok?'good':'try'}"><div class="symbol">${ok?'🎉':'💡'}</div><span class="learn-badge">${item.bankName}反馈</span><h2>${ok?'答对啦！':'这一步先记住'}</h2><p>${item.explain}</p>${ok?btn('继续下一章','nextlesson'): `<div class="actions">${btn('带着提示再试一次','retrylesson')}${btn('先继续，稍后复习','skiplesson','secondary')}</div>`}</article></section>`; }

function metric(label, stat) { const value=stat?.correct||0, max=Math.max(2,stat?.attempts||2); return `<div class="metric"><span>${label}</span><div class="bar"><i style="--width:${Math.min(100,value/max*100)}%"></i></div><span>${value}/${max}</span></div>`; }
function result() { const [e,x,s]=state.scores, score=Math.min(96,58+Math.round((e+x+s)/54*38)), item=character(), r=route(); const persona=e>=x&&e>=s?'温柔共鸣型':x>=s?'明亮表达型':'安心守护型'; return `<section class="screen result"><span class="status">💛 美好结局</span><div class="circle" style="--score:${score}"><b>${score}%</b></div><h2 class="match">${r.name}</h2><p>${r.note}</p><article class="result-card"><header>💛 你的心动人格</header><h2>${persona}</h2><span class="code">EMP · EXP · STEADY</span><p class="description">你的回应让故事走向了独一无二的路线。</p>${metric('💛 情绪共鸣',{correct:e,attempts:16})}${metric('💬 情感表达',{correct:x,attempts:16})}${metric('🏠 稳定需求',{correct:s,attempts:16})}</article><article class="result-card"><header>🐚 本轮 C++ 学习</header><h2>${state.learned} / 8</h2><span class="code">EIGHT DIFFERENT MODES</span><p class="description">本轮完成了概念选择、数值推演、真假判断、代码填空、顺序编排、数组点击、参数配对和定位错误八种不同交互。</p></article><article class="result-card partner"><header>🐑 你的伙伴</header><img loading="lazy" src="${item.image}" alt="${item.name}"/><h3>${item.name}</h3><q>${item.quote}</q></article><article class="ending"><header>📖 最终结局</header><h3>${r.emoji} ${r.name}</h3><p>${r.lines[7]}</p><p>${item.name}轻轻说：“代码像一次次小小的选择，试过、改过，就会越来越接近想要的答案。”</p></article><div class="actions">${btn('分享我的成就','share')}${btn('导出学习报告','export','secondary')}${btn('再测一次','restart','secondary')}${btn('选择其他模样','choose','secondary')}</div></section>`; }
function report() { const badges=profile.badges.length?profile.badges.map(x=>`<span class="badge">${x.icon} ${x.label}</span>`).join(''):'<p class="empty-note">完成一个学习关卡后，就会收到第一枚贝壳徽章。</p>'; return `<section class="screen report"><div class="nav-row">${btn('← 返回首页','home','text-button')}<span>本机学习档案</span></div><div class="top-copy"><h2>贝壳学习档案</h2><p>只保存在这台设备，不上传个人信息</p></div>${dailyCard()}<article class="result-card"><div class="report-stats"><div><b>${profile.xp}</b><span>贝壳</span></div><div><b>${profile.streak}</b><span>连续学习天数</span></div><div><b>${profile.correctTotal}</b><span>累计答对</span></div></div><p class="description">最高完成章节：${profile.completedChapters}/8。${profile.reviewQueue.length?`待复习：${profile.reviewQueue.map(id=>questionBanks.find(x=>x.id===id)?.name).join('、')}。`: '当前没有待复习知识点。'}</p></article><article class="result-card"><header>📊 知识点掌握度</header><div class="mastery-list">${questionBanks.map(bank=>metric(bank.name,profile.mastery[bank.id])).join('')}</div><p class="description">每次答题都会记录尝试与答对次数；答错的专题会在下一轮优先出现。</p></article><article class="result-card"><header>🏆 已获得的徽章</header><div class="badge-grid">${badges}</div></article><article class="result-card"><header>⚙️ 学习设置</header><div class="settings-row"><span>减少动画</span><button class="switch ${profile.reducedMotion?'on':''}" data-action="motion" aria-label="切换减少动画"><i></i></button></div><p class="description">如页面动画让你分心，可开启减少动画。进度和报告均只存于本机。</p></article><div class="actions">${btn('导出学习报告','export')}${btn('重置本机进度','resetdata','secondary')}${btn('开始新冒险','choose','secondary')}</div></section>`; }

function nextChapter() { profile.completedChapters=Math.max(profile.completedChapters,state.step+1); if (state.step >= questions.length-1) { state.screen='result'; state.phase='story'; } else { state.step+=1; state.phase='story'; state.hint=false; state.feedback=null; state.sequence=[]; } refreshBadges(); }
function exportReport() { const masteryRows=questionBanks.map(bank=>{const s=profile.mastery[bank.id]||{correct:0,attempts:0};return `${bank.name}：${s.correct}/${s.attempts}`;}); const text=['贝壳小羊 C++ 学习报告',`导出日期：${today()}`,`贝壳：${profile.xp}`,`连续学习：${profile.streak} 天`,`累计答对：${profile.correctTotal}`,`最高完成章节：${profile.completedChapters}/8`,'知识点掌握度：',...masteryRows,`待复习：${profile.reviewQueue.map(id=>questionBanks.find(x=>x.id===id)?.name).join('、')||'无'}`].join('\n'); const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'})); const a=document.createElement('a'); a.href=url; a.download='贝壳小羊-C++学习报告.txt'; a.click(); URL.revokeObjectURL(url); }
async function shareResult() { const data={title:'贝壳小羊 C++ 心动学习',text:`我和贝壳小羊完成了 C++ 冒险，答对 ${state.learned}/8 题！`,url:location.href}; try { if(navigator.share) await navigator.share(data); else { await navigator.clipboard.writeText(`${data.text}\n${data.url}`); alert('成就文案和链接已复制。'); } } catch {} }
function textAnswer() { const input=document.querySelector('#text-answer'); return (input?.value||'').trim().replace(/\s+/g,''); }
function act(event) {
  const action=event.currentTarget.dataset.action;
  if (action==='home') state.screen='home';
  else if (action==='choose') state.screen='choose';
  else if (action==='report') state.screen='report';
  else if (action==='resume') state.screen='game';
  else if (action==='motion') profile.reducedMotion=!profile.reducedMotion;
  else if (action==='resetdata') { if(confirm('确定要清除这台设备上的学习进度吗？此操作无法恢复。')) { state=emptyState(); profile=emptyProfile(); } }
  else if (action==='start'||action==='restart') state={...emptyState(),screen:'game',characterId:state.characterId,lessonSet:lessonSet()};
  else if (action.startsWith('select:')) { state.characterId=action.split(':')[1]; state.screen='profileView'; }
  else if (action.startsWith('story:')) { const score=questions[state.step].opts[Number(action.split(':')[1])][1]; state.scores=state.scores.map((v,i)=>v+score[i]); state.phase='lesson'; state.hint=false; award(3); }
  else if (action==='hint') state.hint=true;
  else if (action.startsWith('study:')) recordResult(Number(action.split(':')[1])===lesson().correct || Number(action.split(':')[1])===lesson().answer);
  else if (action==='submittext') { const item=lesson(); recordResult(textAnswer()===String(item.answer)); }
  else if (action.startsWith('sequence:')) { state.sequence.push(Number(action.split(':')[1])); }
  else if (action==='seqreset') state.sequence=[];
  else if (action==='submitsequence') { const item=lesson(); recordResult((state.sequence||[]).map(i=>item.tokens[i]).join('|')===item.answer.join('|')); }
  else if (action==='submitmatch') { const item=lesson(); recordResult(item.pairs.every(([,target],i)=>document.querySelector(`#match-${i}`)?.value===target)); }
  else if (action==='retrylesson') { state.phase='lesson'; state.hint=true; state.sequence=[]; }
  else if (action==='skiplesson'||action==='nextlesson') nextChapter();
  else if (action==='export') exportReport();
  else if (action==='share') shareResult();
  render(); if (!['export','share'].includes(action)) window.scrollTo({top:0,behavior:profile.reducedMotion?'auto':'smooth'});
}
render();
