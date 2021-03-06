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

#### /api/routeModel

- GET - server receives on the body of the request: car type object and Geo samples; return the entire model of the route.
- POST - server receives raw data, adds it to the DB; returns if succeeded or not.

#### /api/routeModel/:routeOptimalModelId

- GET - server receives on the body of the request: model timestamp and from the endpoint the optimal model ID; returns the model if it was updated.

### Built With

- []()
- []()
- []()

<!-- GETTING STARTED -->

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

<!-- ROADMAP -->

## Roadmap

### car type
  - GET api/car-type => fetch all car types from the db.
  - POST api/car-type => add a car type to the db.
  - GET api/car-type/:id => get specific car type.
  - POST api/car-type/:id => add a drive to a specific car type.
  - PATCH api/car-type/:id => update specific car type.
  - DELETE api/car-type/:id => delete specific car type.
  - POST api/drive-csv/:id => add drive from csv.
 
### drive
  - GET api/drive => fetch all drives from the db.
  - POST api/drive => add a drive to a specific car type.
  - GET api/drive/:id => get specific drive.
  - POST api/drive/:id => add raw data to an existing drive.
  - PATCH api/drive/:id => update specific drive.
  - DELETE api/drive/:id => delete specific drive.
   
### model route
  - GET api/model-route => fetch all car types from the db.
  - POST api/model-route => add a model-routes to the db.
  - GET api/model-route/:id => get specific model-route.
  - PATCH api/model-route/:id => update specific model-route.
  - DELETE api/model-route/:id => delete specific model-route.
  
### optimal model
  - GET api/optimal-model => fetch all optimal-models from the db.
  - POST api/optimal-model => add a optimal-model to the db.
  - GET api/optimal-model/:id => get specific optimal-model.
  - PATCH api/optimal-model/:id => update specific optimal-model.
  - DELETE api/optimal-model/:id => delete specific optimal-model.
 

See the [open issues](https://github.com/EE-Drive/EE-Drive-Server/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

1. Clone the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
