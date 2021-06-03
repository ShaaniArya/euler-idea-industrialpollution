const { Neo4jGraphQL } = require("@neo4j/graphql");
const neo4j = require("neo4j-driver");
const { ApolloServer } = require("apollo-server");

const typeDefs = `
    

    type Industries{
	industry: String
	}


    type Query{
	industry:[Industries]
	potentialIndustries(city: String ="d", year: Int = 2016): [Industries] @cypher(statement: """MATCH (c:City{city: $city})<-[r:REPORTED_IN]-(d:Disease)-[:RELATED_TO]->(p:Pollutants)<-[r1:HAS_POLLUTANTS]-(c) WHERE r.reportedYear=$year AND r1.reportedOnYr=$year AND r1.reportedLevel>r1.maxPermissibleLevel MATCH (p)-[:LINKED_TO]->()<-[]-(i:Industries)-[:IS_IN]->(c) RETURN DISTINCT i""")
	}
`;

const driver = neo4j.driver(
    "bolt://localhost:7687",
    neo4j.auth.basic("neo4j", "123456")
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });


const server = new ApolloServer({
    schema: neoSchema.schema,
    context: ({ req }) => ({ req }),
});

server.listen(4000).then(() => console.log("Online"));