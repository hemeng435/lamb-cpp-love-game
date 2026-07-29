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

  banks.forEach(bank => {
    bank.kind = ({types:'概念选择',operators:'数值推演',logic:'真假判断',branch:'代码填空',loops:'顺序编排',arrays:'数组点击',functions:'参数配对',debug:'定位错误'})[bank.id];
    bank.items.forEach(item => { item.bankName = bank.name; item.bankKind = bank.kind; });
  });
})();
