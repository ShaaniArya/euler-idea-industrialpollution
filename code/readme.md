**Copy and run the Load CSV cypher in Neo4j**

**Once Neo4j DataSetup is complete, run below query to find yearwise disease, pollutant in all cities and possible industries responsible for it.**

MATCH (c:City)<-[r:REPORTED_IN]-(d:Disease)-[:RELATED_TO]->(p:Pollutants)<-[r1:HAS_POLLUTANTS]-(c) WHERE r.reportedYear=r1.reportedOnYr AND r1.reportedLevel>r1.maxPermissibleLevel
MATCH (p)-[:LINKED_TO]->()<-[]-(i:Industries)-[:IS_IN]->(c)
RETURN DISTINCT r.reportedYear AS Year, c.city AS City, p.pollutant as Pollutant, d.disease AS Disease, r.patientCount AS DiseaseCaseCount, i.industry AS Industry

**Output:**
![image](https://user-images.githubusercontent.com/85310413/120697621-96a91280-c4cb-11eb-8c89-e83aeb3a25aa.png)




**Run industrial_pollution_graphQL.js file and open Apollo Server at localhost:4000/**
**Query for Apollo Server (provide city name and year as input)-**

query{ 
potentialIndustries(city:"f", year:2016){ 
industry 
  } 
}

**Output:**
![image](https://user-images.githubusercontent.com/85310413/120697774-c35d2a00-c4cb-11eb-9fd5-1041a9dd1c54.png)
