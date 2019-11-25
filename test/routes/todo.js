var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var expect = chai.expect;
var todo = require('../../models/todo')
var server = require('../../app');
var title = 'foo';

chai.use(chaiHttp);

describe('todo function', function () {

    before(done => {
        todo.deleteMany({},
            { new: true }
        ).exec(() => {
            done()
        })
    })

    it("add todo should show OK", function (done) {
        chai.request(server)
            .post('/')
            .send({
                title: 'Tugas MTK',
                description: 'Ada pr halaman 20',
                dueDate: '2019-12-10',
                priority: 'high',
                status: '0'
            })  
            .end(function (err, res) {
                expect(res).to.have.status(200)
                expect(res).to.have.a('object')
                done()
            })
    })

    it("add wrong todo should show ERROR", function (done) {
        chai.request(server)
            .post('/')
            .send()
            .end(function (err, res) {
                expect(res).to.have.status(406)
                expect(res).to.have.a('object')
                done()
            })
    })


    it("show all list todo must be OK", function (done) {
        chai.request(server)
            .get('/')
            .end(function (err, res) {
                expect(res).to.have.status(200)
                expect(res).to.be.a('object')
                done()
            })
    })



    it("show list by title should show OK", function (done) {
        chai.request(server)
            .get(`/${title}`)
            .end(function (err, res) {
                expect(res).to.have.status(200)
                expect(res).to.be.a('object')
                done()
            })
    })

    it("update todo by title should show OK", function (done) {
        chai.request(server)
            .put(`/${title}`)
            .send({
                description: 'halaman 102'
            })
            .end(function (err, res) {
                expect(res).to.have.status(201)
                expect(res).to.be.a('object')
                done()
            })
    })

    it("update wrong todo by title should show ERROR", function (done) {
        chai.request(server)
            .put(`/${title}`)
            .send({
                status: 'complete'
            })
            .end(function (err, res) {
                expect(res).to.have.status(406)
                expect(res).to.be.a('object')
                done()
            })
    })

    it("delete todo by title should show OK", function (done) {
        chai.request(server)
            .delete(`/${title}`)
            .end(function (err, res) {
                expect(res).to.have.status(200)
                expect(res).to.be.a('object')
                done()
            })
    })

    after(function () {
        mongoose.connection.close();
    })
})