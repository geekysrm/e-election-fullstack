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
      else if(request.status === 400)
      {
        alert(request.responseText);
      }
      else if(request.status === 500)
      {
        alert(request.responseText);
      }
    }
  };
  request.open('POST','/can-nominate',true);
  request.setRequestHeader('Content-Type','application/json');
  request.send(null);
}
