const { Op } = require('sequelize');
const servicesAdmin = require('../../../services/v1/admin');

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
        const detailForm = await servicesAdmin.findOne({where: {id: req.query.id}}, 'applicationForms');
        res.send(detailForm);
    }

    async acceptForm (req, res) {
        await servicesAdmin.update({status: 1},{where: {id: req.query.id}}, 'applicationForms');
        res.redirect('back');
    }

    async rejectForm (req, res) {
        await servicesAdmin.update({status: 2}, {id: req.query.id}, 'applicationForms');
        res.redirect('back');
    }
}

module.exports = new controllerUserListForm();