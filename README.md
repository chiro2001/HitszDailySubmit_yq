# DailySubmit_yq

### 本脚本通过向哈尔滨工业大学（深圳）的疫情上报系统发送数据实现自动上报疫情的功能，其默认填报信息为：

1.是否毕业班学生：非毕业生班

2.实习情况：不实习

3.当前所在地：国内

4.当前所在省：广东省

5.当前所在市/县：深圳市

6.当前所在区：南山区

7.国（境）内详细地址：哈工大深圳

8.当前状态：在校（校内宿舍住）

9.备注：NULL

10.今日体温：36.0-36.9随机上报

11.本人上次填报至今是否有发烧、干咳、头痛现象：否

12.上次填报至今是否途经高危地区：否

13.上次填报至今未进出高危地区但与高危地区人员有接触情况？ 所乘坐交通工具中是否明确有来自高危地区的人员：否

14.同住人员是否有从高危地区回来的：否

15.是否有其他接触高危地区人员的情况描述：否

16.其他需要报告的事项 本人上次填报至今是否有除发烧、干咳、头疼之外的现象：健康

如需修改默认信息，可以自行抓包后修改第131行内容。

### 脚本使用nodejs语言，需要安装node来运行，建议食用方法：

1.准备一台linux环境的服务器；

2.在服务器上安装最新版本的nodejs和npm；

3.用npm安装 fs,node-fetch 以及 forever 共 3 个模块，参考命令如下：
  `npm install fs`
  
  `npm install node-fetch`
  
  `npm install forever -g`
  
4.编辑脚本，在第5行和第6行写入用户名和密码，正确的填写格式如下：
  ```
  var info = {
	  uid: '200110702',
	  pwd: '123456'
  };
  ```
  
5.使用命令`forever start demo.js`来永久运行该脚本。


### 其他事项：

1.停止该脚本可以使用命令`forever stop demo.js`；

2.为防止网络拥堵填报失败，该脚本将每间隔6h进行一次上报尝试；

3.该脚本将在其目录下生成stdout.log与stderr.log两个文件，用于存放成功和错误日志。使用者可以使用`cat stdout.log`的命令查看上报是否成功以及上报的温度。可定时删除日志来节省空间。
