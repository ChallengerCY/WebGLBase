function main() {
    var canvas=document.getElementById("webgl");

    var gl=getWebGLContext(canvas);

    if(!gl)
    {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    gl.clearColor(0.0,0.0,1.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

/** 本段代码小结
 *  三维图形的绘制遵循二维图形的绘制步骤。获取 <canvas>元素，获取绘图上下文，开始绘制。
 *  本应该使用canvas.getContext()函数来获取上下文。
 *  但是在获取webgl的上下文时，canvas.getContext()接受的参数在不同浏览器中不同。所以调用了工具函数来隐藏不同浏览器之间的差异。
 *  WebGL基于OpenGL ES 所以gl.clearColor()函数对应 OpenGL ES 2.0或 OpenGL中的glclearColor()。
 *  gl.clearColor() 用于设置背景色。以RGBA格式设置背景色。RGBA的所有值均在0到1.0之间。超过的部分会被截断。
 *  RGB的值越高，颜色就越亮。
 *  一旦指定了背景色，背景色就会永驻存在WebGL系统中。在下一次调用gl.clearColor()之前不会改变。也就是说当需要用同一个颜色再次清空绘图区前，不需要再次指定一次背景色。
 *  gl.clear(),用之前指定的背景色清空绘图区域。
 *  清空绘图区，实际上是在清空颜色缓冲区(color buffer)。
 *  除了颜色缓冲区，还有深度缓冲区和模板缓冲区。
 *  gl.COLOR_BUFFER_BIT 颜色缓冲区  gl.DEPTH_BUFFER_BIT 深度缓冲区   gl.STENCIL_BUFFER_BIT 模板缓冲区
 *  颜色缓冲区默认值是(0.0,0.0,0.0,0.0) 深度缓冲区的默认值是1.0 模板缓冲区的默认值是0
 * */