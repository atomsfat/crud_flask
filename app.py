# -*- coding: utf-8 -*-
from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.secret_key = "Secret Key"

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://atoms:1234@localhost:5432/test_data'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class Data(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    phone = db.Column(db.String(100))

    def __init__(self, name, email, phone):
        self.name = name
        self.email = email
        self.phone = phone


@app.route('/')
def index():
    all_data = Data.query.all()
    return render_template('index.html', employees=all_data)


@app.route('/insert', methods=['POST'])
def insert():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        phone = request.form['phone']

        rdata = Data(name, email, phone)
        db.session.add(rdata)
        db.session.commit()
        flash("Employee inserted sucessfully")
        return redirect(url_for('index'))


@app.route('/update', methods=['POST'])
def update():
    if request.method == 'POST':
        id = request.form.get('id')
        dbData = Data.query.get(id)

        dbData.name = request.form['name']
        dbData.email = request.form['email']
        dbData.phone = request.form['phone']

        db.session.commit()
        flash("Employee updated sucessfully")
        return redirect(url_for('index'))


@app.route('/delete/<id>', methods=['POST'])
def delete(id):
    if request.method == 'POST':

        dbData = Data.query.get(id)
        print(dbData)
        db.session.delete(dbData)
        db.session.commit()
        flash("Employee updated sucessfully")
        return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True)
