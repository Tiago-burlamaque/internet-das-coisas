import express from 'express'
import cors from 'cors'

const app = express()


app.get('/', (req, res) => {
  res.send('Hello World!')
})

// module.exports =  app;

export default app