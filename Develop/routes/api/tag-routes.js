const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    const tagData = await Tag.findAll({
    include:[{model: Tag}],
  });
  res.status(200).json(tagData);
}catch(err){
  res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  const tagData = await Tag.findByPk( req.params.id,{
    include:[{model:Tag}]
  });

  if(!tagData){
    res.status(404).json({message: 'No tag found'});
    return;
  }
  res.status(200).json(tagData);
});

router.post('/', async (req, res) => {
  try{
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  }catch(err){
    res.status(400).json(err);
  }
});

router.put('/:id',async (req, res) => {
  try{
    const tagData = await Tag.update(req.body,{
      where:{
        id: req.params.id,
      },
    });

    if(!tagData){
      res.status(400).json({message: 'No tag found'});
    }
    res.status(200).json(tagData);
  }catch(err){
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const tagData = await Tag.destroy({
      where:{
        id: req.params.id,
      },
    });

    if(!tagData){
      res.status(404).json({message: 'No tag found'});
    }

    res.status(200).json(tagData);
  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
