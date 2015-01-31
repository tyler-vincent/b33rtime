NavBar = {
  nav: null,
  didScroll: false,
  lastScrollTop: 0,
  delta: 5,
  navbarHeight: 55,

  init: function(el) {
    this.nav = el;
    this.bindUIActions();
    setInterval(function() {
      if (this.didScroll) {
        NavBar.hasScrolled();
        this.didScroll = false;
      }
    }, 25);
  },

  bindUIActions: function() {
    $(window).scroll(function(event){
      this.didScroll = true;
    });
  },

  hasScrolled: function() {
    var scrollTop = $(window).scrollTop();

    if(scrollTop < 100) {
      this.nav.removeClass('nav-down nav-up').addClass('nav-stuck');
    } else {
      if(Math.abs(this.lastScrollTop - scrollTop) <= this.delta)
        return;
      if (scrollTop > this.lastScrollTop && scrollTop > this.navbarHeight){
        this.nav.removeClass('nav-down nav-stuck').addClass('nav-up');
      } else {
        if(scrollTop + $(window).height() < $(document).height()) {
            this.nav.removeClass('nav-up nav-stuck').addClass('nav-down');
        }
      }
    }

    this.lastScrollTop = scrollTop;
  }

};
