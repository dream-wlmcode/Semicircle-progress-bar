/*
author:wupeiyuan
description:roundProgress
date:2015-07-03
*/
function roundProgress(id,line_width,line_color,line_speed,back_color,speed,step,font_color,font_size){
    this.id=id;
    this.obj=document.getElementsByClassName(this.id)[0];
    this.width=this.obj.parentElement.style.width.replace('px','');
    this.height=this.obj.parentElement.style.height.replace('px','');
    this.line_width=line_width;
    this.progress=this.obj.getAttribute("data_progress");
    this.line_color=line_color;
    this.line_speed=line_speed;
    this.back_color=back_color;
    this.scle=this.obj.getAttribute("data_rotate")-0;
    this.speed=speed;
    this.step=step;
    this.font_color=font_color;
    this.font_size=font_size;
    this.init();
}
roundProgress.prototype.init=function(){
    if(!this.scle){this.scle=0.5}else{this.scle+=0.5}
    this.obj.innerHTML=('<canvas id="'+this.id+'" width="'+this.width+'" height="'+this.height+'"></canvas><div class="rp_inner"><span>0</span>%</div>');
    this.obj.childNodes[1].style.lineHeight=this.height-this.line_width/2+'px';
    this.obj.childNodes[1].style.fontSize=this.font_size+'px';
    this.obj.childNodes[1].style.color=this.font_color;
    this.obj.childNodes[1].style.textAlign='center';
    this.obj.childNodes[1].style.width=this.width+'px';
    this.obj.childNodes[1].style.left=0;
    this.obj.childNodes[1].style.top=0;
    this.obj.childNodes[1].style.position='absolute';
    this.animate();
};

roundProgress.prototype.animate=function(){
    var that=this;
    var c = document.getElementById(this.id);
    var canvas = c.getContext("2d");
    var x=0;
    var drew=setInterval(function(){
        canvas.clearRect(0,0,that.width,that.height);
        canvas.beginPath();
        canvas.lineWidth=that.line_width;
        canvas.lineCap="round";
        canvas.strokeStyle=that.back_color;
        if(this.scle==0.5){
            canvas.arc(that.width/2,that.height/2,that.height/2-that.line_width*2,that.scle*Math.PI,(3-that.scle-0.01)*Math.PI,false);
        }else{
            canvas.arc(that.width/2,that.height/2,that.height/2-that.line_width*2,that.scle*Math.PI,(3-that.scle)*Math.PI,false);
        }
        canvas.stroke();
        canvas.beginPath();
        canvas.lineWidth=that.line_width;
        canvas.lineCap="round";
        canvas.strokeStyle=that.line_color;
        canvas.arc(that.width/2,that.height/2,that.height/2-that.line_width*2,that.scle*Math.PI,(that.scle+x/100*Math.min(that.progress,100)/100)*Math.PI,false);
        canvas.stroke();
        if(x/100+that.scle >= 3-that.scle){
            clearInterval(drew);
            that.obj.childNodes[1].childNodes[0].innerHTML=that.progress;
        }else{
            x += that.step;
            var num=(x/100+that.scle);
            var total=((3-that.scle)/that.progress*100);
            num=Math.floor(num/total*100);
            that.obj.childNodes[1].childNodes[0].innerHTML=num;
        }
    },this.speed);
};
