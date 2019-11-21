var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute float a_PointSize;\n' +
    'void main() {\n' +
    'gl_Position=a_Position;\n' +
    'gl_PointSize=a_PointSize;\n' +
    '}\n';

var FSHADER_SOURCE =
    'void main() {\n' +
    'gl_FragColor=vec4(1.0,0.0,0.0,1.0);\n' +
    '}\n';

function main() {
    var canvas = document.getElementById('webgl');

    var gl = getWebGLContext(canvas);

    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log("Failed to initialize shaders.");
        return;
    }

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Fialed to get the storage location of a a_Position');
        return;
    }

    var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    if (a_PointSize < 0) {
        console.log('Fialed to get the storage location of a a_PointSize');
        return;
    }

    gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
    gl.vertexAttrib1f(a_PointSize,50.0);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 1);
}

/** 本段代码小结
 *  attribute变量。attribute变量传输的是那些与顶点相关的数据。是GLSL ES的变量，用来从外部向顶点着色器内传输数据。只有顶点着色器能使用。
 *  uniform变量。uniform变量传输的是那些对于所有顶点都相同(或者与顶点无关)的数据。
 *  不同的顶点通常具有不同的坐标。
 *  attribute的使用步骤:
 *  1.在顶点着色器中，声明attribute变量。
 *  2.将arrtibute变量赋值给gl_Position变量。
 *  3.向attribute变量传输数据。
 *  attribute vec4 a_Position。格式:存储限定符，类型，变量名。
 *  attribute是存储限定符，表示这个变量是attribute变量。attribute变量必须声明成全局变量，数据将从着色器外部传给该变量。
 *  代码书写技巧，attribute变量都以a_前缀开始。uniform变量都以u_开始。
 *  每个变量都有一个具体的存储地址。以便通过地址向变量传输数据。比如想向a_Position变量传递数据的时候，首先需要向WebGL系统请求该变量的地址。
 *  getAttribLocation()获取指定程序对象上对应名称的arrtibute变量的地址。 返回值是attribute变量的地址。如果大于0，则是对应的存储地址。-1代表该变量不存在，或者其命名有gl_或者webgl_前缀。
 *  vertexAttrib3f()用来将顶点数据传送给attribute变量。第一个参数是attribute变量的地址。2，3，4是三个浮点数值。代表x,y,z;
 *  vertexAttrib3f()只传递了xyz。这时w分量会自动被设置成1.0.这样齐次坐标就与三维坐标相对应。
 *  vertexAttrib3f 有很多同族函数。任务就是从JavaScript向顶点着色器中的attribute变量传值。
 * */