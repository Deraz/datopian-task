# Datopian Task

Hello, this is Yehia Deraz from Cairo, Egypt. And, this is the README for the task.

## Installation

Use npm to install the project dependencies.

```bash
npm install
```

## Usage

You can run the script by running the below command in your terminal. You'll find the created CSV in the same directory under the name of `road_safety_in_europe.csv`.

```bash
node scrape
```

OR

```bash
npm start
```

## Algorithm

A constant is created for the columns names alongside with an empty array for the data. A request is made to the Wikipedia page and the response is parsed using `cheerio` by looping through all the `tr` and the `td` tags inside the requires table.

The script file is annotated with comments to help completing a feasible experience while reading the script.

## My Links

[LinkedIn](https://www.linkedin.com/in/deraz)

[GitHub](https://www.github.com/Deraz)
