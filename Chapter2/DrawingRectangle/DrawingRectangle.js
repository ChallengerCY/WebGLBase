function main() {
    //获取Canvas元素
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    //获取绘制二维图形的绘图上下文
    var ctx = canvas.getContext('2d');

    //绘制蓝色矩形
    ctx.fillStyle = 'rgba(0,0,255,0.5)';
    ctx.fillRect(10, 10, 150, 150);
}

/** 本段代码小结
 * 在<canvas>上绘制二维图形(2D图形)需要经过三个步骤
 * 1.获取<canvas>元素
 * 2.向该元素请求二维图形的"绘图上下文"。
 * 3.在绘图上下文上调用相应的绘图函数，以绘制二维图形。
 * 不管绘制二维图形还是三维图形，这三个步骤是一样的。
 * <canvas>元素可以灵活地同时支持二维图形和三维图形。他不提供直接绘制图形的方法，而是提供一种叫上下文的机制来进行绘图。
 *
 * canvas.getContext('2d')指定了上下文的类型。要绘制二维图形必须指定为2d(注意区分大小写)。
 * 设置颜色的字符串rgba制定了r(红色)、g（绿色）、b（蓝色）、a（α：透明度）。
 * rgb的值在（0，255）之间。α 在0（透明）到1。0（不透明）之间。
 *
 * <canvas>的坐标系统横轴为x轴，正向朝右。纵轴为y轴，正方向向下。
 * 使用ctx.fillRect()绘制矩形的时候，前两个参数指定了矩形左上定点在<canvas>中的坐标。后面两个参数指定了矩形的宽度和高度(以像素为单位)。
 * */