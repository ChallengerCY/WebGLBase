let VSHADER_SOURCE=
    'attribute vec4 a_Position;\n'+
    'void main(){\n'+
    'gl_Position=a_Position;\n'+
    '}\n';

let  FSHADER_SOURCE=
    'void main(){\n'+
    'gl_FragColor=vec4(1.0,0.0,0.0,1.0);\n'+
    '}\n';

function main() {

    let canvas = document.getElementById('webgl');
    let gl = getWebGLContext(canvas);
    if (!gl) {
        console.log();
        return;
    }

    if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE))
    {
        return;
    }

    let n=InitVertexBuffers(gl);

    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    //画一个三角形
    gl.drawArrays(gl.TRIANGLES,0,n);
    //画线段
    //gl.drawArrays(gl.LINES,0,n);
    //画线条
    //gl.drawArrays(gl.LINE_STRIP,0,n);
    //画回路
    //gl.drawArrays(gl.LINE_LOOP,0,n);
    //画三角带
    //gl.drawArrays(gl.TRIANGLE_STRIP,0,n);
    //画三角扇
    //gl.drawArrays(gl.TRIANGLE_FAN,0,n);
}

function InitVertexBuffers(gl) {

    let vertex=new Float32Array([0,0.5,-0.5,-0.5,0.5,-0.5]);

    let  n=3;

    let vertexBuffer=gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);

    gl.bufferData(gl.ARRAY_BUFFER,vertex,gl.STATIC_DRAW);

    let a_Position=gl.getAttribLocation(gl.program,'a_Position');

    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);

    gl.enableVertexAttribArray(a_Position);

    return n;
}

/** 本段代码小结
 *  WebGL的drawArrays既强大又灵活。可以用7种不同的方式绘制图形。
 *  顶点的顺序将影响绘图的结果。
 *  gl.POINT:  一系列点，绘制在v0,v1.....处。
 *  gl.LINES：一系列单独的线段。绘制在(v0.v1),(v2,v3)处。如果点的个数为奇数，最后一个点被忽略。
 *  gl.LINES_STRIP：一系列连接的线段。绘制在(v0,v1),(v1,v2)处。第i(i>1)个点是第i-1条线段的终点和第i条线段的起点。最后一个点是最后一条线段的中点。
 *  gl.LINE_LOOP:一系列连接的线段。vn是其最后一个点。与gl.LINES_STRIP不同的是，gl.LINE_LOOP会把最后一个点和第一个第一个点连接起来。
 *  gl.TRIANGLES:一系列单独的三角形; 绘制在(v0,v1,v2),(v3,v4,v5)处。如果点不是3的整数倍，那么就会忽略多余的点。
 *  gl.TRIANGLES_STRIP：一系列条带状三角形。在(v0,v1,v2),(v2,v1,v3)处绘制。注意第二个三角形的绘制顺序是为了确保第2各三角形也是逆时针绘制。
 *  gl.TRIANGLES_FAN: 一系列三角形组成的类似于扇形的图形。在(v0,v1,v2),(v0,v2,v3)处绘制。
 *  Webgl只能绘制三种图形:点，线段和三角形。实际上可以使用这些最基本的图形来绘制出任何东西。
 */
