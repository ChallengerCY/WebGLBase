let VSHADER_SOURCE=
    'attribute vec4 a_Position;\n'+
    'uniform mat4 u_xformMatrix;\n'+
    'void main(){\n'+
    'gl_Position = u_xformMatrix*a_Position;\n'+
    '}\n';

let  FSHADER_SOURCE=
    'void main(){\n'+
    'gl_FragColor=vec4(1.0,0.0,0.0,1.0);\n'+
    '}\n';

let ANGLE=90.0;

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

    let radian=Math.PI*ANGLE/180.0;
    let cosB=Math.cos(radian),sinB=Math.sin(radian);
    let xformMatrix=new Float32Array([
        cosB,sinB,0.0,0.0,
        -sinB,cosB,0.0,0.0,
        0.0,0.0,1.0,0.0,
        0.0,0.0,0.0,1.0
    ]);

    let u_xformMatrix=gl.getUniformLocation(gl.program,'u_xformMatrix');
    gl.uniformMatrix4fv(u_xformMatrix,false,xformMatrix);

    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    //画一个三角形
    gl.drawArrays(gl.TRIANGLES,0,n);
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
 *  使用矩阵来对三角形进行平移缩放和旋转。
 *  u_xformMatrix*a_Position 用于完成点和矩阵的相乘运算。
 *  由于Javascript并没有专门表示矩阵的类型，所以使用Float32Array来创建。
 *  矩阵是二维的，数组是一维的，这里通过两种方式在数组中存储矩阵元素：按行主序和按列主序。
 *  Webgl和Opengl一样是通过按列主序的。
 */