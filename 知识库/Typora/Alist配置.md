# Alist配置

## 安装等

## 开机自启

在软件目录下写一个批处理文件bat和一个开机自启无cmd文件vbs

```bat
alist.exe server
```

```vbs
Set ws = Wscript.CreateObject("Wscript.shell")
ws.run "start.bat",vbhiide
```



复制vbs文件的快捷方式并放入 `shell:startup` 中，就可实现开机自启

用户名和密码查询： `alist.exe admins`
