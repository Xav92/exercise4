import "dotenv/config";
import mongoose from "mongoose";

async function connectToDatabase() {
  const uri = process.env.MONGOURI;
    
  if (!uri) {
    throw new Error("Missing MONGOURI environment variable");
  }

  try{
    await mongoose.connect(uri,{
        dbName:process.env.MONGODBNAME,
    });
  }catch(error){
    console.log("Error connection to MongoDB", error.message);
    process.exit(1);
  };


//   await mongoose.connect(uri);
  
}

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  director: { type: String, required: true },
  genre: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Movie = mongoose.model("Movie", movieSchema);

async function getOneMovie() {
  try {
    const movies = await Movie.findOne({});
    console.log("A movie", movies);
  } catch (err) {
    console.error("Error fetching movies:", err.message);
  }
}


async function main() {
  try {
    await connectToDatabase();
    await getOneMovie();

  } catch (err) {
    console.log(`It blew up! ${err}`);
    process.exit(1);
  } finally {
    mongoose.connection.close();
  }
}

await main();

const e2a = async () => {
    // return all movies released after the year 2000
    try {
        await connectToDatabase();
      const movies2000 = await Movie
          .find({year: {$gt: 2000}});
          return movies2000;
      }catch(err) {
      console.log("Failed to get the movies", err.message);
      
      
  }
 finally {
    mongoose.connection.close();
  }
  };

  const e2b = async () => {
      //all distinct languages in all movies
    try {
        await connectToDatabase();
      const moviesLang = await Movie
          .distinct("languages");

          return moviesLang;
      }catch(err) {
      console.log("Failed to get the languages", err.message);
      
      
  }
  finally {
    mongoose.connection.close();
  }
  };

  const e2c = async () => {
  // all PG-13 movies casting Ryan Gosling , sorted by release date
  try {
      await connectToDatabase();
    const appear = await Movie
    .find({
      rated: "PG-13",
      cast: "Ryan Gosling",
    })
    .sort({ released: 1 })

        return appear;
    }catch(err) {
    console.log("Failed to get the movies", err.message);
    
}
finally {
    mongoose.connection.close();
  }
};

const e2d = async () => {
    //Find number of movies per genre.
  try {
      await connectToDatabase();
    const byGenres = await Movie
    .aggregate([
        { $unwind: "$genres" },
        {
          $group: {
            _id: "$genres",
            count: { $sum: 1 },
          }
        },
      ])
      return byGenres;
    }catch(err) {
    console.log("Failed to get the movies", err.message);
    
}
finally {
    mongoose.connection.close();
  }
};

const e2e = async () => {
    //Insert a movie.
  try {
      await connectToDatabase();
    const newMovie = await Movie
    .insertMany({
        title: "full-stack2 Movie",
        year: 2024,
        director:"xavier",
        genre:  "drama" ,
      }
    );
        return newMovie;
    }catch(err) {
    console.log("Failed to insert movie", err.message);
    
}
finally {
  mongoose.connection.close();
}
};

const e2f = async () => {
    //Insert a movie.
  try {
      await connectToDatabase();
    const newMovie = await Movie
    .insertMany({
        title: "full-stack3 Movie",
        year: "whatever",
        director:"xavier",
        genre:  "drama" ,
      }
    );
        return newMovie;
    }catch(err) {
    console.log("Failed to insert movie", err.message);
    
}
finally {
  mongoose.connection.close();
}
};

const e2g = async () => {
    // return all movies released after the year 2000
    try {
        await connectToDatabase();
      const findDirector = await Movie
          .find({director: "xavier"});
          return findDirector;
      }catch(err) {
      console.log("Failed to get the movies", err.message);
      
      
  }
 finally {
    mongoose.connection.close();
  }
  };



// console.log(`All movies after year 2000 ----->`);
//     console.log(await e2a() );

// console.log(`All distinct languages in all movies ----->`);
//     console.log(await e2b());

// console.log(`all PG-13 movies casting Ryan Gosling , sorted by release date ----->`);
//     console.log(await e2c());

// console.log(`Find number of movies per genre----->`);
//     console.log(await e2d());

// console.log(`insert movie ----->`);
//     console.log(await e2e());

// console.log(`insert movie ----->`);
//     console.log(await e2f());

console.log(`insert movie ----->`);
    console.log(await e2g());

