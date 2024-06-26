import "dotenv/config.js";
import { MongoClient } from "mongodb";


const client = new MongoClient(process.env.MONGOURI);

async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connected to the MongoDB database");

    const db = client.db(process.env.MONGODBNAME);

    // const movies =  db
    //   .collection("movies")
    //   .find({ title: { $regex: "Despicable", $options: "i" } })
    //   .project({ title: 1 })
    //   .toArray();

    // console.log(movies);


    debugger;
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  } finally {
    await client.close();
  }
}

await connectToMongo();

const e1a = async () => {
  // return all movies released after the year 2000
  try {
    await client.connect();
    const db = client.db(process.env.MONGODBNAME);

    const movies2000 = await db
      .collection("movies")
      .find({ year: { $gt: 2000 } })
      .project({ title: 1 })
      .toArray();

    return movies2000;
  } catch (err) {
    console.log("Failed to get the language", err);
  } finally {
    await client.close();
  }
};


const e1b = async () => {
  // all distinct languages in all movies
  try {
    await client.connect();
    const db = client.db(process.env.MONGODBNAME);

    const moviesLang = await db.collection("movies").distinct("languages");

    return moviesLang;
  } catch (err) {
    console.log("Failed to get the movies", err);
  } finally {
    await client.close();
  }
};

const e1c = async () => {
  // all PG-13 movies casting Ryan Gosling , sorted by release date
  try {
    await client.connect();
    const db = client.db(process.env.MONGODBNAME);
    const appear = await db
      .collection("movies")
      .find({
        rated: "PG-13",
        cast: "Ryan Gosling",
      })
      .sort({ released: 1 })
      .project({ title: 1, released: 1 })
      .toArray();

    return appear;
  } catch (err) {
    console.log("Failed to get the movies", err);
  } finally {
    await client.close();
  }
};

const e1d = async () => {
   //Find number of movies per genre.
  try {
    await client.connect();
    const db = client.db(process.env.MONGODBNAME);
    const byGenres = await db
      .collection("movies")
      .aggregate([
        { $unwind: "$genres" },
        {
          $group: {
            _id: "$genres",
            count: { $sum: 1 },
          }
        },
      ])
      .toArray();

    return byGenres;
  } catch (err) {
    console.log("Failed to get the movies per genre", err);
  } finally {
    await client.close();
  }
};

const e1e = async () => {
    //  Insert a movie.
    try {
      await client.connect();
      const db = client.db(process.env.MONGODBNAME);
      const newMovie = {
        title:"full-stack Movie",
        directors: ["xavier"],
      };

      const result = await db
        .collection("movies")
        .insertOne(newMovie);
    } catch (err) {
      console.log("Failed to insert the movie", err);
    } finally {
      await client.close();
    }
  };

console.log(`All movies after year 2000 ----->`);
console.log(await e1a());

// console.log(`All distinct languages in all movies ----->`);
// console.log(await e1b());

// console.log(`All PG-13 movies casting Ryan Gosling , sorted by release date ----->`);
// console.log(await e1c());

// console.log(`Find number of movies per genre ----->`);
// console.log(await e1d());

// console.log(`Insert a movie ----->`);
// console.log(await e1e());
