const reqLogger = (req,res)=>{
    console.log('METHOD NAME' ,req.method)
    console.log('PATH',req.path)
    req.method=='POST' && console.log('BODY',req.body)
    console.log('RES',res.body)
    console.log('---')

}


module.exports = reqLogger