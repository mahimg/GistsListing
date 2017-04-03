var GIST = new Vue({
    el: '#getgist',
    data: {
      files: [],
      showtable: false,
      currentPage: 'unset',
      filter_text: '',
    },
    methods: {
      getgistlist: function(page) {
                this.currentPage = 'Loading';
                page = page ? page : '1';
                this.$http.get('https://api.github.com/gists/public' + '?page=' + page).then(response => {
                  this.files = response.body;
                  this.showtable = true;
                  this.currentPage = page;
                  for (gist in this.files) {
                    if (!this.files[gist].owner) {
                      console.log(this.files[gist]);
                      this.files[gist]['owner'] = {login : 'Anonymous'};
                    }
                    if (!this.files[gist].description) {
                      this.files[gist]['description'] = 'No description';
                    }
                    this.files[gist].updated_at = this.files[gist].updated_at.slice(8,10) + '/' + this.files[gist].updated_at.slice(5,7) + '/' + this.files[gist].updated_at.slice(0,4);

                  }
                  console.log(this.files);
                  console.log(this.currentPage);
                  console.log("GET:", 'https://api.github.com/gists/public' + '?page=' + page);
                }, response => {
                  // TODO: Give a error response in UI to notify the user
                  console.log("error in getting the list of gist");
                });
      }
    },
    computed: {
      selected_gists: function () {
        console.log("It is called");
        if (this.filter_text == '') {
          return this.files;
        }
        console.log('It came here, also');
        return this.files.filter(function (gist) {
          console.log(GIST.filter_text);
          if (gist.description.search(GIST.filter_text) + gist.owner.login.search(GIST.filter_text) > -2) {
            console.log(gist);
            return true;
          }
          else return false;
        })
      }
    }
});
