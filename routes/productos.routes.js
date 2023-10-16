const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
    res.json({msg: "mostrar productos"});
})

router.post("/", (req, res) => {
    res.json({msg: "eliminar producto"});
})

router.put("/:id", (req, res) => {
    res.json({msg: "editar producto"});
})

router.delete("/", (req, res) => {
    res.json({msg: "eliminar producto"});
})

module.exports = router;