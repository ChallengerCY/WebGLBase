let VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'void main() {\n' +
    'gl_Position=a_Position;\n' +
    'gl_PointSize=10.0;\n' +
    '}\n';

let FSHADER_SOURCE =
    'precision mediump float;\n'+
    'uniform vec4 u_FragColor;\n'+
    'void main() {\n' +
    'gl_FragColor=u_FragColor;\n' +
    '}\n';

let g_points = [];
let g_colors = [];

function main(){
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

    let  u_FragColor=gl.getUniformLocation(gl.program,'u_FragColor');
    if (!u_FragColor) {
        console.log('Fialed to get the storage location of a u_FragColor');
        return;
    }
    canvas.onmousedown = function (ev) {
        click(ev, gl, canvas, a_Position,u_FragColor);
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
 * @param u_FragColor uniform对象的地址(顶点的颜色)
 */
function click(ev, gl, canvas, a_Position,u_FragColor) {
    let x = ev.clientX;
    let y = ev.clientY;
    let rect = ev.target.getBoundingClientRect();
    x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

    g_points.push({x, y});
    if (x >= 0.0 && y > 0.0) {
        g_colors.push([1.0, 0.0, 0.0, 1.0]);
    } else if (x < 0.0 && y < 0.0) {
        g_colors.push([0.0, 1.0, 0.0, 1.0]);
    } else
    {
        g_colors.push([1.0,1.0,1.0,1.0]);
    }
    gl.clear(gl.COLOR_BUFFER_BIT);
    let len = g_points.length;
    for (let i = 0; i < len; i++) {
        gl.vertexAttrib3f(a_Position, g_points[i].x, g_points[i].y, 0.0);
        gl.uniform4fv(u_FragColor,g_colors[i]);
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}

/** 本段代码小结
 * 只有顶点着色器才能使用attribute变量。使用片元着色器需要使用uniform变量或者使用varying。
 * uniform vec4 u_FragColor。格式解析: 存储限定符，类型和变量名。
 * precision mediump float。precision 是精度限定词。用来指定变量的范围(最大值和最小值)和精度。
 * getUniformLocation()用来获取 uniform的地址。如果不存在则会返回null。（这里与getAttribLocation的返回值不同，getAttribLocation返回-1）。
 * uniform4fv()用来向uniform的地址写入对应的颜色。
 * uniform4fv也有很多同族函数。location 指定uniform变量的存储位置。v0,v1,v2,v3代表rgba，前三个默认值是0.0，第四个值默认是1.0。
 * 顶点着色器是逐顶点操作的。片元着色器是逐片元操作的。
 * */