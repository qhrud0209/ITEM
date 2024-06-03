from flask import Flask, json, request, redirect, jsonify
import sqlite3
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

app = Flask(__name__)

login_manager = LoginManager()
login_manager.init_app(app)

conn = sqlite3.connect('database.db', check_same_thread=False)

cursor = conn.cursor()
cursor.execute('''CREATE TABLE IF NOT EXISTS users(studentNumber INTEGER PRIMARY KEY, name TEXT, id TEXT, password TEXT)''')
cursor.execute('''CREATE TABLE IF NOT EXISTS items(itemID INTEGER PRIMARY KEY, productName TEXT, location TEXT, function TEXT, productImage BLOB, registrant TEXT, registeredDate TEXT)''')
cursor.execute('''CREATE TABLE IF NOT EXISTS history(itemID INTEGER PRIMARY KEY, name TEXT, studentNumber INTEGER, date TEXT)''')

def search(keyword):
    cursor.execute('''SELECT * FROM items WHERE productName LIKE ? OR location LIKE ? OR function LIKE ?''', ('%'+keyword+'%', '%'+keyword+'%', '%'+keyword+'%'))
    result = cursor.fetchall()
    #cursor.close()·
    #print(result)
    return result


class User(UserMixin):
    def __init__(self, user_id, user_name, user_studentNumber):
        self.user_id = user_id
        self.user_name = user_name
        self.user_studentNumber = user_studentNumber

    def get_id(self):
        return self.user_id
    
    def get_name(self):
        return self.user_name
    
    def get_studentNumber(self):
        return self.user_studentNumber

    @staticmethod
    def get_user_info(user_id, user_password=None):
        result = dict()

        try:
            if user_password is None:
                cursor.execute('''SELECT * FROM users WHERE id = ?''', (user_id,))
            else:
                cursor.execute('''SELECT * FROM users WHERE id = ? AND password = ?''', (user_id, user_password))
            #result = cursor.fetchone()
            result['result'] = 'success'
            result['data'] = cursor.fetchone()
            #print(result['data'])
    
        except:
            result['result'] = 'fail'
            result['data'] = 'error'
        finally:
            return result

@login_manager.user_loader
def user_loader(user_id):
    user_info = User.get_user_info(user_id)
    login_info = User(user_id=user_info['data'][2], user_name=user_info['data'][1], user_studentNumber=user_info['data'][0])

    return login_info

@login_manager.unauthorized_handler
def unauthorized():
    return jsonify({"message": "로그인이 필요합니다."})


@app.route("/signin", methods=['GET', 'POST'])
def signin():
    data = request.get_json()
    user_id = data['id']
    user_password = data['password']

    print(user_id, user_password)

    if user_id is None or user_password is None:
        #print("heYYY")
        return jsonify({"message": "아이디 혹은 비밀번호를 다시 입력해주세요."}) 

    user_info=User.get_user_info(user_id, user_password)
    #print(user_info)
    #print(user_info['result'])
    if user_info['data'] != None and user_info['result'] == 'success':
        #print("im here")
        login_info = User(user_id=user_info['data'][2], user_name=user_info['data'][1], user_studentNumber=user_info['data'][0])
        login_user(login_info)
        return jsonify({"message": "success"}) 
    else:
        #print("im here2")
        return jsonify({"message": "아이디 혹은 비밀번호를 다시 입력해주세요."}) 

@app.route("/signout")
def signout():
    logout_user()
    return jsonify({"message": "success"}) 

@app.route("/search/<keyword>", methods=['GET'])
def search_keyword(keyword):
    result = json.dumps(search(keyword), ensure_ascii=False)
    #result = search(keyword)
    #print(result)
    #return jsonify({"data": result})
    #print(result)
    return result

@app.route("/product/<pid>", methods=['GET'])
def product(pid):
    cursor.execute('''SELECT * FROM items WHERE itemID = ?''', (pid,))
    result = cursor.fetchall()
    #print(result)
    return result

@app.route("/product/history/<pid>", methods=['GET'])
def product_history(pid):
    cursor.execute('''SELECT * FROM history WHERE itemID = ?''', (pid,))
    result = cursor.fetchall()
    #print(result)
    return result

def converToBinaryData(filename):
    with open(filename, 'rb') as file:
        blobData = file.read()
    return blobData


@app.route("/product/add", methods=['POST'])
def add_product():
    data = request.get_json()

    #print(data)

    cursor.execute('''INSERT INTO items(productName, location, function, productImage, registrant, registeredDate) VALUES(?, ?, ?, ?, ?, ?)''', (data['productName'], data['location'], data['func'], data['image'], data['registrant'], data['registeredDate']))
    data = cursor.fetchall()

    conn.commit()
    return jsonify({"message": "success"})

@app.route("/signup", methods=['POST'])
def signup():
    data = request.get_json()
    cursor.execute('''INSERT INTO users(studentNumber, name, id, password) VALUES(?, ?, ?, ?)''', (data['studentNumber'], data['name'], data['id'], data['password']))
    conn.commit()
    return jsonify({"message": "success"})
    

@app.route("/isSignin")
@login_required
def isSignin():
    user_info = User.get_user_info(current_user.get_id())
    return jsonify({"message": "Yes", "studentNumber": user_info['data'][0], "name": user_info['data'][1], "id": user_info['data'][2]})

@app.route("/product/history/add", methods=['POST'])
@login_required
def add_history():
    data = request.get_json()
    #print(data)
    cursor.execute('''INSERT INTO history(itemID, name, studentNumber, day) VALUES(?, ?, ?, ?)''', (data['itemID'], data['name'], data['studentNumber'], data['date']))
    conn.commit()
    return "History added successfully"

@app.route("/user/info")
@login_required
def convey_user_info():
    return jsonify({"studentNumber": current_user.get_studentNumber(), "name": current_user.get_name()})

if __name__ == "__main__":
    app.secret_key = 'super secret key'
    app.config['SESSION_TYPE'] = 'filesystem'
    app.run(debug=True)
