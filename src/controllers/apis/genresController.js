const db = require('../../database/models');
const sequelize = db.sequelize;

module.exports = {
    list: (req,res)=>{
        db.Genre.findAll()
        .then(genres=>{
               return res.json({
                meta : [{
                    status:200,
                    total: genres.length,
                    url : "apis/genres"
                }
                ],
                data : genres                     
                })
        })

        
    },
    
    detail: (req,res)=>{        
            db.Genre.findByPk(req.params.id)
                .then(genre => {
                    res.json(genre);
                });

        }
    
    }
