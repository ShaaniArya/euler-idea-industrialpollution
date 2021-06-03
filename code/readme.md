#**Once Neo4j DataSetup is complete**

#**Run industrial_pollution_graphQL.js file and open Apollo Server at localhost:4000/**

#**Query for Apollo Server (provide city name and year as input)-**

query{ 

potentialIndustries(city:"f", year:2016){ 

industry 

  } 

}
