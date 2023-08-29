import os
from flask import Flask, send_from_directory, request, session
from flask_cors import CORS
import pymysql.cursors
import hashlib

#CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, role INT, username VARCHAR(255), name VARCHAR(255), email VARCHAR(255), password VARCHAR(64), phone INT)
#CREATE TABLE admission (id INT AUTO_INCREMENT PRIMARY KEY, role INT, username VARCHAR(255), name VARCHAR(255), email VARCHAR(255), password VARCHAR(64), phone INT)
#CREATE TABLE sales (id INT AUTO_INCREMENT PRIMARY KEY, hotel VARCHAR(255), section VARCHAR(255), supervisor VARCHAR(255), waitstuff VARCHAR(255), target INT, actual INT, date VARCHAR(255))
#CREATE TABLE inventory (id INT AUTO_INCREMENT PRIMARY KEY, hotel VARCHAR(255), purchases INT, sales INT, opening INT, closing INT , date VARCHAR(255))
#CREATE TABLE buisness (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), type VARCHAR(255))

con = pymysql.connect(
  host="eporqep6b4b8ql12.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
  user="g69oj8qro3rtnqj1",
  password="aeosrm4kqv9akf96",
  database="m7ukhlpb3u1u4yjb"
)

# con = pymysql.connect(
#   host="localhost",
#   user="sammy",
#   password="sammy",
#   database="hotelhub"
# )

app = Flask(__name__, static_folder='frontend/dist')
app.secret_key = "secret"
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_COOKIE_SECURE'] = True
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
    with con.cursor() as cur:
        cur.execute("INSERT INTO admission (role, username, name, email, password, phone) VALUES (%s, %s, %s, %s, %s, %s)", (data["role"], data["username"], data["name"], data["email"], hashlib.sha256(data["password"].encode()).hexdigest(), data["phone"]))
        con.commit()
    return {"status":"success"}

@app.route("/lobby", methods=["GET"])
def lobby():
    #get users from admission
    with con.cursor() as cur:
        cur.execute("SELECT id, role, name FROM admission")
    users = cur.fetchall()
    return {"status":"success","response":users}

@app.route("/admit", methods=["GET"])
def admit():
    #transfer users from admission to users
    data = request.args #contains choice and id
    with con.cursor() as cur:
        cur.execute("SELECT * FROM admission WHERE id = %s", (data["id"],))
        user = cur.fetchone()
        if data.get('choice') == "yes":
            cur.execute("INSERT INTO users (role, username, name, email, password, phone) VALUES (%s, %s, %s, %s, %s, %s)", (user[1], user[2], user[3], user[4], user[5], user[6]))
            con.commit()
            cur.execute("DELETE FROM admission WHERE id = %s", (data["id"],))
            con.commit()
        elif data.get('choice') == "no":
            cur.execute("DELETE FROM admission WHERE id = %s", (data["id"],))
            con.commit()
        return {"status":"success","response":{"user":user[3],"role":user[1]}}

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    #check if user is in admission table if in admission table return error
    with con.cursor() as cur:
        cur.execute("SELECT * FROM admission WHERE username = %s AND password = %s", (data["username"], hashlib.sha256(data["password"].encode()).hexdigest()))
        user = cur.fetchone()
        if user:
            return {"status":"error","response":"Waiting for approval"}
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
    with con.cursor() as cur:
        cur.execute("SELECT hotel, section, supervisor, waitstuff, target, actual, date FROM sales")
        sales = cur.fetchall()
        return {"sales":sales}

@app.route("/sales", methods=["POST"]) #insert into sales DB
def sales():
    data = request.get_json()
    with con.cursor() as cur:
        cur.execute("INSERT INTO sales (hotel, section, supervisor, waitstuff, target, actual, date) VALUES (%s, %s, %s, %s, %s, %s, %s)", (data["hotel"], data["section"], data["supervisor"], data["waitstuff"], data["target"], data["actual"], data["datestamp"]))
        con.commit()
        return {"status":"success","response":""}

@app.route("/session")
def sessioncheck():
    user = session.get("user")
    if user:
        return {"status":"success","response":{ "role":user[1], "username":user[2], "email":user[4]}}
    else:
        return {"status":"error","response":"Session expired"}

@app.route("/logout")
def logout():
    session.clear()
    return {"status":"success"}

@app.route("/getinventory")
def getinventory():
    with con.cursor() as cur:
        cur.execute("SELECT hotel, purchases, sales, opening, closing, date FROM inventory")
        inventory = cur.fetchall()
        return {"status":"success","response":inventory}

@app.route("/setinventory", methods=["POST"])
def setinventory():
    #insert into inventory DB
    data = request.get_json()
    with con.cursor() as cur:
        cur.execute("INSERT INTO inventory (hotel, purchases, sales, opening, closing, date) VALUES (%s, %s, %s, %s, %s, %s)", (data["hotel"], data["purchases"], data["sales"], data["opening"], data["closing"], data["datestamp"]))
        con.commit()
        return {"status":"success","response":""}

@app.route("/buisnesses")
def buisnesses():
    with con.cursor() as cur:
        cur.execute("SELECT name, type FROM buisness")
        buisnesses = cur.fetchall()
        # select all unique users from users table
        cur.execute("SELECT DISTINCT name,role FROM users")
        users = cur.fetchall()
        return {"status":"success","response":{"buisnesses":buisnesses,"users":users}}


@app.route("/addbuisness", methods=["POST"])
def addbuisness():
    #insert into buisness DB
    data = request.get_json()
    with con.cursor() as cur:
        cur.execute("INSERT INTO buisness (name, type) VALUES (%s, %s)", (data["name"], data["type"]))
        con.commit()
        return {"status":"success","response":""}

if __name__ == '__main__':
    app.run(debug=False, port=os.getenv("PORT", default=5000),host="0.0.0.0")