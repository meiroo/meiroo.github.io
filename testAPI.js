var Github = require('github-api-meiroo');
var github = new Github({
  username: "meiroo",
  password: "meiro1412",
  auth: "basic"
});

var repo = github.getRepo('meiroo', 'javascript');
//console.log(repo);

// repo.contents('master', "", function(err, contents) {
//     console.log(contents);
// }, false);

// repo.getSha('master', 'test2.txt', function(err, sha) {
//     console.log(sha);
// });
repo.write('master', 'test2.txt', '45666', 'Test write by API 2', function(err,contents) {
    console.log(err);
});

// repo.remove('master', 'test.txt', function(err,contents) {
//     console.log(err);
// });