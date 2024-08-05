const express = require('express')
const app = express()
const morgan = require('morgan');
const reqLogger = require('./utils/reqLogger')
const cors = require('cors')
require('express-async-errors')
const blogRouter = require('./controller/blogs')
const userRouter= require('./controller/users')
const loginRouter=require('./controller/login')
const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'));
// app.use(reqLogger)
app.use(middleware.tokenExtractor)
app.use('/api/blogs',middleware.userExtractor, blogRouter)
app.use('/api/user', userRouter)
app.use('/api/login',loginRouter);
app.use(reqLogger)









module.exports= app;