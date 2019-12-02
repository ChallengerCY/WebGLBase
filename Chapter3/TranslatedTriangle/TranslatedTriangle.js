var VSHADER_SOURCE=
    'attribute vec4 a_Position;\n'+
    'uniform vec4 u_Translation;\n'+
    'void main(){\n'+
    'gl_Position=a_Position+u_Translation;\n'+
    '}\n';

let  FSHADER_SOURCE=
    'void main(){\n'+
    'gl_FragColor=vec4(1.0,0.0,0.0,1.0);\n'+
    '}\n';

var Tx=0.5,Ty=0.5,Tz=0.0;
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

    var u_Translation=gl.getUniformLocation(gl.program,'u_Translation');
    gl.uniform4f(u_Translation,Tx,Ty,Tz,0.0);

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
 *  平移的原理是对每一个顶点的分量(x和y),加上三角形再对应轴上平移的距离。
 *  比如将p(x,y,z)移动到p(x1,y1,z1),移动距离是Tx,Ty,Tz,那么公式就是:x1=x+Tx;
 *  平移是逐顶点操作。
 *  GLSL ES中的赋值操作只能发生在相同类型的变量之间。
 *
* */