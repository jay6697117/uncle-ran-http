const net = require("net");
const fs = require("fs");

const createFormater = require("./http/formater");
const formater = createFormater("request");
const req = {
  method: "GET",
  url: "/",
  version: "HTTP/1.1",
  headers: { "user-agent": "curl/7.71.1", accept: "*/*" },
  body: "",
};

console.log(formater.format(req))

const client = net.connect(80, "www.baidu.com", () => {
  console.log("连接到服务器！");
  client.write(formater.format(req));
});
client.on("data", function (data) {
  const htmlContent = data.toString()
  console.log(htmlContent);
  fs.writeFile('response.html', htmlContent, (err) => {
    if (err) throw err;
    console.log('HTML文件已保存');
  });
  client.end();
});
client.on("end", function () {
  console.log("断开与服务器的连接");
});
