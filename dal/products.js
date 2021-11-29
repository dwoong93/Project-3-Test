// #1 import in the Product model
const {Keyboardcase, Keyboardpcb, Keyboardplate, Keyboardswitch, Keyboardkeycap, Keyboardstabilizer, Category} = require('../models')

const getAllCategories = async ()=>{
    return await Category.fetchAll().map(function(category){
        return [category.get('id'), category.get('name')]
    })

}


const getAllKeyboardPcb = async ()=>{
    return await (await Keyboardpcb.fetchAll()).map(function(keyboardpcb){
        return[keyboardpcb.get('id'), keyboardpcb.get('name') ]
    })

}

const getAllKeyboardCase = async ()=>{
    return await (await Keyboardcase.fetchAll()).map(function(keyboardcase){
        return[keyboardcase.get('id'), keyboardcase.get('name') ]
    })

}

//keebcases
const getKeyboardCaseById = async(productId) => {
    return await Keyboardcase.where({
        'id': productId}).fetch({
            require: true,
            'withRelated': ['keyboardpcbs']
        });

} 



//keebpcb
const getKeyboardPcbById = async(productId) => {
    return await Keyboardpcb.where({
        'id': productId}).fetch({
            require: true,
            'withRelated': ['keyboardcases']
        });
    
} 

//keebplate
const getKeyboardPlateById = async(productId) => {
    return await Keyboardplate.where({
        'id': productId}).fetch({
            require: true
        });
    
} 

//keebStab
const getKeyboardStabilizerById = async(productId) => {
    return await Keyboardstabilizer.where({
        'id': productId}).fetch({
            require: true
        });
    
} 

//keebSwitch
const getKeyboardSwitchById = async(productId) => {
    return await Keyboardswitch.where({
        'id': productId}).fetch({
            require: true
        });
    
} 



//keebCap
const getKeyboardKeycapById = async(productId) => {
    return await Keyboardkeycap.where({
        'id': productId}).fetch({
            require: true
        });
    
} 

module.exports = {
    getAllCategories, getAllKeyboardCase, getAllKeyboardPcb, getKeyboardCaseById, 
    getKeyboardPcbById, getKeyboardPlateById, getKeyboardStabilizerById, 
    getKeyboardSwitchById, getKeyboardKeycapById
    }