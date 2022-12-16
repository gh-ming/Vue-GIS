//如何是绘制正方方和矩形需要特殊处理
/* 
@param{string}source 待添加的数据源
@param{string} type 不同的类型(Point,LineString,Polygon,Circle,Square,Box)
@param{function} callback 绘制完成调用
 */
//draw.js
function createDraw({source, type="Point", callback}) {
    let draw = null
    let geometryFunction = null
    let maxPoints = 0
    if (type == 'Square') {
      type = 'Circle'
      geometryFunction = ol.interaction.Draw.createRegularPolygon(4)
    } else if (type == 'Rectangle') {
      type = 'LineString'
      geometryFunction = function (coordinates, geometry) {
        if (!geometry) {
          //多边形
          geometry = new ol.geom.Polygon(null)
        }
        var start = coordinates[0]
        var end = coordinates[1]
        geometry.setCoordinates([
            [start,[start[0],end[1]],end,[end[0],start[1]],start]
        ])
        return geometry
      }
      maxPoints = 2
    }
  
    draw = new ol.interaction.Draw({
      source: source,
      type: type,
      geometryFunction: geometryFunction,
      maxPoints: maxPoints,
    })
  
    // callback && draw.on('drawend', callback)
  
    if (callback) {
      draw.on('drawend', callback)
    }
  
    return draw
  }