new Vue({
    el: '#getgist',
    data: {
      files: [],
      showtable: false,
      currentPage: 'unset'
    },
    methods: {
      getgistlist: function(page) {
                this.currentPage = 'Loading';
                page = page ? page : '1';
                this.$http.get('https://api.github.com/gists/public' + '?page=' + page).then(response => {
                  this.files = response.body;
                  this.showtable = true;
                  this.currentPage = page;
                  console.log(this.currentPage);
                  console.log("GET:", 'https://api.github.com/gists/public' + '?page=' + page);
                }, response => {
                  // TODO: Give a error response in UI to notify the user
                  console.log("error in getting the list of gist");
                });
      }
    }
});
