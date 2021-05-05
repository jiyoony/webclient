// 플러그인 등록합니다.
$.fn.imageSlider = function (object) {
    // 변수를 선언합니다.
    var width = object.width || 460;
    var height = object.height || 300;
    var current = 0;
    var k;

    // var q = this.images;
    var box_isclick = false; 
    var box_inipos = 0;
    var box_moving = 0;
    var box_origin = 0;
    var myWidth = 0;
    var init = true;
    var iniX; 
    // 함수를 선언합니다.
    
    var moveTo = function (a) {
        $(a).animate({
            left: -current * width
        }, 1000);
    };

    // 슬라이더 내부의 이미지 개수를 확인합니다.
    var imageLength = $(this).find('.image').length;
    var k = $(this).find('.images');
    // 슬라이더 버튼을 추가합니다.
    for (var i = 0; i < imageLength; i++) {
        $('<button></button>')
            .attr('data-position', i)
            .text(i)
            .click(function () {
                current = $(this).attr('data-position');
                moveTo(k);
            })
            .insertBefore(this);
    }
    // 슬라이더 스타일을 설정합니다.
    $(this).css({
        position: 'relative',
        width: width,
        height: height,
        overflow: 'hidden'
    });
    $(this).find('.images').css({
        position: 'absolute',
        width: width * imageLength,
    });
    $(this).find('.image').css({
        margin: 0,
        padding: 0,
        width: width,
        height: height,
        display: 'block',
        float: 'left'
    });
    // 3초마다 슬라이더를 이동시킵니다.
    
    $('.images').on({//이벤트 등록
        "touchstart mousedown": function(e) { //마우스
            e.preventDefault();
            box_isclick = true; //클릭했다
            box_origin = $(this).offset().left; //현재 이미지의 좌표값
            box_moving = 0;
            if(init) { init = false; iniX = $(this).offset().left; } //초기위치 등록
             myWidth = this.getBoundingClientRect().width; 
        },
        "touchstart": function(e) { //터치시
            box_inipos = e.originalEvent.touches[0].screenX; //손가락으로 터치시 좌표값
            console.log(box_inipos);
            console.log(current);
        },
        "mousedown": function(e) {
            box_inipos = e.pageX; //컴퓨터에서 마우스 좌표 파악 
        },
        "touchmove": function(e) { //손가락 터치시
            e.preventDefault();
            if(box_isclick) { //box 누른 상태면
                box_moving = e.originalEvent.touches[0].screenX - box_inipos; //(손가락의 현재위치-초기위치)
                $(this).css('transform','translateX('+(box_origin+box_moving)+'px)');
            }
        },
        "mousemove": function(e) { 
            if(box_isclick) { 
                box_moving = e.pageX - box_inipos;
                $(this).css('transform','translateX('+(box_origin+box_moving)+'px)');
            }
        },
        "touchend mouseup": function(e) { //손가락 뗴었다.
            box_isclick = false;
            $(this).css('transform','translateX(0px)');
            // if(box_moving<0){
            //     if(current<imageLength) 
            //     current+=1;
            // }
            // else {
            //     if(current>0)
            //     current-=1;
            // }
            if ((box_moving>0) && (current == 0))
                current = current;
            else if ((box_moving<0) && (current == 4))
                current = current;
            else if (box_moving<0) 
                current = current + 1;
            else if (box_moving>0)
                current = current - 1;

            // if($(this).offset().left > 0) {
            //     current = (box_origin+box_moving)/width;
                moveTo(this);
            }
            
        
    });
};