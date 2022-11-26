# PoliceCloud

移动警务终端APP

## 项目运行配置

1. 配置HBuilder X，菜单栏：运行->运行到手机或模拟器->Android模拟器端口设置

![Android模拟器端口设置](https://imglf6.lf127.net/img/7342b716c752a18b/Nnk1SFgrc3VSbFEwd282M0pXN0xsZFZnMmJLRkNLZjBRYkM1L2NPS1JtOD0.jpg?imageView&thumbnail=1680x0&quality=96&stripmeta=0&type=jpg)

2. 设置运行配置，adb路径，Android模拟器端口

![设置运行配置](https://imglf4.lf127.net/img/0a58d71332735bcf/Nnk1SFgrc3VSbFEwd282M0pXN0xsUkZ3ZVFHWFp2TEYrTmlSRE5IV2Uvcz0.jpg?imageView&thumbnail=1680x0&quality=96&stripmeta=0&type=jpg)

3. 配置夜神模拟器手机参数，性能设置->分辨率设置：宽1080，高2340；手机或网络->手机型号：预设型号：HUAwei Mate 30 5G

![手机参数配置](https://imglf4.lf127.net/img/fe298dd1106063f3/Nnk1SFgrc3VSbFEwd282M0pXN0xsV1pTV2I5WkdvcXkzdFp4aHFmV3M3VT0.jpg?imageView&thumbnail=1000x0&type=jpg)

## 项目代码说明

- `pages.json`，注册页面路由`pages`，第一项为启动页，配置全局样式`globalStyle`，配置底部tab栏`tabBar`
- `common/api.js`，封装接口请求方法、配置请求接口，UniAPP API `uni.getStorageSync` 动态获取配置的 `baseUrl`
- `common/index.js`，配置服务基础地址、图片服务地址，动态配置 `baseUrl`、`imgUrl`
- `common/css/uni.css`，配置公共样式
- `common/less`，封装各功能模块样式组件，形成独立命名空间
- `common/utils`，封装功能方法、公共方法、引入库文件
- `static/*`，存放静态图标、字体、图片、静态测试数据
- `unpackage`，打包文件、Android原生插件、发布配置文件
- `App.vue`，引入公共样式及`iconfont`图标文件
- `pages/login`、`pages/home/index`、`pages/personal`、`pages/schedule/index`对应登录、概况、我的、待办主模块，内部包含主模块下子模块
- `pages/login`，登录功能（URL配置弹框，`uni.setStorageSync`缓存登录账号、登录用户信息及`token`信息），**本功能已完成**
- `pages/home/index`，主协管监室概况页面，**本功能已完成**
- `pages/home/room`，主协管监室详情页面，**本功能已完成**
- `pages/home/disease`重大疾病人员、`pages/home/focus`重点关注人员、`pages/home/lawyer`律师会见、`pages/home/arraign`提讯、`pages/home/family`家属会见、`pages/home/outside`所外就医、`pages/home/inside`所内就医、`pages/home/adjust`监室调整，**本功能已完成**
- `pages/personal`，**本页面功能已完成**
- `pages/schedule/index`，待办列表页面，**本功能已完成**
- `pages/schedule/talk`、`pages/schedule/alarm`，待办事项、报警事项详情页面，**本功能已完成**

## 本文档已同步到`readme.txt`，可根据产品开发需求进行增删。