
var mongoose = require("mongoose");
var Pokemon = mongoose.model("pokemon");

//GET - Return all pokemon in the DB
exports.findAllpokemon = function (req, res) {
  Pokemon.find(function (err, pokemon) {
    if (err) res.send(500, err.message);

    console.log("GET /pokemon");
    res.status(200).jsonp(pokemon);
  });
};
//GET - Return a pokemon with specified ID
exports.findById = function(req, res) {
	Pokemon.findById(req.params.id, function(err, pokemon) {
    if(err) return res.send(500, err.message);

    console.log('GET /pokemon/' + req.params.id);
		res.status(200).jsonp(pokemon);
	});
};


//POST - Insert a new pokemon in the DB
exports.addpokemon = function (req, res) {
    console.log("POST");
    console.log(req.body);
  
    var pokemon = new Pokemon({
      nombre: req.body.nombre,
      numero: req.body.numero,
      generacion: req.body.generacion,
      region: req.body.region,
      tipo: req.body.tipo,
      evolucion: req.body.evolucion,
      legendario: req.body.legendario,
      cantidad: req.body.cantidad,
      precio: req.body.precio,
      _pokemonId :req.body._pokemonId,
    });
  
    pokemon.save(function (err, pokemon) {
      if (err) return res.status(500).send(err.message);
      res.status(200).jsonp(pokemon);
    });
  };
  //PUT - Update a register already exists
exports.updatepokemon = function (req, res) {
    Pokemon.findById(req.params.id, function (err, pokemon) {
      pokemon.nombre = req.body.petId;
      pokemon.numero = req.body.numero;
      pokemon.generacion = req.body.generacion;
      pokemon.region = req.body.region;
      pokemon.tipo = req.body.tipo;
      pokemon.evolucion = req.body.evolucion;
      pokemon.legendario = req.body.legendario;
      pokemon.cantidad= req.body.cantidad,
      pokemon.precio= req.body.precio,
      pokemon._pokemonId =req.params.id,
      pokemon.save(function (err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).jsonp(pokemon);
      });
    });
  };

  //DELETE - Delete a pokemon with specified ID
////exports.deletepokemon = function (req, res) {
  //pokemon.findById(req.params.id, function (err, pokemon) {
    //pokemon.remove(function (err) {
      //if (err) return res.status(500).send(err.message);
      //res.status(200).send();
    //});
  //});
//};

//delete option

exports.deletePokemon = async function(req,res) {
try {
let id = req.params.id;
let result = await Pokemon.deleteOne({_id:id})
if(result) {
console.log('DELETE /pokemon/' + req.params.id);
return res.status(200).send({result: "Pokemon has been deleted"});
}
return res.status(200).send({result: "Not able to delete"})
}catch(error) {
  return res.status(200).send({message: error.message})
}

}
