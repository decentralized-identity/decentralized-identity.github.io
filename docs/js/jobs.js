

function parseEntries(entries){
  return entries.reduce((jobs, entry) => {
    let job = {};
    for (let z in entry) {
      let match = z.match(/gsx\$(.+)/);
      if (match) job[match[1]] = entry[z].$t;
    }
    if ((new Date().getTime() - new Date(job.timestamp).getTime()) < (1000 * 86400 * 30)) {
      jobs.push(job);
    } 
    return jobs;
  }, [])
}

async function getEntries(){
  var cache = JSON.parse(localStorage.jobCache || '{}');
  var time = cache.time ? new Date(cache.time) : new Date();
  if (location.hostname === 'localhost' || !cache.time || (new Date() > time.setHours(time.getHours() + 24))) {
    return fetchJsonp(`https://spreadsheets.google.com/feeds/list/1cbvh5eaCDSZfYrdnDiE8jc4IITFn8Y7GAFGD4yEQlUc/1/public/values?alt=json`)
      .then(response => response.json())
      .then(json => {
        let job = parseEntries(json.feed.entry);
        localStorage.jobCache = JSON.stringify({
          job: job,
          time: new Date()
        });
        return job;
      });
  }
  return cache.job;
}


getEntries().then(job => {
  var html = '';
  job
    // .sort((a,b) => new Date(a.startdate) - new Date(b.startdate))
    .forEach(job => {
      let searchStrings = [
          job.companyname,
          job.jobtitle,
          job.jobdescription,
          job.location
        ].map(s => String(s).toLowerCase()).join(' ');
      html += `<li data-filter="${searchStrings}">
        <div class="item-list-left">
          <a href="${job.link}">
            <img ${ job.primaryimage ? 'src="https://drive.google.com/thumbnail?id=' + job.primaryimage.split('=')[1] + '"' : 'src="/icons/offer.svg" default-image' }"/>
          </a>
        </div>
        <dl class="item-list-center">
          <dt><a href="${job.link}">${job.jobtitle}</a></dt>
          <dd class="item-location"><strong>Location:</strong> ${job.location}</dd>
          <dd>${job.jobdescription.replace(/(.+)/mg, '<p>$1</p>')}</dd>
        </dl>
      </li>`;
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
