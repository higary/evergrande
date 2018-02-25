module.exports = function (shipit) {
    shipit.initConfig({
        evergrande: {
            servers: "192.168.1.63"
        }
    });

    shipit.task("deploy", function () {
        return shipit.remote("cd evergrande && git pull");
    });
}