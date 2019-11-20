var VSHADER_SOURCE=
    'attribute vec4 a_Position;\n'+
    'void main() {\n'+
    'gl_Position=a_Position;\n'+
    'gl_PointSize=10.0;\n'+
    '}\n';

var FSHADER_SOURCE=
    'void main() {\n'+
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

    var a_Position=gl.getAttribLocation(gl.program,'a_Position');
    if (a_Position<0)
    {
        console.log('Fialed to get the storage location of a a_Position');
        return ;
    }

    gl.vertexAttrib3f(a_Position,0.0,0.0,0.0);

    gl.clearColor(0.0,0.0,0.0,1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS,0,1);
}