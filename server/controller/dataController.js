const fetch = require("node-fetch");
const Data = require("../models/Data");

class dataController {
  static async pushData(limit = 1000) {
    let imgWidth = 1920;
    let imgHeight = 1080;

    try {
      let array = await new Promise((res, rej) => {
        fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${limit}`)
        .then((response) => response.json())
        .then((response) => {
          response.forEach((item, index) => {
            item.url = `https://picsum.photos/${imgWidth}/${imgHeight}?random=${index++}`;
            item.tags = [`random_tag_${index}`, `random_tag_${Math.floor(Math.random() * 5) + 1}`]
          });
          res(response)
        })
        .catch((e) => rej(e));
      })
      await console.log(array)
      await Data.insertMany(array);
    } catch (e) {
      console.error(e);
    }
  }

  static async getData(req, res) {
    try {
      let data = await Data.find({});
      
      if (data.length === 0) {
        await this.pushData();
        data = await Data.find({});
      }
      
      if (!!req.body.user) {
        let {user} = req.body
        // console.log(user)
        return res.status(200).json({
          data,
          user,
        })
      }
      
      res.status(200).json({data});
    } catch (e) {
      // console.error(e);
      res.status(401).json({ message: "Ошибка подключения к базе данных" });
    }
  }
}

module.exports = dataController;
