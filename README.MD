<h1 align="center">HousesParser</h1>


## Task:
Write a parser of houses on the street. There are ranges of houses that are recorded in a human-friendly view. It is necessary to determine from these records whether a specific house number is included in the range.

## Installation
Installing dependencies: `npm i`

Run: `npm start`

Test: `npm test`

## Usage

```js
import { HousesParser } from "./pathToMainFile";
new HousesParser('7/1нечетные с 21 11,17 17/1,17/2,8/2,15,15/1,15-17,15ачетные 42+').isHouseIncluded('42')
```