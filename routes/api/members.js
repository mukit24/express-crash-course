const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');

router.get('/', (req, res) => res.json(members));

router.get('/:id', (req,res) => {
    const found = members.some(member => member.id == req.params.id);
    if(found){
        res.json(members.filter(member => member.id == req.params.id));
    }else{
        res.status(400).json({ 'msg': 'Sorry! Member not found'});
    }
})

router.post('/', (req,res)=>{
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email
    }

    if (!newMember.name || !newMember.email){
        return res.status(400).json({ msg: 'Please fill all data'});
    }

    members.push(newMember);
    res.json({msg: 'Member created'});
})

router.put('/:id', (req,res) => {
    const found = members.some(member => member.id == req.params.id);
    if(found){
        const updMember = req.body;
        members.forEach(member => {
            if(member.id == req.params.id){
                member.name = updMember.name ? updMember.name : member.name
                member.email = updMember.email ? updMember.email : member.email
                res.json({ msg: 'Updates', member});
            }
        })
    }else{
        res.status(400).json({ 'msg': 'Sorry! Member not found'});
    }
})

router.delete('/:id', (req,res) => {
    const found = members.some(member => member.id == req.params.id);
    if(found){
        res.json({msg : 'Deleted' , members : members.filter(member => member.id != req.params.id)});
    }else{
        res.status(400).json({ 'msg': 'Sorry! Member not found'});
    }
})

module.exports = router;