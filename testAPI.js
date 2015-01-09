var GitHubApi = require("node-github");

var github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    debug: true,
    protocol: "https",
    host: "github.my-GHE-enabled-company.com",
    pathPrefix: "/api/v3", // for some GHEs
    timeout: 5000,
    headers: {
        "user-agent": "My-Cool-GitHub-App", // GitHub is happy with a unique user agent
    }
});

console.log(github.repos);

github.authenticate({
    type: "basic",
    username: "meiroo",
    password: "meiro1412"
});

github.repos.createFile({user:"meiroo",repo:"javascript",
    path:"auto.txt",message:"Up by API",content:"bXkgbmV3IGZpbGUgY29udGVudHM="},function(err,result){
    console.log(result);
})