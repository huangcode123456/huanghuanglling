SET NAMES UTF8;
DROP DATABASE IF EXISTS mmg;  
CREATE DATABASE mmg CHARSET=UTF8;
USE mmg;
/*妈咪购商品分为四大类 纸品 童装 玩具 孕妈用品*/
CREATE TABLE mmg_product_family(
   fid INT PRIMARY KEY AUTO_INCREMENT,
   fname VARCHAR(32)
);
/*妈咪购商品分为四大类导入数据*/
INSERT INTO  mmg_product_family  VALUES
(NULL,'纸品'),
(NULL,'童装 '),
(NULL,'玩具'),
(NULL,'孕妈用品');
/*妈咪购商品四大类产品详情*/
CREATE TABLE mmg_product(
   lid INT PRIMARY KEY AUTO_INCREMENT, #商品编号
   family_id INT,                      #所属分类的编号
   pic VARCHAR(20000),                 #商品图片
   title VARCHAR(64),                  #商品标题
   price DECIMAL(10,2),                #商品价格
   sales INT,                          #商品销量
   stock INT,                          #商品库存
   fare  VARCHAR(56),                  #运费
   details VARCHAR(256)                #商品详情
);

/*妈咪购商品四大类产品详情插入数据*/
INSERT INTO mmg_product VALUES
#首页商品数据
(NULL,1,'file.jpg','湿巾',269,0,300,'包邮','湿巾'),
(NULL,2,'y_4.jpg','婴儿装',42,0,256,'包邮','婴儿装'),
(NULL,2,'y_4.jpg','婴儿装',45,0,256,'包邮','婴儿装'),
(NULL,2,'file6.jpg','春秋新款男童童装...',64,0,256,'包邮','婴儿装'),
(NULL,1,'sy1.jpg','婴儿手口湿巾',310,10,50,'包邮','婴儿手口湿巾'),
(NULL,2,'sy2.png','婴儿纯棉衣服',299,12,30,'包邮','婴儿纯棉衣服'),
(NULL,3,'sy3.png','邦尼兔 Jellycat 害羞浅棕色邦尼兔 大号38cm',259,0,496,'包邮','邦尼兔相伴守护童趣，绵柔般亲肤材质，陪伴宝宝的好伙伴，在温暖的午后拥抱着这只如云朵般柔软的小兔子，享受慵懒的下午茶时光，邦尼兔漂亮的长耳朵看上去就像两团甜甜的奶油，看上去美味又可爱！'),
(NULL,3,'sy4.jpg','咪露娃娃 Mellchan',188,6,50,'包邮','咪露娃娃 Mellchan'),
#分类商品数据
(NULL,1,'p_1.jpg','顺顺儿 soondoongi 绿色盖装湿巾 70片*4包',135,0,56,'包邮','顺顺儿 soondoongi 绿色盖装湿巾 70片*4包'),
(NULL,1,'p_2.jpg','花王 Merries',115,0,559,'包邮','温柔呵护宝宝娇嫩的肌肤，透气柔点网层，透气性更出色，小屁屁更干爽舒适。绵柔弹性环抱腰围，舒适服帖腹部，裆下柔韧设计，更服帖大腿根部，还有绵柔魔术重复贴等贴心设计。'),
(NULL,1,'p_3.jpg','雀氏 Chiaus 阳光动吸婴儿纸尿片L34*2包（9-13kg）',58,0,286,'包邮','干爽透气，里外双层微孔双效透气，随时赶走闷热湿气，像金色阳光一样温暖干爽。'),
(NULL,1,'p_4.jpg','花王 Merries 纸尿裤S82片*2包 （4-8kg）',198,0,286,'包邮','凹凸透气柔点网层 温柔呵护宝宝肌肤 柔软干爽 包裹 立体舒适 妈妈的口碑之选！'),
(NULL,1,'p_1.jpg','婴儿湿巾',619,0,45,'包邮','婴儿湿巾'),
(NULL,1,'p_5.jpg','婴儿纯棉湿巾',29,0,45,'包邮','全棉时代 PurCotton 婴儿纯棉湿巾20片/袋*8'),
(NULL,1,'p_5.jpg','婴儿纯棉湿巾',108,0,256,'包邮','全棉时代 PurCotton 婴儿纯棉湿巾80抽*3包'),
(NULL,1,'p_6.jpg','婴儿湿巾',19.9,0,345,'包邮','蜜拉贝儿 mirabelle 婴儿湿巾 手口洁肤柔湿巾80抽盖装*5包'),
(NULL,1,'p_7.jpg','欧洲进口纸尿裤',65,0,3546,'包邮','丽贝乐 Libero 欧洲进口纸尿裤2号NB36片 体重3-6kg'),
(NULL,1,'p_8.jpg','帮宝适 Pampers 拉拉裤',68,0,145,'包邮','XXL适合15KG以上宝宝，男女通用；它让宝宝自在探索，无拘无束，6个月M码开始，就可以选择拉拉裤，轻松穿脱，一拉就穿上，两边一撕即脱下 瞬吸干爽体验 瞬间吸收并排出尿湿，更有12小时干爽承诺。'),
(NULL,2,'y_1.jpg','贝贝怡 bornbay 新生儿连体衣天鹅绒婴儿哈衣宝宝多功能爬服',109,0,256,'包邮','娃娃领连体衣，花纱天鹅绒，绒毛细密丰盈，触感亲肤松柔，变换下摆扣合方式，爬服、睡袍两用，花边点缀，宝宝穿着萌萌可爱。'),
(NULL,2,'y_2.jpg','考拉蒂尔 Kordear 婴儿礼盒套装初生宝宝衣服春秋纯棉新生儿用品大全',158,0,289,'包邮','考拉蒂尔 Kordear 婴儿礼盒套装初生宝宝衣服春秋纯棉新生儿用品大全'),
(NULL,2,'y_3.jpg','​罗町 routy 秋冬婴儿服装宝宝可爱卫衣连体衣婴幼儿双层卫衣连帽哈衣
￥ 89.00 ',89,0,256,'包邮','秋冬婴儿服装宝宝可爱卫衣连体衣婴幼儿双层卫衣连帽哈衣卫衣抓绒+棉里布，双层加厚哈衣, 造型可爱！后面小天使翅膀增添童趣，英文字母印花我爱爸爸 我爱妈妈可以选择，非常时尚！值得推荐~'),
(NULL,2,'y_4.jpg','贝贝怡 bornbay 新生儿礼盒装宝宝内衣套装五件套纯棉多彩',99,0,256,'包邮','纯棉面料，适合婴儿肌肤，柔软亲肤！5件套，新生衣衣购齐全；礼盒包装，送礼自用两相宜！'),
(NULL,3,'t_1.jpg','​咪兔 Metoo 拍拍小夜灯',49,0,256,'包邮','卡通形象可爱，灯光柔和不刺眼，妈妈再也不怕宝宝喂完奶不睡觉了'),
(NULL,3,'t_2.jpg','Hape 新生儿小鸟悦动拨浪鼓',39,0,256,'包邮','小鸟悦动拨浪鼓，人造皮革，质地柔软，上色柔和，经过国际标准的分贝测试，更适合初生宝宝听力，更安全'),
(NULL,3,'t_3.jpg','进口原料：环保原生的PVC',178,0,45,'包邮','适合出生28天以上的婴幼儿，可爱小鱼型，拧开尾巴即可服用，成分含量放心！合理！优化的搭配！符合倡导用量，给宝宝提供值得信赖的鱼油鱼肝油。'),
(NULL,3,'t_4.jpg','邦尼兔 Jellycat 害羞浅棕色邦尼兔 大号38cm',25,0,496,'包邮','邦尼兔相伴守护童趣，绵柔般亲肤材质，陪伴宝宝的好伙伴，在温暖的午后拥抱着这只如云朵般柔软的小兔子，享受慵懒的下午茶时光，邦尼兔漂亮的长耳朵看上去就像两团甜甜的奶油，看上去美味又可爱！'),
(NULL,4,'ym_1.jpg','佳韵宝 Joyourbaby 产妇用品待产包夏季秋季入院全套母子精装28件套',268,0,569,'包邮','精装实用，入院待产，一包无忧，轻松生娃，不慌不忙。纯棉的贴心呵护，满足住院期间妈妈的需求。'),
(NULL,4,'ym_2.jpg','三洋 dacco 产妇卫生巾产后立体型LMS套装孕产妇产褥期排恶露月子卫生巾',135,0,589,'包邮','三洋 dacco 产妇卫生巾产后立体型LMS套装孕产妇产褥期排恶露月子卫生巾'),
(NULL,4,'ym_3.jpg','子初 Springbuds 产后专用竹浆月子纸 刀纸 640g*4提',99,0,156,'包邮','精选优质本色竹浆，天然无污染，纸质强韧，绵柔亲肤，无纸屑不掉渣，零添加不漂白，不添加荧光剂，无化学残留。'),
(NULL,4,'ym_4.jpg','保灵 pollenin草本修痔凝胶痔疮膏 产妇哺乳期外用膏3g/支*12支',158,0,98,'包邮','[始于1985] 保密发货 轻松祛痔 见效吸收好 修复快 安全解除难言之痛'),
/*一元秒杀*/
(NULL,1,'one1.jpg','尿不湿',1,0,10,'包邮','尿不湿'),
(NULL,1,'one2.png','红色小象 屁屁专用婴儿柔湿巾',1,0,9,'包邮','红色小象 屁屁专用婴儿柔湿巾80P*1包'),
(NULL,3,'one3.jpg','毛绒玩具',1,0,6,'包邮','毛绒玩具'),
(NULL,3,'one4.png','小小时代 GOGO世界旅行系列（随机发）',1,0,10,'包邮','小小时代 GOGO世界旅行系列全套17册'),

/*新品推荐*/
(NULL,4,'yunma.png','十月妈咪 octmami 孕妇银防辐射服银纤维上衣',549,0,1345,'包邮','十月妈咪 octmami 孕妇银防辐射服银纤维上衣'),
/*拼团*/
(NULL,2,'pt1.png','新生儿礼盒',199,0,198,'包邮','戴维贝拉 dave&bella 2017 春秋季新款婴儿礼盒八件套 新生儿礼盒DB4196'),
(NULL,3,'ye_2.jpg','澳贝乖乖小鸭',79,0,198,'包邮','澳贝auby 乖乖小鸭 宝宝益智学爬 会下蛋 鸭子婴儿学爬行玩具');
/*育儿常识信息表*/
CREATE TABLE mmg_msg(
   mid INT PRIMARY KEY AUTO_INCREMENT, #信息编号
   pic1 VARCHAR(246),                   #信息图片
   pic2 VARCHAR(246),                   #信息图片
   pic3 VARCHAR(246),                   #信息图片
   title VARCHAR(123),                 #信息标题
   content VARCHAR(20000),            #信息内容
   comment INT                        #评论数量
);
/*育儿常识信息表插入数据*/
INSERT INTO  mmg_msg VALUES
#首页信息
(NULL,'ye_1.png','ye_2.jpg','ye_2.png','0到1岁的娃最爱玩什么玩具？',' 0到1岁是宝宝智力发育非常重要的阶段，玩具则是开启娃智慧的金钥匙。但许多老妈子不是买了以后娃毫无兴趣，就是面对某宝众多商品无从下手。干脆列个清单老妈子们自己看，都是糕妈挑了好久的精品，喜欢就抱走吧～',0),
(NULL,'ye_3.png','ye_3.png','ye_2.png','宝宝辅食菜单和喂养要点',' 添加辅食的最重要原则1、满6个月添加；2、不能喧宾夺主，1岁以下要保证600-800ml奶量；3、关注过敏；4、尽可能丰富；5、无盐，少糖，少油。辅食添加顺序 加拿大儿科协会、美国儿科学会、澳大利亚国家健康与医疗研究委员会都已明确：6个月开始加辅食，就要开始加肉、菜、谷物、水果（种类顺序不分先后），推迟添加某些食物不会降低过敏风险。所以，其实没有所谓的顺序啦。很多保守的妈妈出于“安全第一”的考虑，不愿意接受这个“不管顺序”的新观点，糕妈也是很理解的。可以按照你觉得安全的顺序来，毕竟妈妈的感受和安心也是很重要的。只要保证孩子最初的食物里包含了丰富的铁，就可以。年糕的第一口辅食，是从米粉开始，这也是国内几个育儿大V比较推崇的。那么不爱吃米粉的孩子，十倍粥行不行呢，也可以，但必须同时辅以高铁的肉类、肝脏、深色蔬菜等，还要尽量丰富食物的种类，否则光吃粥不能满足孩子对各类营养素的需求。辅食喂养心得 1、米粉的量：7-12月宝宝推荐量是14-20g干粉/顿，我从两勺（30ml的奶粉勺，约6g）开始，根据宝宝的进食情况逐渐增加，目前8个月的年糕每顿是6勺（约16-18g）。2、最好选原味的米粉，水果味的米粉口味太好，容易造成宝宝挑食。3、一般来说一段是大米米粉（4m+），二段是燕麦米粉（6m+），三段是混合谷物（9m+），无论什么时候加，都从一段开始。只要不过敏，米粉是可以混吃的，比如满6月的娃，可以一段、二段混吃，满9月的娃，可以通通混吃。4、只要宝宝肠胃适应，用水、母乳、奶粉冲米粉都可以，看宝宝喜欢。5、刚添加辅食的时候，宝宝饿极了根本没心情一口一口慢慢吃辅食了，选在小睡醒来这种身心愉悦的时候比较合适。等娃已经习惯了吃固体食物，再按照崔神说的“辅食+奶，一次吃饱”的规则来实行。6、把菜泥、肉泥混在米粉里吃，让宝宝刚接触各类食物的时候，味道尽量清淡，一方面是易于接受新食物，另一方面减少因为食物本身的味道而偏食挑食的可能。7、稠粥和米糊一样，都可以作为基础主食，配上菜泥鱼泥肉泥吃。小月龄宝宝还是以市售米粉为主，营养成分更全面，随着月龄增大，食物种类逐渐丰富，可以加些稀饭、面条等主食。8、米汤中的砷含量很高，5岁以下孩子不能喝（关注年糕妈妈，回复“米汤”查看详情）。9、水果生吃熟吃都行，容易拉肚子的就蒸熟吃。10、娃刚吃香蕉泥、苹果泥的时候会有点干呕，是他还不会很好的吞咽，不用紧张，也不必因此停止喂，过几天就好了。 11、Finger food（用手指抓的食物）是添加辅食过程中很重要的部分，是激发宝宝自身进食意愿、锻炼手眼协调能力、练习自主进食的重要措施。没有出牙（4-13个月出牙都正常哦）不影响宝宝吃手指食物，也不代表宝宝没有咀嚼能力。12、添加辅食后大便变稠或排便间隔拉长是正常现象，家长们不要太焦虑，可以在饮食中增加高纤维食物，如西梅等。13、出现疑似过敏现象不要着急，停食可疑食物三个月，待症状完全消失后，可以继续添加新食物。14、控制好宝宝每天的食物总量（供应足够热量和营养）和一周的食物种类（食材足够丰富多样）就可以，具体什么时间、方式吃的没那么要紧，食物和食物之间的相互作用都可以忽略不计。辅食制作心得 1、冲米粉用多少水？尽量稠。2、辅食机使用时间不长，也比较占地儿，其实买个搅拌棒就可以做泥了。3、做混合泥是懒妈妈必备技能，所有食材切小块蒸熟，一起打泥。多做的辅食趁热装到开水烫过的保鲜盒，冷却后放冰箱，几天内吃的放冷藏，时间长的放冷冻（营养损失很少，纠结的妈妈可以现做）。4、冷冻后辅食的加热，一般用蒸的比较好，放普通不锈钢碗里隔水蒸就可以。5、十倍粥就是1杯米+10杯水煮粥，用的小白熊BB煲，容量小，适合做宝宝一个人的粥；提前一天晚上泡好米，慢炖2~3小时，口感非常软糯。6、含水量比较低的食物（比如土豆），打泥时加入少量的水，成品会更细腻，也更易于吞咽。7、猪肝的味道有点奇怪，跟西红柿汁一起煮可以去腥（猪肝不宜多吃，但补血效果确实杠杠的）。8、牛油果是很好的辅食，单吃味道比较奇怪，跟香蕉、苹果混在一起味道却很棒。9、猪肉选择猪大腿中间的肉或者猪里脊；鸡肉首选鸡腿肉，其次是鸡胸肉；牛肉要选瘦的部分，比如后腿肚内芯或里脊。10、做手指食物时，比如红薯条，可以先蒸熟，再烤箱烤一下（我是用空气炸锅），这样外皮比较硬，不容易捏断，更适合宝宝抓握。年糕6月龄、7月龄辅食安排 糕妈的这一份食谱仅供大家参考，更多的是提供一些辅食安排的思路，给迷茫的新手妈妈一点启发。添加辅食不是科学实验，不用那么严谨较真，做到尽量丰富就可以了。辅食添加进度除了看宝宝的接受程度，其实还会受到异常健康状况、现有食材、大人社会活动的制约。无论是添加速度还是辅食的量，都不用跟别家孩子比，孩子的食量真的是有差异的。年糕6~7个月吃过的食物主食类：嘉宝大米米粉、地球最好大米米粉（不耐受）、十倍粥、禧贝大米米粉（不耐受）、嘉宝燕麦米粉 蔬菜：菠菜（不耐受）、土豆、胡萝卜、南瓜、红薯、莲藕、山药、紫薯 水果：苹果、香蕉、梨、橙子、牛油果、红枣 荤菜：猪肉、蛋黄、牛肉、猪肝、鸡肉 ',0),
(NULL,'ye_5.png','ye_4.jpg','ye_2.png','8种小动物的折纸方法',' 幼儿园开学了，妈妈们是不是又要为孩子的手工课烦恼了呢，糕妈从网上整理了8种小动物的折纸方法，妈妈们可以和宝宝一起学习。拿走，不谢！',0),
(NULL,'ye_6.png','ye_6.png','ye_2.png','超简单！一个鸡蛋8种辅食做法','鸡蛋的营养价值很高，又是常见的食材，很适合给宝宝做辅食。除了水蒸蛋和白煮蛋，还有啥做法是辅食阶段的孩子吃的捏？今天给大家搜罗了一些鸡蛋的做法，把步骤和图片都列出来了，大家回家就可以依样画葫芦咯。',0),
#精选信息
#1孕期话题
(NULL,'jx_ht1.png','jx_ht1.png','jx_ht1.png','快到预产期了,婆婆每天给我念叨要顺产','凡事讲究“一回生二回熟”，孕育宝宝也是如此~二胎妈妈经历过怀大宝的“曲折”，到第二胎时好像轻松了许多，摇身一变成为“佛系妈妈”,淡定又从容。这是因为在经历过孕育大宝的“实战”后，妈妈们Get了好些孕期道理~一起来看看吧！<享受品质生活>遥想当年怀大宝时，准妈妈的注意力全被肚中宝宝吸引，面对大大小小的孕期用品，准妈妈买买买心态直逼“佛系”：好用就可以！二胎妈妈却不再那样“随意”，不但关注孕期用品的好用程度，还要在使用中享受孕期品质生活~ü生活更有仪式感二胎妈妈善于把精力合理分配，关心宝宝和享受生活两不误。早饭后约好家人朋友外出散步，午饭后听一段音乐舒缓身心，晚上与准爸爸一起看看电影、喜剧片，让孕期每一天都充满仪式感。ü 有比“好用”更高的追求。二胎妈妈在选择孕期用品上更加“挑剔”，不但关注是否好用，更会注重这款产品在妈妈圈的口碑怎么样？品质是不是高端？对自己孕期身材和健康有什么帮助？孕妈的更高追求，TA都可以满足你~<身材营养兼得>只吃不动，运动极限是散步 → 开练瑜伽&游泳，升级“孕”动达人第一次怀孕的妈妈心思都在吃营养上，身材管理不太费心，出门散散步便是运动。当怀到二宝时，妈妈实现了新的“小目标”：注重身材管理，掌握瑜伽游泳运动技能，健康美丽轻松get！ü  “孕”动达人动出健康。游泳可以帮助妈妈改善呼吸、缓解情绪，而瑜伽猫伸展式、桥式、跪坐调息等姿势可以让妈妈保持良好体力顺利分娩，练习中给予宝宝的刺激与按摩，能提高宝宝对外界的反应度。要注意的是，做运动之前咨询医生具体注意事项，避免运动过量哦。ü  低脂营养吃出好身材。一份有三文鱼、紫菜、西红柿、菠菜等的沙拉营养均衡热量低，也很容易让人吃饱。蔬菜中含有的膳食纤维可以改善妈妈肠道，有助于消化，保持好身材。<智补关键营养>食补营养全靠多吃 → 把握关键时期，补充关键营养还记得怀大宝时，补充营养是一件妈妈很“紧张”的事，总想多吃一点、再多吃一点，输送更多的营养给宝宝。二胎妈妈“经验丰富”，深知大补一通已过时，抓住关键时期补充关键营养，才是孕期的正确打开方式！ü 关键时期牢牢把握。肚中宝宝每时每刻都在成长，尤其是在孕八周，神经元开始形成，并在孕中晚期开始连接，延续到宝宝三岁前建立神经元网络化，需要有关键营养的支持！智慧补充关键营养。神经元网络化关乎宝宝视觉、听觉、语言发育以及高度认知（抽象思维）的发展，如此重要的神经元在悄悄生长，妈妈可要及时补充关键营养哦',0),
(NULL,'jx_ht2.png','jx_ht2.png','jx_ht2.png','怀到第二个娃才悟出的道理，现在看还来得及！','凡事讲究“一回生二回熟”，孕育宝宝也是如此~二胎妈妈经历过怀大宝的“曲折”，到第二胎时好像轻松了许多，摇身一变成为“佛系妈妈”，淡定又从容。这是因为在经历过孕育大宝的“实战”后，妈妈们Get了好些孕期道理~一起来看看吧！<享受品质生活>遥想当年怀大宝时，准妈妈的注意力全被肚中宝宝吸引，面对大大小小的孕期用品，准妈妈买买买心态直逼“佛系”：好用就可以！二胎妈妈却不再那样“随意”，不但关注孕期用品的好用程度，还要在使用中享受孕期品质生活~ü  生活更有仪式感。二胎妈妈善于把精力合理分配，关心宝宝和享受生活两不误。早饭后约好家人朋友外出散步，午饭后听一段音乐舒缓身心，晚上与准爸爸一起看看电影、喜剧片，让孕期每一天都充满仪式感。ü  有比“好用”更高的追求。二胎妈妈在选择孕期用品上更加“挑剔”，不但关注是否好用，更会注重这款产品在妈妈圈的口碑怎么样？品质是不是高端？对自己孕期身材和健康有什么帮助？孕妈的更高追求，TA都可以满足你~<身材营养兼得>只吃不动，运动极限是散步 → 开练瑜伽&游泳，升级“孕”动达人第一次怀孕的妈妈心思都在吃营养上，身材管理不太费心，出门散散步便是运动。当怀到二宝时，妈妈实现了新的“小目标”：注重身材管理，掌握瑜伽游泳运动技能，健康美丽轻松get！ü  “孕”动达人动出健康。游泳可以帮助妈妈改善呼吸、缓解情绪，而瑜伽猫伸展式、桥式、跪坐调息等姿势可以让妈妈保持良好体力顺利分娩，练习中给予宝宝的刺激与按摩，能提高宝宝对外界的反应度。要注意的是，做运动之前咨询医生具体注意事项，避免运动过量哦。ü  低脂营养吃出好身材。一份有三文鱼、紫菜、西红柿、菠菜等的沙拉营养均衡热量低，也很容易让人吃饱。蔬菜中含有的膳食纤维可以改善妈妈肠道，有助于消化，保持好身材。<智补关键营养>食补营养全靠多吃 → 把握关键时期，补充关键营养还记得怀大宝时，补充营养是一件妈妈很“紧张”的事，总想多吃一点、再多吃一点，输送更多的营养给宝宝。二胎妈妈“经验丰富”，深知大补一通已过时，抓住关键时期补充关键营养，才是孕期的正确打开方式！ü  关键时期牢牢把握。肚中宝宝每时每刻都在成长，尤其是在孕八周，神经元开始形成，并在孕中晚期开始连接，延续到宝宝三岁前建立神经元网络化，需要有关键营养的支持！ü  智慧补充关键营养。神经元网络化关乎宝宝视觉、听觉、语言发育以及高度认知（抽象思维）的发展，如此重要的神经元在悄悄生长，妈妈可要及时补充关键营养哦！补充关键营养有奥秘，就让TA来告诉你！惠氏妈妈®PROMAMA®奶粉含神经鞘磷脂、DHA、胆碱等孕期关键营养元素，有助于神经元网络化低脂配方，减少蔗糖，口味更清淡，帮助妈妈合理控制体重添加膳食纤维，有助肠道健康100%源自新西兰，品质保障给孕哺期妈妈补充关键营养，就从这一罐开始！',0),
(NULL,'jx_ht3.png','jx_ht3.png','jx_ht3.png','宝宝不爱吃辅食 没做好这3点','凡事讲究“一回生二回熟”，孕育宝宝也是如此~二胎妈妈经历过怀大宝的“曲折”，到第二胎时好像轻松了许多，摇身一变成为“佛系妈妈”，淡定又从容。这是因为在经历过孕育大宝的“实战”后，妈妈们Get了好些孕期道理~一起来看看吧！
<享受品质生活>
遥想当年怀大宝时，准妈妈的注意力全被肚中宝宝吸引，面对大大小小的孕期用品，准妈妈买买买心态直逼“佛系”：好用就可以！二胎妈妈却不再那样“随意”，不但关注孕期用品的好用程度，还要在使用中享受孕期品质生活~
ü  生活更有仪式感。二胎妈妈善于把精力合理分配，关心宝宝和享受生活两不误。早饭后约好家人朋友外出散步，午饭后听一段音乐舒缓身心，晚上与准爸爸一起看看电影、喜剧片，让孕期每一天都充满仪式感。
ü  有比“好用”更高的追求。二胎妈妈在选择孕期用品上更加“挑剔”，不但关注是否好用，更会注重这款产品在妈妈圈的口碑怎么样？品质是不是高端？对自己孕期身材和健康有什么帮助？孕妈的更高追求，TA都可以满足你~<身材营养兼得>只吃不动，运动极限是散步 → 开练瑜伽&游泳，升级“孕”动达人
第一次怀孕的妈妈心思都在吃营养上，身材管理不太费心，出门散散步便是运动。当怀到二宝时，妈妈实现了新的“小目标”：注重身材管理，掌握瑜伽游泳运动技能，健康美丽轻松get！
ü  “孕”动达人动出健康。游泳可以帮助妈妈改善呼吸、缓解情绪，而瑜伽猫伸展式、桥式、跪坐调息等姿势可以让妈妈保持良好体力顺利分娩，练习中给予宝宝的刺激与按摩，能提高宝宝对外界的反应度。要注意的是，做运动之前咨询医生具体注意事项，避免运动过量哦。
ü  低脂营养吃出好身材。一份有三文鱼、紫菜、西红柿、菠菜等的沙拉营养均衡热量低，也很容易让人吃饱。蔬菜中含有的膳食纤维可以改善妈妈肠道，有助于消化，保持好身材。
 
<智补关键营养>
食补营养全靠多吃 → 把握关键时期，补充关键营养
还记得怀大宝时，补充营养是一件妈妈很“紧张”的事，总想多吃一点、再多吃一点，输送更多的营养给宝宝。二胎妈妈“经验丰富”，深知大补一通已过时，抓住关键时期补充关键营养，才是孕期的正确打开方式！
ü  关键时期牢牢把握。肚中宝宝每时每刻都在成长，尤其是在孕八周，神经元开始形成，并在孕中晚期开始连接，延续到宝宝三岁前建立神经元网络化，需要有关键营养的支持！
ü  智慧补充关键营养。神经元网络化关乎宝宝视觉、听觉、语言发育以及高度认知（抽象思维）的发展，如此重要的神经元在悄悄生长，妈妈可要及时补充关键营养哦！
补充关键营养有奥秘，就让TA来告诉你！
惠氏妈妈®PROMAMA®奶粉
含神经鞘磷脂、DHA、胆碱等孕期关键营养元素，有助于神经元网络化
低脂配方，减少蔗糖，口味更清淡，帮助妈妈合理控制体重
添加膳食纤维，有助肠道健康
100%源自新西兰，品质保障
给孕哺期妈妈补充关键营养，
就从这一罐开始！',0),
(NULL,'jx_ht4.png','jx_ht4.png','jx_ht4.png','妈妈发火了，该怎么呢？','凡事讲究“一回生二回熟”，孕育宝宝也是如此~二胎妈妈经历过怀大宝的“曲折”，到第二胎时好像轻松了许多，摇身一变成为“佛系妈妈”，淡定又从容。这是因为在经历过孕育大宝的“实战”后，妈妈们Get了好些孕期道理~一起来看看吧！
<享受品质生活>
遥想当年怀大宝时，准妈妈的注意力全被肚中宝宝吸引，面对大大小小的孕期用品，准妈妈买买买心态直逼“佛系”：好用就可以！二胎妈妈却不再那样“随意”，不但关注孕期用品的好用程度，还要在使用中享受孕期品质生活~
ü  生活更有仪式感。二胎妈妈善于把精力合理分配，关心宝宝和享受生活两不误。早饭后约好家人朋友外出散步，午饭后听一段音乐舒缓身心，晚上与准爸爸一起看看电影、喜剧片，让孕期每一天都充满仪式感。
ü  有比“好用”更高的追求。二胎妈妈在选择孕期用品上更加“挑剔”，不但关注是否好用，更会注重这款产品在妈妈圈的口碑怎么样？品质是不是高端？对自己孕期身材和健康有什么帮助？孕妈的更高追求，TA都可以满足你~
 
<身材营养兼得>
只吃不动，运动极限是散步 → 开练瑜伽&游泳，升级“孕”动达人
第一次怀孕的妈妈心思都在吃营养上，身材管理不太费心，出门散散步便是运动。当怀到二宝时，妈妈实现了新的“小目标”：注重身材管理，掌握瑜伽游泳运动技能，健康美丽轻松get！
ü  “孕”动达人动出健康。游泳可以帮助妈妈改善呼吸、缓解情绪，而瑜伽猫伸展式、桥式、跪坐调息等姿势可以让妈妈保持良好体力顺利分娩，练习中给予宝宝的刺激与按摩，能提高宝宝对外界的反应度。要注意的是，做运动之前咨询医生具体注意事项，避免运动过量哦。
ü  低脂营养吃出好身材。一份有三文鱼、紫菜、西红柿、菠菜等的沙拉营养均衡热量低，也很容易让人吃饱。蔬菜中含有的膳食纤维可以改善妈妈肠道，有助于消化，保持好身材。
 
<智补关键营养>
食补营养全靠多吃 → 把握关键时期，补充关键营养
还记得怀大宝时，补充营养是一件妈妈很“紧张”的事，总想多吃一点、再多吃一点，输送更多的营养给宝宝。二胎妈妈“经验丰富”，深知大补一通已过时，抓住关键时期补充关键营养，才是孕期的正确打开方式！
ü  关键时期牢牢把握。肚中宝宝每时每刻都在成长，尤其是在孕八周，神经元开始形成，并在孕中晚期开始连接，延续到宝宝三岁前建立神经元网络化，需要有关键营养的支持！
ü  智慧补充关键营养。神经元网络化关乎宝宝视觉、听觉、语言发育以及高度认知（抽象思维）的发展，如此重要的神经元在悄悄生长，妈妈可要及时补充关键营养哦！
补充关键营养有奥秘，就让TA来告诉你！
惠氏妈妈®PROMAMA®奶粉
含神经鞘磷脂、DHA、胆碱等孕期关键营养元素，有助于神经元网络化
低脂配方，减少蔗糖，口味更清淡，帮助妈妈合理控制体重
添加膳食纤维，有助肠道健康
100%源自新西兰，品质保障
给孕哺期妈妈补充关键营养，
就从这一罐开始！',0),
#幼儿护理
(NULL,'jx_hl1.jpg','jx_hl1.jpg','jx_hl1.jpg','母乳宝宝总吃不饱 或是猛长期','随着宝宝慢慢长大，他会进入一个叫“猛长期”的阶段。这一时期，宝宝摄入的奶量会突然增加，会更频繁的想要吮吸妈妈的乳汁，好像总是吃不饱一样，而且宝宝也会比以往更烦躁些。这到底是怎么回事呢?一般来说，宝宝的首次猛长期大约是在出院后的几天内。通常会以阶段性地出现，如7~10天、4~6周、6个月等，当然每个宝宝的具体情况不相同，时间段前后会稍有区别',0),
(NULL,'jx_hl2.png','jx_hl2.png','jx_hl2.png','清洗奶瓶小细节 你可能不知道','爸爸妈妈们，清洗宝宝奶瓶，你们是怎么做的?用清水冲干净，然后直接把奶瓶放置在一旁，等待下次使用?真的清洗干净瓶壁了吗?清洗完以后，有没有注意倒置，控干奶瓶里面的水，保持奶瓶干燥?',0),
(NULL,'jx_hl3.jpg','jx_hl3.jpg','jx_hl3.jpg','家有新生BB 你需要知道这些','爸爸妈妈们，清洗宝宝奶瓶，你们是怎么做的?用清水冲干净，然后直接把奶瓶放置在一旁，等待下次使用?真的清洗干净瓶壁了吗?清洗完以后，有没有注意倒置，控干奶瓶里面的水，保持奶瓶干燥?',0),
(NULL,'jx_hl4.jpg','jx_hl4.jpg','jx_hl4.jpg','敲黑板！帮宝宝退热切勿犯这些错','爸爸妈妈们，清洗宝宝奶瓶，你们是怎么做的?用清水冲干净，然后直接把奶瓶放置在一旁，等待下次使用?真的清洗干净瓶壁了吗?清洗完以后，有没有注意倒置，控干奶瓶里面的水，保持奶瓶干燥?',0),
(NULL,'jx_hl5.jpg','jx_hl6.jpg','jx_hl7.jpg','教宝宝玩玩具 正确姿势再这里','爸爸妈妈们，清洗宝宝奶瓶，你们是怎么做的?用清水冲干净，然后直接把奶瓶放置在一旁，等待下次使用?真的清洗干净瓶壁了吗?清洗完以后，有没有注意倒置，控干奶瓶里面的水，保持奶瓶干燥?',0),
#准备怀孕
(NULL,'jx_hy1.png','jx_hy1.png','jx_hy1.png','备孕怎么补？微量元素很重要！','对于备孕的女性来说，饮食营养十分重要。很多女性只知道备孕时需要补充叶酸，而忽略了微量元素的补充。殊不知，微量元素对维系生命有着重要作用。如果备孕时女性不注重补充微量元素，怀孕后或造成胎儿缺陷。今天小编就盘点下备孕期间需要补充的微量元素。
  1.碘
  碘是人体内重要的微量元素，孕妈妈缺碘会影响胎宝宝的语言、听力以及智力的发育，从而就会增加患呆小症的风险。
  2.锌
  人体核酸和蛋白质的代谢离不开锌元素，所以缺锌会阻碍胚胎的发育成熟，导致各种畸形。
  3.锰
  体内缺乏锰元素的孕妈妈生出的宝宝，在骨骼发育方面会出现很严重的问题，甚至会导致死亡。另外，缺锰还会影响胎儿智力的发展。
  4.铁
  人体缺铁最直接的就是导致缺铁性贫血，这会影响宝宝红细胞的生长发育。
  备孕期间，不仅未准妈妈要注意补充微量元素，未准爸爸也需要补充各种微量元素。
  备孕期间男性需要补充的微量元素
  1.铜
  男性体内缺乏铜元素，不仅会使得精子穿透宫颈的能力降低，还会降低精子浓度，严重的可能会导致不育。
  2.锌
  锌是维持精子代谢功能和稳定性的重要元素，所以如果男性体内缺乏锌元素其生殖功能就会受到影响。
  3.锰
  体内锰元素不足可能会导致男性睾丸在组织结构上的变化，进而导致精子细胞发生异常，影响生育功能。
  4.硒
  硒元素对男性睾丸的发育起着很大的作用，男性缺乏硒元素，那么性欲就会减退，同时还会影响精液质量。
  由此看来，微量元素对人体的重要性真是不言而喻，那么可以通过哪些方法来补充各类微量元素呢？
  备孕期间补充微量元素的方法
  1.锌
  多吃牡蛎、蟹肉、动物肝、瘦肉、鱼肉等肉类食物可以补充体内的锌元素，同时要多吃蔬菜、水果促进锌的吸收。
  2.铁
  铁元素是重要的造血原料，备孕期间可以通过吃红肉、动物肝、动物血、禽肉、鱼肉等食物来补铁。另外，维生素C可以促进铁的吸收，所以多吃蔬菜水果也可以促进铁的吸收。
  3.硒
  据了解，硒元素有抗癌防癌的功效，在蛋类、瘦肉、海产品、大蒜、蘑菇、芝麻、芦笋等食物中都有较高的硒元素。
  4.钙
  补钙的常见食物有：牛奶、豆制品、鱼、虾皮等等，另外还要补充维生素D以促进钙的吸收，平时多晒晒太阳就可以促进维生素D的合成进而促进钙的吸收。
  想要生出健康的宝宝，未准爸爸妈妈在备孕期间千万不要忽略微量元素的大作用哦。',0),
(NULL,'jx_hy2.jpg','jx_hy2.jpg','jx_hy2.jpg','高龄女性怎样备孕？营养搭配要合理','女性年纪一大，怀孕的几率会变小，但这不表示没法怀孕，事实上只要做好准备，依然能有好孕。而在各类准备中，如何饮食是女性必须要关注的事情，那么高龄女性要想成功备孕，该怎样搭配饮食呢？
  一、高龄女性怎样备孕
  相比适龄女性，高龄女性备孕要注意更多。下面让我们一起具体看看。
  1.怀孕前做健康检查
  高龄孕妇会比年轻孕妇更容易出现身体异常，所以高龄女性和丈夫都必须做全面的健康检查，把身体存在的疾病彻底治好并使身体到达最佳状态后才可以受孕。
  2.保持充足的睡眠
  良好的睡眠不但能使免疫力获得提升，还能使组织器官的功能增强，这样生殖系统就能形成优质的受精卵了。
  3.保证营养充足
  优质且充足的营养能提高卵子质量升，因此高龄女性要做好营养储备工作。每天高龄女性应适当多吃牛奶、鸡蛋、瘦肉等蛋白质含量高的食物，还有新鲜的蔬菜和水果。
  二、高龄女性备孕营养搭配
  备孕期间，高龄女性如何摄入营养十分重要，合理的营养搭配才能为宝宝的发育提供足够的支持。接下来让我们一起来看看高龄女性该吃些什么吧。
  1.适当摄入高营养食物
  备孕时，高龄女性应吃一些高蛋白和低脂肪的高营养食物来增强体质。改善女性气色最有效的办法就是良好的饮食了。
  2.调节饮食结构
  每个人都有自己的口味，高龄女性也不例外。但是，为了成功受孕，高龄女性还是要调整一下饮食结构，荤素搭配要更加合理一些。
  备孕时，高龄女性要多吃粗粮类和绿色食物，不要吃生冷食物，这样对提高备孕成功率会有所帮助。
  3.饮食暖宫调理
  严重的宫寒不利于怀孕，因为子宫寒冷不利于胎儿居住，易引起流产。如果高龄女性有宫寒的问题，要注意饮食，多吃坚果类食物和羊肉等温补食物，这样能起到暖宫的效果。
  三、高龄女性备孕注意事项
  这里小编整理了两个备孕食谱，供高龄女性参考。
  1.温补鹌鹑汤
  材料：2只鹌鹑，10克川芎，15克菟丝子，30克艾叶。
  做法：
  a.把2只鹌鹑宰杀，去毛、内脏，备用。
  b.把菟丝子、艾叶、川芎放入清水中，3碗煎成1碗，并用纱布把药渣过滤掉保留汁水。
  c.把鹌鹑和药汁放入碗中，隔水煮熟即可。
  吃法：和饭一起吃，吃肉喝汤。
  功效：对不孕者能起到温肾固脉的作用，还能治疗宫寒体虚。
  2.阿胶红枣
  材料：1盒阿胶，500克红枣，蜂蜜。
  做法：
  a.处理阿胶，可以用碎药机把其打碎。
  b.取一个大碗，放入阿胶、枣和蜂蜜，倒入适量清水没过红枣。
  c.将大碗放入蒸锅也，用大火蒸煮2个小时，放凉放入冰箱保存。
  吃法：每日取一勺，用热水冲服。
  功效：适合气血亏虚的女性，能改善月经颜色不正、量少，手脚冰冷、头晕等症状。
  高龄备孕时，大家可以从饮食入手，注重合理的饮食搭配，慢慢改善自身体质，以便尽快成功受孕，完成当妈的梦想。
',0),
(NULL,'jx_hy3.jpg','jx_hy3.jpg','jx_hy3.jpg','想要孕育健康BB 请远离危险职业','很多人懵懂无知，不知道自己从事的职业对造人有很大影响。如果准父母从事的职业对精子或卵子的质量有害，这就不能孕育出一个健康的宝宝，父母一定要注意。究竟有哪些职业是造人的危险职业呢？我们一起来看看吧。
  1.接触放射线的职业
  放射在生活中无处不在，虽然很多电器的放射线很少，但积少成多就会对人体产生很大的危害。科学研究表明长期接触荧光屏会大大增加孕妈妈发生流产的风险。从事放射科、电器制造、程序操作等职业的孕妈妈可要小心。
  2.接触重金属的职业
  重金属和人体内蛋白质结合会使其失活，从而影响人体的新城代谢，严重的会致癌、致畸。在女性常用的各类化妆品中含有铅、镍、汞等重金属元素，所以孕妈妈最好不要化妆。在化妆品研究、生产照明灯等领域工作难免会接触到这类危险物质。
  3.有化工污染的职业
  如果孕妈妈吸入二硫化碳、苯、汽油等化学物质，中枢功能就会受到影响，造血功能受阻，很可能会导致胎儿贫血或有造血功能障碍，甚至致畸、引发流产。在化工基地、加油站、造纸厂等地方工作的职员都会有这种风险。
  4.有物理污染的职业
  从事该方面相关职业的孕妈妈可能会受到噪音等物理因素的影响，进而导致垂体—卵巢轴功能减退，如此便会影响宝宝神经系统的发育。
  5.接触宠物的职业
  从事园艺、养殖等工作的人员常常会和动植物打交道，这样就大大增加了感染弓形体病毒的风险。所以孕妈妈最好远离动植物，为了宝宝的健康安全，暂时放下自己的工作或宠物。
  除了孕妈妈的危险职业会影响胎宝宝的健康，从事以下三种职业的未准爸爸可能也会由于“职业问题”导致自己的生育能力下降。
  这3类未准爸爸不易生育
  1.驾驶员
  驾驶员由于长期坐在驾驶座开车，就会使得男性睾丸处于闷热的环境中，从而精子的活力就会被抑制。
  2.程序员
  程序员不仅每天需要面对电脑，还要费心尽力地写程序，在辐射和压力的双重压力下，他们比普通人受孕的几率就会降低。
  3.业务员
  跑业务的男性朋友常常都离不开烟酒，而且作息时间很不规律，这样自己身体健康就会受到影响，生育能力也会有所下降。
  不管是在备孕期还是怀孕期，夫妻双方都要把孩子放在第一位，想要生出健康的宝宝，最好暂时先放下自己的“危险”工作。',0),
(NULL,'jx_hy4.jpg','jx_hy4.jpg','jx_hy4.jpg','二胎生男娃的秘诀在这里！','现在国家允许生二胎了，不少妈妈有了再生一个孩子的想法。第一胎是女儿，如果二胎能生一个儿子，凑成一个“好”字，那该是多么幸福啊！那么想生男孩，妈妈们在日常生活中该怎么做呢？一起来了解一下吧。
  1.要学会饮食控制
  妈妈二胎想要男孩，那么在日常生活中要学会饮食控制，多吃碱性食物。Y精子适合生存的体液环境应偏碱性，多吃碱性食物能让子宫内环境发生改变，有利于Y精子的存活，增加怀男孩的几率。
  碱性食物有很多种，可以分为水果、蔬菜、面粉制品等几大类，下面就分别给大家介绍一下：
  水果：香蕉、枇杷、西瓜等等；
  蔬菜：莴笋、马铃薯、洋葱、竹笋、花菜、海带等等；
  豆类：豆腐、红豆、大豆、青豆等等；
  坚果：栗子、椰子、杏仁等等；
  面粉制品：苏打饼干、不含奶油的点心等等。
  2.算好排卵期
  如果想生男孩，最好在女性排卵日当天或第二天过性生活；如果想生女孩，在女性排卵日前两三天过性生活。
  计算排卵日的方法很简单，假如女性月经周期很规律，下次月经前的14天就是排卵日。假如月经不规律，可以通过测量的方法计算排卵日。每天都测量基础体温，如果有一天体温突然下降了，说明这天就是排卵日。
  3.阴道酸碱度的影响
  想生男孩，女性可以在同房前用苏打水清洗阴道5分钟，这样怀男孩的几率会变大。
  4.同房次数与同房时间
  妈妈想要怀男孩，一定要让老公禁欲。在排卵日前的5天不要过性生活，在排卵日当天同房，这样精液浓度高，易于怀男孩。
  5.女性高潮的影响
  通常情况下，女性阴道的PH值会小于7，是强酸性的。同房后的第一次高潮时，阴道会变成酸性的，在第二次高潮时，阴道会变成弱碱性的。
  精液是碱性的，如果想生男孩就要想办法让女性的阴道变成碱性的，这样有利于带有Y染色体的精子存活。所以，想生男孩，夫妻俩在行房时应尽兴，多多享受性高潮。
  以上就是小编总结出来的怀男孩的秘诀，想生男孩的慢慢可以试一试。民间的一些偏方是不靠谱的，如果乱用会影响身体健康哦。',0),
(NULL,'jx_hy5.jpg','jx_hy5.jpg','jx_hy5.jpg','当心！压力过大可致造人失败','感冒，腹泻，记忆力下降，皮肤问题……事实证明，太多的压力确实会对你的身体和精神造成巨大的破坏。
  1.头痛
  当你感到紧张时，荷尔蒙会引发大脑中一连串的神经化学活动，刺激你的神经并使血管膨胀，导致紧张性头痛和偏头痛。
  有办法缓解哦~研究表明，经常练习放松和学习压力管理技巧的人们头痛次数减少了35到50%。
  2.胃部剧烈燃烧
  日常琐事会扰乱肠道功能，引起消化问题，这能带来非常大的痛苦。焦虑和压力会导致身体产生更多的消化酸，从而导致胃灼热，而且它们还会延缓胃排空，造成胀气，甚至可能会增加结肠紧缩的次数，导致痉挛和腹泻。
  3.容易生病
  压力会抑制免疫系统，使你更容易生病。在婚姻危机、失业的压力下，人们患病的几率是普通人的两倍。4.整晚失眠一天结束了，但你的心和大脑还在嗡嗡作响，在床上辗转反侧。压力是失眠的首要原因。缺乏睡眠使你易怒和焦虑，降低身体的免疫力，并使你无法集中注意力。睡眠问题也造成了一种恶性循环，一旦你没有充足的睡眠，处理日常问题会更让你紧张，而接下来的夜晚更难度过。
  5.体重增加
  当你的身体感觉到压力，身体会自动释放肾上腺素和皮质醇。这些荷尔蒙会引发饥饿感，尤其是女性会通过吃脂肪和碳水化合物来应对饥饿感。
  6.背部疼痛
  研究表明，大多数慢性背部疼痛是由心理压力引起。张力引发交感神经系统降低肌肉的血流量，最终容易发生痉挛。更糟糕的是，人们在为背部疼痛加剧而焦虑时，往往也会感到肩膀和颈部肌肉紧张疼痛。
  7.皮肤变差
  压力会影响男性激素（在体内被称为雄激素水平），从而触发产生更多的油脂的皮脂腺，导致毛孔堵塞和粉刺。压力还会刺激皮肤的神经末梢，从而爆发湿疹、牛皮癣等皮肤疾病。痤疮也可以归咎于过于紧张。8.伤口和擦伤难以愈合
  哥伦布俄亥俄州立大学的一项研究发现，心理压力会使伤口愈合时间更长。在这项研究中，医生同时给一位压力较大的妇女和一位积极心态的妇女处理前臂上的小皮肤伤口。尽管清洗和包扎是完全相同的方法，然而压力过重的妇女的伤口花费了九天的时间才愈合。
  9.记忆力变差
  有时你会突然想不起来一件很重要的事，难道是你失去记忆了吗？并不完全是这样。高水平的应激激素皮质醇可以暂时削弱你对事物的回忆能力。更糟糕的是，研究表明慢性压力实际上会损害脑细胞。',0),
#可爱宝贝
(NULL,'jx_bb1.jpg','jx_bb1.jpg','jx_bb1.jpg','BB情感敏感 机智家长会这么处理','对于很多人来说，开玩笑是一种生活方式，不仅可以愉悦双方，还可以拉近彼此的距离。但是开玩笑也是要看对象的，开得起玩笑的人是觉得无所谓，但是对于一些情感比较敏感的人，特别是小孩，就不能随便开玩笑了。',0),
(NULL,'jx_bb2.png','jx_bb2.png','jx_bb2.png','注意5点 可以助力宝贝长高！','对于很多人来说，开玩笑是一种生活方式，不仅可以愉悦双方，还可以拉近彼此的距离。但是开玩笑也是要看对象的，开得起玩笑的人是觉得无所谓，但是对于一些情感比较敏感的人，特别是小孩，就不能随便开玩笑了。',0),
(NULL,'jx_bb3.png','jx_bb3.png','jx_bb3.png','帮助宝宝摆脱认生，正确姿势学起来','对于很多人来说，开玩笑是一种生活方式，不仅可以愉悦双方，还可以拉近彼此的距离。但是开玩笑也是要看对象的，开得起玩笑的人是觉得无所谓，但是对于一些情感比较敏感的人，特别是小孩，就不能随便开玩笑了。',0),
(NULL,'jx_bb4.png','jx_bb4.png','jx_bb4.png','爹矬矬一个，娘矬矬一窝，真的是这样吗？','家长都希望自己的孩子能够长得高，如果孩子长得不高，就会担心是否是因为孩子营养不良导致。但事实上，影响孩子身高的因素有很多种。',0),
#妈妈厨房
(NULL,'jx_cf1.jpg','jx_cf1.jpg','jx_cf1.jpg','孩子挑食不可怕，这些时候不吃也可以','孩子挑食是妈妈最头痛的问题，宝宝不吃青菜、不吃猪肉和肝脏等这个很令妈妈困扰，妈妈十分担心孩子营养不良。然而有时候妈妈有些担心过度了，有时候宝宝的身体各项都很正常，还让孩子吃自己认为对孩子有营养的各种食物，这个就没有必要了，妈妈要换个角度看待孩子挑食问题，孩子不喜欢吃某样东西并不代表孩子挑食。简单来讲，妈妈们总是把自己的孩子不喜欢吃某样东西就简单的定义为挑食，如孩子不喜欢吃鸡蛋、胡萝卜、肝脏等之类的东西，但是孩子真正挑食是指不吃某类或者含有特定营养元素的某类食物都不吃，比如说不吃任何蔬菜，不吃鱼、肉等高蛋白食物，所以妈妈一定要认识清楚什么是挑食，也有可能是孩子口味比较独特，妈妈可以换另一种烹饪方式，孩子就有可能喜欢吃了，或者让孩子吃含有相同营养的其他食物。有些妈妈看自己的孩子吃饭吃的少，或者不吃某种食物就担心孩子是不是缺乏营养，缺乏铁、锌、钙等孩子体内必需的微量元素。其实孩子挑食有很多因素，不要把孩子挑食直接归于孩子缺少铁、锌、钙等。妈妈也要考虑其他因素。
  一、遗传因素
  科学研究调查发现，孩子口味上的差别受到遗传因素的影响。还有的认为，孩子的口味其实已经在妈妈的肚子里就已经形成了，妈妈在怀孕和哺乳期间不挑食，孩子挑食的概率会很低，而妈妈在怀孕或者哺乳期间挑食，孩子挑食的概率也就会高。所以妈妈不要急于批判孩子挑食，想想自己在怀孕和哺乳期间是不是挑食，食物的种类和口味是不是很丰富。
  二、孩子的味觉特别敏感
  很多妈妈在做菜的时候有可能只考虑了饭菜是否营养，而忽略了饭菜是否符合孩子的口味，妈妈不要把自己认为好吃有营养的食物强迫给孩子吃，孩子的味觉特别敏感，孩子有可能不喜欢那个有营养的食物的口味。
  那么妈妈该如何解决这个问题呢？
  1.只要保证孩子的食物营养全面，可以让孩子不吃某种食物。
  如果讨厌吃某种食物，就不要强迫他吃，这样不仅不能让孩子不挑食，还有可能引起孩子的抵抗情绪。所以妈妈可以换个拥有同等营养价值的食物给孩子吃。
  2.了解孩子的口味，换种烹饪方式
  妈妈不知能只考虑食物的营养，也要了解孩子的口味，换种烹饪方式，可以用食物做一些孩子喜欢的图形吸引孩子的兴趣。
  所以妈妈们对孩子不吃某种东西，也不要太焦虑，要学会对症下药，效果才会好。',0),
(NULL,'jx_cf2.jpg','jx_cf3.jpg','jx_cf4.jpg','孩子缺钙怎么破？三种膳食来接招！','孩子挑食是妈妈最头痛的问题，宝宝不吃青菜、不吃猪肉和肝脏等这个很令妈妈困扰，妈妈十分担心孩子营养不良。然而有时候妈妈有些担心过度了，有时候宝宝的身体各项都很正常，还让孩子吃自己认为对孩子有营养的各种食物，这个就没有必要了，妈妈要换个角度看待孩子挑食问题，孩子不喜欢吃某样东西并不代表孩子挑食。',0),
(NULL,'jx_cf5.jpg','jx_cf5.jpg','jx_cf5.jpg','宝宝不爱吃水果？快来试试这些','吃水果对身体健康有很大好处，为此宝宝的辅食食谱中总会有水果的身影。妈妈给宝宝吃的水果通常会有苹果、梨、樱桃、等等。但妈妈总给宝宝吃这么几样水果，宝宝会吃腻了，那么，还有哪些水果宝宝可以吃呢？一起来看看吧。一、牛油果
  美国医生认为，牛油果是一种非常理想的婴幼儿辅食。宝宝刚吃辅食时就可以吃牛油果，它有利于大脑细胞的增长并能加强记忆力。
  牛油果含有巨大的能量，宝宝每次吃一点就可以了。妈妈可以把牛油果切两半，把果肉挖出碾压成泥后给宝宝吃。如果宝宝觉得太腻口感不佳，妈妈可以把牛油果和香蕉一起做成泥给宝宝吃。
  牛油果刚买回来需要放置一段时间，等待表皮变黑，变软后才能做成辅食给宝宝吃。
  二、啤梨
  啤梨是一种西方梨，它和东方梨在食用时机上有所不同。东方梨在鲜脆时使用最好，而西方梨则是在果肉熟软时食用最佳。
  啤梨果肉松软细腻，口感上佳，含有很多果汁，深受宝宝喜爱。在营养上，啤梨含有大量维生素B1、胡萝卜素等等，对宝宝身体健康好处多多。
  妈妈可以把果肉搅拌成果泥给宝宝吃。如果觉得啤梨太甜，可以在米粉里加入啤梨给宝宝吃。
  三、草莓
  草莓不仅长得小巧玲珑十分可爱，而且口感好，深受宝宝喜爱。宝宝在出牙后可以自行食用，不用妈妈操心。
  媒体曾经报道宝宝吃草莓后出现了呕吐拉肚子的症状。有的妈妈看到这样的新闻后，就不让宝宝吃草莓了。其实宝宝呕吐拉肚子，并不是吃草莓造成的。妈妈在给吃之前，要把草莓用流动的水清洗干净，并摘除草莓蒂。
  四、西梅
  宝宝吃固体食物易发生便秘，而西梅有缓解便秘的功效，妈妈不妨让宝宝吃一点。妈妈在给宝宝吃西梅的时候要把果核去掉捣成泥状喂给宝宝。妈妈还可以把西梅泥混在米粉里给宝宝吃。
  五、蓝莓
  蓝莓中花青素含量较高，这种物质对宝宝大脑、视力和泌尿系统的发育很有帮助。妈妈在给宝宝吃蓝莓时，可以直接食用，也可以做成蓝莓汤给宝宝吃。蓝莓汤里再加点原味酸奶会更美味，宝宝一定会很喜欢。',0),
(NULL,'jx_cf6.jpg','jx_cf6.jpg','jx_cf6.jpg','给娃喂饭，这些小技巧一定要会','俗话说人是铁饭是钢，然而在很多家庭里，给娃喂饭是一个难题。不好好吃饭不仅让宝宝身体健康受影响，还会使整个家庭的气氛受影响。那么，给宝宝喂饭，妈妈要掌握哪些小技巧呢？如何让宝宝更好更快的把饭吃下去呢？一起来看看吧。
  妈妈首先要明白一个原则：只有宝宝的感觉好，饭才能吃的好。妈妈要有耐心，这样才能让宝宝度过厌食期，更好的吃饭。
  1.当好榜样，引起宝宝好奇
  妈妈在吃饭时，要当好榜样，展现对食物的兴趣。比如：妈妈可以这样说：“哇，今天烧的红烧肉真好吃哎！色香味俱全，我要多吃点”然后吃完一块后，舔舔嘴唇作出很满足的样子。宝宝看到妈妈的表情会很好奇，这时妈妈趁机和宝宝说：“宝宝要不要吃一块啊？很好吃的哦！”就这样，给宝宝喂饭会变得很顺利。
  2.保持足够的神秘感
  宝宝对新生事物会很感兴趣，妈妈可以利用这一点，用神秘感吸引宝宝吃饭。妈妈可以把饭碗放在身后，对宝宝说：“宝宝快来猜猜，今天中午我们吃什么？”当宝宝伸手要时，宝宝就可以趁机给他喂饭了。只要宝宝吃了第一口，让他把饭吃完就顺理成章了。
  3.给宝宝多样的食物选择
  宝宝对食物有不同的爱好，为了能让宝宝摄入全面营养，妈妈要多想想办法。比如，有的宝宝喜欢吃米饭等主食，而不喜欢吃蔬菜和水果。这时妈妈可以把米饭和蔬菜水果混在一起喂给宝宝吃，也可以喂一口米饭，再喂一口蔬菜水果，这样宝宝吃饭就不会偏食挑食了。
  4.转移宝宝注意力
  转移宝宝注意力是很好的一种方法，这样能让他在不知不觉中吃完饭。比如，在宝宝吃饭时给他玩一件好玩的玩具，这样他的注意力就集中在玩具上，就对宝宝喂来的食物不那么在意，只要勺子送到嘴边，就大口的吃下去。就这样，一碗饭不知不觉的就没有了！
  妈妈要注意，宝宝注意力被玩具吸引时，千万别打扰他，否则他又不好好吃饭啦！宝宝注意力被打扰后妈妈要停下来不要喂饭，给他一个微笑，当他的注意力重新回到玩具上时，妈妈在给他喂饭。',0),
(NULL,'jx_cf7.jpg','jx_cf7.jpg','jx_cf7.jpg','这样喂养宝宝，后果很严重','知道吗？无论宝宝多大，都给宝宝吃烂糊糊的食物，是错误的行为哦！你以为孩子肠胃比较脆弱，不能吃太硬的东西；你以为孩子牙齿还没长完全，不好咀嚼；你以为孩子太小，消化系统不太好……然而，真的是你以为的这样吗？你以为你把食物弄得烂碎给宝宝吃或是自己把食物嚼烂了喂宝宝，真的是为他好吗？当然不是，其实上述这些都是育儿的大误区，需要提防。
  1.影响乳牙的生长
  很多宝爸宝妈们担心宝宝的喉咙太小太脆弱不好吞咽食物，于是把食物弄得很细很烂。可是医生说，宝宝的饮食随着宝宝渐渐长大应该渐渐变化，而不是一味地软、烂糊、易咀嚼，要让宝宝自己动嘴巴动牙齿咀嚼食物，刺激牙龈，促进牙齿的生长。否则，孩子的牙齿会发育的很慢，还有可能导致牙齿非正常成长，长歪、长斜、不整齐等。
  2.影响消化能力
  前面提到食物太精细容易影响乳牙生长，除此之外，还影响宝宝的消化系统哦。如果一直让宝宝吃那么烂的食物，很容易让宝宝造成错觉，误以为食物就该如此，不用咀嚼就可以吃。渐渐地宝宝也只能接受这类食物，到后来再恢复正常的食物，孩子的消化系统可能也接受不了了。因此，我们在顾虑孩子牙口不好的时候，还要注意适当给孩子添一些比较正常粗细的食物，一步一步锻炼，增强消化能力。
  3.影响孩子发音
  当今，越来越多的小孩口齿不清，口腔能力有问题。究其原因，盖是父母的过分保护造成的。食物太过精细，不用咀嚼就能下咽；一直喂食孩子，学不会自主进食。其实，大可不必如此，说好听点是保护过度，说的难听点其实就是溺爱。何必呢？我们要做的事情没那么复杂，只需要鼓励孩子开口说话，培养独立能力，一步步尝试，按部就班的成长。
  说到这里，小编真的很庆幸小时候家里穷啊，家人没那么上心我的食物，也没那么保护我，任凭我就这么长大了。正所谓“物极必反”，家长的过分保护可能成为架在孩子脖子上的一把刀。此外，吃烂糊的食物还有诸多隐患，像营养流失、影响牙齿脱落，最重要的是影响孩子的正常发育。',0);


/*用户信息表*/
CREATE TABLE mmg_user(
   uid INT PRIMARY KEY AUTO_INCREMENT,
   phone VARCHAR(16)
   #uname VARCHAR(32),
   #upwd  VARCHAR(132),
   #email VARCHAR(64),
   /*avatar VARCHAR(128), 头像图片路径
   user_name VARCHAR(32),#用户名
   gender INT            #性别  0-女 1-男*/
);
/*用户信息插入数据*/
INSERT INTO mmg_user VALUES
(1,'13112341324');

/**购物车条目**/
CREATE TABLE mmg_shoppingcart_item(
  iid INT PRIMARY KEY AUTO_INCREMENT,
  uid INT,      #用户编号
  lid INT,   #商品编号
  pic VARCHAR(128), #商品图片
  title VARCHAR(128),#商品标题
  price DECIMAL(10,2),         #商品价格
  count INT,        #购买数量
  fare  VARCHAR(56),                  #运费
  is_checked BOOLEAN#是否已勾选，确定购买
  /*foreign key(user_id) references gk_user(uid)*/
);
/**购物车插入数据**/
INSERT INTO mmg_shoppingcart_item VALUES
(NULL,1,9,'p_1.jpg','顺顺儿 soondoongi 绿色盖装湿巾 70片*4包',25,1,'包邮',true);

/**收货地址信息**/
CREATE TABLE mmg_address(
  aid INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,             #用户编号
  name VARCHAR(16),       #接收人姓名
  address VARCHAR(128),         #地址
  cellphone VARCHAR(16)      #手机
);
