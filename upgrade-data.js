/* 第二阶段题库：每个知识点采用不同的交互形式，避免整局都是选择题。 */
(() => {
  window.gameData.characters.forEach(character => {
    character.image = character.image.replace(/\.png$/, '.jpg');
  });
  const banks = window.gameData.questionBanks;
  const byId = Object.fromEntries(banks.map(bank => [bank.id, bank]));
  const set = (id, variants) => { byId[id].items = variants.map((item, index) => ({ ...item, bankId:id, variant:index })); };

  set('types', [
    { mode:'choice', topic:'变量类型：真假状态', mission:'帮贝壳小羊确认今天的学习徽章是否点亮。', prompt:'记录“今天是否完成学习”时，最合适的变量类型是？', code:'<span class="accent">______</span> finished = true;', options:['bool','int','double','char'], correct:0, hint:'这个变量只有“是”和“否”两种可能。', explain:'bool 专门保存 true 或 false，适合表示是否完成、是否通过等状态。' },
    { mode:'choice', topic:'变量类型：平均分', mission:'为学习小队保存带小数的平均分。', prompt:'要保存 87.5 这样的平均分，最合适的变量类型是？', code:'<span class="accent">______</span> average = 87.5;', options:['double','int','bool','char'], correct:0, hint:'这个数带有小数部分。', explain:'double 可以保存带小数的数值；int 只能保存整数。' }
  ]);

  set('operators', [
    { mode:'number', topic:'余数运算', mission:'把收集到的 17 枚贝壳每 5 枚装成一袋。', prompt:'输入变量 rest 最终保存的数值。', code:'int rest = 17 % 5;', answer:'2', hint:'% 计算的是整除以后剩下的部分。', explain:'17 除以 5 得到 3 余 2，所以 rest 的值为 2。' },
    { mode:'number', topic:'运算顺序', mission:'计算贝壳灯串所需的总星星数。', prompt:'输入变量 value 最终保存的数值。', code:'int value = 2 + 3 * 4;', answer:'14', hint:'乘除法的优先级高于加减法。', explain:'先计算 3 × 4 得到 12，再加 2，所以结果是 14。' }
  ]);

  set('logic', [
    { mode:'binary', topic:'并且条件', mission:'检查小羊是否同时满足“分数”和“出勤”两项要求。', prompt:'请判断下面表达式的最终结果。', code:'bool pass = (score >= 60 && attendance >= 80);\n// score = 75, attendance = 78', options:['true','false'], correct:1, hint:'&& 表示两个条件必须同时满足。', explain:'分数达标，但出勤率没有达到 80，因此整个条件为 false。' },
    { mode:'binary', topic:'非运算', mission:'确认贝壳小羊能否加入成年学习队。', prompt:'当 age 为 18 时，下面表达式的结果是？', code:'bool adult = !(age < 18);', options:['true','false'], correct:0, hint:'先判断括号内，再把结果反转。', explain:'18 < 18 为 false，!false 会得到 true。' }
  ]);

  set('branch', [
    { mode:'fill', topic:'温度判断', mission:'为小羊的夜行装备写出结冰提醒条件。', prompt:'只填写一个比较符号，使温度低于 0 时进入结冰分支。', before:'if (temperature ', after:' 0) {\n  // 结冰\n}', answer:'<', hint:'“低于”描述的是数值更小。', explain:'temperature < 0 表示温度小于零度。' },
    { mode:'fill', topic:'相等判断', mission:'验证打开贝壳宝箱的密码。', prompt:'只填写一个比较符号，使 code 恰好等于 42 时通过。', before:'if (code ', after:' 42) {\n  // 通过\n}', answer:'==', hint:'判断是否相等和给变量赋值，符号并不相同。', explain:'== 用于判断两个值是否相等；单个 = 用于赋值。' }
  ]);

  set('loops', [
    { mode:'sequence', topic:'for 循环边界', mission:'按循环执行顺序点亮三颗星星。', prompt:'按循环变量 i 的出现顺序点击数字。', code:'for (int i = 1; i <= 5; i += 2) {\n  // 点亮一颗星\n}', tokens:['1','3','5'], answer:['1','3','5'], hint:'从 1 开始，每次增加 2，别忘了检查结束条件。', explain:'i 依次为 1、3、5；下一次为 7 时条件不成立。' },
    { mode:'sequence', topic:'while 循环边界', mission:'按 n 的变化顺序收起倒数计时牌。', prompt:'按进入循环时 n 的取值顺序点击数字。', code:'int n = 5;\nwhile (n > 0) {\n  n -= 2;\n}', tokens:['5','3','1'], answer:['5','3','1'], hint:'每执行一次循环，n 都会减少 2。', explain:'进入循环时 n 依次为 5、3、1；第三次后变成 -1，循环停止。' }
  ]);

  set('arrays', [
    { mode:'array', topic:'数组下标', mission:'从贝壳收纳盒中取出下标为 2 的那一格。', prompt:'点击正确的数组格子。', code:'int stars[4] = {2, 4, 6, 8};\n// 读取 stars[2]', cells:['2','4','6','8'], answer:2, hint:'C++ 数组下标从 0 开始。', explain:'stars[0] 是 2，stars[1] 是 4，因此 stars[2] 是 6。' },
    { mode:'array', topic:'数组范围', mission:'找出不能访问的贝壳收纳盒位置。', prompt:'点击会造成下标越界的格子。', code:'int score[3] = {80, 90, 100};', cells:['score[0]','score[1]','score[2]','score[3]'], answer:3, hint:'长度为 3 的数组只有三个合法位置。', explain:'合法下标是 0、1、2；访问 score[3] 已经超出了数组末尾。' }
  ]);

  set('functions', [
    { mode:'match', topic:'参数传递', mission:'把两枚任务贝壳正确交给函数的两个参数。', prompt:'将每个实参配对到它会传入的形参。', code:'int add(int a, int b) {\n  return a + b;\n}\nadd(3, 5);', pairs:[['3','a'],['5','b']], targets:['a','b'], hint:'实参按照调用时从左到右的位置传入。', explain:'第一个实参 3 传给 a，第二个实参 5 传给 b。' },
    { mode:'match', topic:'函数调用', mission:'把比较任务中的两个数字送到正确的位置。', prompt:'将每个实参配对到它会传入的形参。', code:'int bigger(int left, int right) {\n  return left > right ? left : right;\n}\nbigger(4, 9);', pairs:[['4','left'],['9','right']], targets:['left','right'], hint:'形参位置和调用时的实参位置一一对应。', explain:'第一个实参 4 传给 left，第二个实参 9 传给 right。' }
  ]);

  set('debug', [
    { mode:'bug', topic:'编译错误定位', mission:'修好贝壳灯的第一处语法错误。', prompt:'点击最需要修改的代码行。', lines:['int age = 16','if (age >= 16) {','  // 可以参加','}'], answer:0, hint:'一条普通 C++ 语句结束时通常需要一个标记。', explain:'第一行变量定义末尾缺少分号，应该写成 int age = 16;。' },
    { mode:'bug', topic:'比较与赋值', mission:'修好满分判定器中的关键错误。', prompt:'点击最需要修改的代码行。', lines:['if (score = 100) {','  // 满分','}'], answer:0, hint:'条件要比较两个值，而不是修改 score。', explain:'单个 = 是赋值；判断是否相等应该使用 ==。' }
  ]);

  // 每个专题补足到 8 个变体：一局仍只抽取一个，连续重玩时才会轮换出现。
  const add = (id, items) => {
    const offset = byId[id].items.length;
    byId[id].items.push(...items.map((item, index) => ({ ...item, bankId:id, variant:offset + index })));
  };
  add('types', [
    { mode:'choice', topic:'变量类型：字母等级', mission:'为贝壳小羊记录一枚字母等级徽章。', prompt:'保存单个字母 A，最合适的类型是？', code:'<span class="accent">______</span> level = \'A\';', options:['char','int','bool','double'], correct:0, hint:'这里只有一个字符，并且字符需要使用单引号。', explain:'char 用来保存单个字符，例如 A、x 或 ?。' },
    { mode:'choice', topic:'变量类型：贝壳数量', mission:'统计背包中的贝壳数量。', prompt:'保存 36 这样的完整数量，最合适的类型是？', code:'<span class="accent">______</span> shells = 36;', options:['int','double','bool','char'], correct:0, hint:'数量没有小数部分。', explain:'int 用于保存整数，例如数量、人数和次数。' },
    { mode:'choice', topic:'变量类型：温度', mission:'记录夜晚的海边温度 18.6℃。', prompt:'最合适的变量类型是？', code:'<span class="accent">______</span> temperature = 18.6;', options:['double','int','char','bool'], correct:0, hint:'温度带有小数部分。', explain:'double 能保留小数；int 会丢失小数部分。' },
    { mode:'choice', topic:'变量类型：天气状态', mission:'记录今天是否下雨。', prompt:'最合适的变量类型是？', code:'<span class="accent">______</span> rainy = false;', options:['bool','int','double','char'], correct:0, hint:'这里只有真或假两种状态。', explain:'bool 保存 true 或 false，适合表示开关和状态。' },
    { mode:'choice', topic:'变量类型：步数', mission:'记录小羊走过的完整步数。', prompt:'最合适的变量类型是？', code:'<span class="accent">______</span> steps = 1200;', options:['int','double','bool','char'], correct:0, hint:'步数通常是完整的计数。', explain:'int 适合保存没有小数的计数值。' },
    { mode:'choice', topic:'变量类型：完成比例', mission:'保存本周学习完成比例 0.75。', prompt:'最合适的变量类型是？', code:'<span class="accent">______</span> progress = 0.75;', options:['double','int','bool','char'], correct:0, hint:'比例可能不是整数。', explain:'double 用于保存含有小数点的数值。' }
  ]);
  add('operators', [
    { mode:'number', topic:'整数运算', mission:'计算六码贝壳密码的一部分。', prompt:'输入 value 的最终数值。', code:'int value = 24 / 6 + 5;', answer:'9', hint:'先完成除法，再进行加法。', explain:'24 ÷ 6 为 4，4 + 5 得到 9。' },
    { mode:'number', topic:'余数嵌套', mission:'计算多余贝壳的数量。', prompt:'输入 rest 的最终数值。', code:'int rest = (18 - 4) % 5;', answer:'4', hint:'先算括号，再计算余数。', explain:'18 - 4 为 14，14 除以 5 的余数是 4。' },
    { mode:'number', topic:'括号优先级', mission:'计算三组星星的总数。', prompt:'输入 stars 的最终数值。', code:'int stars = 3 * (5 - 2);', answer:'9', hint:'括号中的内容优先计算。', explain:'先得到 5 - 2 = 3，再计算 3 × 3 = 9。' },
    { mode:'number', topic:'整数除法', mission:'把 19 枚贝壳平均放进 4 个盒子。', prompt:'输入 each 的最终数值。', code:'int each = 19 / 4;', answer:'4', hint:'两个 int 相除时，小数部分会被舍去。', explain:'19 ÷ 4 为 4.75，但 int 只能保存整数，因此结果为 4。' },
    { mode:'number', topic:'混合运算', mission:'计算今天收集到的奖励分。', prompt:'输入 score 的最终数值。', code:'int score = 7 + 9 % 4;', answer:'8', hint:'余数运算优先于加法。', explain:'9 % 4 为 1，再加上 7，结果为 8。' },
    { mode:'number', topic:'连续表达式', mission:'解开灯塔上的数字机关。', prompt:'输入 answer 的最终数值。', code:'int answer = (8 + 2) * 3 - 4;', answer:'26', hint:'按括号、乘除、加减的顺序计算。', explain:'(8 + 2) × 3 - 4 = 10 × 3 - 4 = 26。' }
  ]);
  add('logic', [
    { mode:'binary', topic:'或者条件', mission:'判断小羊能否参加活动。', prompt:'请判断表达式结果。', code:'bool canGo = (age >= 12 || accompanied);\n// age = 10, accompanied = true', options:['true','false'], correct:0, hint:'|| 表示只要有一个条件成立即可。', explain:'虽然年龄不满足，但 accompanied 为 true，因此结果为 true。' },
    { mode:'binary', topic:'否定组合', mission:'确认夜间出行是否安全。', prompt:'请判断表达式结果。', code:'bool safe = !(rain && windy);\n// rain = true, windy = false', options:['true','false'], correct:0, hint:'先计算 &&，再使用 ! 反转。', explain:'rain && windy 为 false，!false 的结果是 true。' },
    { mode:'binary', topic:'多个条件', mission:'检查学习工具是否齐全。', prompt:'请判断表达式结果。', code:'bool ready = (hasBook && hasPen) || online;\n// hasBook = true, hasPen = false, online = true', options:['true','false'], correct:0, hint:'先看两个括号中的结果。', explain:'第一部分为 false，但 online 为 true；false || true 仍为 true。' },
    { mode:'binary', topic:'范围反转', mission:'确认本次任务是否通过。', prompt:'请判断表达式结果。', code:'bool passed = !(score < 60 || absent);\n// score = 80, absent = false', options:['true','false'], correct:0, hint:'括号内两个条件都不成立。', explain:'score < 60 和 absent 都为 false，括号内为 false，反转后为 true。' },
    { mode:'binary', topic:'不等判断', mission:'检查两把钥匙是否不同。', prompt:'请判断表达式结果。', code:'bool different = (a != b && b > 0);\n// a = 3, b = 3', options:['true','false'], correct:1, hint:'先判断 a 和 b 是否不相等。', explain:'a != b 为 false，因此整个 && 表达式为 false。' },
    { mode:'binary', topic:'锁定状态', mission:'判断宝箱现在是否可以打开。', prompt:'请判断表达式结果。', code:'bool open = (password == 1234) && !locked;\n// password = 1234, locked = true', options:['true','false'], correct:1, hint:'密码正确还不够，宝箱也不能处于锁定状态。', explain:'密码条件为 true，但 !locked 为 false，因此结果是 false。' }
  ]);
  add('branch', [
    { mode:'fill', topic:'年龄条件', mission:'为少年探索队设置报名条件。', prompt:'填写一个比较符号，使年龄不小于 16 时通过。', before:'if (age ', after:' 16) {\n  // 可以报名\n}', answer:'>=', hint:'“不小于”包含相等的情况。', explain:'age >= 16 表示年龄大于或等于 16。' },
    { mode:'fill', topic:'日期相等', mission:'判断今天是否正好是第 7 天。', prompt:'填写一个比较符号，使 day 恰好为 7 时成立。', before:'if (day ', after:' 7) {\n  // 领取徽章\n}', answer:'==', hint:'这里是比较，不是给 day 赋值。', explain:'判断相等使用 ==。' },
    { mode:'fill', topic:'及格条件', mission:'判断是否获得学习通行证。', prompt:'填写一个比较符号，使分数达到 60 时通过。', before:'if (score ', after:' 60) {\n  // 通过\n}', answer:'>=', hint:'“达到”意味着 60 本身也算通过。', explain:'score >= 60 表示分数大于或等于 60。' },
    { mode:'fill', topic:'排除选项', mission:'排除错误的答案标记。', prompt:'填写一个比较符号，使 answer 不是 Y 时进入分支。', before:"if (answer ", after:" 'Y') {\n  // 重新选择\n}", answer:'!=', hint:'“不是”表示不相等。', explain:'!= 用于判断两个值不相等。' },
    { mode:'fill', topic:'优惠门槛', mission:'判断是否可以领取贝壳奖励。', prompt:'填写一个比较符号，使 total 满 100 时领取。', before:'if (total ', after:' 100) {\n  // 领取奖励\n}', answer:'>=', hint:'满 100 包含刚好等于 100。', explain:'total >= 100 表示总数达到或超过 100。' },
    { mode:'fill', topic:'冠军判断', mission:'判断是否拿到第一名。', prompt:'填写一个比较符号，使 rank 恰好为 1 时成立。', before:'if (rank ', after:' 1) {\n  // 冠军\n}', answer:'==', hint:'条件判断需要双等号。', explain:'rank == 1 用于比较名次是否为 1。' }
  ]);
  add('loops', [
    { mode:'sequence', topic:'连续计数', mission:'按顺序点亮四颗编号星星。', prompt:'按 i 进入循环时的取值顺序点击数字。', code:'for (int i = 0; i < 4; i++) {\n  // 点亮\n}', tokens:['0','1','2','3'], answer:['0','1','2','3'], hint:'从 0 开始，每次加 1，在 4 前停止。', explain:'i 依次是 0、1、2、3，i 为 4 时条件不成立。' },
    { mode:'sequence', topic:'步长循环', mission:'沿着海岸每隔三步放一枚贝壳。', prompt:'按 i 进入循环时的取值顺序点击数字。', code:'for (int i = 2; i <= 8; i += 3) {\n  // 放置贝壳\n}', tokens:['2','5','8'], answer:['2','5','8'], hint:'从 2 开始，每次增加 3。', explain:'i 依次为 2、5、8；下一次 11 超过范围。' },
    { mode:'sequence', topic:'递增 while', mission:'按编号打开三盏小灯。', prompt:'按 n 进入循环时的取值顺序点击数字。', code:'int n = 1;\nwhile (n < 4) {\n  n++;\n}', tokens:['1','2','3'], answer:['1','2','3'], hint:'每次循环结束 n 增加 1。', explain:'n 为 1、2、3 时进入循环，变为 4 后停止。' },
    { mode:'sequence', topic:'倒数循环', mission:'按倒数牌的出现顺序收起卡片。', prompt:'按 k 进入循环时的取值顺序点击数字。', code:'for (int k = 10; k >= 4; k -= 3) {\n  // 倒数\n}', tokens:['10','7','4'], answer:['10','7','4'], hint:'每次减少 3，且要满足大于等于 4。', explain:'k 依次为 10、7、4；下一次 1 时停止。' },
    { mode:'sequence', topic:'除半循环', mission:'观察贝壳数量每次减半。', prompt:'按 x 进入循环时的取值顺序点击数字。', code:'int x = 8;\nwhile (x >= 1) {\n  x /= 2;\n}', tokens:['8','4','2','1'], answer:['8','4','2','1'], hint:'整数除法每次都把 x 除以 2。', explain:'x 依次为 8、4、2、1；再除以 2 得到 0，循环停止。' },
    { mode:'sequence', topic:'偶数编号', mission:'按顺序收集偶数编号的海星。', prompt:'按 i 进入循环时的取值顺序点击数字。', code:'for (int i = 0; i <= 6; i += 2) {\n  // 收集\n}', tokens:['0','2','4','6'], answer:['0','2','4','6'], hint:'从 0 开始，每次增加 2。', explain:'i 依次为 0、2、4、6，共执行四次。' }
  ]);
  add('arrays', [
    { mode:'array', topic:'数组下标：首项', mission:'从收纳盒中取出第一枚贝壳。', prompt:'点击会读取 colors[0] 的数组格子。', code:'int colors[4] = {9, 7, 5, 3};', cells:['9','7','5','3'], answer:0, hint:'数组的第一个下标是 0。', explain:'colors[0] 是数组中的第一项，值为 9。' },
    { mode:'array', topic:'数组下标：末项', mission:'找到长度为 5 的数组最后一个位置。', prompt:'点击会读取 days[4] 的数组格子。', code:'int days[5] = {1, 2, 3, 4, 5};', cells:['1','2','3','4','5'], answer:4, hint:'下标从 0 开始，长度为 5 的最后下标是 4。', explain:'days[4] 是第五项，值为 5。' },
    { mode:'array', topic:'数组中间项', mission:'从星图中找到第三颗星。', prompt:'点击会读取 stars[2] 的数组格子。', code:'int stars[4] = {10, 20, 30, 40};', cells:['10','20','30','40'], answer:2, hint:'第三项的下标不是 3，而是 2。', explain:'stars[2] 对应第三项，值为 30。' },
    { mode:'array', topic:'数组越界', mission:'找出不能打开的收纳格。', prompt:'点击会发生下标越界的访问。', code:'int bag[4] = {2, 4, 6, 8};', cells:['bag[0]','bag[1]','bag[2]','bag[4]'], answer:3, hint:'长度为 4 的合法下标是 0 到 3。', explain:'bag[4] 超出了最后一个合法下标 3。' },
    { mode:'array', topic:'数组下标：第二项', mission:'读取第二个学习分数。', prompt:'点击会读取 score[1] 的数组格子。', code:'int score[3] = {80, 90, 100};', cells:['80','90','100'], answer:1, hint:'第二项的下标为 1。', explain:'score[1] 是第二项，值为 90。' },
    { mode:'array', topic:'数组长度', mission:'检查只有两格的盒子。', prompt:'点击会发生下标越界的访问。', code:'int pair[2] = {6, 12};', cells:['pair[0]','pair[1]','pair[2]'], answer:2, hint:'长度为 2 时，只有下标 0 和 1 合法。', explain:'pair[2] 已超出数组可用范围。' }
  ]);
  add('functions', [
    { mode:'match', topic:'两个参数', mission:'把贝壳数量和奖励数量交给正确形参。', prompt:'将每个实参与对应形参配对。', code:'int total(int shells, int gifts) {\n  return shells + gifts;\n}\ntotal(6, 2);', pairs:[['6','shells'],['2','gifts']], targets:['shells','gifts'], hint:'实参按从左到右的位置传入。', explain:'第一个实参 6 对应 shells，第二个实参 2 对应 gifts。' },
    { mode:'match', topic:'三参数', mission:'为任务函数送入三个坐标。', prompt:'将每个实参与对应形参配对。', code:'int point(int x, int y, int z) {\n  return x + y + z;\n}\npoint(1, 4, 7);', pairs:[['1','x'],['4','y'],['7','z']], targets:['x','y','z'], hint:'第几个实参就传给第几个形参。', explain:'1、4、7 依次传给 x、y、z。' },
    { mode:'match', topic:'位置对应', mission:'把关卡编号和难度等级送进函数。', prompt:'将每个实参与对应形参配对。', code:'int level(int chapter, int difficulty) {\n  return chapter + difficulty;\n}\nlevel(3, 5);', pairs:[['3','chapter'],['5','difficulty']], targets:['chapter','difficulty'], hint:'不要根据名字猜测，而要看位置。', explain:'第一个实参 3 给 chapter，第二个实参 5 给 difficulty。' },
    { mode:'match', topic:'坐标传参', mission:'把小羊的两条路线坐标送入函数。', prompt:'将每个实参与对应形参配对。', code:'int distance(int start, int end) {\n  return end - start;\n}\ndistance(2, 9);', pairs:[['2','start'],['9','end']], targets:['start','end'], hint:'调用括号中最左边的值对应第一个形参。', explain:'2 传给 start，9 传给 end。' },
    { mode:'match', topic:'颜色通道', mission:'把三种颜色数值送给绘图函数。', prompt:'将每个实参与对应形参配对。', code:'int color(int red, int green, int blue) {\n  return red + green + blue;\n}\ncolor(255, 180, 60);', pairs:[['255','red'],['180','green'],['60','blue']], targets:['red','green','blue'], hint:'参数的位置顺序不可交换。', explain:'三个实参从左到右依次传给 red、green、blue。' },
    { mode:'match', topic:'范围参数', mission:'把开始和结束编号送给范围函数。', prompt:'将每个实参与对应形参配对。', code:'int count(int first, int last) {\n  return last - first;\n}\ncount(5, 12);', pairs:[['5','first'],['12','last']], targets:['first','last'], hint:'调用时的顺序就是传参顺序。', explain:'5 对应 first，12 对应 last。' }
  ]);
  add('debug', [
    { mode:'bug', topic:'缺少分号', mission:'修好变量定义语句。', prompt:'点击最需要修改的代码行。', lines:['int shells = 12','bool ready = true;','// 开始任务'], answer:0, hint:'普通语句结尾通常需要分号。', explain:'第一行缺少分号，应写成 int shells = 12;。' },
    { mode:'bug', topic:'循环括号', mission:'修好星星计数循环。', prompt:'点击最需要修改的代码行。', lines:['for (int i = 0; i < 5; i++ {','  // 收集星星','}'], answer:0, hint:'for 的三个部分都必须在一对圆括号内。', explain:'第一行在 i++ 后缺少右圆括号 )。' },
    { mode:'bug', topic:'布尔字面量', mission:'修好任务完成状态。', prompt:'点击最需要修改的代码行。', lines:['bool passed = True;','if (passed) {','  // 领取徽章','}'], answer:0, hint:'C++ 的布尔字面量使用小写字母。', explain:'应写 true，而不是 True。' },
    { mode:'bug', topic:'不完整表达式', mission:'修好奖励总数计算。', prompt:'点击最需要修改的代码行。', lines:['int total = shells + ;','int shells = 8;'], answer:0, hint:'加号两侧都需要有操作数。', explain:'第一行的加号后缺少一个值或变量。' },
    { mode:'bug', topic:'数组初始化', mission:'修好两格收纳盒的初始化。', prompt:'点击最需要修改的代码行。', lines:['int box[2] = {1, 2, 3};','// 只有两格'], answer:0, hint:'数组声明的长度要能容纳初始化列表中的元素。', explain:'box 长度为 2，却给了 3 个初始值，会导致编译错误。' },
    { mode:'bug', topic:'条件比较', mission:'修好等级判断器。', prompt:'点击最需要修改的代码行。', lines:['if (level = 3) {','  // 解锁关卡','}'], answer:0, hint:'if 中需要判断，而不是修改 level。', explain:'单个 = 是赋值；这里应使用 == 来比较。' }
  ]);

  banks.forEach(bank => {
    bank.kind = ({types:'概念选择',operators:'数值推演',logic:'真假判断',branch:'代码填空',loops:'顺序编排',arrays:'数组点击',functions:'参数配对',debug:'定位错误'})[bank.id];
    bank.items.forEach(item => { item.bankName = bank.name; item.bankKind = bank.kind; });
  });
})();
