const { Op } = require('sequelize');
const servicesAdmin = require('../../../services/v1/admin');
const db = require('../../../models/index');

class controllerUserListForm {
    async listForm (req, res) {
        const classify = req.body.classify || 0;
        var dataForm;
        if (classify === '3') {
            dataForm = await servicesAdmin.findAll({where: {[Op.not]: [{status: classify}]}}, 'applicationForms');
        }
        else {
            dataForm = await servicesAdmin.findAll({where: {status: classify}}, 'applicationForms');
        }
        res.send(dataForm);
    }

    async detailForm (req, res) {
        servicesAdmin.innerJoin('singleTypes', 'applicationForms', {foreignKey: 'singleID', constraints: false})
        const innerJoin = await servicesAdmin.findOne({include: [{model: db.singleTypes, required: true}], where: {id: req.query.id}}, 'applicationForms');
        res.send(innerJoin);
    }

    async acceptForm (req, res) {
        // applicationForms inner join singleTypes
        await servicesAdmin.update({status: 1},{where: {id: req.query.id}}, 'applicationForms');
        servicesAdmin.innerJoin('singleTypes', 'applicationForms', {foreignKey: 'singleID', constraints: false})
        const innerJoin = await servicesAdmin.findOne({include: [{model: db.singleTypes, required: true}], where: {id: req.query.id}}, 'applicationForms');
        const notification = {
            userID: innerJoin.userID,
            formID: req.query.id,
            content: innerJoin.singleType.name + ' của bạn đã được phê duyệt', 
        }
        await servicesAdmin.create(notification, 'notifications');
        res.send(innerJoin);
    }

    async rejectForm (req, res) {
        await servicesAdmin.update({status: 2}, {where:{id: req.query.id}}, 'applicationForms');
        servicesAdmin.innerJoin('singleTypes', 'applicationForms', {foreignKey: 'singleID', constraints: false})
        const innerJoin = await servicesAdmin.findOne({include: [{model: db.singleTypes, required: true}], where: {id: req.query.id}}, 'applicationForms');
        const notification = {
            userID: innerJoin.userID,
            formID: req.query.id,
            content: innerJoin.singleType.name + ' của bạn đã bị từ chối phê duyệt', 
        }
        await servicesAdmin.create(notification, 'notifications');
        res.send(innerJoin);
    }
}

module.exports = new controllerUserListForm();