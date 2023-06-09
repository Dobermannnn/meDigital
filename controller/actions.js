import  express  from "express";
const router = express.Router();
import Product from "../models/product.js";
import Category from "../models/category.js";



router.get('/dashboard' , async(req,res)=>{

    Category.findAll()
    .then(categories=> {
        res.render('index' , {
            pageTitle: 'Welcome admin',
            categories:categories
        })

    })
    .catch(error=>{
        res.render('index' , {
            pageTitle: 'Welcome admin' 
        })
    })



})



router.get('/product/:id' , async(req,res)=>{
    const id= req.params.id;
    Category.findByPk(id)
    .then(category=> {
        Product.findAll({where:{CategoryId:id}})
        .then(products=>{
            res.render('products' , {
                pageTitle: 'Edit '+ category.categoryname,
                category:category,
                Products:products
            })

        })

    })
    .catch(error=>{
        res.render('products' , {
            pageTitle: 'Welcome admin' 
        })
    })
})

router.get('/edit/:id' , async(req,res)=>{
    const id = req.params.id
    await Category.findAll()
    .then( categories=>{
        Product.findByPk(id)
        .then(Product=> {
            res.render('edit' , {
                pageTitle: 'Welcome admin',
                Product:Product,
                categories:categories
            })
        })
        .catch(error=>{
            console.log(error.message)
            res.render('edit' , {
                pageTitle: 'Welcome admin' 
            })
        })}
    )
    .catch(error=>{
        console.log(error.message)
        res.render('edit' , {
            pageTitle: 'Welcome admin' 
        })
    })
})





export default router;