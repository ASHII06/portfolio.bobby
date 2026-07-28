(function(){
  var grid = document.getElementById('grid');
  var cards = Array.prototype.slice.call(grid.querySelectorAll('.card'));
  var pills = Array.prototype.slice.call(document.querySelectorAll('.filter-pill'));

  pills.forEach(function(pill){
    pill.addEventListener('click', function(){
      pills.forEach(function(p){ p.classList.remove('is-active'); });
      pill.classList.add('is-active');
      var filter = pill.getAttribute('data-filter');
      cards.forEach(function(card){
        var match = filter === 'all' || card.getAttribute('data-cat') === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });

  // Lightbox
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var closeBtn = document.getElementById('lightboxClose');
  var prevBtn = document.getElementById('lightboxPrev');
  var nextBtn = document.getElementById('lightboxNext');
  var currentIndex = 0;

  function visibleCards(){
    return cards.filter(function(c){ return !c.classList.contains('hidden'); });
  }

  function openLightbox(card){
    var list = visibleCards();
    currentIndex = list.indexOf(card);
    showCurrent(list);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function showCurrent(list){
    list = list || visibleCards();
    var card = list[currentIndex];
    if(!card) return;
    var img = card.querySelector('img');
    var title = card.querySelector('.cap-title').textContent;
    var tag = card.querySelector('.cap-tag').textContent;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = title + ' — ' + tag;
  }

  function closeLightbox(){
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
  }

  cards.forEach(function(card){
    card.addEventListener('click', function(){ openLightbox(card); });
  });

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function(e){
    if(e.target === lightbox){ closeLightbox(); }
  });

  prevBtn.addEventListener('click', function(){
    var list = visibleCards();
    currentIndex = (currentIndex - 1 + list.length) % list.length;
    showCurrent(list);
  });
  nextBtn.addEventListener('click', function(){
    var list = visibleCards();
    currentIndex = (currentIndex + 1) % list.length;
    showCurrent(list);
  });

  document.addEventListener('keydown', function(e){
    if(!lightbox.classList.contains('is-open')) return;
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowLeft') prevBtn.click();
    if(e.key === 'ArrowRight') nextBtn.click();
  });
})();
