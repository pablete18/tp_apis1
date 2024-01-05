const db = require('../../database/models');
const sequelize = db.sequelize 

module.exports = {
     list : (req,res)=>{
        db.Movie.findAll()
        .then(movies=>{
            return res.json({
                meta :[{
                    status:200,
                    total: movies.length,
                    url : "api/movies/"
                }],
                data : movies
            })
        })
      
    },
    detail:(req,res) =>{
        let id = req.params.id;
        db.Movie.findByPk(id)
            .then(movie =>{
                res.json(movie)
            });
    },
    create :(req,res) =>{
     
  
    db.Movie.create(
    {
       title: req.body.title,
       rating: req.body.rating,
       length: req.body.length,
       awards: req.body.awards,
       release_date: req.body.release_date,
       genre_id: req.body.genre_id              
       
   } 
)
.then(confirm =>{
    let response;
    if(confirm){
        response ={
            meta:{
                status: 200,
                total:confirm.length,
                url:'api/movies'
            },
            data:confirm
        }
    }else{
        response ={
            meta: {
                status: 204,
                total: confirm.length,
                url:'api/movies/'
            },
            data:confirm
        }
    }
    res.json(response)
})
.catch(error => res.send(error))
},
update : async(req,res)=>{
    try {
        const {title,rating,awards,release_date,length} = req.body
        const movie = await db.Movie.findByPk(req.params.id)

        await db.Movie.update(
            {
                title : title,
                rating,
                awards : awards || 0,
                release_date,
                length
            },
            {
                where :{
                    id : req.params.id,
                }
               
            }
        )
       await movie.reload();

        return res.status(200).json({
            ok:true,
            msg : "pelicula actualizada con exito",
            data: movie
        })

    } catch (error) {
        return res.status(error.status || 500).json({
            ok:false,
            msg: error.message
        })
        
    }      

},
destroy: (req,res)=>{
    let movieId = req.params.id;
        db.Movie
        .destroy({where: {id: movieId}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then((confirm)=>{
            let response;
            if(confirm){
                response = {
                    meta:{
                        status:200,
                        total: confirm.length,
                        url:'api/movies/:id'
                    },
                    data:confirm
                }
            }else{
                response = {
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/movies/:id'
                    },
                    data:confirm
                }
            }
            return res.json(response)
        })
        .catch(error => res.send(error)) 

}
}