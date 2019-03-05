const mongoose = require("mongoose");
const validUrl = require("valid-url");
const UrlShorten = require("../../models/UrlShorten");
const shortid = require("shortid");

const bodyParser = require("body-parser");


module.exports = app => {
  app.use( bodyParser.json() );       // to support JSON-encoded bodies

  app.get("/:code", async (req, res) => {
    const urlCode = req.params.code;
    console.log(urlCode);
    const item = await UrlShorten.findOne({ urlCode: urlCode });
    if (item) {
      console.log(item);
      return res.redirect(item.originalUrl);
    } else {
      console.log(item);
      return res.json("item not found");
    }
  });
  app.post("/api/item", async (req, res) => {
    console.log(req.body);
    console.log(req.body.originalUrl);
    const { originalUrl, shortBaseUrl } = req.body;
    const urlCode = shortid.generate();
    const updatedAt = new Date();
      try {
        const item = await UrlShorten.findOne({ originalUrl: originalUrl });
        if (item) {
          res.status(200).json(item);
        } else {
          shortUrl = shortBaseUrl + '/' + urlCode;
          const item = new UrlShorten({
            originalUrl,
            shortUrl,
            urlCode,
            updatedAt
          });
          await item.save();
          res.status(200).json(item);
        }
      } catch (err) {
        res.status(401).json("Invalid User Id");
      }
  });
};
