const { request, response } = require("express");
let express = require("express");
let users = require("./data.json");
let app = express();
app.use(express.json());

app.get("/", (request, response) => response.send("Welcome to homepage"));

app.get("/users", (request, response) => response.send(users));
app.post("/users", (request, response) => {
  users.push(request.body);
  console.log(request.body);
  return response.send(users);
});
app.patch("/users/:id", (request, response) => {
  let id = request.params.id;
  console.log("id:", id);
  let body = request.body;
  console.log("body:", body);
  let name = body.name;
  let obj = users.find((el) => el.id == id);
  obj.first_name = name;
  response.send(obj);
});
app.delete("/users/:id", (request, response) => {
  let id = request.params.id;
  console.log("id:", id);
  let index;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      index = i;
    }
  }
  console.log(index);
  users.splice(index, 1);
  response.send(users);
});
app.listen(2345, () => {
  console.log("listening on port 2345");
});
