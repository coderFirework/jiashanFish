﻿# jiashanFish
农经局项目

农经局项目4月17日给农经局演示后，综合同事们的建议，形成下一步需要优化和完善的地方。


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


    
    
    