PoliceCloud
移动警务终端APP【白云】

项目运行配置
配置HBuilder X，菜单栏：运行->运行到手机或模拟器->Android模拟器端口设置
Android模拟器端口设置

设置运行配置，adb路径，Android模拟器端口
设置运行配置

配置夜神模拟器手机参数，性能设置->分辨率设置：宽1080，高2340；手机或网络->手机型号：预设型号：HUAwei Mate 30 5G
手机参数配置

项目代码说明
pages.json，注册页面路由pages，第一项为启动页，配置全局样式globalStyle，配置底部tab栏tabBar
common/api.js，封装接口请求方法、配置请求接口，UniAPP API uni.getStorageSync 动态获取配置的 baseUrl
common/index.js，配置服务基础地址、图片服务地址，动态配置 baseUrl、imgUrl
common/css/uni.css，配置公共样式
common/less，封装各功能模块样式组件，形成独立命名空间
common/utils，封装功能方法、公共方法、引入库文件
static/*，存放静态图标、字体、图片、静态测试数据
unpackage，打包文件、Android原生插件、发布配置文件
App.vue，引入公共样式及iconfont图标文件
pages/login、pages/home/index、pages/personal、pages/schedule/index对应登录、概况、我的、待办主模块，内部包含主模块下子模块
pages/login，登录功能（URL配置弹框，uni.setStorageSync缓存登录账号、登录用户信息及token信息），本功能已完成
pages/home/index，主协管监室概况页面，本功能已完成
pages/home/room，主协管监室详情页面，本功能已完成
pages/home/disease重大疾病人员、pages/home/focus重点关注人员、pages/home/lawyer律师会见、pages/home/arraign提讯、pages/home/family家属会见、pages/home/outside所外就医、pages/home/inside所内就医、pages/home/adjust监室调整，本功能已完成
pages/personal，本页面功能已完成
pages/schedule/index，待办列表页面，本功能已完成
pages/schedule/talk、pages/schedule/alarm，待办事项、报警事项详情页面，本功能已完成
本文档已同步到readme.txt，可根据产品开发需求进行增删。