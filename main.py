import os
from flask import Flask, send_from_directory, request, session
from flask_cors import CORS
import mysql.connector
import hashlib

#CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, role INT, username VARCHAR(255), name VARCHAR(255), email VARCHAR(255), password VARCHAR(64), phone INT)
#INSERT INTO users (role, username, name, email, password, phone) VALUES (0, "paradox", "samson onyambu", "dev@me.com", "admin", 0791210705)
#CREATE TABLE sales (id INT AUTO_INCREMENT PRIMARY KEY, hotel VARCHAR(255), section VARCHAR(255), supervisor VARCHAR(255), waitstuff VARCHAR(255), target INT, actual INT, date VARCHAR(255))
#CREATE TABLE inventory (id INT AUTO_INCREMENT PRIMARY KEY, hotel VARCHAR(255), purchases INT, sales INT, opening INT, closing INT , date VARCHAR(255))
#CREATE TABLE buisness (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), type VARCHAR(255))

# con = mysql.connector.connect(
#   host="eporqep6b4b8ql12.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
#   user="g69oj8qro3rtnqj1",
#   password="aeosrm4kqv9akf96",
#   database="m7ukhlpb3u1u4yjb"
# )

con = mysql.connector.connect(
  host="localhost",
  user="sammy",
  password="sammy",
  database="hotelhub"
)
cur = con.cursor()

app = Flask(__name__, static_folder='frontend/dist')
app.secret_key = "secret"
CORS(app)
# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route("/test")
def test():
    return {"test":"Hello World"}

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    cur.execute("INSERT INTO users (role, username, name, email, password, phone) VALUES (%s, %s, %s, %s, %s, %s)", (data["role"], data["username"], data["name"], data["email"], hashlib.sha256(data["password"].encode()).hexdigest(), data["phone"]))
    con.commit()
    return {"status":"success"}

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    #login flow
    cur.execute("SELECT * FROM users WHERE username = %s AND password = %s", (data["username"], hashlib.sha256(data["password"].encode()).hexdigest()))
    user = cur.fetchone()
    if user:
        session["user"] = user
        return {"status":"success","response":{ "role":user[1], "username":user[2], "email":user[4]}}
    else:
        return {"status":"error","response":"Invalid username or password"}

@app.route("/getsales")
def getsales():
    #create 2d array of sales
    cur.execute("SELECT hotel, section, supervisor, waitstuff, target, actual, date FROM sales")
    sales = cur.fetchall()
    return {"sales":sales}

@app.route("/sales", methods=["POST"])
def sales():
    data = request.get_json()
    print(data)
    cur.execute("INSERT INTO sales (hotel, section, supervisor, waitstuff, target, actual, date) VALUES (%s, %s, %s, %s, %s, %s, %s)", (data["hotel"], data["section"], data["supervisor"], data["waitstuff"], data["target"], data["actual"], '-'.join(str(i) for i in data["datestamp"])))
    con.commit()
    return {"status":"success","response":""}

@app.route("/buisness", methods=["POST"])
def buisness():
    pass

@app.route("/session")
def sessioncheck():
    if session.get("user"):
        user = session["user"]
        return {"status":"success","response":{ "role":user[1], "username":user[2], "email":user[4]}}
    else:
        return {"status":"error","response":"Session expired"}

@app.route("/logout")
def logout():
    session.clear()
    return {"status":"success"}

@app.route("/getinventory")
def getinventory():
    pass

@app.route("/setinventory")
def setinventory():
    pass

if __name__ == '__main__':
    app.run(debug=True, port=os.getenv("PORT", default=5000),host="0.0.0.0")