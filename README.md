# EE-Drive-Server

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/EE-Drive/EE-Drive-Server">
    <img src="images/logo.png" alt="Logo">
  </a>

  <h3 align="center">EE-Drive-Server</h3>

  <p align="center">
    EE-Drive is a driver assist system that helps drivers to reduce their fuel consumption while driving. EE-Drive leverages machine learning techniques to learn the vehicle performance in different environments and locations, and builds an optimal model customized for a vehicle, road, and environmental conditions. The model is then used during a drive to constantly identify the actions the driver should take to optimize vehicle fuel consumption. In this way, the EE-Drive achieves significant reductions in fuel consumption. The principle of this system could be integrated in the future into the car systems themselves such as the cruise control or into an autonomous vehicle.
    <br />
    <a href="#">View Demo</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

### Server responsibilities

- Collect and aggregate the raw data from the clients.
- Create and save optimal drive models.
- Send the optimal model to the client upon request.

### Server functionality

- Save raw drive data to DB.
- Extract landmarks from the raw data using a customized K-means algorithm and save it to the DB.
- Create an optimal model graph for each route and insert it into the DB.
- Find all the models that have landmarks that correspond to the raw drive data.
- Normalize the raw data according to the graph model and insert the relevant data into it.
- Use the Dijkstra algorithm on the graph in order to determine the optimal model.
- Apply Dijkstra each time there is new data inserted into the graph.
- Upon getting a request for an optimal model from the client, get the model from the DB and send it to the client.

### API Endpoints

#### car type

- GET api/car-type => fetch all car types from the db.
- POST api/car-type => add a car type to the db.

```
{
  "companyName": "Comp",
  "bandName": "brand",
  "year": "2014",
  "engineDisplacement": "1200" //optional
}
```

- GET api/car-type/:id => get specific car type by a given id.
- POST api/car-type/:id => add a drive to a specific car type by a given id.

```
{
  "carTypeId": "601877ea72ac659498aab9ed",
    "driveRawData": [
      {
        "routeID": "5ff8e7412049ec4e8cfaf29b",
        "rawData": [
          {"lat": "35.43453", "long": "46.43453", "fuelCon": "6.42356", "speed": "92"}
        ]
      }
    ],
  "driverAssist": false
}
```

- PATCH api/car-type/:id => update specific car type by a given car type id. Can have in the body any number of the following keys: companyName, bandName, year, engineDisplacement.

```
{
    "companyName": "change"
}
```

- DELETE api/car-type/:id => delete specific car type by a given car type id.
- POST api/drive-csv/:id => add drive from csv (used for the old application data and is not recommended).

#### drive

- GET api/drive => fetch all drives from the db.
- POST api/drive => add a drive to a specific car type.

```
{
  "carTypeId":"60868d27754bdaec37bbffb4",
  "timeAndDate":"2021-03-16-23-26-03",
  "driverAssist":false,
  "driveRawData":[
    {
      "fuelCons":[33,4,5,6,7,8,9,9],
      "speeds":[3,4,5,6,7,8,9,9],
      "lat":"31.806492808102334",
      "long":"34.693973722527836"
    },
    {
      "lat":"31.826502750899788",
      "long":"34.69955733679958",
      "fuelCons":[3,4,5,6,7,8,9,9],
      "speeds":[3,4,5,6,7,8,9,9]
    },
    {
      "lat":"31.87275108620717",
      "long":"34.71805355436277",
      "fuelCons":[1,4,5,6,7,8,9,9],
      "speeds":[1,4,5,6,7,8,9,9]
    },
    {
      "lat":"31.93939241066041",
      "long":"34.74168621430044",
      "fuelCons":[3,4,5,6,7,8,9,9],
      "speeds":[3,4,5,6,7,8,9,9]
    },
    {
      "lat":"1",
      "long":"2",
      "fuelCons":[3,4,5,6,7,8,9,9],
      "speeds":[3,4,5,6,7,8,9,9]
    }
    ]
}
```

- GET api/drive/:id => get specific drive.
- POST api/drive/:id => add raw data to an existing drive.

```
{
  "driveRawData": [
    {
      "fuelCons":[33,4,5,6,7,8,9,9],
      "speeds":[3,4,5,6,7,8,9,9],
      "lat":"31.806492808102334",
      "long":"34.693973722527836"
    },
    {
      "lat":"31.826502750899788",
      "long":"34.69955733679958",
      "fuelCons":[3,4,5,6,7,8,9,9],
      "speeds":[3,4,5,6,7,8,9,9]
    }
  ]
}
```

- PATCH api/drive/:id => update specific drive. Will change drive data by a given drive id.

```
{
    "driveRawData": "change"
}
```

- DELETE api/drive/:id => delete specific drive.

#### model route

- GET api/model-route => fetch all car types from the db.
- POST api/model-route => add a model-routes to the db.

```
{
  "bL":{"lat": "", "long": ""},
  "bR":{"lat": "", "long": ""},
  "tL":{"lat": "", "long": ""},
  "tR":{"lat": "", "long": ""},
}
```

- GET api/model-route/:id => get specific model-route.
- PATCH api/model-route/:id => update specific model-route.

```
{
  "routeStartingPoint": {"lat": "32.43453", "long": "46.43453"}
}
```

- DELETE api/model-route/:id => delete specific model-route.
- POST api/model-route/add => add model route from a form.

```
{
  "bLLat": "",
  "bLLong": "",
  "bRLat": "",
  "bRLong": "",
  "tLLat": "",
  "tLLong": "",
  "tRLat": "",
  "tRLong": ""
}
```

#### optimal model

- GET api/optimal-model => fetch all optimal-models from the db.
- POST api/optimal-model => add a optimal-model to the db.

```
{
  "routeID": "5ff8e7412049ec4e8cfaf29b",
  "vertices": [
    {
      "vertexId": "5ff8e7412049ec4e8cfaf29b",
      "lat": "35.43453",
      "long": "46.43453",
      "speed": "120"
    },
    {
      "vertexId": "5ff7e7413049ec4e9cfab39f",
      "lat": "38.43453",
      "long": "47.43453",
      "speed": "110"
    }
  ],
  "edges": [
    {
      "vertexA": "5ff8e7412049ec4e8cfaf29b",
      "vertexB": "5ff7e7413049ec4e9cfab39f",
      "fuelCon": "6.48235"
    }
  ]
}
```

- GET api/optimal-model/:id => get specific optimal-model.
- PATCH api/optimal-model/:id => update specific optimal-model.

```
{
  "edges": [
    {
      "vertexA": "5ff7e7413049ec4e9cfab39f",
      "vertexB": "5ff8e7412049ec4e8cfaf29b",
      "fuelCon": "6.48235"
    }
  ]
}
```

- DELETE api/optimal-model/:id => delete specific optimal-model.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/EE-Drive/EE-Drive-Server.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

<!-- USAGE EXAMPLES -->

## Usage

<!-- CONTRIBUTING -->

## Contributing

1. Clone the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
