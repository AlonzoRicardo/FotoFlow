const mongoose = require("mongoose");
const FotoFlow = require("../models/fotoFlow");

mongoose
  .connect(process.env.BDURL, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let flows = [
  {
    title: "alice",
    description: 'Foto flow de Alice',
    imgArr: [3, 4, 5]
  },
  {
    title: "bob",
    description: 'Foto flow de Bob',
    imgArr: [3, 4, 5]

  }
]

FotoFlow.collection.drop();

 FotoFlow.create(flows, (err) => {
    if (err) { throw(err); }
    console.log(`Created ${flows.length} flows`);
    mongoose.connection.close();
  });