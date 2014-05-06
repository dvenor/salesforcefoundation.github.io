require([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap'
], function($, _, Backbone) {

  // Hold our app specific stuff
  var app = {};

  // Scroll the body, accepts a callback if you want to do anything when it is done
  app.scrollTo = function(hash, callback, context) {
    var $target = $(hash);
    $('body,html').stop().animate({scrollTop: $target .offset().top}, 400, function() {
      if (_.isFunction(callback)) {
        callback.call(context);
      }
    });
  };

  // View for the pager on the blog
  var PagerView = Backbone.View.extend({
    tagName: 'ul',
    raw: undefined,
    _cache: {},
    initialize: function() {
      this.setElement($('.blog-list')).render();
    },
    setHref: function(item) {
      return item === '1' ? 'index.html' : item;
    },
    get: function(item) {
      var self = this;
      var href = this.setHref(item);
      if (!this._cache[item]) {
        $.get(href,
          function(result) {
            self.raw = self._cache[item] = result;
            self.render();
          }
        );
      } else {
        this.raw = this._cache[item];
        this.render();
      }
    },
    render: function() {
      if (this.raw) {
        this.$('.posts').html($('<div />').html(this.raw).find('.posts').html());
        this.$('.pager').html($('<div />').html(this.raw).find('.pager').html());
      }

      this.$('.posts-link, .posts-more, .pager a').on('click', function(event) {
        event.preventDefault();
        var prefix = $(this).parents('.posts').length > 0 ? '#blog/post' : '#blog/page/';
        app.router.navigate(prefix + $(this).attr('href'), {trigger: true, replace: true});
      });

      _.each(this.$('.posts > li'), function(item) {
        var href = $(item).find('.posts-link').attr('href').replace('#blog/', '');
        var hash = window.location.hash;
        if (hash.indexOf(href) > -1) {
          $(item).addClass('active');
        } else {
          $(item).removeClass('active');
        }
      }, this);

      return this;
    }
  });

  // Blog post view, extends pager view
  var PostView = PagerView.extend({
    initialize: function() {
      this.setElement($('.blog')).render();
    },
    setHref: function(item) {
      return item;
    },
    close: function() {
      var $post =this.$('> .post');
      var self = this;
      if (this.$el.is('.open')) {
        $post
          .removeClass('shown')
          .one($.support.transition.end, function () {
            $post.html('');
            self.$el.removeClass('open');
          });
      }
    },
    render: function() {
      if (this.raw) {
        this.$el
          .addClass('open')
          .find('.post')
            .html($('<div />').html(this.raw).find('.post').html())
              .addClass('shown');
      }
      return this;
    }
  });
  
  // Router for the app, mostly deals with the blog
  var BlogRouter = Backbone.Router.extend({
    routes: {
      'blog/page/:page': 'blogPage',
      'blog/post/*post': 'post',
      '(:id)'          : 'page'
    },

    blogPage: function(page) {
      if (page) {
        app.blogpost.close();
        app.pager.get(page);
      }
      app.scrollTo('#blog');
    },
    post: function(post) {
      if (post) {
        app.blogpost.get(post);
        app.pager.render();
      }
      app.scrollTo('#blog');
    },
    page: function(id) {
      if (id === 'blog') {
        app.blogpost.close();
        app.scrollTo('#blog');
        return;
      }
      app.scrollTo('#'+id);
    },

    // Not currently in use, but this method allows the pagination and
    // blog post to be linked in the hash
    navigateSpecial: function(href) {
      var hash = ''+window.location.hash;
      var newHash = '#blog';
      var postReg = /\/post\/([\/0-9a-z\-]+.html)/;
      var pageReg = /\/page\/([0-9]+)/;
      var pageMatch;
      if (hash !== '') {
        if (href.indexOf('/post/') > -1) {
          pageMatch = hash.match(pageReg);
          if (pageMatch) {
            newHash += pageMatch[0];
          }

          postMatch = href.match(postReg);
          if (postMatch) {
            newHash += postMatch[0];
          }
          
          hash = newHash;
        } else if (href.indexOf('/page/') > -1) {
          pageMatch = href.match(pageReg);
          if (pageMatch) {
            newHash += pageMatch[0];
          }

          postMatch = hash.match(postReg);
          if (postMatch) {
            newHash += postMatch[0];
          }
          
          hash = newHash;
        }
      } else {
        hash = href;
      }
      this.navigate(hash, {trigger: true, replace: true});
    }
  });

  $(window).on('scroll', function() {
    var $body = $('body');
    var scroll_top = $body.scrollTop() > 90 ? 90 : $body.scrollTop();
    var percent = Math.floor((1-(scroll_top / 90))*10)*10;
    var $navbar = $('header.navbar');
    var old_class = $navbar[0].className.match(/navscale-[0-9]+/);
    if (old_class) {
      $navbar.removeClass(old_class[0]);
    }
    $navbar.addClass('navscale-'+percent);
  });

  $(document).ready(function () {

    app.router = new BlogRouter();
    
    app.pager = new PagerView();
    app.blogpost = new PostView();

    Backbone.history.start({pushState: false, hashChange: true});

    $(window).trigger('scroll');

    $('.cloud-name').on('click', function(event) {
      if ($(window).width() > 992) {
        event.preventDefault();
        var $el = $(this).closest('.cloud');
        if (!$el.is('.active')) {
          var $clouds = $('.clouds');
          if (!$clouds.is('.active')) {
            $clouds.addClass('active');
            $('.project-cloud').addClass('active');
            $clouds.one($.support.transition.end, function(event) {
              $('.clouds-up').addClass('shown');
            });
          }
          if (!$(this).is('.active')) {
            $('.cloud.active').removeClass('active');
            $('.cloud.shown').removeClass('shown');
            $el.addClass('active');
            $el.one($.support.transition.end, function(event) {
              $el.addClass('shown');
            });
          }
        }
      }
    });

    $('.clouds-up').on('click', function(event) {
      event.preventDefault();
      $(this).removeClass('shown');
      $('.clouds').removeClass('active');
      $('.project-cloud').removeClass('active');
      $('.cloud')
        .removeClass('active')
        .removeClass('shown');
    });

    $('.nav-primary a').on('click', function(event) {
      event.preventDefault();
      var hash = $(this).attr('href');
      app.scrollTo($(this).attr('href'), function() {
        window.location.hash = hash;
      });
    });
  });

})(jQuery);