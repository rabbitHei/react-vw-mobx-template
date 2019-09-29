## react-vw-template
vw 适配模板

## 使用  

```sh
npm start 启动本地
npm run build 打包测试
npm run build:uat 打包uat
npm run build:pro 打包线上
```
### 需要取消适配,可注释
config/webpack.config下
```sh
//**** vw功能取消注释区域
    require("postcss-aspect-ratio-mini"),
    require("postcss-write-svg")({ utf8: false }),
    require("postcss-cssnext"),
    require("postcss-px-to-viewport")({
        viewportWidth: 375,
        viewportHeight: 667,
        unitPrecision: 3,
        viewportUnit: 'vw',
        selectorBlackList: ['.ignore', '.hairlines'],
        minPixelValue: 1,
        mediaQuery: false
    }),
    require("postcss-viewport-units"),
    require("cssnano")({
        preset: "advanced",
        autoprefixer: false,
        "postcss-zindex": false
    }),
//**** vw功能取消注释区域
```

### 默认添加SDK 功能 取消可注释 
src/index.js
```sh
import '@/utils/sdkConfig';//sdk
```
public/index.html
```sh
    <!-- sdk -->
    <script src='https://s1.xmcdn.com/lib/jssdk/1.1.1/build/ly.js'></script>
```
# this.props.history.push-edit-
