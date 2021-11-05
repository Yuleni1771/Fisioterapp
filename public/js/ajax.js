function ajax({method, url, data}){
    xhr = (window.XMLHttpRequest)? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    return new Promise((resolve, reject)=>{
        xhr.onreadystatechange = function() {
            if (this.readyState == 4) resolve(xhr);
        }
        xhr.send(JSON.stringify(data));
    });
}
