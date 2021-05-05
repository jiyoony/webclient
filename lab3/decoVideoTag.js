function decoVideoTag (videoTagId) {
    const $video = document.getElementById(videoTagId);

    const $span= document.createElement('span');
    const textNode = document.createTextNode('영상선택 :');
    $span.appendChild(textNode);
    const $label=document.createElement('label');
    $label.setAttribute('id','sel'+videoTagId);
    $label.setAttribute('for','file');
    $span.appendChild($label);
    
    
    const $parent = $video.parentNode;
    $parent.insertBefore($span,$video);
    const $br1 = document.createElement('br');
    $parent.insertBefore($br1,$video);
    
    
    const $input=document.createElement('input');
    $input.setAttribute('type','file');
    $input.setAttribute('name','file');
    $input.setAttribute('id',videoTagId+'file');
    $input.setAttribute('value','file');
    $input.onchange=()=>{
    document.getElementById('sel'+videoTagId).innerHTML = document.getElementById(videoTagId+"file").files[0].name + '이 선택되었습니다.'; 
    document.getElementById(videoTagId).src= document.getElementById(videoTagId+"file").files[0].name;};
    $parent.insertBefore($input,$video);

    
    const $input1=document.createElement('input');
    $input1.setAttribute('type','button');
    $input1.setAttribute('value','영상보기');
    $input1.onclick=()=>{
        document.getElementById(videoTagId).play();};
    $parent.insertBefore($input1,$video);

    const $input2=document.createElement('input');
    $input2.setAttribute('type','button');
    $input2.setAttribute('value','영상중단');
    $input2.onclick=()=>{
        document.getElementById(videoTagId).pause();};
    $parent.insertBefore($input2,$video);
    
    const $br3 = document.createElement('br');
    $parent.insertBefore($br3,$video);
    
    
   
}