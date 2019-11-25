//顶点着色器
let VSHADER_SOURCE=
    'attribute vec4 a_Position;\n'+
    'void main() {\n'+
    'gl_Position=a_Position;\n'+
    'gl_PointSize=10.0;\n'+
    '}\n';
//片元着色器
let FSHADER_SOURCE=
    'void main() {\n'+
    'gl_FragColor=vec4(1.0,0.0,0.0,1.0);\n'+
    '}\n';

function main()
{
    //获取<canvas>
    let canvas=document.getElementById('webgl');
    //获取WebGL上下文
    let gl=getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }
    //初始化着色器
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log("Failed to initialize shaders.");
        return;
    }
    //设置顶点的位置
    let n=initVertexBuffers(gl);
    if(n<0)
    {
        console.log("Failed to set the positions of the vertices");
        return;
    }
    //设置背景色
    gl.clearColor(0.0,0.0,0.0,1.0);
    //用背景色清空<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);
    //绘制三个点
    gl.drawArrays(gl.POINTS,0,n);
}

function initVertexBuffers(gl) {
    let vertices=new Float32Array([0.0,0.5,-0.5,-0.5,0.5,-0.5]);
    //点的个数
    let n=3;
    //创建缓冲区对象
    let vertexBuffer=gl.createBuffer();
    if(!vertexBuffer)
    {
        console.log('Failed to create the buffer object ');
        return -1;
    }
    //将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    //向缓冲对象写入数据
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
    //获取顶点着色器中a_Position的地址
    let a_Position=gl.getAttribLocation(gl.program,'a_Position');
    //将缓冲区对象分配给a_Position变量
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
    //链接a_Position变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Position);

    return n;
}

/** 本段代码小结
 *  使用缓冲区对象
 *  缓冲区对象是WebGL系统中的一块存储区，你可以在缓冲区对象中保存想要绘制的所有顶点数据。
 *  先创建一个缓冲区，然后向其写入定点数据，就能一次性向顶点着色器传入多个顶点的attribute变量的数据。
 *  使用缓冲区对象向顶点着色器传入多个顶点的步骤如下:
 *  1。创建缓冲区对象（gl.createBuffer()）。
 *  在使用缓冲区对象之前，必须先创建。gl.createBuffer()之后会在WebGl中多出来一个缓冲区对象。 gl.deleteBuffer(buffer)函数可用来删除创建出来的缓冲区对象。
 *  2.绑定缓冲区对象(gl.bindBuffer())。
 *  创建出来之后需要将缓冲区绑定到目标上，这个目标代表了缓冲区对象的用途(本例中的用途就是向顶点着色器提供传给attribute变量的数据)。
 *  gl.ARRAY_BUFFER代表了缓冲区中包含了顶点的数据。
 *  3.将数据写入缓冲区对象(gl.bufferData())。
 *  这里将vertices中的数据写入gl.ARRAY_BUFFER所绑定的缓冲区对象上面。我们不能直接向缓冲区写入数据，而只能向目标写入数据。所以要想缓冲区写入数据，必须先绑定。
 *  使用Float32Array是对Array数组进行了优化。类型化数组不支持push()和pop()。
 *  4.将缓冲区对象分配给一个attribute变量( gl.vertexAttribPointer())。
 *  这里将整个缓冲区对象(实际上是缓冲区对象的指针或者引用)分配给attribute变量。这里传参 2代表每个顶点的分量(1-4)，缺失的分量会自动补全,1,2,3位默认补0，4位默认补1。
 *  5.开启attribute变量(gl.enableVertexAttribArray())。
 *  最后一步，激活attribute变量。该函数实际处理的对象是缓冲区。
 *  可以使用gl.disableVertexAttribArray()来关闭分配。
 *
 * */