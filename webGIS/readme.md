## openlayer入门

lib文件夹是依赖，里面有openlayer接口，使用时需要导入：`<script src="./lib/include-openlayers-local.js"></script>`

### 1.地图加载

见 index.html,关键是layer属性,其是一个数组,按顺序显示,即先放地图(矢量或者影像),再放注记.

### 2.控件

见 控件.html,按照顺序导入即可,小细节:当控件被图层遮挡,css样式:z-index:999.

### 3.视图操作

通过接口map.getView获取视图对象，可以进一步对视图进行操作
● 放大/缩小：getZoom/setZoom
● 根据中心点显示：getCenter/setCenter
● 复位

### 4.绘图

