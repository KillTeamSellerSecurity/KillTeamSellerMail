chrome.storage.local.get(['userID'], function(result) {
  if (!result.userID) {
    chrome.storage.local.set({userID: prompt("Vai sul bot e digita /id ed copia qui il tuo userID:")});
  }
});

chrome.browserAction.onClicked.addListener(function() {
  chrome.storage.local.get(['userID'], function(result) {
    var userID = result.userID;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var response = xhr.responseText;
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = response;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        chrome.notifications.create({
          type: "basic",
          iconUrl: "icon.png",
          title: "KillTeamSeller Mail",
          message: response
        });
      }
    };
    xhr.open("GET", "https://killteamseller.it/api/mailcreate.php?userID=" + userID, true);
    xhr.send();
  });
});