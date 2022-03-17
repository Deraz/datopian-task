const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const writeStream = fs.createWriteStream("data/road_safety_in_europe.csv");

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
        .find("tbody tr") //Finding all rows
        .slice(1) //Removing headers (First Row - rows[0])
        .each((i, row) => {
          //New line before each row
          let stream = "\n";

          let newObj = {};
          let columnId = 0;
          $(row)
            .find("td")
            //looping on columns for each row
            .each((j, td) => {
              if (j < 9 && j != 6) {
                //Remove commas as it conflicts with CSVs, obviously.
                let value = $(td).text().trim().replace(/,/g, "");

                //Remove Special Character "†" and the following letter
                let indexOfSpecialCharacter = value.indexOf("†");
                if (indexOfSpecialCharacter > -1)
                  value = value.substring(0, indexOfSpecialCharacter);

                newObj[cols[columnId].replace(/\s/g, "")] =
                  j == 0 ? value : parseInt(value);

                stream += `${value},`;
                columnId++;
              }
            });

          stream += "2018";
          newObj.Year = 2018;
          newObj.Stream = stream;

          data.push(newObj);
        });

      //Sorting data by Road death per million inhabitants
      data
        .sort(
          (a, b) =>
            a.RoadDeathPerMillionInhabitants - b.RoadDeathPerMillionInhabitants
        )
        //then looping on the sorted data to write in the CSV.
        .forEach((row) => {
          writeStream.write(row.Stream);
        });

      console.log("Scraping Done..."); //Wohooo!
    }
  }
);
