﻿# jiashanFish
农经局项目

农经局项目4月17日给农经局演示后，综合同事们的建议，形成下一步需要优化和完善的地方。


2017/8/25版本改进
-----------------------------------------
根据建议所改进的部分：
-------------------------------

1.信息入库中的“类型划分”
      由text修改为select，只能框选特定类型
2.增加菜单栏的状态显示：
      选择相应菜单后，会在该菜单前打勾表明选中状态
3.登陆部分完善：
      ①修改view.py文件，只有登陆后才能访问系统，无法通过链接直接访问
      ②增加对用户名密码输入错误后的提示，通过修改view.py和login.htnl实现
4.全县统计图表的界面设计：
      修复柱状图覆盖说明文字的BUG
5.各镇渔业统计图表修改：
      增加标题，说明每个表所属的镇名

待改进部分（界面设计）：
--------------------------------

1.字体，菜单排列、颜色，系统名称
2.增加logo

---------------------------------------------------
之前的版本
------------------------------------------------------
1、 （√）增加查询类操作的快速按钮或图标

    （√）
    这个功能交给我之前已经做好了

2、 （√）姓名查询时建议增加like查询

    (√)
    修改getFeatureByAttribute，可以输入姓氏或完整名称查询

3  （√）新增登陆页面

     新增login.html，登陆页面内容(√)
     postgreSQL数据库添加登陆用表login（√），存储2条数据
     view.py 
        /部分，起始页面改为login.html（√）
        /login部分，进行修改,连接数据库，验证（√）

     

4、 （√）视野控制，在菜单切换时不要自动变化视野，保留原始视野，提供复位视野的按钮

    （√）
    菜单切换时，不自动变化视野（√）
    提供复位视野的按钮（√）

5、 （√）统计图表的缩放偏移问题

    （√）
    使用moveend事件，监听zoom
    效果：缩放后，图表自动定位到合适位置
    

6、 （部分完成）新增图形时除了“确定”按钮外，新增“取消”按钮
    
    需完成的步骤
    Ⅰ点击后隐藏表格（√）
    Ⅱ删除新增的图形（待处理）
    
7、 （待处理）调整水面图层的显示样式


    
    
    