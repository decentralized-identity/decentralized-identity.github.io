(function(){

  fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Fdecentralized-identity%2Ftagged%2Feducation').then(res => res.json()).then(json => {
    blog_posts.innerHTML = json.items.slice(0, 3).map(post => {
      return `
        <div class="col-12 col-md-6 col-lg-4">
          <div class="blog-item md-m-15px-tb">
            <a href="${post.link}">
              <img class="blog-thumbnail" src="${post.thumbnail}" title="" alt="">
            </a>
            <div class="blog-content">
              <div class="post-meta">${post.pubDate.split(' ')[0]}</div>
              <h4><a href="${post.link}">${post.title}</a></h4>
              <p>${post.description.split('<p>')[1].split('</p>')[0].slice(0,305)}...</p>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }).catch(e => {
    console.log('Cannot load Medium feed', e);
  });

  document.getElementById('newsletter_form').addEventListener('submit', function(e) {
    try {
      e.preventDefault();
      var request = new XMLHttpRequest();
      request.open('POST', 'https://docs.google.com/forms/d/1ne4T2ojHCxkqPuHq6hCUNLlOoTAPZwBqhK6GwJ5zywY/formResponse');
      request.send(new FormData(this));
      this.innerHTML = '<div class="inquiry-submitted">Thank you for signing up for our newsletter!<div>';
      ga('send', 'event', 'Inquiry', 'submit', 'Newsletter');
    }
    catch (e) {
      console.warn('Form submission error:', e);
    }
  });

})()
