npm init --yes/ npm init -y : 所初始化的文件夹不能出现中文名称或空格等

使用 import 导入内置模块如 “fs” 时，出现错误<code>SyntaxError: Cannot use import statement outside a module</code>，解决方案是：

在 package.json 中添加字段 type(“type”:“module”,)     http://t.csdn.cn/XswIk

`npm view xxx versions` ：可以查看某个安装包所有的版本