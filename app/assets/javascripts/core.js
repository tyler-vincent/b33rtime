Core = {
  container: null,
  uploadsUrl: null,
  uploadTmpl: null,
  imageTmpl: null,
  squareSize: 150,
  initialPages: 1,
  perPage: 12,
  currentPage: 1,

  init: function() {
    NavBar.init($("#navbar"));
    Core.container = $("#images");
    Core.uploadsUrl = Core.container.data().uploadsUrl;
    Core.uploadTmpl = $('#tmpl-upload').html();
    Core.imageTmpl = $('#tmpl-image').html();
    Core.calculateInitialPages();

    for (n = 1; n < Core.pagesNeeded+1; n++) {
      Core.fetchImages(n);
    }
    Core.currentPage = Core.pagesNeeded+1;
    Core.scrollListener();
    Core.bindUIActions();
  },

  calculateInitialPages: function () {
    winHeight = $(window).height();
    winWidth = $(window).width();

    squaresWide = (winWidth / Core.squareSize);
    squaresHigh = (winHeight / Core.squareSize);

    Core.pagesNeeded = Math.ceil(squaresWide * squaresHigh / Core.perPage);
  },

  fetchImages: function (page) {
    var images = $.getJSON(Core.uploadsUrl+"?page="+page)
    .done(function() {
      console.log(Core.currentPage);
      Core.renderImages({images: images.responseJSON});
    })
    .fail(function() {
      alert("Too many b33rs, we fucked up.");
    });
  },

  renderCompletedUpload: function (result) {
    var imageTemplate = _.template(Core.imageTmpl);
    var compiledImage = $(imageTemplate({images: [result]}));
    Core.container.prepend(compiledImage).isotope('prepended', compiledImage);
  },

  renderImages: function (results) {
    var imageTemplate = _.template(Core.imageTmpl);
    var compiledImages = imageTemplate({images: results.images});
    Core.container.isotope('insert', $(compiledImages));
  },

  scrollListener: function () {
    $(window).one("scroll", function () {
      if ($(window).scrollTop() >= $(document).height() - $(window).height() - 300) {
        Core.fetchImages(Core.currentPage);
        Core.currentPage++;
      }

      setTimeout(function(){
        Core.scrollListener();
      },50);
    });
  },

  bindUIActions: function() {

    Core.container.isotope({
      transitionDuration: "0.2s",
      masonry: {
        isFitWidth: true,
        gutter: 5
      },
      itemSelector: '.image'
    });

    $('#file_upload').fileupload({
      dataType: 'json',
      paramName: 'upload[image]',
      add: function(e, data) {
        data.context = $(tmpl("tmpl-upload", data.files[0]).trim());
        Core.container.prepend(data.context).isotope('prepended', data.context);
        data.submit();
      },
      progress: function(e, data) {
          var progress;
          if (data.context) {
            progress = parseInt(data.loaded / data.total * 100, 10);
            data.context.find('.bar').css('width', progress + '%');
          }
      },
      done: function(e, data) {
        console.log(e);
        console.log(data);
        if (data.context) {
          Core.container.isotope('remove', data.context).isotope('layout');
          Core.renderCompletedUpload(data.result);
        }
      }
    });

    $(document).bind('dragover', function (e) {
      $("#drop_overlay").fadeIn("fast");
      e.stopPropagation();
    });

    $(document).bind('drop', function (e) {
      $("#drop_overlay").fadeOut("fast");
      e.stopPropagation();
    });

    $('#images').on("touchend", ".image", function (e) {
      var link = $(this);
      if (link.hasClass('hover')) {
        return true;
      } else {
        link.addClass("hover");
        $('.image').not(this).removeClass("hover");
        return false;
      }
    });

    $(document)
      .on('mouseover', '.rollover', function() { $(this).find("input").select(); })
      .on('mouseup', '.rollover div.link input', function(e) { e.preventDefault(); });

  }

};

$(function() {
  Core.init();
});
