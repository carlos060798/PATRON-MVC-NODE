import  express from 'express';


const router = express.Router();


// rutas de usuario

router.get('/usuario', (req, res) => {
    res.json({
        ok: true,
        msg: 'get API'
    })
})

router.post('/usuario', (req, res) => {
  
    res.json({
        ok: true,
        msg: 'post API',
        body
    })
})

router.put('/usuario/:id', (req, res) => {
    res.json({
        ok: true,
        msg: 'put API',
        id
    })
})

router.delete('/usuario', (req, res) => {
    res.json({
        ok: true,
        msg: 'delete API'
    })
})

export default router;