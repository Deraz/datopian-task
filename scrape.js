const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const writeStream = fs.createWriteStream("road_safety_in_europe.csv");

const cols = [
  "Country",
  "Area",
  "Population",
  "GDP Per Capita",
  "Population Density",
  "Vehicle Ownership",
  "Total Road Deaths",
  "Road Death Per Million Inhabitants",
];

const data = [];

// Write Headers
cols.forEach((column, i) => {
  writeStream.write(`${column},`);
});
writeStream.write("Year");

request(
  "https://en.wikipedia.org/wiki/Road_safety_in_Europe",
  (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      const table = $(".sortable");
      table
        .find("tbody tr")
        .slice(1)
        .each((i, row) => {
          writeStream.write("\n");
          let newObj = {};
          let columnId = 0;
          $(row)
            .find("td")
            .each((j, td) => {
              if (j < 9 && j != 6) {
                let value = $(td).text().trim().replace(/,/g, "");
                let indexOfSpecialCharacter = value.indexOf("†");
                if (indexOfSpecialCharacter > -1)
                  value = value.substring(0, indexOfSpecialCharacter);
                newObj[cols[columnId].replace(/\s/g, "")] = value;
                writeStream.write(`${value},`);
                columnId++;
              }
            });
          writeStream.write("2018");
          data.push(newObj);
        });

      console.log(data);

      console.log("Scraping Done...");
    }
  }
);
