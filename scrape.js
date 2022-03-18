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

                //Remove all characters except digits and decimal points and parse float
                //j equalse 0 for the first column: Country
                if (j != 0)
                  value = parseFloat(value.replace(/(?=\D)([^.])/g, ""));

                newObj[prepareColumnKey(cols[columnId])] = value;
                stream += `${value},`;
                columnId++;
              }
            });

          stream += "2018";
          newObj.year = 2018;
          newObj.stream = stream;

          data.push(newObj);
        });

      //Sorting data by Road death per million inhabitants
      data
        .sort(
          (a, b) =>
            a.roadDeathPerMillionInhabitants - b.roadDeathPerMillionInhabitants
        )
        //then looping on the sorted data to write in the CSV.
        .forEach((row) => {
          writeStream.write(row.stream);
        });
      console.log("Scraping Done..."); //Wohooo!
    }
  }
);

//Lower cases the first letter and remove white spaces between words
const prepareColumnKey = (key) => {
  key = key.slice(0, 1).toLowerCase() + key.slice(1);
  return key.replace(/\s/g, "");
};
