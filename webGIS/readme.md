<a name="e308e4b0"></a>
## openlayer入门

lib文件夹是依赖，里面有openlayer接口，使用时需要导入：`<script src="./lib/include-openlayers-local.js"></script>`

<a name="5360a73e"></a>
### 1.地图加载

见 index.html,关键是layer属性,其是一个数组,按顺序显示,即先放地图(矢量或者影像),再放注记.

<a name="63c0cdf2"></a>
### 2.控件

见 控件.html,按照顺序导入即可,<br />小细节:当控件被图层遮挡,css样式:z-index:999.

<a name="9be02d5a"></a>
### 3.视图操作

通过接口map.getView获取视图对象，可以进一步对视图进行操作<br />● 放大/缩小：getZoom/setZoom<br />● 根据中心点显示：getCenter/setCenter<br />● 复位

<a name="f4b1ab51"></a>
### 4.绘图
绘图步骤：<br />1、创建几何形状对象(点,线,圆,正方形,矩形,多边形)<br />2、创建要素对象：参考为 几何形状对象
:::success
        const point =  new ol.Feature({ geometry:new ol.geom.Point([114.4,30.6])})
:::
3、设置要素对象的样式：样式对象
```javascript
point.setStyle(
  new ol.style.Style({
    // 形状
    image:new ol.style.Circle({
      radius:17,
      /* 填充色 */
      fill:new ol.style.Fill({
        color:'rgba(0,0,0,0.5)'
      }),
      /* 描边 */
      stroke:new ol.style.Stroke({
        color:'#ff2d51',
        width:2
      })
    })
  })
)
// 样式可以放在layer对象后，实现所有要素统一样式。实例一个对象，再用layer.setStyle添加。
// const style = new ol.style.Style({
//           // 形状
//           image:new ol.style.Circle({
//               radius:17,
//               /* 填充色 */
//               fill:new ol.style.Fill({
//                   color:'rgba(0,0,0,0.5)'
//               }),
//               /* 描边 */
//               stroke:new ol.style.Stroke({
//                   color:'#ff2d51',
//                   width:2
//               })
//           })
//       })
//   layer.setStyle(style)
```
4、创建数据源：参数为要素对象
```javascript
const source= new ol.source.Vector({
  features:[point,point1]//可以在这里添加更多的点
})
```
5、创建矢量图层：参数为数据源
```javascript
const layer = new ol.layer.Vector({
  source:source
})
```
6、将图层添加到地图中
:::success
        map.addLayer(layer)
:::
概括：要素由几何形状和样式组成，要素要放在数据源，而数据源需要存在图层里，图层要加载到map里。<br />![](https://cdn.nlark.com/yuque/0/2022/png/26320209/1646892180330-9f60c8f6-0077-4944-b158-86b4935ada36.png?x-oss-process=image%2Fresize%2Cw_553%2Climit_0#averageHue=%23fee8e8&crop=0&crop=0&crop=1&crop=1&from=url&height=584&id=wVeLf&margin=%5Bobject%20Object%5D&originHeight=718&originWidth=553&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=&width=450)
<a name="MSg67"></a>
### 5.画笔（交互操作）
<a name="nq1UO"></a>
#### 1.创建画布
```javascript
/* 1、创建画布--创建了一个空的矢量数据源 */
var source = new ol.source.Vector({});
var layer = new ol.layer.Vector({
  source
})
map.addLayer(layer);
```
<a name="CvEFJ"></a>
#### 2.激活画笔
```javascript
/* 激活画笔 */
let draw;
function active(){
  draw = new ol.interaction.Draw({
    type:"Circle",
    geometryFunction:ol.interaction.Draw.createRegularPolygon(4),
    source
  })
  map.addInteraction(draw);
  draw.on('drawend', function (e) {
    console.log('绘制完成')
  })
}
```
<a name="VEHXt"></a>
#### 3.移除画笔
```javascript
//移除画笔
function remove(){
  map.removeInteraction(draw);
}
```
<a name="F5x7b"></a>
#### 4.清除数据
```javascript
//清除数据
function reset(){
  source.clear();
}
```
<a name="AkTob"></a>
#### 5.对画笔进行封装
封装成一个接口，可以实现输入type绘制图形的效果。见draw.js。
```html
<select id="select" onchange="handleChange(event)">
        <option value="None" selected="selected">无</option>
        <option value="Point">点</option>
        <option value="LineString">线</option>
        <option value="Polygon">多边形</option>
        <option value="Circle">圆</option>
        <option value="Square">正方形</option>
        <option value="Box">长方形</option>
    </select>
    <button onclick="reset()">清除数据</button>
```
```javascript
var source = new ol.source.Vector({});
var layer = new ol.layer.Vector({
  source
})
map.addLayer(layer);
let draw;
function handleChange(e){
  if(draw){
    map.removeInteraction(draw)
  }
  var type = e.target.value;
  var draw = createDraw({
    type: type,
    source,
    callback: (e) => {
    }
  })
  map.addInteraction(draw)
}
//清除数据
function reset(){
  source.clear();
}
```
<a name="RTrnU"></a>
### 6.标注
:::success
标注本质是点要素，只不过其style可以设置为文字，图片。其方法与点要素使用方法雷同。
:::
<a name="wRbvK"></a>
##### 小例子：图文标注（通过画笔）
```html
<button onclick="active()">激活画笔</button>
    <button onclick="remove()">移除画笔</button>
    <button onclick="reset()">清除</button>
    <div id="map_container">


    </div>
```
```javascript
/* 1、创建画布--创建了一个空的矢量数据源 */
var source = new ol.source.Vector({});
var layer = new ol.layer.Vector({
  source
})
// 通过Style类创建标注style
const style = new ol.style.Style({
  /**{olx.style.IconOptions}类型*/
  image: new ol.style.Icon({
    //微调，第一个参数左右偏移。第二个参数上下偏移
    anchor: [0.5,0.9],
    //图标缩放比例
    scale: 0.5,
    //透明度
    opacity: 0.75,
    //图标的url
    src: './src/position.png',
  }),
  text:new ol.style.Text({
    offsetX:0,
    offsetY:10,
    font:'normal 12px 微软雅黑',
    text:'武汉市',
    fill:new ol.style.Fill({color:'#333'}),
    stroke:new ol.style.Stroke({color:"#ff2d51",width:2})
  })
})
layer.setStyle(style)
map.addLayer(layer);
/* 激活画笔 */
let draw;
function active(){
  draw = new ol.interaction.Draw({
    type:"Point",
    source
  })
  map.addInteraction(draw);
  draw.on('drawend', function (e) {
    console.log('绘制完成')
  })
}
//移除画笔
function remove(){
  map.removeInteraction(draw);
}
//清除数据
function reset(){
  source.clear();
}
```
<a name="UnEAw"></a>
### 7.pop-up弹窗
当点击某个元素时，显示一个弹窗，在弹窗中显示详细信息。因为当详细信息很多时，不可能一次性全部。<br />pop弹窗在技术上主要是借助overlay遮罩。
> 流程：
> 1、创建一个DOM元素，并设置样式
> 2、将DOM转换成overlay
> 3、监听点击事件，判断如果点击的区域内存在点要素，就显示overlay

<a name="aeJjA"></a>
#### 案例
<a name="UOjFC"></a>
##### 1.创建DOM
```html
<div id="mapCon">
  <!-- Popup -->
  <div id="popup" class="ol-popup">
    <a href="#" id="popup-closer" class="ol-popup-closer"></a>
    <div id="popup-content">
      <h2>武汉</h2>
      <img src="../image/location.png" />
    </div>
  </div>
</div>
```
样式
```css
.ol-popup {
  position: absolute;
  background-color: white;
  -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 45px;
  left: -50px;
  z-index: 999;
}

.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: ' ';
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}

.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}

.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}

.ol-popup-closer:after {
  content: '✖';
}

#popup-content {
  font-size: 14px;
  font-family: '微软雅黑';
}

#popup-content img {
  width: 30px;
}
```
<a name="Dmv54"></a>
##### 2.创建Overlay层
overlay是地图上的一个透明层
```css
// 二. 将dom转换成overlay
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer')
const popup = new ol.Overlay({
    //要转换成overlay的HTML元素
    element:container
    //当前窗口可见
    autoPan: true,
    //Popup放置的位置
    positioning: 'bottom-center',
    //是否应该停止事件传播到地图窗口
    stopEvent: true,
    autoPanAnimation: {
        //当Popup超出地图边界时，为了Popup全部可见，地图移动的速度
        duration: 250,
    },
})
map.addOverlay(popup)
```
清除透明层<br />`map.getOverlays().clear();`
<a name="Yf6Ya"></a>
##### 3.监听点击事件
```css
//添加关闭按钮的单击事件（隐藏popup）
closer.onclick = function () {
    //未定义popup位置
    popup.setPosition(undefined);
};

// 为map添加点击事件监听，渲染弹出popup
map.on('click', function (e) {
    // 获取当前点击的点是否存在要素, 并返回
    const feature = map.forEachFeatureAtPixel(
        //
        e.pixel,
        function (feature, layer) {
            return feature
        }
    )
    if (feature) {
        if (popup.getPosition() == undefined) {
            var position = feature.getGeometry().flatCoordinates
            popup.setPosition(position)
        }
    }
})
//为map添加鼠标移动事件监听，当指向标注时改变鼠标光标状态
map.on('pointermove', function (e) {
    var pixel = map.getEventPixel(e.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);
    map.getTargetElement().style.cursor = hit ? 'pointer' : '';
});

```
