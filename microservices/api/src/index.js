var details = document.getElementById('details-btn');
details.onclick = function()
{
  var request = new XMLHttpRequest();

  request.onreadystatechange = function(){
    if(request.readyState === XMLHttpRequest.DONE)
    {
      if(request.status === 200)
      {
        alert(request.responseText);
      }
    }
  };
  request.open('POST','/data',true);
  request.setRequestHeader('Content-Type','application/json');
  request.send(JSON.stringify({ auth:"9729a88294a0859b8bf736156b6b9f7d381d596c44d8a73f"}));
}
