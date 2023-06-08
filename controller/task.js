import  express, { response }  from "express";
const router = express.Router();
import Product from "../models/product.js";
import Category from "../models/category.js";


//remove category
router.post('/delete/:id' , async(req,res)=>{
    const id=req.params.id;
    await Category.destroy({ where: { id: id } })
    .then(result =>{
        Product.destroy({ where: { CategoryId: id } })
        console.log(result)
        return res.redirect('/dashboard')
    })
    .catch(error=>{
        console.log(error.message)
        return res.redirect('/dashboard')
    })
})

//remove product
router.post('/delete_prod/:prodid/:catid' , async(req,res)=>{
    const categoryid=req.params.catid;
    const productid=req.params.prodid;
    await Product.destroy({ where: { id: productid } })
    .then(result =>{
        console.log(result)
        return res.redirect('/product/'+categoryid)
    })
    .catch(errorr=>{
        console.log(errorr.message)
        return res.redirect('/product/'+categoryid)
    })
})


router.post('/edit_category/:id' , async(req,res)=>{
    const {categoryname,categorymainImage}=req.body;
    const id=req.params.id;
    await Category.update({categoryname:categoryname ,categorymainImage:categorymainImage },{ where: { id: id } })
    .then(result =>{
        console.log(result)
        return res.redirect('/product/'+id)
    })
    .catch(error=>{
        console.log(error.message)
        return res.redirect('/product/'+id)
    })
})
//edit product
router.post('/edit_product/:id' , async(req,res)=>{
    const {Productname,productImage,Productprice,unitInStock,productDescription,isAvailable ,CategoryId}=req.body;
    const id=req.params.id;
    const categoryid=CategoryId;
    await Product.update({productname:Productname ,productImage:productImage,productprice : Productprice,unitInStock : unitInStock,productDescription : productDescription,isAvailable:isAvailable,CategoryId:categoryid },{ where: { id: id } })
    .then(result =>{
        console.log(result)
        return res.redirect('/product/'+categoryid)
    })
    .catch(error=>{
        console.log(error.message)
        return res.redirect('/dashboard')
    })
})



router.post('/add_product/:id' , async(req,res)=>{
    const {productname,productprice,productImage,productDescription,isAvailable,unitInStock}=req.body;
    const CategoryId= req.params.id;

    Product.create({
        productname:productname,
        productprice:productprice,
        productImage:productImage,
        productDescription:productDescription,
        isAvailable:isAvailable,
        unitInStock:unitInStock,
        CategoryId:CategoryId
    })
    .then(result =>{
        console.log(result)
        return res.redirect('/product/'+CategoryId)
    })
    .catch(errorr=>{
        console.log(errorr.message)
        return res.redirect('/product/'+CategoryId)
    })
})



router.post('/add_category' , async(req,res)=>{
    const {categoryname,categorymainImage}=req.body;
    Category.create({
        categoryname:categoryname,
        categorymainImage:categorymainImage
    })
    .then(result =>{
        console.log(result)
        return res.redirect('/dashboard')
    })
    .catch(error=>{
        console.log(error.message)
        return res.redirect('/dashboard')
    })
})

//searchbar
router.post('/getprod' , async(req,res)=>{
    const {searchBarRes}=req.body;
    await Product.findOne({where:{productname:searchBarRes}})
    .then(prod=> {
       res.redirect("/edit/"+prod.id)
    })
    .catch(error=>{
        Category.findAll().then(categories=>{
            res.render('index' , {
                pageTitle: 'Welcome admin',
                categories:categories
            })
        })
        .catch(error=>{
            res.render('/dashboard' , {
                pageTitle: 'Welcome admin' 
            })
        })
        
    })
})

export default router;