let VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'void main() {\n' +
    'gl_Position=a_Position;\n' +
    'gl_PointSize=10.0;\n' +
    '}\n';

let FSHADER_SOURCE =
    'void main() {\n' +
    'gl_FragColor=vec4(1.0,0.0,0.0,1.0);\n' +
    '}\n';

let g_points = [];

function main() {
    let canvas = document.getElementById('webgl');

    let gl = getWebGLContext(canvas);

    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log("Failed to initialize shaders.");
        return;
    }

    let a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Fialed to get the storage location of a a_Position');
        return;
    }

    canvas.onmousedown = function (ev) {
        click(ev, gl, canvas, a_Position);
    };

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);
}

/**
 * 响应鼠标点击事件
 * @param ev 点击参数回调
 * @param gl WebGL对象
 * @param canvas 画布
 * @param a_Position attribute对象的地址(顶点的位置)
 */
function click(ev, gl, canvas, a_Position) {
    let x = ev.clientX;
    let y = ev.clientY;
    let rect = ev.target.getBoundingClientRect();
    x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

    g_points.push({x, y});
    gl.clear(gl.COLOR_BUFFER_BIT);
    let len = g_points.length;
    for (let i = 0; i < len; i++) {
        gl.vertexAttrib3f(a_Position, g_points[i].x, g_points[i].y, 0.0);
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}

/** 本段代码小结
 *  canvas.onmousedown = function (ev){} 采用了匿名函数绑定事件。这里是JavaScript的语法。
 *  canvas.onmousedown 是事件响应函数，能异步地响应用户在网页上的操作。
 *  鼠标点击信息存储在ev中。鼠标点击位置是在"浏览器客户区域"中的坐标。而不是在<canvas>中的。
 *  <canvas>的坐标系统与WebGL的坐标系统，其原点位置和Y轴中的正方向都不一样。
 *  点击过后需要进行坐标转换。步骤是先从浏览器客户区域坐标系转换到<canvas>坐标系下，然后再转换到WebGL坐标系。
 * ev.target.getBoundingClientRect()。 首先获取<canvas>在浏览器客户区中的坐标。 rect.left和rect.top代表了<canvas>在浏览器客户区坐标下面的原点。
 * (x-rect.left)和(y-rect.top)分别算出客户区坐标系下面的坐标(x,y)对应的<canvas>坐标系下面对应的(x,y)坐标。
 * 获取canvas的中心点。通过canvas.height/2和canvas.width/2获取到canvas的中心点。
 * 使用(x - rect.left) - canvas.width / 2和canvas.height / 2 - (y - rect.top)将<canvas>的远原点平移到中心点。(WebGL坐标系的原点位于此处)。
 * 参考WebGL坐标系，水平方向计算采用(x - rect.left) - canvas.height / 2。x正方向右，所以x的值越大，越可能成为正数。在屏幕上点击，x越靠右，值越大。
 * 参考WebGL坐标系，垂直方向计算采用canvas.height / 2 -(y - rect.top)。y正方向上，所以y的值越小，越可能成为正数。在屏幕上点击，y越靠上，值越小。
 * 最后因为WebGL映射到<canvas>的坐标系比例为(-1.0,1.0).所以我们将(x,y)各除以<canvas>宽高的一半。来映射到WebGL坐标系。
 * WebGL是基于颜色缓冲区进行绘制的。绘制结束后系统将缓冲区中的内容显示在屏幕上，然后颜色缓冲区就会被重置。所以连续的绘制需要记录上一次绘制的信息。
 * */