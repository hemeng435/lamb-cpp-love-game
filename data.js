window.gameData = {
  characters: [
    { id:'bouquet', name:'贝壳小羊·花束', type:'温柔陪伴型', image:'assets/lamb-bouquet.png', color:'#c9a877', quote:'“今天也想把好心情送给你。”', traits:['温柔','细心','治愈','可靠'], intro:'贝壳小羊总会记得你随口说过的小事。它不擅长轰轰烈烈，却会在每一个普通日子里，为你留下温柔的花香。' },
    { id:'wave', name:'贝壳小羊·元气', type:'明亮探索型', image:'assets/lamb-wave.png', color:'#7da6bd', quote:'“走吧，今天也有新的惊喜！”', traits:['乐观','勇敢','热情','自由'], intro:'贝壳小羊相信生活要有一点冲动和很多笑声。和它一起，你会发现转角的风、天空的云，都藏着值得出发的理由。' },
    { id:'shy', name:'贝壳小羊·害羞', type:'慢热守护型', image:'assets/lamb-shy.png', color:'#ca9b9e', quote:'“我会慢一点，但一直都在。”', traits:['真诚','敏感','专一','体贴'], intro:'贝壳小羊的话不多，心意却很满。它会认真听你说完每一句话，也会把无法说出口的关心，悄悄放在你身边。' },
    { id:'walk', name:'贝壳小羊·旅行', type:'自在冒险型', image:'assets/lamb-walk.png', color:'#a598c1', quote:'“把日常装进口袋，一起出发吧。”', traits:['好奇','松弛','浪漫','独立'], intro:'贝壳小羊带着轻轻的行囊和大大的好奇心。它想陪你把平凡的小路走成故事，把每一次相遇都珍藏起来。' }
  ],
  routes: {
    warm: { name:'温柔陪伴线', emoji:'💛', note:'你们会把关心藏进每一个小细节。', lines:['你把第一句问候变成了安心的开始。','贝壳小羊在雨里为你多留了一点伞沿。','它把你的心事安静地收进了口袋。','一杯热饮成了你们的周末约定。','误会被认真地说开，风也轻了下来。','你们在花园里交换了彼此的小秘密。','它记得你喜欢的颜色，也记得你的努力。','星光下的约定，是慢慢陪伴，不必着急。'] },
    explore: { name:'明亮探索线', emoji:'🌟', note:'你们会把好奇心变成共同的冒险。', lines:['你把第一句问候变成了一个新的邀请。','雨声像节拍，你们决定踩着水花前进。','一条消息，也能变成让人发笑的小故事。','地图摊开了，今天的路线就交给好奇心。','你们用幽默化开了沉默，也学会了认真。','秘密花园的出口，通向一段全新的小路。','惊喜不是终点，而是下一次探索的起点。','星光下的约定，是一起去看更大的世界。'] },
    steady: { name:'安心守护线', emoji:'🏠', note:'你们会用可靠的回应建立信任。', lines:['你让相遇有了不慌不忙的节奏。','雨天的伞很小，但你们走得很稳。','一句晚安，成了彼此可以依靠的信号。','计划写得很细，快乐也被好好照顾。','你们把误会拆开，不让它留在心里。','秘密被郑重保管，信任悄悄长大。','惊喜被珍藏，因为它来自被记住的心意。','星光下的约定，是平常日子也不缺席。'] }
  },
  questions: [
    { title:'第一次相遇', sub:'命运的交汇点', scene:'微风刚好，阳光也刚好。你和贝壳小羊在一间有花香的咖啡店门口相遇。', say:'“你好呀……今天风有点凉，你穿得够不够暖？如果冷的话，我的围巾可以借给你。”', opts:[['主动关心对方，让对方感到温暖',[3,1,1]],['先观察，找到合适时机再靠近',[1,0,2]],['邀请 TA 一起去做有趣的事',[1,3,0]],['安静等待，看看对方会不会先注意到你',[0,1,3]]] },
    { title:'雨天的伞', sub:'靠近一点点', scene:'天空忽然飘起细雨，贝壳小羊把伞往你这边偏了偏。', say:'“伞有一点小，不过我们靠近一点，也不会淋湿。”', opts:[['把伞再推向 TA，自己淋一点也没关系',[3,1,1]],['自然地和 TA 并肩走，聊聊喜欢的天气',[2,2,1]],['提议去附近躲雨，顺便喝杯热饮',[1,3,1]],['礼貌地保持距离，不想给 TA 添麻烦',[0,0,3]]] },
    { title:'晚安消息', sub:'心事的回音', scene:'深夜，你收到一条消息：“今天有一点累，不过想到你就好多了。”', say:'“不用马上回复也没关系，我只是想让你知道。”', opts:[['认真问问发生了什么，陪 TA 把话说完',[3,1,2]],['发一个可爱的表情和一句晚安',[1,3,1]],['分享自己的小故事，逗 TA 开心',[2,3,0]],['提醒 TA 好好休息，明天再聊',[1,0,3]]] },
    { title:'周末邀约', sub:'一起去远方', scene:'周末空出来了，贝壳小羊拿着一张写满小店的地图朝你眨眼。', say:'“今天想和你去一个没去过的地方。”', opts:[['先问 TA 最想去哪里，让 TA 做主',[2,1,2]],['马上答应，随机选一条路出发',[1,3,0]],['提前规划路线，把一切安排好',[1,1,3]],['建议找一个安静的地方慢慢待着',[3,0,2]]] },
    { title:'小小误会', sub:'把话说开', scene:'因为一句没及时回复的消息，你们之间安静了一会儿。', say:'“是不是我哪里做得不够好？我想听听你的感受。”', opts:[['坦诚说出自己的感受，也认真倾听',[3,2,3]],['先给 TA 一点空间，等情绪平静',[1,0,3]],['用轻松的玩笑打破沉默',[1,3,0]],['悄悄准备一份小礼物表达歉意',[2,1,1]]] },
    { title:'秘密花园', sub:'交换心事', scene:'傍晚的花园很安静，贝壳小羊说它有一个小秘密想告诉你。', say:'“我有一点紧张，但我相信你。”', opts:[['告诉 TA：你的心事在我这里很安全',[3,1,3]],['也分享一个自己的小秘密',[2,2,1]],['牵牵 TA 的手，不急着说话',[3,0,2]],['认真分析 TA 的烦恼，帮它想办法',[1,1,3]]] },
    { title:'意外惊喜', sub:'被记住的瞬间', scene:'你发现贝壳小羊为你准备了一个小惊喜，正躲在角落观察你的反应。', say:'“我记得你说过喜欢这个，希望你会开心。”', opts:[['马上拥抱 TA，认真表达感谢',[3,3,1]],['告诉 TA 自己被这份细心打动了',[3,1,2]],['也开始盘算回赠一份惊喜',[2,3,1]],['小心收好礼物，默默珍藏这份心意',[1,0,3]]] },
    { title:'星光约定', sub:'把未来写下来', scene:'夜色很深，星星落在安静的湖面。贝壳小羊轻轻问你：“以后，也一起走吗？”', say:'“不需要回答得很快，我会陪你慢慢想。”', opts:[['坚定地说：想和你一起经历很多以后',[3,2,3]],['笑着说：那就从明天开始吧',[2,3,1]],['和 TA 一起列一张未来愿望清单',[2,2,3]],['靠在 TA 身边，用行动给出回答',[3,1,2]]] }
  ],
  lessons: [
    { topic:'第一课：程序的入口', prompt:'想使用 cout 输出内容时，需要包含哪个头文件？', code:'#include <span class="accent">&lt;iostream&gt;</span>\nusing namespace std;\n\nint main() {\n  cout &lt;&lt; "你好，贝壳小羊！";\n  return 0;\n}', options:['&lt;iostream&gt;','&lt;math&gt;','&lt;vector&gt;','&lt;file&gt;'], correct:0, hint:'想想“输入输出”对应的英文缩写 i/o。', explain:'iostream 提供了 cout 与 cin。写好 #include &lt;iostream&gt;，程序才能使用输入输出工具。' },
    { topic:'第二课：main 函数', prompt:'C++ 程序从哪里开始执行？', code:'#include &lt;iostream&gt;\nusing namespace std;\n\n<span class="accent">int main()</span> {\n  return 0;\n}', options:['从 main() 开始','从第一行注释开始','从 cout 开始','从 return 开始'], correct:0, hint:'每个独立运行的 C++ 程序都需要一个固定的入口函数。', explain:'main() 是 C++ 程序的入口。操作系统会先找到它，再一行行执行其中的语句。' },
    { topic:'第三课：输出', prompt:'下面哪一行会在屏幕上输出“心动”？', code:'cout &lt;&lt; <span class="accent">"心动"</span>;', options:['cout &lt;&lt; "心动";','cin &gt;&gt; "心动";','int 心动;','return "心动";'], correct:0, hint:'cout 的方向是“向屏幕输出”。', explain:'cout 表示“向控制台输出”，<< 把右边的内容送到屏幕上。字符串要用英文双引号包起来。' },
    { topic:'第四课：输入', prompt:'想把用户输入的年龄保存到 age，应该使用哪一行？', code:'int age;\n<span class="accent">cin &gt;&gt; age;</span>', options:['cin >> age;','cout << age;','age == cin;','int cin = age;'], correct:0, hint:'cin 的方向是“从键盘读入变量”。', explain:'cin 用来从键盘读取数据，>> 表示把输入存入右边的变量。' },
    { topic:'第五课：变量', prompt:'哪一个变量适合保存“相遇的天数”这种整数？', code:'<span class="accent">int days</span> = 8;\ncout &lt;&lt; days;', options:['int days = 8;','double days = "8";','string days = 8;','bool days = 8;'], correct:0, hint:'整数类型的名字就是 integer 的缩写。', explain:'int 用来保存整数，例如 8、-3、2026。变量名 days 让代码的意思更容易看懂。' },
    { topic:'第六课：条件判断', prompt:'当 score 大于等于 60 时，应该使用哪个条件？', code:'if (<span class="accent">score &gt;= 60</span>) {\n  cout &lt;&lt; "通过";\n}', options:['score >= 60','score = 60','score != 60','score ++ 60'], correct:0, hint:'“大于或等于”需要两个符号。', explain:'>= 的意思是“大于或等于”。注意 = 是赋值，== 才是判断是否相等。' },
    { topic:'第七课：循环', prompt:'想让“加油！”输出 3 次，循环条件应写成什么？', code:'for (int i = 0; <span class="accent">i &lt; 3</span>; i++) {\n  cout &lt;&lt; "加油！";\n}', options:['i < 3','i = 3','i > 3','i == 3'], correct:0, hint:'i 从 0 开始，取到 0、1、2 正好三次。', explain:'i 从 0 开始，每次加 1；只要 i < 3，就会执行，共执行 0、1、2 三次。' },
    { topic:'第八课：函数返回值', prompt:'这个函数想返回两数之和，空格处应该填什么？', code:'int add(int a, int b) {\n  <span class="accent">return a + b;</span>\n}', options:['return a + b;','cout a + b;','int a + b;','cin >> a + b;'], correct:0, hint:'函数把算出的结果“交回去”时，使用一个关键字。', explain:'return 会把函数计算出的结果交回给调用它的地方。因为 add 的返回类型是 int，所以要返回一个整数。' }
  ],
  practices: {
    1: { title:'代码任务：让贝壳小羊打招呼', intro:'补全 cout 后面的内容，让控制台输出“你好，贝壳小羊！”。', before:'cout << ', after:';', placeholder:'"你好，贝壳小羊！"', hint:'字符串要放在英文双引号中。', check:value => /["“]你好，贝壳小羊！?["”]/.test(value.replace(/\s/g,'')), success:'输出成功：你好，贝壳小羊！' },
    3: { title:'代码任务：判断是否通过', intro:'补全条件，让 score 大于或等于 60 时输出“通过”。', before:'if (score ', after:' 60) { cout << "通过"; }', placeholder:'>=', hint:'大于或等于由 > 和 = 组成。', check:value => value.replace(/\s/g,'') === '>=', success:'判断成功：score 达标，贝壳小羊为你鼓掌！' },
    5: { title:'代码任务：循环三次', intro:'补全循环条件，让“加油！”恰好输出三次。', before:'for (int i = 0; ', after:'; i++) { cout << "加油！"; }', placeholder:'i < 3', hint:'i 从 0 开始，循环到 2 停止。', check:value => value.replace(/\s/g,'') === 'i<3', success:'循环成功：加油！加油！加油！' },
    7: { title:'代码任务：修好返回值', intro:'补全函数体，让它返回 a 和 b 的和。', before:'int add(int a, int b) { ', after:' }', placeholder:'return a + b;', hint:'把计算出的整数结果交回去，要用 return。', check:value => value.replace(/\s/g,'').toLowerCase() === 'returna+b;', success:'修复成功：add(2, 3) 的结果是 5。' }
  }
};
