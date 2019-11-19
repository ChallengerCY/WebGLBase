var VSHADER_SOURCE=
    'void main(){\n'+
    'gl_Position=vec4(0.0,0.0,0.0,1.0);\n'+
    'gl_PointSize=10.0;\n'+
    '}\n';

var FSHADER_SOURCE=
    'void main(){\n'+
    'gl_FragColor=vec4(1.0,0.0,0.0,1.0);\n'+
    '}\n';

function main() {
    var canvas=document.getElementById('webgl');

    var gl=getWebGLContext(canvas);
    if(!gl)
    {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE))
    {
        console.log("Failed to initialize shaders.");
        return;
    }

    gl.clearColor(0.0,0.0,0.0,1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS,0,1);
}

/** 本段代码小结
 * 要使用Webgl就必须使用着色器。在代码中，着色器程序是以字符串的形式"嵌入"在JavaScript中。
 * 顶点着色器(Vertex shader)：顶点着色器是用来描述顶点特性(如位置，颜色等)的程序。
 * 顶点是二维或者三维空间中的一个点，比如二维和三维图形的端点或者交点。
 * 片元着色器(Fragment shader):进行逐片元处理过程和光照的程序。片元(fragment)是一个WebGL术语，你可以将其理解为像素(图像的单元)。
 * 三维场景中仅仅使用线条和颜色把图形画出来是远远不够的。必须考虑光线照射上去之后，或者观察视角发生变化对场景有什么影响。
 * 程序运行流程 浏览器->JavaScript->执行WebGL相关方法->顶点着色器->片元着色器->颜色缓冲区->屏幕显示。
 * 再编写着色器程序代码的时候\n是不必须的。使用\n是为了着色器内部出错的时候，获取错误的行号。
 * WebGL程序包括运行在浏览器中的JavaScript和运行在WebGL系统的着色器程序这两个部分。
 *
 * 顶点着色器程序分析
 * 和c语言一样 必须包含一个main()函数。main()前面的关键字void表示这个函数不会有返回值。并且不能为mian()指定参数。
 * 顶点着色器内置变量:
 * vec4 gl_Position 表示顶点的位置 必须赋值，否则着色器无法使用
 * float gl_PointSize 表示点的尺寸(像素数) 默认是1.0。
 * GLSL ES是强类型语言，必须指定类型。强类型的好处是系统能够轻易理解变量中存储的是何种数据，进而优化处理这些数据。
 * 如果向某类型变量赋值一个不同类型的值，就会出错。 比如gl_PointSize=10.0。赋值为10(整型)就会出错。
 * 由四个分量组成的矢量被称为齐次坐标，能够提高处理三维数据的效率。如果最后一个分量等于1.0,那么这个齐次坐标就可以表示前三个分量为坐标值的那个点。
 * 当需要使用齐次坐标表示顶点坐标的时候，只需要将第四个分量设置为1.0
 * 齐次坐标(x,y,z,w)等价于三维坐标(x/w,y/w,z/w)。w的值必须大于等于0的。如果w趋近于0，那么所表示的点将会无穷的远。
 * 三维图形系统在计算过程中，通常使用齐次坐标来表示顶点的三维坐标
 * */