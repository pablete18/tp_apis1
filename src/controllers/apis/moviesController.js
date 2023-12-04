const db = require('../../database/models');
const sequelize = db.sequelize 

module.exports = {
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
                status: 200,
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