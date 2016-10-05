// JavaScript Document
window.onload=function(){
	var songs=["Eagles-TheLastResort.mp3","GunsN'Roses-Don'tCry(Original).mp3","JohnLennon-Imagine.mp3"];
	var player=document.getElementById("player");

	controlplay(player,songs);
	changesong(player,songs);
	timeshow(player);
	timelinecontrol(player);
	timelinectl(player);
	player.volume=0.3;
	voicecontrol(player);
	}


//控制播放，暂停
var controlplay=function(player,songs){
	var startbtu=document.getElementById("start-btu");
	var img=startbtu.getElementsByTagName("img")[0];
	startbtu.onclick=function(){
		if(player.paused){
			if(player.src){
					player.play();}
		    else{
			        player.src='songs/'+songs[0];}
			        img.src="images/8.JPG";
					player.play();
			}
		else{
			player.pause();
			img.src="images/1.JPG";}
		changename(player);
		//console.log(settime(player.duration));
		lrcshow(player);
		}
	}
//控制切换歌曲
var changesong=function(player,songs){
	var newsong="";
	var changebtu=document.getElementById("change-btu");
	var startbtu=document.getElementById("start-btu");
	var img=startbtu.getElementsByTagName("img")[0];
	var str= window.location.href;
	str=str.replace('index.html','');
	changebtu.onclick=function(){
	if(player.src){
			var songname=player.src.replace(str+'songs/','');
			for(i=0;i<songs.length;i++){
				if(songs[i]==songname){
					var index=i;}
				}
			if(index+1==songs.length){
				newsong=songs[0];}
			else{
				newsong=songs[index+1];}
		}
	else{
		newsong=songs[0];
		}
	player.src='songs/'+newsong;
	player.play();
	img.src="images/8.JPG";
	changename(player);
		}
	}
//控制歌曲名称，歌手名
var changename=function(player){
	var name=document.getElementsByClassName("test");//懒得重写getclass
	var str= window.location.href;
	str=str.replace('index.html','');
	var songname=player.src.replace(str+'songs/','').replace('.mp3','');
	if(player.src){
		name[0].innerHTML=songname.split("-")[1];
		name[2].innerHTML=songname.split("-")[0];
		}
	}
//控制时间的显示
var timeshow=function(player){
	var nowtimeshow=document.getElementById("now-time");
	var alltimeshow=document.getElementById("all-time");
	var nowtime=settime(player.currentTime);
	var alltime=settime(player.duration);
	nowtimeshow.innerHTML=nowtime[0]+':'+nowtime[1];
	alltimeshow.innerHTML=alltime[0]+':'+alltime[1];
	var t=setTimeout("timeshow(player)",1000);
	}
//转换时间函数，把秒数处理成00：00格式
var settime=function(times){
	var mins=Math.floor(times/60);
	var secs=Math.floor(times%60);
	if(mins<10){
		mins='0'+mins;
		}
	if(secs<10){
		secs='0'+secs;
		}
	var num=[];
	num.push(mins);
	num.push(secs);
	return num;
	}
//进度条显示
var timelinecontrol=function(player){
	var scrollline=document.getElementById("scroll-line");
	var nowtime=player.currentTime;
	var alltime=player.duration;
	//console.log(nowtime/alltime);
	scrollline.style.width=(nowtime/alltime)*350+'px';
	var t=setTimeout("timelinecontrol(player)",500);
	}
//点击进度条控制播放
var timelinectl=function(player){
	var timeline=document.getElementById("time-line");
	timeline.onclick=function(event){
		var x=event.clientX;
		var n=this.offsetLeft;
		//console.log(x-n)
		player.currentTime=((x-n)/350)*player.duration;
		}
	}
//声音控制调节
var voicecontrol=function(player){
	var voiceline=document.getElementById("voice-line");
	var voicescroll=document.getElementById("voice-scroll");
	voiceline.onclick=function(event){
		var x=event.clientX;
		var n=this.offsetLeft;
		player.volume=(x-n)/60;
		voicescroll.style.width=(x-n)+'px';
		}
	}
//歌词显示部分
var lrcshow=function(player){
	var str= window.location.href;
	str=str.replace('index.html','');
	var songname=player.src.replace(str+'songs/','').replace('.mp3','');
	console.log(songname);
	var xhr=new XMLHttpRequest();
	xhr.open('GET', '../lrcs/'+songname+'.lrc', true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                //var lyric = lrcobj(xhr.responseText);
                
            };
        };
	}