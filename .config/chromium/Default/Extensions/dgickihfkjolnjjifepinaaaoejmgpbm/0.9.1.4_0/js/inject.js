window.addEventListener("message",function(c){if(c.source!=window){return}var b=c.data;if(!b.type){return}if(b.type=="get_blob_file"||b.type=="get_blob_cancel"){chrome.extension.sendRequest(b,function(a){})}else{if(b.type=="test"){chrome.extension.sendRequest(b,function(a){a.type="test_ok";window.postMessage(a,"*")})}}},false);chrome.extension.onRequest.addListener(function(d,c,b){if(d.type=="send_blob_file"){var e=document.getElementById("downloading");if(!e){return}if(d.error){window.postMessage({type:"blob_file",error:d.error,surl:d.surl,guniq:d.guniq},"*");return}var a=new XMLHttpRequest();a.open("GET",d.bloburl);a.responseType="blob";a.onload=function(){if(b){b()}var f=window.URL.createObjectURL(a.response);window.postMessage({type:"blob_file",bloburl:f,surl:d.surl,guniq:d.guniq},"*")};a.onerror=function(g){if(b){b()}var f="Error (send_blob_file) "+g.target.status+" occurred while receiving the document.";window.postMessage({type:"blob_file",error:f,surl:d.surl,guniq:d.guniq},"*")};a.send()}else{if(d.type=="progress"||d.type=="cancel"){window.postMessage(d,"*")}}});