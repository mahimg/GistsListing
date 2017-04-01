new Vue({
    el: '#getgist',
    data: {
      message: 'Hello Vue.js!',
      files: [],
      showtable: false
    },
    methods: {
      getgistlist: function(page) {
                this.$http.get('https://api.github.com/gists/public' + '?page=' + (page ? page : '')).then(response => {
                  this.files = response.body;
                  this.showtable = true;
                  console.log("GET:", 'https://api.github.com/gists/public' + '?page=' + (page ? page : ''));
                }, response => {
                  // TODO: Give a error response in UI to notify the user
                  console.log("error in getting the list of gist");
                });
      }
    }
});
