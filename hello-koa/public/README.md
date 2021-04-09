# README

## 框架
### 项目目录结构
├── dist                   编译结果目录
├── config                 配置目录
|   ├── dev.js             开发时配置
|   ├── index.js           默认配置
|   └── prod.js            打包时配置
├── src                    源码目录
|   ├── pages              页面文件目录
|   |   ├── index          index 页面目录
|   |   |   ├── index.js   index 页面逻辑
|   |   |   ├── index.css  index 页面样式
|   |   |   └── x.config   index 页面配置
|   ├── app.js             项目入口文件
|   ├── app.css            项目总通用样式
|   └── app.config.js      项目全局配置
└── package.json
### 编译配置
1. defineConstants        配置全局变量
2. alias									配置目录别名(须同时配置 tsconfig.json)
3. env										设置环境变量
4. terser/csso						配置代码压缩
5. mini/h5……							专属配置


## React of Taro
### 入口组件
1. 入口组件 /src/app.tsx
2. 入口配置 /src/app.config.ts
3. onLaunch / onPageNotFound
4. componentDitShow / componentDidHide

### 页面组件
0. 页面配置: [name].config.ts
1. onLoad
2. onReady / useReady
3. onShow: componentDidShow / useDidShow
4. onHide: componentDidHide / useDidHide
5. onPullDownRefresh / usePullDownRefresh

### 路由参数
1. $instance = getCurrentInstance();
2. $instance.router

### 生命周期触发机制
0. onLoad
	能访问 options, $instance.router
1. componentWillMount
	onLoad之后，页面组件渲染到 v-dom 之前
2. componentDidMount
	页面组件渲染到 v-dom 之后，onReady 之前
	能访问 虚拟DOM: ref, document.getElementById
	不能访问 DOM: createSelectorQuery
3. onReady
	能访问 DOM: createSelectorQuery, createCanvasContext
	子组件能通过 消息机制 监听页面 onReady, 从而访问 DOM
	按需加载的子组件通过 nextTick 模拟
4. componentDidShow(onShow)
	页面显示/切入前台时触发
	子组件能通过 消息机制 监听
5. componentDidHide(onHide)
	……
