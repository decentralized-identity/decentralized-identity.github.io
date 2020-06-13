

function parseEvents(entries){
  return entries.map(entry => {
    let event = {};
    for (let z in entry) {
      let match = z.match(/gsx\$(.+)/);
      if (match) event[match[1]] = entry[z].$t;
    }
    return event;
  })
}

async function getEvents(){
  var cache = JSON.parse(localStorage.eventCache || '{}');
  var time = cache.time ? new Date(cache.time) : new Date();
  if (location.hostname === 'localhost' || !cache.time || (new Date() > time.setHours(time.getHours() + 24))) {
    return fetchJsonp(`https://spreadsheets.google.com/feeds/list/1NYRl2RXMTdZ3iHjFQQhk6hhwUvF0pe_5_QIAE7OwNfA/1/public/values?alt=json`)
      .then(response => response.json())
      .then(json => {
        let events = parseEvents(json.feed.entry);
        localStorage.eventCache = JSON.stringify({
          events: events,
          time: new Date()
        });
        return events;
      });
  }
  return cache.events;
}

getEvents().then(events => {
  var html = '';
  var today = new Date();
  events
    .sort((a,b) => new Date(a.startdate) - new Date(b.startdate))
    .forEach(event => {
      let startDate = new Date(event.startdate);
      let endDate = new Date(event.enddate);
      if (today <= endDate && (startDate < new Date(today).setDate(today.getDate() + 358))) {
        let startMonth = startDate.toLocaleString('en-us', { month: 'short' });
        let startMonthLong = startDate.toLocaleString('en-us', { month: 'long' });
        let endMonth = endDate.toLocaleString('en-us', { month: 'short' });
        let endMonthLong = endDate.toLocaleString('en-us', { month: 'long' });
        let searchStrings = [
            event.eventname,
            event.location,
            startMonthLong,
            startDate.getFullYear(),
            endMonthLong,
            endDate.getFullYear()
          ].map(s => String(s).toLowerCase()).join(' ');

        html += `<li data-filter="${searchStrings}">
          <div class="item-list-left">
            <a href="${event.link}" datestamp start-month="${startMonth}" start-day="${startDate.getDate()}" ${endMonth == startMonth ? '' : 'end-month="' + endMonth + '"'} end-day="${endDate.getDate()}">
              <img src="${ event.primaryimage ? 'https://drive.google.com/thumbnail?id=' + event.primaryimage.split('=')[1] : '' }"/>
            </a>
          </div>
          <dl class="item-list-center">
            <dt><a href="${event.link}">${event.eventname}</a></dt>
            <dd class="item-location">${event.location}</dd>
            <dd>${event.description.replace(/(.+)/mg, '<p>$1</p>')}</dd>
          </dl>
        </li>`;
      }
    });
    item_list.innerHTML = html;
});

(function(){

  var sheet = document.head.appendChild(document.createElement('style')).sheet;

  function deleteRule(){
    if (sheet.cssRules.length) sheet.deleteRule(0);
  }

  function updateRule(text){
    deleteRule();
    text = text.trim().toLowerCase();
    sheet.insertRule(`#item_list li${text.split(/\s+/).map(word => '[data-filter*="'+ word +'"]').join('') } { display: flex !important; }`, 0);
  }

  function inputChange(e){
    if (search.value) {
      document.body.setAttribute('searching', '');
      updateRule(search.value);
    }
    else {
      document.body.removeAttribute('searching');
      deleteRule();
    }
  }

  var search = document.getElementById('filter_search_input');

  search.addEventListener('input', inputChange);

  document.getElementById('filter_clear').addEventListener('click', function(e){
    e.preventDefault();
    search.value = '';
    inputChange();
  })

})()
