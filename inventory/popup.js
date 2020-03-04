'use strict';

let token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaW1fYWRtaW4iLCJ1c2VyX2lkIjoiN2E4MTY1MDctZDMxYS01NGFmLThhZjQtZDlmZTNlYjQ4MzI0IiwiaWF0IjoxNTgzMjYzODYzLCJ0ZW5hbnQiOiJzaW0ifQ.mYc1p578P9wM3H4tebq1lkEZnIfwSeFPp68c6Crw-CA";
let okapi = 'https://simmons-test-okapi.hosted-folio.indexdata.com';
let mainText = document.getElementById('text');
let textArea = document.getElementById('textArea');
let rawMarc;
let formattedMarc;
let id;
chrome.tabs.query({ active: true }, function(tabs) {
  id = tabs[0].url.replace(/.+view\/([\w\-]+).*/, '$1');
  mainText.innerText = id;

  fetch(`${okapi}/source-storage/formattedRecords/${id}?identifier=INSTANCE`, {
    headers: {
      "x-okapi-token": token
    }
  })
    .then(res => {
      return res.json();
    })
    .then(json => {
      formattedMarc = json.parsedRecord.formattedContent.replace(/(\$\w)/g, ' $1 ');
      textArea.value = formattedMarc;
      rawMarc = [ json.rawRecord.content ];
    });
});

let down = document.getElementById('download');
down.onclick = () => {
  const blob = new Blob(rawMarc);
  let url = window.URL.createObjectURL(blob);
  down.href = url;
  down.target = '_blank';
  down.download = `${id}.mrc`;
};

let inst = document.getElementById('instance');
inst.onclick = () => {
  if (inst.innerText.match(/Marc/)) {
    textArea.value = formattedMarc;
    inst.innerText = "View Instance";
  } else {
    fetch(`${okapi}/instance-storage/instances/${id}`, {
      headers: {
        "x-okapi-token": token
      }
    })
      .then(res => {
        return res.text();
      })
      .then(text => {
        textArea.value = text;
      });
    inst.innerText = "View Marc";
  }
};