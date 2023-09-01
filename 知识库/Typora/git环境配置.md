# Git环境配置

## 下载

下载地址：https://git-scm.com/downloads



## 安装

1. 修改默认存储位置

<img src="http://images.xiaohai-hx.cn/复习笔记/面试题/image-20230901134652379.png" alt="image-20230901134652379" style="zoom:50%;" />

2. Git 选项配置，推荐默认设置

<img src="http://images.xiaohai-hx.cn/复习笔记/面试题/image-20230901134707021.png" alt="image-20230901134707021" style="zoom:50%;" />

3. Git 安装目录名，不用修改

<img src="http://images.xiaohai-hx.cn/复习笔记/面试题/image-20230901134722318.png" alt="image-20230901134722318" style="zoom:50%;" />

2. Git 的默认编辑器，建议使用默认的 Vim 编辑器

<img src="http://images.xiaohai-hx.cn/复习笔记/面试题/image-20230901134747205.png" alt="image-20230901134747205" style="zoom:50%;" />

2. 在Git 创建分支后的默认的名字（master）以及是否自定义

<img src="http://images.xiaohai-hx.cn/复习笔记/面试题/image-20230901134800654.png" alt="image-20230901134800654" style="zoom:50%;" />

2. 修改 GIt 的环境变量，默认即可

<img src="http://images.xiaohai-hx.cn/复习笔记/面试题/image-20230901134811651.png" alt="image-20230901134811651" style="zoom:50%;" />

2. 开启https链接，保证数据传输数据的安全

<img src="http://images.xiaohai-hx.cn/复习笔记/面试题/image-20230901134824236.png" alt="image-20230901134824236" style="zoom:50%;" />

2. 配置GIt 文集爱你的行末换行符，Windows使用CRLF，Linux使用LF，选择第一个自动转换

<img src="http://images.xiaohai-hx.cn/复习笔记/面试题/image-20230901134835237.png" alt="image-20230901134835237" style="zoom:50%;" />

2. 选择GIt终端类型，选择默认的GIt Bash 终端

<img src="http://images.xiaohai-hx.cn/复习笔记/面试题/image-20230901134845108.png" alt="image-20230901134845108" style="zoom:50%;" />

2. 选择 GIt Pull 合并的模式，选择默认

<img src="http://images.xiaohai-hx.cn/复习笔记/面试题/image-20230901134900217.png" alt="image-20230901134900217" style="zoom:50%;" />

2. 选择 GIt 的凭据管理器，选择默认的跨平台的凭据管理器

<img src="http://images.xiaohai-hx.cn/复习笔记/面试题/image-20230901134911164.png" alt="image-20230901134911164" style="zoom:50%;" />

2. 其他扩展配置，选择默认配置

<img src="http://images.xiaohai-hx.cn/复习笔记/面试题/image-20230901134924428.png" alt="image-20230901134924428" style="zoom:50%;" />

2. 额外的配置选项，技术还不成熟，有已知的bug，不建议勾选，然后点击 Install

<img src="http://images.xiaohai-hx.cn/复习笔记/面试题/image-20230901134937632.png" alt="image-20230901134937632" style="zoom:50%;" />

2. 安装完成

<img src="http://images.xiaohai-hx.cn/复习笔记/面试题/image-20230901134947586.png" alt="image-20230901134947586" style="zoom:50%;" />



## 配置

1. 设置用户名和密码

<img src="http://images.xiaohai-hx.cn/复习笔记/面试题/image-20230901135322261.png" alt="image-20230901135322261" style="zoom:50%;" />

2. 为 Github 生成 ssh 密钥，直接三次回车，上面的一条命令是为了检查本地是否已经有了 ssh 密钥

<img src="http://images.xiaohai-hx.cn/复习笔记/面试题/image-20230901135459175.png" alt="image-20230901135459175" style="zoom:50%;" />

3. 打开上图括号内的地址（C/users/………），可以找到 .ssh文件，打开其中的id_rsa.pub文件，直接以记事本方式打开，复制内容，打开设置中的ssh密钥，添加 new ssh key（添加新的ssh密钥），标题随便起一个，钥匙粘贴上述文件的内容，添加后就可以了

<img src="http://images.xiaohai-hx.cn/复习笔记/面试题/image-20230901135529068.png" alt="image-20230901135529068" style="zoom:50%;" />

4. 添加完之后可以确认一下自己是否配置好了（如图所示为可以）

<img src="http://images.xiaohai-hx.cn/复习笔记/面试题/image-20230901135547932.png" alt="image-20230901135547932" style="zoom:50%;" />