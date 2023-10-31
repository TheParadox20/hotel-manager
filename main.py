import os
from flask import Flask, send_from_directory, request, session, send_file, make_response
from flask_cors import CORS
import mysql.connector
import hashlib

#CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, role INT, username VARCHAR(255), name VARCHAR(255), buisness VARCHAR(255), password VARCHAR(64), phone INT)
#CREATE TABLE admission (id INT AUTO_INCREMENT PRIMARY KEY, role INT, username VARCHAR(255), name VARCHAR(255), buisness VARCHAR(255), password VARCHAR(64), phone INT)
#CREATE TABLE sales (id INT AUTO_INCREMENT PRIMARY KEY, hotel VARCHAR(255), section VARCHAR(255), supervisor VARCHAR(255), waitstuff VARCHAR(255), target INT, actual INT, date VARCHAR(255))
#CREATE TABLE inventory (id INT AUTO_INCREMENT PRIMARY KEY, hotel VARCHAR(255), purchases INT, grossales INT, netsales INT,  opening INT, closing INT , date VARCHAR(255))
#CREATE TABLE targets (id INT AUTO_INCREMENT PRIMARY KEY, buisness VARCHAR(255), manager VARCHAR(255), section VARCHAR(255), supervisor VARCHAR(255), waitstuff VARCHAR(255), note VARCHAR(255), amount INT, date VARCHAR(20))
#CREATE TABLE buisness (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), type VARCHAR(255))
#CREATE TABLE sections (id INT AUTO_INCREMENT PRIMARY KEY, buisness VARCHAR(255), name VARCHAR(255))

# con = mysql.connector.connect(
#   host="q0h7yf5pynynaq54.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
#   user="gy5j42gpyobqtvwo",
#   password="lkvtu6t4jiwypttw",
#   database="myuskezvmard4yzb"
# )

con = mysql.connector.connect(
  host="localhost",
  user="sammy",
  password="sammy",
  database="hotelhub"
)
cur = con.cursor(buffered=True)

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
    cur.execute("SELECT * FROM buisness WHERE name = %s", (data["buisness"],))
    buisness = cur.fetchone()
    if not buisness and data["role"] != 4:
        return {"status":"error","response":"Buisness does not exist"}
    cur.execute("INSERT INTO admission (role, username, name, buisness, password, phone) VALUES (%s, %s, %s, %s, %s, %s)", (data["role"], data["username"], data["name"], data["buisness"], hashlib.sha256(data["password"].encode()).hexdigest(), data['phone']))
    con.commit()
    return {"status":"success"}

@app.route("/lobby", methods=["GET"])
def lobby():
    #get users from admission
    cur.execute("SELECT id, role, name FROM admission")
    users = cur.fetchall()
    return {"status":"success","response":users}

@app.route("/admit", methods=["GET"])
def admit():
    #transfer users from admission to users
    data = request.args #contains choice and id
    cur.execute("SELECT * FROM admission WHERE id = %s", (data["id"],))
    user = cur.fetchone()
    if data.get('choice') == "yes":
        cur.execute("INSERT INTO users (role, username, name, buisness, password, phone) VALUES (%s, %s, %s, %s, %s, %s)", (user[1], user[2], user[3], user[4], user[5], user[6]))
        con.commit()
        cur.execute("DELETE FROM admission WHERE id = %s", (data["id"],))
        con.commit()
    elif data.get('choice') == "no":
        cur.execute("DELETE FROM admission WHERE id = %s", (data["id"],))
        con.commit()
    return {"status":"success","response":{"user":user[3],"role":user[1]}}

@app.route("/addUser", methods=["POST"])
def addUser():
    data = request.get_json()
    cur.execute("INSERT INTO users (role, username, name, buisness, password) VALUES (%s, %s, %s, %s, %s)", (data['role'], data['username'], data['name'], data['buisness'], hashlib.sha256("user".encode()).hexdigest()))
    con.commit()
    return {"status":"success","response":""}

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    #check if user is in admission table if in admission table return error
    cur.execute("SELECT * FROM admission WHERE username = %s AND password = %s", (data["username"], hashlib.sha256(data["password"].encode()).hexdigest()))
    user = cur.fetchone()
    if user:
        return {"status":"error","response":"Waiting for approval"}
    #login flow
    cur.execute("SELECT * FROM users WHERE username = %s AND password = %s", (data["username"], hashlib.sha256(data["password"].encode()).hexdigest()))
    user = cur.fetchone()
    if user:
        session["user"] = user
        print("### Session var :: ",session["user"])
        return {"status":"success","response":{ "role":user[1], "username":user[2], "buisness":user[4]}}
    else:
        return {"status":"error","response":"Invalid username or password"}

@app.route("/getsales")
def getsales():
    #create 2d array of sales
    cur.execute("SELECT hotel, section, supervisor, waitstuff, target, actual, date FROM sales ORDER BY STR_TO_DATE(date, '%Y-%M-%d') ASC, hotel ASC, section ASC, supervisor ASC, waitstuff ASC")
    sales = cur.fetchall()
    return {"sales":sales}

@app.route("/sales", methods=["POST"]) #insert into sales DB
def sales():
    data = request.get_json()
    print(data)
    cur.execute("INSERT INTO sales (hotel, section, supervisor, waitstuff, target, actual, date) VALUES (%s, %s, %s, %s, %s, %s, %s)", (data["hotel"], data["section"], data["supervisor"], data["waitstuff"], data["target"], data["actual"], data["datestamp"]))
    con.commit()
    return {"status":"success","response":""}

@app.route("/session")
def sessioncheck():
    user = session.get("user")
    if user:
        return {"status":"success","response":{ "role":user[1], "username":user[2], "buisness":user[4]}}
    else:
        return {"status":"error","response":"Session expired"}

@app.route("/logout")
def logout():
    session.clear()
    return {"status":"success"}

@app.route("/getinventory")
def getinventory():
    cur.execute("SELECT hotel, purchases, grossales, netsales, opening, closing, date FROM inventory ORDER BY STR_TO_DATE(date, '%Y-%M-%d') ASC, hotel ASC, purchases ASC")
    inventory = cur.fetchall()
    return {"status":"success","response":inventory}

@app.route("/setinventory", methods=["POST"])
def setinventory():
    #insert into inventory DB
    data = request.get_json()
    print(data)
    cur.execute("INSERT INTO inventory (hotel, purchases, grossales, netsales, opening, closing, date) VALUES (%s, %s, %s, %s, %s, %s, %s)", (data["hotel"], data["purchases"], data["grossales"], data["netsales"], data["opening"], data["closing"], data["datestamp"]))
    con.commit()
    return {"status":"success","response":""}

@app.route("/buisnesses")
def buisnesses():
    role = session.get("user")[1]
    buisnesses = []
    if role==4:
        cur.execute("SELECT name, type FROM buisness")
        buisnesses = cur.fetchall()
    elif role==3:
        cur.execute("SELECT buisness, name FROM sections WHERE buisness = %s", (session.get("user")[4],))
        buisnesses = cur.fetchall()
    print('Buisnesses !! ',buisnesses)
    # select all unique users from users table
    cur.execute("SELECT name, buisness ,role FROM users")
    users = cur.fetchall()
    return {"status":"success","response":{"buisnesses":buisnesses,"users":users}}


@app.route("/addbuisness", methods=["POST"])
def addbuisness():
    data = request.get_json()
    role = session.get("user")[1]
    if role==4:
        cur.execute("INSERT INTO buisness (name, type) VALUES (%s, %s)", (data["name"], data["type"]))
    elif role==3:
        cur.execute("INSERT INTO sections (buisness, name) VALUES (%s, %s)", (session.get("user")[4], data["name"]))
    con.commit()
    return {"status":"success","response":""}

@app.route("/download/<file_name>")
def getFile(file_name):
    headers = {"Content-Disposition": "attachment; filename=%s" % file_name}
    #read from sales table and create csv_data variable to be returned
    cur.execute("SELECT hotel, section, supervisor, waitstuff, target, actual, date FROM sales")
    sales = cur.fetchall()
    csv_data = "Hotel,Section,Supervisor,Waitstuff,Target,Actual,Date\n"
    for sale in sales:
        csv_data += ",".join([str(s) for s in sale]) + "\n"
    return make_response((csv_data, headers))

@app.route("/logs")
def logs():
    pass

@app.route("/getTargets")
def getTarget():
    role = session.get("user")[1]
    user = session.get("user")[3]

    #create targets object {date:amount}
    targets = {}
    if role == 3:
        cur.execute("SELECT date, amount FROM targets WHERE manager = %s", (user,))
    elif role == 2:
        cur.execute("SELECT date, amount FROM targets WHERE supervisor = %s", (user,))
    elif role == 1:
        cur.execute("SELECT date, amount FROM targets WHERE waitstuff = %s", (user,))
    rows = cur.fetchall()
    for row in rows:
        targets[row[0]] = row[1]

    #from users table get all users with role 1
    cur.execute("SELECT name FROM users WHERE role = %s", (role-1,))
    users = cur.fetchall()

    #get buisnesses or sections
    if role==4:
        cur.execute("SELECT name FROM buisness")
    elif role==3:
        cur.execute("SELECT name FROM sections WHERE buisness = %s", (session.get("user")[4],))
    buisnesses = cur.fetchall()

    return {
        "status":"success",
        "response":{
            "previous":[
                ["My hotel","Samson Mongare","Waitstuff","20,000","Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate ea aperiam maiores iste vero eaque alias dolor ut obcaecati eligendi harum commodi nulla debitis, recusandae repellendus earum vel. Nobis, maxime!","2023-October-30"],
            ],
            "users":users,
            "buisness":buisnesses,
            "targets":targets
        }
    }

@app.route("/setTarget", methods=["POST"])
def setTarget():
    data = request.get_json()
    role = session.get("user")[1]
    print(data)
    if role == 4:#admin
        cur.execute("INSERT INTO targets (buisness, manager, section, supervisor, waitstuff, note, amount, date) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", (data["position"], data["name"], '#', '#', '#', data["note"], data["amount"], data["date"]))
    elif role == 3:#manager
        cur.execute("INSERT INTO targets (buisness, manager, section, supervisor, waitstuff, note, amount, date) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", ('#', '#', data["position"], data["name"], '#', data["note"], data["amount"], data["date"]))
    elif role == 2:#supervisor
        cur.execute("SELECT section FROM targets WHERE supervisor = %s AND date = %s", (session.get("user")[3], data["date"]))
        section = cur.fetchone()
        cur.execute("INSERT INTO targets (buisness, manager, section, supervisor, waitstuff, note, amount, date) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", ('#', '#', section[0], '#', data["name"], data["note"], data["amount"], data["date"]))
    con.commit()
    return {"status":"success","response":""}

@app.route("/getStuff")
def getStuff():
    response = {}
    cur.execute("SELECT section, waitstuff, amount, date FROM targets WHERE waitstuff != '#'")
    rows = cur.fetchall()
    for row in rows:
        date = row[3]
        name = row[1]
        #get user hotel from buisness in users table
        cur.execute("SELECT buisness FROM users WHERE name = %s", (name,))
        buisness = cur.fetchone()[0]
        #get supervisor from targets table where supervisor != '#' and date = date and section = section
        cur.execute("SELECT supervisor FROM targets WHERE supervisor != '#' AND date = %s AND section = %s", (date, row[0]))
        supervisor = cur.fetchone()[0]
        if date not in response:
            response[date] = {}
        response[date][name] = {
            "section":row[0],
            "target":row[2],
            "hotel":buisness,
            "supervisor":supervisor
        }
    return {
        "status":"success",
        "response": response
        }

if __name__ == '__main__':
    app.run(debug=True, port=os.getenv("PORT", default=5000),host="0.0.0.0")