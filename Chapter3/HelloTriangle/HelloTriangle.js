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
